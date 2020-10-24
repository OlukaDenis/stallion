import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, Row, Col, Select, Input, Button, Spin, DatePicker, Alert, Tooltip, Result, message } from 'antd';
import moment from 'moment';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { isStagedOrder } from '../../utilities/common';
import BaseLayout from '../../components/layout';
import { Router, withTranslation } from '../../utilities/i18n';
import TextArea from 'antd/lib/input/TextArea';
import { useIsLoadingNewPage } from '../../hooks/NewPageLoadingIndicator';
import { calculateTotalShippingRate } from '../../utilities/calculate_shipping_rate';
const { Option } = Select;

export function StagedJobsPage({ t, quote, theme, isLoggedIn, userUID }) {
  const loginPageParams = { pathname: '/login', query: { redirectURL: Router.pathname } };
  const availableJobsPageParams = { pathname: '/jobs/available' };
  const [isLoadingNewPage, setIsLoadingNewPage] = useState(null);
  const [stagedJobs, setStagedJobs] = useState([]);
  const [isRefreshingStagedJobs, setIsRefreshingStagedJobs] = useState(false);
  const [isSubmittingJob, setIsSubmittingJob] = useState({});
  const [isCancelingJobBid, setIsCancelingJobBid] = useState({});

  const [suggestedPickupDate, setSuggestedPickupDate] = useState({});
  const [hasPickupDateError, setHasPickupDateError] = useState({});
  const [suggestedDeliveryDate, setSuggestedDeliveryDate] = useState({});
  const [hasDeliveryDateError, setHasDeliveryDateError] = useState({});
  const [suggestedPayout, setSuggestedPayout] = useState({});
  const [hasPayoutError, setHasPayoutError] = useState({});
  const [comments, setComments] = useState({});
  const [hasCommentsError, setHasCommentsError] = useState({});
  const [isDataSubmitted, setIsDataSubmitted] = useState({});

  useIsLoadingNewPage(isLoadingNewPage);

  useEffect(() => {
    if (isLoadingNewPage) setIsLoadingNewPage(null);
  }, [isLoadingNewPage]);

  useEffect(() => {
    if (!isLoggedIn) setIsLoadingNewPage(loginPageParams);
  }, [isLoggedIn]);

  useEffect(() => {
    fetchStagedJobs();
  }, []);

  const unstageAllJobs = () => {
    stagedJobs.map((order) => unstageJob(order));
  };

  const submitJobForApproval = async (order) => {
    setIsDataSubmitted({ ...isDataSubmitted, [order.firebaseRefID]: true });

    if (!suggestedPickupDate[order.firebaseRefID]) {
      setHasPickupDateError({ ...hasPickupDateError, [order.firebaseRefID]: true });
    }

    if (!suggestedDeliveryDate[order.firebaseRefID]) {
      setHasDeliveryDateError({ ...hasDeliveryDateError, [order.firebaseRefID]: true });
    }

    if (!suggestedPayout[order.firebaseRefID]) {
      setHasPayoutError({ ...hasPayoutError, [order.firebaseRefID]: true });
    } else if (Number.isNaN(Number(suggestedPayout[order.firebaseRefID]))) {
      setHasPayoutError({ ...hasPayoutError, [order.firebaseRefID]: true });
      message.error('Amount must be a valid numeric value');
    }

    if (!comments[order.firebaseRefID]) {
      setHasCommentsError({ ...hasCommentsError, [order.firebaseRefID]: true });
    }

    if (
      suggestedPickupDate[order.firebaseRefID] &&
      suggestedDeliveryDate[order.firebaseRefID] &&
      !isPickupDateEarlierThanDeliveryDate(order) &&
      suggestedPayout[order.firebaseRefID] &&
      !Number.isNaN(Number(suggestedPayout[order.firebaseRefID])) &&
      comments[order.firebaseRefID]
    ) {
      setIsSubmittingJob({ ...isSubmittingJob, [order.firebaseRefID]: true });
      await firebase
        .firestore()
        .doc(`/orders/${order.firebaseRefID}`)
        .set(
          {
            driver_submit_timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            driver_uid: userUID,
            driver_submitted: true,
            driver_suggested_pickup_date: suggestedPickupDate[order.firebaseRefID],
            driver_suggested_delivery_date: suggestedDeliveryDate[order.firebaseRefID],
            driver_suggested_payout: suggestedPayout[order.firebaseRefID],
            driver_comments: comments[order.firebaseRefID],
          },
          { merge: true }
        )
        .then((success) => {
          setStagedJobs(
            stagedJobs.map((orderItem) =>
              order.firebaseRefID === orderItem.firebaseRefID ? { ...order, driver_submitted: true } : orderItem
            )
          );
        });
      setIsSubmittingJob({ ...isSubmittingJob, [order.firebaseRefID]: false });
    }
  };

  const isPickupDateEarlierThanDeliveryDate = (order) => {
    if (
      suggestedPickupDate[order.firebaseRefID] &&
      suggestedDeliveryDate[order.firebaseRefID] &&
      moment(suggestedDeliveryDate[order.firebaseRefID]).isBefore(moment(suggestedPickupDate[order.firebaseRefID]))
    ) {
      setHasPickupDateError({ ...hasPickupDateError, [order.firebaseRefID]: true });
      setHasDeliveryDateError({ ...hasDeliveryDateError, [order.firebaseRefID]: true });
      message.error('Delivery Date cannot be earlier than the Pickup Date!');
      return true;
    } else {
      setHasPickupDateError({ ...hasPickupDateError, [order.firebaseRefID]: false });
      setHasDeliveryDateError({ ...hasDeliveryDateError, [order.firebaseRefID]: false });
      return false;
    }
  };

  const cancelJobBid = async (order) => {
    setIsCancelingJobBid({ ...isCancelingJobBid, [order.firebaseRefID]: true });
    await firebase
      .firestore()
      .doc(`/orders/${order.firebaseRefID}`)
      .set(
        {
          driver_submit_timestamp: null,
          driver_uid: null,
          driver_submitted: false,
          driver_suggested_pickup_date: null,
          driver_suggested_delivery_date: null,
          driver_suggested_payout: null,
          driver_comments: null,
          staging_timestamp: null,
          staging_uid: null,
        },
        { merge: true }
      )
      .then((success) => {
        setStagedJobs(stagedJobs.filter((job) => job.firebaseRefID !== order.firebaseRefID));
      });
    setIsCancelingJobBid({ ...isCancelingJobBid, [order.firebaseRefID]: false });
  };

  const unstageJob = async (order) => {
    await firebase
      .firestore()
      .doc(`/orders/${order.firebaseRefID}`)
      .set(
        {
          staging_timestamp: null,
          staging_uid: null,
        },
        { merge: true }
      )
      .then((success) => {
        setStagedJobs(stagedJobs.filter((job) => job.firebaseRefID !== order.firebaseRefID));
      });
  };

  const fetchStagedJobs = async () => {
    setIsRefreshingStagedJobs(true);
    const status = await firebase
      .firestore()
      .collection(`/orders`)
      .where('staging_uid', '==', userUID)
      .get()
      .then((response) => {
        console.log('fetchStagedJobs: ', response);

        const newData = [];
        let order;
        response.forEach((snapshot) => {
          order = snapshot.data();
          order.key = order.order_id;

          if (isStagedOrder(order)) {
            newData.push(order);
          } else if (order.driver_submitted) {
            setSuggestedPickupDate({
              ...suggestedPickupDate,
              [order.firebaseRefID]: order.driver_suggested_pickup_date,
            });
            setSuggestedDeliveryDate({
              ...suggestedDeliveryDate,
              [order.firebaseRefID]: order.driver_suggested_delivery_date,
            });
            setSuggestedPayout({ ...suggestedPayout, [order.firebaseRefID]: order.driver_suggested_payout });
            setComments({ ...comments, [order.firebaseRefID]: order.driver_comments });
            newData.push(order);
          }
        });
        setStagedJobs(newData);
      })
      .catch((error) => {
        console.log('error', error);
      });
    setIsRefreshingStagedJobs(false);
  };

  const columnStyle = {
    backgroundColor: 'rgba(248, 105, 66, 0.3)',
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingTop: '0px',
    paddingBottom: '35px',
  };

  return (
    <BaseLayout>
      <Row gutter={[16, 16]} style={{ paddingTop: 30 }} justify="center">
        <Col xs={24} sm={24} md={23} lg={23} xl={23}>
          <Card>
            <div className="table__section">
              <div>
                <div className="float-left" style={{ marginBottom: 16 }}>
                  <Button
                    loading={!!isLoadingNewPage}
                    onClick={() => {
                      unstageAllJobs();
                    }}
                    type="ghost"
                  >
                    {t('unstage_all_button')}
                  </Button>
                </div>
                {isLoggedIn && (
                  <div className="float-right" style={{ marginBottom: 16 }}>
                    <Button
                      loading={!!isLoadingNewPage}
                      onClick={() => setIsLoadingNewPage(availableJobsPageParams)}
                      type="ghost"
                    >
                      {t('available_jobs_button')}
                    </Button>
                  </div>
                )}
              </div>
              <h3>
                {t('staged_jobs_label')} ({stagedJobs.length})
              </h3>

              {!stagedJobs.length && !isRefreshingStagedJobs && <p>{t('no_staged_jobs_label')}</p>}

              {isRefreshingStagedJobs && (
                <div className="vertical-center-div">
                  <Spin />
                </div>
              )}

              {stagedJobs.map((order, index) => (
                <div key={order.firebaseRefID}>
                  <Row gutter={[0, 0]} justify="center">
                    <Col
                      style={{ ...columnStyle, paddingTop: '20px', position: 'relative' }}
                      xs={24}
                      sm={24}
                      md={10}
                      lg={10}
                      xl={8}
                    >
                      <div className="staged-item-number">{index + 1}</div>
                      {t('order_num_label')}: <b>{order.id}</b>
                    </Col>
                    <Col style={{ ...columnStyle, paddingTop: '20px' }} xs={24} sm={24} md={10} lg={10} xl={8}>
                      {Object.keys(order.cars).map((index) => (
                        <>
                          {t('vehicle_label')} {Number(index) + 1}:{' '}
                          <b>
                            {order.cars[index].year} {order.cars[index].make} {order.cars[index].model}{' '}
                          </b>
                          <em>
                            ({t('is_truck_label')}: {order.cars[index].isTruck ? t('yes_label') : t('no_label')},{' '}
                            {t('is_operable_label')}: {order.cars[index].isOperable ? t('yes_label') : t('no_label')},{' '}
                            {t('has_keys_label')}: {order.cars[index].hasKeys ? t('yes_label') : t('no_label')})
                          </em>{' '}
                          <br /> <br />
                        </>
                      ))}
                    </Col>
                  </Row>
                  <Row gutter={[0, 0]} justify="center">
                    <Col style={{ ...columnStyle }} xs={24} sm={24} md={10} lg={10} xl={8}>
                      <h4>{t('pickup_header')}</h4>
                      {order.pickupLocation.contactName}
                      <br />
                      {order.pickupLocation.address}
                      <br />
                      {order.originName}
                      <br />
                      <br />
                      <h4>{t('pickup_instructions')}:</h4>
                      <TextArea
                        disabled
                        style={{ backgroundColor: 'rgba(248, 105, 66, 0.1)', color: 'black' }}
                        rows={5}
                        value={order.additional_comments}
                      />
                    </Col>
                    <Col style={{ ...columnStyle }} xs={24} sm={24} md={10} lg={10} xl={8}>
                      <h4>{t('delivery_header')}</h4>
                      {order.deliveryLocation.contactName}
                      <br />
                      {order.deliveryLocation.address}
                      <br />
                      {order.destinationName}
                      <br />
                      <br />
                      <h4>{t('delivery_instructions')}:</h4>
                      <TextArea
                        disabled
                        style={{ backgroundColor: 'rgba(248, 105, 66, 0.1)', color: 'black' }}
                        rows={5}
                        value={order.additional_comments}
                      />
                    </Col>
                  </Row>
                  <Row gutter={[0, 0]} justify="center">
                    <Col style={{ ...columnStyle }} xs={24} sm={24} md={10} lg={10} xl={8}>
                      <div className="date-item-block">
                        <div className="date-item-child">
                          <b>{t('pickup_date')}: </b>
                        </div>{' '}
                        <div className="date-item-child">
                          <Tooltip trigger={['click', 'hover']} title={t('suggested_pickup_date')}>
                            <DatePicker
                              disabled={order.driver_submitted}
                              placeholder={t('suggested_pickup_date_placeholder')}
                              size="small"
                              style={{ width: '100%' }}
                              value={
                                suggestedPickupDate[order.firebaseRefID]
                                  ? moment(suggestedPickupDate[order.firebaseRefID], 'YYYY-MM-DD')
                                  : null
                              }
                              disabledDate={(moment) => moment.isBefore(new Date())}
                              showToday={false}
                              onChange={(date) => {
                                setSuggestedPickupDate({
                                  ...suggestedPickupDate,
                                  [order.firebaseRefID]: date == null ? '' : date.format('YYYY-MM-DD'),
                                });
                                setHasPickupDateError({ ...hasPickupDateError, [order.firebaseRefID]: false });
                              }}
                            />
                            {isDataSubmitted[order.firebaseRefID] && hasPickupDateError[order.firebaseRefID] ? (
                              <Alert message={t('suggested_pickup_date_error')} type="error" />
                            ) : (
                              <></>
                            )}
                          </Tooltip>
                        </div>
                      </div>
                    </Col>
                    <Col style={{ ...columnStyle }} xs={24} sm={24} md={10} lg={10} xl={8}>
                      <div className="date-item-block">
                        <div className="date-item-child">
                          <b>{t('delivery_date')}: </b>
                        </div>{' '}
                        <div className="date-item-child">
                          <Tooltip trigger={['click', 'hover']} title={t('suggested_delivery_date')}>
                            <DatePicker
                              disabled={order.driver_submitted}
                              placeholder={t('suggested_delivery_date_placeholder')}
                              size="small"
                              style={{ width: '100%' }}
                              value={
                                suggestedDeliveryDate[order.firebaseRefID]
                                  ? moment(suggestedDeliveryDate[order.firebaseRefID], 'YYYY-MM-DD')
                                  : null
                              }
                              disabledDate={(moment) => moment.isBefore(new Date())}
                              showToday={false}
                              onChange={(date) => {
                                setSuggestedDeliveryDate({
                                  ...suggestedDeliveryDate,
                                  [order.firebaseRefID]: date == null ? '' : date.format('YYYY-MM-DD'),
                                });
                                setHasDeliveryDateError({ ...hasDeliveryDateError, [order.firebaseRefID]: false });
                              }}
                            />
                            {isDataSubmitted[order.firebaseRefID] && hasDeliveryDateError[order.firebaseRefID] ? (
                              <Alert message={t('suggested_delivery_date_error')} type="error" />
                            ) : (
                              <></>
                            )}
                          </Tooltip>
                        </div>
                      </div>
                      <em>{t('delivery_date_suggested', { date: '2020-11-08' })}</em>
                    </Col>
                  </Row>
                  <Row gutter={[0, 0]} justify="center">
                    <Col style={{ ...columnStyle }} xs={24} sm={24} md={8} lg={8} xl={6}>
                      <div className="date-item-block">
                        <div className="date-item-child">
                          <b>{t('payout_label')} ($)</b>
                        </div>{' '}
                        <div className="date-item-child">
                          <Tooltip trigger={['click', 'hover']} title={t('suggested_payout')}>
                            <Input
                              disabled={order.driver_submitted}
                              size="small"
                              // defaultValue={calculateTotalShippingRate(order)}
                              value={suggestedPayout[order.firebaseRefID]}
                              onChange={(e) => {
                                setSuggestedPayout({ ...suggestedPayout, [order.firebaseRefID]: e.target.value });
                                setHasPayoutError({ ...hasPayoutError, [order.firebaseRefID]: false });
                              }}
                            />
                            {isDataSubmitted[order.firebaseRefID] && hasPayoutError[order.firebaseRefID] ? (
                              <Alert message={t('suggested_payout_error')} type="error" />
                            ) : (
                              <></>
                            )}
                          </Tooltip>
                          <span style={{ fontSize: '11px' }}>
                            <em>{t('asking_label', { amount: `$${calculateTotalShippingRate(order)}` })}</em>
                            <br />
                            <em>{t('distance_label', { distance: order.distance })}</em>
                          </span>
                        </div>
                      </div>
                    </Col>
                    <Col style={{ ...columnStyle }} xs={24} sm={24} md={12} lg={12} xl={10}>
                      <div className="date-item-block">
                        <div className="date-item-child">
                          <b>{t('comments_label')}: </b>
                        </div>{' '}
                        <div className="date-item-child">
                          <Tooltip trigger={['click', 'hover']} title={t('driver_comments')}>
                            <Input
                              disabled={order.driver_submitted}
                              size="small"
                              value={comments[order.firebaseRefID]}
                              onChange={(e) => {
                                setComments({ ...comments, [order.firebaseRefID]: e.target.value });
                                setHasCommentsError({ ...hasCommentsError, [order.firebaseRefID]: false });
                              }}
                            />
                            {isDataSubmitted[order.firebaseRefID] && hasCommentsError[order.firebaseRefID] ? (
                              <Alert message={t('driver_comments_error')} type="error" />
                            ) : (
                              <></>
                            )}
                          </Tooltip>
                        </div>
                      </div>
                    </Col>
                  </Row>

                  {order.driver_submitted ? (
                    <Row gutter={[0, 0]} justify="center">
                      <Col style={{ ...columnStyle, textAlign: 'center' }} xs={24} sm={24} md={20} lg={20} xl={16}>
                        <Result
                          status="success"
                          title="Successfully Submitted Bid!"
                          subTitle="You will receive an email notification once your bid for this order has been accepted."
                        />
                        <Button
                          loading={!!isCancelingJobBid[order.firebaseRefID]}
                          type="primary"
                          onClick={() => cancelJobBid(order)}
                        >
                          Cancel Bid
                        </Button>
                      </Col>
                    </Row>
                  ) : (
                    <>
                      <Row gutter={[0, 0]} justify="center">
                        <Col style={{ ...columnStyle, textAlign: 'center' }} xs={24} sm={24} md={20} lg={20} xl={16}>
                          <Button
                            loading={!!isSubmittingJob[order.firebaseRefID]}
                            onClick={() => submitJobForApproval(order)}
                            type="primary"
                          >
                            {t('submit_button')}
                          </Button>
                          &nbsp;&nbsp;&nbsp;
                          <Button onClick={() => unstageJob(order)} type="default">
                            {t('unstage_job_button')}
                          </Button>
                        </Col>
                      </Row>
                      <Row gutter={[0, 0]} justify="center">
                        <Col
                          style={{ ...columnStyle, textAlign: 'center', fontSize: '11px' }}
                          xs={24}
                          sm={24}
                          md={20}
                          lg={20}
                          xl={16}
                          dangerouslySetInnerHTML={{
                            __html: t('unstage_time_label', {
                              date: moment(new Date(order.staging_timestamp.seconds * 1000))
                                .add(10, 'minutes')
                                .format('MM-DD-YYYY HH:mm A'),
                              timezone: 'US/Eastern',
                            }),
                          }}
                        ></Col>
                      </Row>
                    </>
                  )}

                  <br />
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      <style jsx>
        {`
          .table__section h3 {
            color: white;
            background: #111;
            padding: 0.4rem 1rem;
            display: flex;
            box-sizing: border-box;
            font-weight: 900;
            clear: both;
          }
          .staged-item-number {
            position: absolute;
            z-index: 1;
            width: 28px;
            height: 28px;
            border: 4px solid white;
            border-radius: 14px;
            background: #f63e0c;
            color: white;
            text-align: center;
            margin-left: -35px;
            margin-top: -10px;
          }
          .date-item-block {
            display: flex;
          }
          .date-item-block div:nth-child(1) {
            flex: 2;
          }
          .date-item-block div:nth-child(2) {
            flex: 3;
          }
        `}
      </style>
    </BaseLayout>
  );
}

StagedJobsPage.getInitialProps = async () => ({
  namespacesRequired: ['common', 'jobs_staged'],
});

StagedJobsPage.propTypes = {
  t: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  quote: state.quote,
  theme: state.ui.theme,
  isLoggedIn: state.user.isLoggedIn,
  userUID: state.user.uid,
});

export default connect(mapStateToProps, null)(withTranslation('jobs_staged')(StagedJobsPage));
