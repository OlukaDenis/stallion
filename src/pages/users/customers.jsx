import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { Card, Table, Row, Col, Button, Drawer, Checkbox, message, Tag } from 'antd';

import firebase from 'firebase/app';
import 'firebase/firestore';

import BaseLayout from '../../components/layout';
import { Router, withTranslation } from '../../utilities/i18n';
import { useIsLoadingNewPage } from '../../hooks/NewPageLoadingIndicator';
import CheckboxGroup from 'antd/lib/checkbox/Group';

export function Customers({ t, quote, theme, isLoggedIn, userUID }) {
  const loginPageParams = { pathname: '/login', query: { redirectURL: Router.pathname } };
  const [selectedRows, setSelectedRows] = useState([]);
  const [data, setData] = useState([]);
  const [customerOrders, setCustomerOrders] = useState([])
  const [isLoadingStagedJobsPage, setIsLoadingStagedJobsPage] = useState(null);
  const [visible, setVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  useIsLoadingNewPage(isLoadingStagedJobsPage);

  useEffect(() => {
    if (isLoadingStagedJobsPage) setIsLoadingStagedJobsPage(null);
  }, [isLoadingStagedJobsPage]);

  useEffect(() => {
    if (!isLoggedIn) setIsLoadingStagedJobsPage(loginPageParams);
  }, [isLoggedIn]);

  const fetchData = () => {
    firebase
      .firestore()
      .collection('/users')
      .limit(100)
      .orderBy('createdAt', 'desc')
      .get()
      .then((response) => {
        const newData = []; 
        let user;
        response.forEach((snapshot) => {
          user = snapshot.data();
          if(user.uid !== userUID) {
            user.key = user.uid;
            newData.push(user);
          }
          
        });
        setData(newData);
      })
      .catch((error) => {});
  };

  const fetchCustomerOrders = (email) => {
    firebase
    .firestore()
    .collection('/orders')
    .where('email', '==', email)
    .orderBy('booking_timestamp', 'desc')
    .get()
    .then((response) => {
      const newData = []; 
      let order;
      response.forEach((snapshot) => {
        order = snapshot.data();
        newData.push(order);       
      });
      setCustomerOrders(newData);
      console.log(newData);
    })
    .catch((error) => {
        console.log(error);
    });
  }

  const onClose = () => {
    setVisible(false);
  }

  const showDrawer = (item) => {
    setSelectedUser(item)
    setVisible(true);

    if(item) {
      fetchCustomerOrders(item.email);
    }
    console.log(item);
  }

  useEffect(() => {
    fetchData();
  }, []);


  const columns = [
    {
      title: t('table.column.name'),
      dataIndex: 'displayName',
      // ...getColumnSearchProps('displayName'),
    },
    {
      title: t('table.column.email'),
      dataIndex: 'email',
    },
      {
      title: 'Action',
      dataIndex: 'action',
      render: (text, record) => (
        <Button size="small" onClick={() => showDrawer(record)}>
          View Orders
        </Button>
      )
    }
  ];

  const orderColumns = [
    {
      title: 'Phone',
      dataIndex: 'phone'
    },
    {
      title: 'Origin',
      dataIndex: 'origin',
    },
    {
      title: 'Destination',
      dataIndex: 'destination',
    },
    {
      title: 'Amount',
      dataIndex: 'amount'
    },
    {
      title: 'Paid',
      dataIndex: 'isPaid',
      render: (isPaid) => (
        isPaid ? <Tag color="green">Paid</Tag> :  <Tag color="red">Not Paid</Tag>
      )
    },
    {
      title: 'Approved',
      dataIndex: 'approved',
      render: (approved) => (
        approved ?  <Tag color="green">Approved</Tag> :  <Tag color="red">Not Approved</Tag>
      )
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      render: (amount) => (
      <p> ${amount}</p>
      )
    }
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

                  <h3>List of Customers</h3>

                  <Table
                    bordered
                    scroll={{ x: true, y: 600 }}
                    pagination={{
                      position: ['bottomRight'],
                      defaultPageSize: 20,
                    }}
                    rowSelection={{ ...rowSelection, selectedRowKeys: selectedRows.map((row) => row.key) }}
                    columns={columns}
                    dataSource={data}
                  />
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Drawer
          title={`${selectedUser.displayName}'s Orders`}
          width="100%"
          height="90%"
          placement="bottom"
          onClose={onClose}
          visible={visible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
            </div>
          }>

            <Table
                bordered
                scroll={{ x: true, y: 600 }}
                pagination={{
                  position: ['bottomRight'],
                  defaultPageSize: 20,
                }}
                rowSelection={{ ...rowSelection, selectedRowKeys: selectedRows.map((row) => row.key) }}
                columns={orderColumns}
                dataSource={customerOrders}
              />
          </Drawer>

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

Customers.getInitialProps = async () => ({
  namespacesRequired: ['common', 'users'],
});

Customers.propTypes = {
  t: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  quote: state.quote,
  theme: state.ui.theme,
  isLoggedIn: state.user.isLoggedIn,
  userUID: state.user.uid,
});

export default connect(mapStateToProps, null)(withTranslation('users')(Customers));
