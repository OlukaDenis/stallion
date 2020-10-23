import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, Row, Col, Select, Input, Button, Spin } from 'antd';
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
        console.log('response', response);

        const newData = [];
        let order;
        response.forEach((snapshot) => {
          order = snapshot.data();
          order.key = order.order_id;

          if (isStagedOrder(order)) {
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
                      {t('order_num_label')} #: <b>{order.id}</b>
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
                          <Input size="small" value={order.pickupDate} />
                        </div>
                      </div>
                    </Col>
                    <Col style={{ ...columnStyle }} xs={24} sm={24} md={10} lg={10} xl={8}>
                      <div className="date-item-block">
                        <div className="date-item-child">
                          <b>{t('delivery_date')}: </b>
                        </div>{' '}
                        <div className="date-item-child">
                          <Input size="small" value={'2020-11-08'} />
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
                          <Input size="small" value={calculateTotalShippingRate(order)} />
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
                          <Input size="small" value={'Some comments...'} />
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row gutter={[0, 0]} justify="center">
                    <Col style={{ ...columnStyle, textAlign: 'center' }} xs={24} sm={24} md={20} lg={20} xl={16}>
                      <Button type="primary">{t('submit_button')}</Button>&nbsp;&nbsp;&nbsp;
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
