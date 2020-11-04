import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { Card, Table, Row, Col, Button, message } from 'antd';

import firebase from 'firebase/app';
import 'firebase/firestore';

import BaseLayout from '../../components/layout';
import { Router, withTranslation } from '../../utilities/i18n';
import { useIsLoadingNewPage } from '../../hooks/NewPageLoadingIndicator';
import Head from 'next/head';
import { CheckCircleOutlined, WarningOutlined } from '@ant-design/icons';

export function ApprovalPending({ t, quote, theme, isLoggedIn, userUID, isAdmin, isManager }) {
  const stagingPageParams = { pathname: '/jobs/staged' };
  const dispatchedJobsPageParams = { pathname: '/jobs/dispatched' };
  const loginPageParams = { pathname: '/login', query: { redirectURL: Router.pathname } };
  const [selectedRows, setSelectedRows] = useState([]);
  const [isLoadingApprovalPendingJobsData, setIsLoadingApprovalPendingJobsData] = useState(false);
  const [isApprovingSelectedBid, setIsApprovingSelectedBid] = useState(false);
  const [isRejectingSelectedBid, setIsRejectingSelectedBid] = useState(false);
  const [data, setData] = useState([]);
  const [isLoadingNewPage, setIsLoadingNewPage] = useState(null);

  useIsLoadingNewPage(isLoadingNewPage);

  useEffect(() => {
    if (isLoadingNewPage) setIsLoadingNewPage(null);
  }, [isLoadingNewPage]);

  useEffect(() => {
    if (!isAdmin && !isManager) setIsLoadingNewPage({ pathname: '/' });
  }, [isAdmin, isManager]);

  useEffect(() => {
    if (!isLoggedIn) setIsLoadingNewPage(loginPageParams);
  }, [isLoggedIn]);

  const approveSelectedBid = async () => {
    await markSelectedBidsAsApproved();
  };

  const rejectSelectedBid = async () => {
    if(selectedRows.length < 1) {
      message.error(t('zero_bids_action_error'));
    }
    setIsRejectingSelectedBid(true);
    selectedRows.map(async (order) => {
      const status = await firebase.firestore().doc(`/orders/${order.order_id}`).set(
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
      );
    });
    setSelectedRows([]);
    setIsRejectingSelectedBid(false);
  };

  const markSelectedBidsAsApproved = async () => {
    if (selectedRows.length < 1) {
      message.error(t('zero_bids_action_error'));
    }
    setIsApprovingSelectedBid(true);
    selectedRows.map(async (order) => {
      const status = await firebase.firestore().doc(`/orders/${order.order_id}`).set(
        {
          approving_timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          approver_uid: userUID,
          approved: true,
          pickedup: false,
        },
        { merge: true }
      );
    });
    setSelectedRows([]);
    setIsApprovingSelectedBid(false);
  };

  const fetchData = async () => {
    setIsLoadingApprovalPendingJobsData(true);
    
    const unsubscribe = firebase
      .firestore()
      .collection('/orders')
      .where('driver_uid', '!=', userUID)
      .where('driver_submitted', '==', true)
      .onSnapshot(
        (response) => {
          const newData = [];
          let order;
          response.forEach((snapshot) => {
            order = snapshot.data();
            order.key = order.order_id;
            if (!order.approved) {
              newData.push(order);
            }
          });

          setData(newData);
          setIsLoadingApprovalPendingJobsData(false);
        },
        (error) => {
          message.error(t('firestore_snapshot_error'));
          // console.error(error);
          setIsLoadingApprovalPendingJobsData(false);
        }
      );
      
      return unsubscribe;
    
  };

  useEffect(() => {
    const unsubscribe = fetchData();

    return () => ('function' === typeof unsubscribe ? unsubscribe() : console.log('unsubscribe', unsubscribe));
  }, []);

  const columns = [
    {
      title: t('table.job_info_col_group.header'),
      children: [
        {
          title: t('table.job_info_col_group.columns.order_id'),
          dataIndex: 'id',
          sorter: (a, b) => a.id - b.id,
          sortDirections: ['ascend', 'descend'],
        },
        {
          title: t('table.job_info_col_group.columns.cars'),
          dataIndex: 'cars',
          render: (cars) => Object.keys(cars).length + ' car(s)',
          sorter: (a, b) => a.length - b.length,
          sortDirections: ['ascend', 'descend'],
        },
        {
          title: t('table.job_info_col_group.columns.vehicle'),
          dataIndex: 'cars',
          render: (cars) =>
            Object.keys(cars).length > 0
              ? cars[Object.keys(cars)[0]].make +
                ' ' +
                cars[Object.keys(cars)[0]].model +
                ' ' +
                cars[Object.keys(cars)[0]].year
              : '',
        },
        {
          title: t('table.job_info_col_group.columns.inop'),
          dataIndex: 'cars',
          render: (cars) =>
            !!Object.keys(cars).filter((index) => !cars[index].isOperable || !cars[index].hasKeys).length ? (
              <p>
                inop <WarningOutlined style={{ color: 'red' }} />
              </p>
            ) : (
              <p>
                good <CheckCircleOutlined style={{ color: 'green' }} />
              </p>
            ),
          // sorter: (a, b) => a.id - b.id,
          // sortDirections: ['ascend', 'descend'],
        },
      ],
    },

    {
      title: t('table.customer_options_col_group.header'),
      children: [
        {
          title: t('table.customer_options_col_group.columns.name'),
          dataIndex: 'name',
        },
        {
          title: t('table.customer_options_col_group.columns.payout'),
          dataIndex: 'amount',
          render: (amount) => '$' + amount,
          sorter: (a, b) => a.amount - b.amount,
          sortDirections: ['ascend', 'descend'],
        },
        {
          title: t('table.customer_options_col_group.columns.pickup'),
          dataIndex: 'pickupDate',
          render: (date) => (date ? moment(date).format('MM-DD-YYYY') : date),
        },
        {
          title: t('table.customer_options_col_group.columns.comments'),
          dataIndex: 'additional_comments',
          render: (comments) => comments || 'No comments',
        },
      ],
    },
    {
      title: t('table.bidder_options_col_group.header'),
      children: [
        {
          title: t('table.bidder_options_col_group.columns.name'),
          dataIndex: 'driver_name',
        },
        {
          title: t('table.bidder_options_col_group.columns.payout'),
          dataIndex: 'driver_suggested_payout',
          render: (amount) => `$${Number(amount).toFixed(2)}`,
        },
        {
          title: t('table.bidder_options_col_group.columns.pickup'),
          dataIndex: 'driver_suggested_pickup_date',
          render: (date) => (date ? moment(date).format('MM-DD-YYYY') : date),
        },
        {
          title: t('table.bidder_options_col_group.columns.delivery'),
          dataIndex: 'driver_suggested_delivery_date',
          render: (date) => (date ? moment(date).format('MM-DD-YYYY') : date),
        },
        {
          title: t('table.bidder_options_col_group.columns.comments'),
          dataIndex: 'driver_comments',
          render: (comments) => comments || 'No comments',
        },
      ],
    },
    {
      title: '',
      children: [
        {
          title: t('table.columns.distance'),
          dataIndex: 'distance',
          sorter: (a, b) => a.distance - b.distance,
          sortDirections: ['ascend', 'descend'],
        },
      ],
    },
  ];

  const onSelectChange = (selectedRowKeys, selectedRows) => {
    // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    setSelectedRows(selectedRows);
  };

  const rowSelection = {
    onChange: onSelectChange,
  };

  const useSmallScreenTable =
    (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) < 1000;

  return (
    <BaseLayout>
      <Head>
        {useSmallScreenTable && <meta name="viewport" content="width=1000, initial-scale=0, user-scalable=yes" />}
      </Head>
      <Row gutter={[16, 16]} style={{ paddingTop: 30 }} justify="center">
        <Col xs={24} sm={24} md={23} lg={23} xl={23}>
          <Card>
            <Row gutter={[8, 8]}>
              <Col md={24} lg={24} xl={24}>
                <div className="table__section">
                  <div>
                    <div className="float-left" style={{ marginBottom: 16 }}>
                      {selectedRows.length > 0 ? (
                        <div>
                          <Button
                            loading={isApprovingSelectedBid || isRejectingSelectedBid}
                            onClick={approveSelectedBid}
                            type="primary"
                          >
                            {t('select_jobs_button')}
                          </Button>
                          &nbsp;&nbsp;
                          <Button
                            loading={isApprovingSelectedBid || isRejectingSelectedBid}
                            onClick={rejectSelectedBid}
                            type="ghost"
                          >
                            {t('reject_jobs_button')}
                          </Button>
                        </div>
                      ) : (
                        <p>{t('instructions')}</p>
                      )}
                    </div>
                    <div className="float-right" style={{ marginBottom: 16 }}>
                      <Button
                        loading={isApprovingSelectedBid || isRejectingSelectedBid}
                        onClick={() => setIsLoadingNewPage(dispatchedJobsPageParams)}
                        type="ghost"
                      >
                        {t('dispatched_jobs_button')}
                      </Button>
                    </div>
                  </div>

                  <h3>{t('table.header')}</h3>

                  <Table
                    loading={isLoadingApprovalPendingJobsData}
                    bordered
                    scroll={{ x: true, y: 600 }}
                    pagination={{
                      position: ['bottomRight'],
                      defaultPageSize: 20,
                    }}
                    rowSelection={{ ...rowSelection }}
                    columns={columns}
                    dataSource={data}
                  />
                </div>
              </Col>
            </Row>
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
        `}
      </style>
    </BaseLayout>
  );
}

ApprovalPending.getInitialProps = async () => ({
  namespacesRequired: ['common', 'jobs_approve'],
});

ApprovalPending.propTypes = {
  t: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  quote: state.quote,
  theme: state.ui.theme,
  isLoggedIn: state.user.isLoggedIn,
  userUID: state.user.uid,
  isAdmin: state.user.isAdmin,
  isManager: state.user.isManager,
});

export default connect(mapStateToProps, null)(withTranslation('jobs_approve')(ApprovalPending));
