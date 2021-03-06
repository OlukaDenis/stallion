import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { Card, Table, Row, Col, Button, Checkbox, message } from 'antd';

import firebase from 'firebase/app';
import 'firebase/firestore';

import BaseLayout from '../../components/layout';
import { Router, withTranslation } from '../../utilities/i18n';
import { useIsLoadingNewPage } from '../../hooks/NewPageLoadingIndicator';
import CheckboxGroup from 'antd/lib/checkbox/Group';

export function Available({ t, quote, theme, isLoggedIn, userUID }) {
  const loginPageParams = { pathname: '/login', query: { redirectURL: Router.pathname } };
  const [selectedRows, setSelectedRows] = useState([]);
  const [data, setData] = useState([]);
  const [isLoadingStagedJobsPage, setIsLoadingStagedJobsPage] = useState(null);
  const [isUpdatingRoles, setIsUpdatingRoles] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState([]);

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

  useEffect(() => {
    fetchData();
  }, []);

  const updateRoles = async () => {
    setIsUpdatingRoles(true);
    selectedRows.map(async (user) => {
      console.log(user);
      await firebase
        .firestore()
        .doc(`/users/${user.uid}`)
        .set(
          {
            role: selectedRoles,
            updatedRolesAt: firebase.firestore.FieldValue.serverTimestamp(),
          },
          { merge: true }
        )
        .then((success) => {
          message.success(t('update_roles_success', { name: user.displayName }));
          user.role = selectedRoles;
          setData([user, ...data.filter((mUser) => mUser.uid != user.uid)]);
        })
        .catch((error) => message.error(t('update_roles_failure', { name: user.displayName })));
    });
    setSelectedRoles([]);
    setSelectedRows([]);
    setIsUpdatingRoles(false);
  };

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
      title: t('table.column.phone'),
      dataIndex: 'phoneNumber',
    },
    {
      title: t('table.column.roles'),
      dataIndex: 'role',
      render: (role) => role && role.join(','),
    },
    {
      title: t('table.column.signup_method'),
      dataIndex: 'providerId',
    },
    {
      title: t('table.column.signup_date'),
      dataIndex: 'createdAt',
      render: (date) => moment(new Date(date.seconds * 1000)).format('MM/DD/YYYY'),
      // sorter: (a, b) => (a-b),
      // sortDirections: ['ascend', 'descend'],
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
                          <CheckboxGroup value={selectedRoles} onChange={(value) => setSelectedRoles(value)}>
                            <Checkbox value={'Admin'}>{t('admin')}</Checkbox>
                            <Checkbox value={'Manager'}>{t('manager')}</Checkbox>
                            <Checkbox value={'Agent'}>{t('agent')}</Checkbox>
                            <Checkbox value={'Driver'}>{t('driver')}</Checkbox>
                          </CheckboxGroup>

                          <Button loading={isUpdatingRoles} onClick={updateRoles} type="primary">
                            {t('update_roles_button')}
                          </Button>
                        </div>
                      ) : (
                        <p>{t('instructions')}</p>
                      )}
                    </div>
                  </div>

                  <h3>{t('table.header')}</h3>

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
  namespacesRequired: ['common', 'users'],
});

Available.propTypes = {
  t: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  quote: state.quote,
  theme: state.ui.theme,
  isLoggedIn: state.user.isLoggedIn,
  userUID: state.user.uid,
});

export default connect(mapStateToProps, null)(withTranslation('users')(Available));
