import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { connect, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { Card, Table, Row, Col, Input, Space, Button, message, Modal } from 'antd';
import Highlighter from 'react-highlight-words';
import { isStagedOrder, US_STATES_FILTER } from '../../utilities/common';

import firebase from 'firebase/app';
import 'firebase/firestore';

import BaseLayout from '../../components/layout';
import { Router, withTranslation } from '../../utilities/i18n';
import { CheckCircleOutlined, GlobalOutlined, SearchOutlined, WarningOutlined } from '@ant-design/icons';
import {
  setOrigin,
  setDestination,
  setDistance,
  setDuration,
} from '../../state/quote/action';
import { setSelectedOrder } from '../../state/ui/action';
import { useIsLoadingNewPage } from '../../hooks/NewPageLoadingIndicator';
import Head from 'next/head';
import EditOrderPrice from '../../components/jobs/EditOrderPrice';
import MapView from '../../components/MapView';

export function Available({
         t,
         quote,
         theme,
         isLoggedIn,
         userUID, 
         isAdmin,
         isManager,
         isShippingAgent,
         isDriver,
         displayName,
       }) {
         const stagingPageParams = { pathname: '/jobs/staged' };
         const viewMapRoute = { pathname: '/jobs/view-map' };
         const myJobsPageParams = { pathname: '/jobs/pending' };
         const loginPageParams = { pathname: '/login', query: { redirectURL: Router.pathname } };
         const [selectedRows, setSelectedRows] = useState([]);
         const [isLoadingAvailableJobsData, setIsLoadingAvailableJobsData] = useState(false);
         const [isStagingSelectedJobs, setIsStagingSelectedJobs] = useState(false);
         const [data, setData] = useState([]);
         const [searchText, setSearchText] = useState('');
         const [searchedColumn, setSearchedColumn] = useState('');
         const [isLoadingNewPage, setIsLoadingNewPage] = useState(null);
         const [isRouteModalShown, setOpenIsRouteModalShown] = useState(false);
         const [selectedOrder, setSelectedOrder] = useState({});
         const dispatch = useDispatch();

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
           setIsLoadingNewPage(stagingPageParams);
         };

         const markSelectedJobsAsStaged = async () => {
           setIsStagingSelectedJobs(true);
           selectedRows.map(async (order) => {
             if (!order.amount_has_admin_approval) {
               message.error(t('error_driver_amount_not_approved'));
               return;
             }
             const status = await firebase.firestore().doc(`/orders/${order.order_id}`).set(
               {
                 staging_timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                 staging_uid: userUID,
                 staging_name: displayName,
                 approved: false,
               },
               { merge: true }
             );
           });
           setIsStagingSelectedJobs(false);
         };

         const searchLabels = {
           originName: 'Search Pickup City',
           destinationName: 'Search Delivery City',
           pickupLocation: 'Search Pickup Address',
           deliveryLocation: 'Search Delivery Address',
         };

         const renderFormatted = {
           originName: (originName) => originName.split(',')[0],
           destinationName: (destinationName) => destinationName.split(',')[0],
           pickupLocation: (location) => location.address,
           deliveryLocation: (location) => location.address,
         };

         const filterFuncs = {
           originName: (value, record, dataIndex) =>
             record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '',
           destinationName: (value, record, dataIndex) =>
             record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '',
           pickupLocation: (value, record, dataIndex) =>
             record[dataIndex].address ? record[dataIndex].address.toString().toLowerCase().includes(value.toLowerCase()) : '',
           deliveryLocation: (value, record, dataIndex) =>
             record[dataIndex].address ? record[dataIndex].address.toString().toLowerCase().includes(value.toLowerCase()) : '',
         };

         const getColumnSearchProps = (dataIndex) => ({
           filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
             <div style={{ padding: 8 }}>
               <Input
                 ref={(node) => {
                   searchInputRef.current = node;
                 }}
                 placeholder={`${searchLabels[dataIndex]}`}
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
           onFilter: (value, record) => filterFuncs[dataIndex](value, record, dataIndex),
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
                 textToHighlight={renderFormatted[dataIndex](text) ? renderFormatted[dataIndex](text).toString() : ''}
               />
             ) : (
               renderFormatted[dataIndex](text)
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
           const unsubscribe = firebase
             .firestore()
             .collection('/orders')
             .where('terms_accepted', '==', true)
             .limit(500)
             .onSnapshot(
               (response) => {
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
                 setIsLoadingAvailableJobsData(false);
               },
               (error) => {
                 message(t('error_load_available'));
                 setIsLoadingAvailableJobsData(false);
               }
             );

           return unsubscribe;
         };

         const showModal = (record) => {
           
           setSelectedOrder(record);
            console.log('record', record);
           dispatch(setOrigin(record.origin));
           dispatch(setDestination(record.destination));

            setOpenIsRouteModalShown(true);
         };

         const closeModal = () => {
            setOpenIsRouteModalShown(false);
         };

         useEffect(() => {
           const unsubscribe = fetchData();
           return () => ('function' === typeof unsubscribe ? unsubscribe() : null);
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
                 render: (date) => (date ? moment(date).format('MM/DD/YYYY') : date),
                 sorter: (a, b) => (moment(a.pickupDate).isBefore(b.pickupDate) ? -1 : 1),
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
                 filters: US_STATES_FILTER,
                 width: 60,
                 onFilter: (filter, order) => order.origin.split(',')[1].split(' ')[1] === filter,
               },
               {
                 title: t('table.pickup_info_col_group.columns.zip'),
                 dataIndex: 'origin',
                 width: 50,
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
                 width: 60,
                 filters: US_STATES_FILTER,
                 onFilter: (filter, order) => order.destination.split(',')[1].split(' ')[1] === filter,
               },
               {
                 title: t('table.delivery_info_col_group.columns.zip'),
                 dataIndex: 'destination',
                 width: 50,
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
                 render: (distance, order) => (
                   <>
                     {distance}miles &nbsp;{' '}
                     <GlobalOutlined style={{ color: '#f86942' }} onClick={() => showModal(order)} />
                   </>
                 ),
                 sorter: (a, b) => a.distance - b.distance,
                 sortDirections: ['ascend', 'descend'],
               },
               {
                 title: t('table.columns.payout'),
                 dataIndex: 'amount',
                 render: (amount, order) => (
                   <EditOrderPrice text={amount} order={order} isAdmin={isAdmin} isManager={isManager} />
                 ),
                 sorter: (a, b) => a.amount - b.amount,
                 sortDirections: ['ascend', 'descend'],
               },
               //  {
               //    title: 'Action',
               //    dataIndex: 'action',
               //    render: (text, record) => (
               //     <Button size="small" onClick={() => showModal(record)}>
               //       View Map
               //     </Button>
               //    )
               //  }
             ],
           },
         ];

         if (isDriver || isShippingAgent) {
           columns[1]['children'].shift();
           columns[2]['children'].shift();
         }

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
               <link href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css" rel="preload" as="style" />
               {useSmallScreenTable && (
                 <meta name="viewport" content="width=1000, initial-scale=0, user-scalable=yes" />
               )}
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
                               &nbsp;&nbsp;
                               <Button
                                 loading={isStagingSelectedJobs}
                                 onClick={() => setIsLoadingNewPage(myJobsPageParams)}
                                 type="ghost"
                               >
                                 {t('my_jobs_button')}
                               </Button>
                             </div>
                           )}
                         </div>

                         <h3>{t('table.header')}</h3>

                         <Table
                           loading={isLoadingAvailableJobsData}
                           bordered
                           size={useSmallScreenTable ? 'small' : 'middle'}
                           scroll={useSmallScreenTable ? {} : { x: true, y: 600 }}
                           pagination={{
                             position: ['bottomRight'],
                             defaultPageSize: 500,
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

             <Modal
               title={`Route for Order ID # ${selectedOrder.id}`}
               visible={isRouteModalShown}
               width={1000}
               onOk={closeModal}
               onCancel={closeModal}
             >
               <MapView />
             </Modal>

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
  displayName: state.user.name,
});

const mapDispatchToProps = (dispatch) => {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation('jobs_available')(Available));
