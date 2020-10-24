import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import moment from 'moment';
import { Card, Table, Row, Col, Input, Space, Button } from 'antd';
import Highlighter from 'react-highlight-words';
import { isStagedOrder } from '../../utilities/common';

import firebase from 'firebase/app';
import 'firebase/firestore';

import BaseLayout from '../../components/layout';
import { Router, withTranslation } from '../../utilities/i18n';
import { SearchOutlined } from '@ant-design/icons';
import { useIsLoadingNewPage } from '../../hooks/NewPageLoadingIndicator';

export function Available({ t, quote, theme, isLoggedIn, userUID, isAdmin, isManager, isShippingAgent, isDriver }) {
         const stagingPageParams = { pathname: '/jobs/staged' };
         const loginPageParams = { pathname: '/login', query: { redirectURL: Router.pathname } };
         const [selectedRows, setSelectedRows] = useState([]);
         const [isLoadingAvailableJobsData, setIsLoadingAvailableJobsData] = useState(false);
         const [isStagingSelectedJobs, setIsStagingSelectedJobs] = useState(false);
         const [data, setData] = useState([]);
         const [searchText, setSearchText] = useState('');
         const [searchedColumn, setSearchedColumn] = useState('');
         const [isLoadingNewPage, setIsLoadingNewPage] = useState(null);

         const searchInputRef = useRef();

         useIsLoadingNewPage(isLoadingNewPage);

         useEffect(() => {
           if (isLoadingNewPage) setIsLoadingNewPage(null);
         }, [isLoadingNewPage]);

         useEffect(() => {
           if (!isAdmin && !isManager && !isShippingAgent && !isDriver) setIsLoadingNewPage({ pathname: '/' });
         }, [isAdmin, isManager, isShippingAgent, isDriver]);

         useEffect(() => {
           if (!isLoggedIn) setIsLoadingNewPage(loginPageParams);
         }, [isLoggedIn]);

         const stageSelectedJobs = async () => {
           await markSelectedJobsAsStaged();
           setIsLoadingNewPage('/jobs/staged');
         };

         const markSelectedJobsAsStaged = async () => {
           setIsStagingSelectedJobs(true);
           selectedRows.map(async (order) => {
             const status = await firebase
               .firestore()
               .doc(`/orders/${order.firebaseRefID}`)
               .set(
                 { staging_timestamp: firebase.firestore.FieldValue.serverTimestamp(), staging_uid: userUID },
                 { merge: true }
               );
           });
           setIsStagingSelectedJobs(false);
         };

         const getColumnSearchProps = (dataIndex) => {};

         const getColumnSearchProp = (dataIndex) => ({
           filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
             <div style={{ padding: 8 }}>
               <Input
                 ref={(node) => {
                   searchInputRef.current = node;
                 }}
                 placeholder={`Search ${dataIndex}`}
                 value={selectedKeys[0]}
                 onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                 onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                 style={{ width: 188, marginBottom: 8, display: 'block' }}
               />
               <Space>
                 <Button
                   type="primary"
                   onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                   icon={<SearchOutlined />}
                   size="small"
                   style={{ width: 90 }}
                 >
                   Search
                 </Button>
                 <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                   Reset
                 </Button>
               </Space>
             </div>
           ),
           filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
           onFilter: (value, record) =>
             record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '',
           onFilterDropdownVisibleChange: (visible) => {
             if (visible) {
               setTimeout(() => searchInputRef.current.select(), 100);
             }
           },
           render: (text) =>
             searchedColumn === dataIndex ? (
               <Highlighter
                 highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                 searchWords={[searchText]}
                 autoEscape
                 textToHighlight={text ? text.toString() : ''}
               />
             ) : (
               text
             ),
         });

         const handleSearch = (selectedKeys, confirm, dataIndex) => {
           confirm();
           setSearchText(selectedKeys[0]);
           setSearchedColumn(dataIndex);
         };

         const handleReset = (clearFilters) => {
           clearFilters();
           setSearchText('');
         };

         const fetchData = async () => {
           setIsLoadingAvailableJobsData(true);
           await firebase
             .firestore()
             .collection('/orders')
             .where('terms_accepted', '==', true)
             .get()
             .then((response) => {
               const newData = [];
               let order;
               response.forEach((snapshot) => {
                 order = snapshot.data();
                 order.key = order.order_id;

                 if (!isStagedOrder(order) && !order.driver_submitted) {
                   newData.push(order);
                 }
               });
               // console.log(order);
               setData(newData);
             })
             .catch((error) => {});
           setIsLoadingAvailableJobsData(false);
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
                 ...getColumnSearchProps('pickupLocation'),
               },
               {
                 title: t('table.pickup_info_col_group.columns.city'),
                 dataIndex: 'originName',
                 render: (originName) => originName.split(',')[0],
                 ...getColumnSearchProps('originName'),
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
                 sorter: (a, b) =>
                   a.origin.split(',')[1].split(' ')[2] - b.origin.split(',')[1].split(' ')[2] ? -1 : 1,
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
                 ...getColumnSearchProps('deliveryLocation'),
               },
               {
                 title: t('table.delivery_info_col_group.columns.city'),
                 dataIndex: 'destinationName',
                 render: (destinationName) => destinationName.split(',')[0],
                 ...getColumnSearchProps('destinationName'),
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
                 sorter: (a, b) =>
                   a.destination.split(',')[1].split(' ')[2] - b.destination.split(',')[1].split(' ')[2],
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
                                 <Button loading={isStagingSelectedJobs} onClick={stageSelectedJobs} type="primary">
                                   {t('select_jobs_button')}
                                 </Button>
                               </div>
                             ) : (
                               <p>{t('instructions')}</p>
                             )}
                           </div>
                           {isLoggedIn && (
                             <div className="float-right" style={{ marginBottom: 16 }}>
                               <Button
                                 loading={isStagingSelectedJobs}
                                 onClick={() => setIsLoadingNewPage(stagingPageParams)}
                                 type="ghost"
                               >
                                 {t('staged_jobs_button')}
                               </Button>
                             </div>
                           )}
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
  namespacesRequired: ['common', 'jobs_available'],
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
  isShippingAgent: state.user.isShippingAgent,
  isDriver: state.user.isDriver,
});

export default connect(mapStateToProps, null)(withTranslation('jobs_available')(Available));
