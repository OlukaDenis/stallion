import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { Card, Table, Row, Col, Button } from 'antd';

import firebase from 'firebase/app';
import 'firebase/firestore';

import BaseLayout from '../../components/layout';
import { Router, withTranslation } from '../../utilities/i18n';
import { useIsLoadingNewPage } from '../../hooks/NewPageLoadingIndicator';

export function Available({ t, quote, theme, isLoggedIn, userUID, isAdmin, isManager }) {
  const stagingPageParams = { pathname: '/jobs/staged' };
  const loginPageParams = { pathname: '/login', query: { redirectURL: Router.pathname } };
  const [selectedRows, setSelectedRows] = useState([]);
  const [isLoadingAvailableJobsData, setIsLoadingAvailableJobsData] = useState(false);
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
    setIsRejectingSelectedBid(true);
    selectedRows.map(async (order) => {
      const status = await firebase.firestore().doc(`/orders/${order.firebaseRefID}`).set(
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
    setIsRejectingSelectedBid(false);
  };

  const markSelectedBidsAsApproved = async () => {
    setIsApprovingSelectedBid(true);
    selectedRows.map(async (order) => {
      const status = await firebase.firestore().doc(`/orders/${order.firebaseRefID}`).set(
        {
          approving_timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          approver_uid: userUID,
          approved: true,
        },
        { merge: true }
      );
    });
    setIsApprovingSelectedBid(false);
  };

  const fetchData = async () => {
    setIsLoadingAvailableJobsData(true);
    
    const unsubscribe = firebase
      .firestore()
      .collection('/orders')
      .where('driver_uid', '!=', userUID)
      .where('driver_submitted', '==', true)
      .onSnapshot((response) => {
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
        setIsLoadingAvailableJobsData(false);
      });
    
  };

  useEffect(() => {
    fetchData();
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
          title: t('table.job_info_col_group.columns.date'),
          dataIndex: 'pickupDate',
          sorter: (a, b) => (moment(a.pickupDate).isBefore(b.pickupDate) ? -1 : 1),
          sortDirections: ['ascend', 'descend'],
        },
        {
          title: t('table.job_info_col_group.columns.vehicle'),
          dataIndex: 'cars',
          render: (cars) => cars[0].make + ' ' + cars[0].model + ' ' + cars[0].year,
        },
        {
          title: t('table.job_info_col_group.columns.inop'),
          dataIndex: 'cars',
          render: (cars) =>
            !!Object.keys(cars).filter((index) => !cars[index].isOperable || !cars[index].hasKeys).length
              ? 'inop'
              : 'good',
          // sorter: (a, b) => a.id - b.id,
          // sortDirections: ['ascend', 'descend'],
        },
      ],
    },

    {
      title: t('table.pickup_info_col_group.header'),
      children: [
        {
          title: t('table.pickup_info_col_group.columns.address'),
          dataIndex: 'pickupLocation',
          render: (location) => location.address,
        },
        {
          title: t('table.pickup_info_col_group.columns.city'),
          dataIndex: 'originName',
          render: (originName) => originName.split(',')[0],
        },
        {
          title: t('table.pickup_info_col_group.columns.state'),
          dataIndex: 'origin',
          render: (origin) => origin.split(',')[1].split(' ')[1],
        },
        {
          title: t('table.pickup_info_col_group.columns.zip'),
          dataIndex: 'origin',
          render: (origin) => origin.split(',')[1].split(' ')[2],
          sorter: (a, b) => (a.origin.split(',')[1].split(' ')[2] - b.origin.split(',')[1].split(' ')[2] ? -1 : 1),
          sortDirections: ['ascend', 'descend'],
        },
      ],
    },
    {
      title: t('table.delivery_info_col_group.header'),
      children: [
        {
          title: t('table.delivery_info_col_group.columns.address'),
          dataIndex: 'deliveryLocation',
          render: (location) => location.address,
        },
        {
          title: t('table.delivery_info_col_group.columns.city'),
          dataIndex: 'destinationName',
          render: (destinationName) => destinationName.split(',')[0],
        },
        {
          title: t('table.delivery_info_col_group.columns.state'),
          dataIndex: 'destination',
          render: (destination) => destination.split(',')[1].split(' ')[1],
        },
        {
          title: t('table.delivery_info_col_group.columns.zip'),
          dataIndex: 'destination',
          render: (destination) => destination.split(',')[1].split(' ')[2],
          sorter: (a, b) => a.destination.split(',')[1].split(' ')[2] - b.destination.split(',')[1].split(' ')[2],
          sortDirections: ['ascend', 'descend'],
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
        {
          title: t('table.columns.payout'),
          dataIndex: 'payment_authorized_amount',
          render: (amount) => '$' + amount,
          sorter: (a, b) => a.payment_authorized_amount - b.payment_authorized_amount,
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

  return (
    <BaseLayout>
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
                  </div>

                  <h3>{t('table.header')}</h3>

                  <Table
                    loading={isLoadingAvailableJobsData}
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

Available.getInitialProps = async () => ({
  namespacesRequired: ['common', 'jobs_approve'],
});

Available.propTypes = {
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

export default connect(mapStateToProps, null)(withTranslation('jobs_approve')(Available));
