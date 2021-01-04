import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, Row, Col, Select, Button, Spin, DatePicker, Alert, Tooltip, message, Popconfirm } from 'antd';
import moment from 'moment';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import BaseLayout from '../../components/layout';
import { Router, withTranslation } from '../../utilities/i18n';
import TextArea from 'antd/lib/input/TextArea';
import { useIsLoadingNewPage } from '../../hooks/NewPageLoadingIndicator';
import { AimOutlined, FlagOutlined, SelectOutlined } from '@ant-design/icons';
import FileUpload from '../../components/jobs/FileUpload';
const { Option } = Select;

export function StagedJobsPage({
  t,
  quote,
  theme,
  isLoggedIn,
  userUID,
  isAdmin,
  isManager,
  isShippingAgent,
  isDriver,
  userEmail,
  displayName,
}) {
  const loginPageParams = { pathname: '/login', query: { redirectURL: Router.pathname } };
  const availableJobsPageParams = { pathname: '/jobs/available' };
  const myJobsPageParams = { pathname: '/jobs/pending' };
 

  const [isLoadingNewPage, setIsLoadingNewPage] = useState(Router.query[0] ? null : backPageParams);
  const [stagedJobs, setStagedJobs] = useState([]);
  const [isLoadingJobToEdit, setIsLoadingJobToEdit] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const [hasSelectedDateError, setHasSelectedDateError] = useState(false);
  const [selectedOrderStatus, setSelectedOrderStatus] = useState('select');
  const [hasSelectedOrderStatusError, setHasSelectedOrderStatusError] = useState(false);

  const [file, setFile] = useState();

  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
  const [isUpdatingOrderStatus, setIsUpdatingOrderStatus] = useState(false);

  useIsLoadingNewPage(isLoadingNewPage);
  
  // useEffect(() => {
  //   console.log('file', file);
  // }, [file]);

  useEffect(() => {
    if (isLoadingNewPage) setIsLoadingNewPage(null);
  }, [isLoadingNewPage]);

  useEffect(() => {
    if (!isAdmin && !isManager && !isShippingAgent && !isDriver) setIsLoadingNewPage({ pathname: '/' });
  }, [isAdmin, isManager, isShippingAgent, isDriver]);

  useEffect(() => {
    if (!isLoggedIn) setIsLoadingNewPage(loginPageParams);
  }, [isLoggedIn]);

  useEffect(() => {
    fetchStagedJobs();
  }, []);

  const editSelectedVehicle = async () => {
    setSelectedRows(1);
    setIsLoadingNewPage({
      pathname: '/jobs/status',
      query: { source: 'dispatch', ...selectedRows.map((order) => order.order_id) },
    });
  };

  const fetchStagedJobs = async () => {
    setIsLoadingJobToEdit(true);
    const status = await firebase
      .firestore()
      .doc(`/orders/${Router.query[0]}`)
      .get()
      .then((snapshot) => {
        const newData = [];
        let order = snapshot.data();
        order.key = order.order_id;
        newData.push(order);
        setStagedJobs(newData);
      })
      .catch((error) => {
        console.log('error', error);
      });
    setIsLoadingJobToEdit(false);
  };

  const uploadFile = async (order) => {
    if (!file || !file.dataURL) {
      return null;
    }

    let storageRef = firebase.storage().ref();

    let orderStatusDocumentRef =
      selectedOrderStatus === 'pickedup'
        ? storageRef.child(`pickup_sheets/${order.order_id + file.typeExtension}`)
        : selectedOrderStatus === 'delivered'
        ? storageRef.child(`delivery_sheets/${order.order_id + file.typeExtension}`)
        : storageRef.child(`status_docs/${order.order_id + file.typeExtension}`);

        // console.log('file.dataURL', file.dataURL);
      const uploadTask = orderStatusDocumentRef.putString(file.dataURL, 'data_url');
      await uploadTask;
      return await uploadTask.snapshot.ref.getDownloadURL();
  };

  const updateOrderStatus = async (order) => {
    setIsDataSubmitted(true);

    if (selectedOrderStatus === 'select') {
      setHasSelectedOrderStatusError(true);
    }
    if (!selectedDate) {
      setHasSelectedDateError(true);
    }
    if (selectedOrderStatus !== 'select' && selectedDate) {
      setIsUpdatingOrderStatus(true);
      const filePath = await uploadFile(order);
      firebase
        .firestore()
        .doc(`/orders/${Router.query[0]}`)
        .set(
          {
            ...(selectedOrderStatus === 'pickedup'
              ? {
                  pickedup: true,
                  delivered: false,
                  pickedup_uid: userUID,
                  pickedup_name: displayName,
                  pickedup_date: selectedDate,
                  pickedup_timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                  pickupSheet: filePath,
                }
              : {}),
            ...(selectedOrderStatus === 'delivered'
              ? {
                  delivered: true,
                  delivered_uid: userUID,
                  delivered_name: displayName,
                  delivered_date: selectedDate,
                  delivered_timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                  deliverySheet: filePath,
                }
              : {}),
          },
          { merge: true }
        )
        .then((snapshot) => {
          message.success('Successfully update the date for the selected order status.');
          setIsUpdatingOrderStatus(false);
          setIsLoadingNewPage(backPageParams);
        })
        .catch((error) => {
          message.error('Could not update the order status, kindly try again.');
          setIsUpdatingOrderStatus(false);
        });
      
    }
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
                  {/* <Button
                    loading={!!isLoadingNewPage}
                    onClick={() => {
                      unstageAllJobs();
                    }}
                    type="ghost"
                  >
                    {t('unstage_all_button')}
                  </Button> */}
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
                    &nbsp;&nbsp;
                    <Button
                      loading={!!isLoadingNewPage}
                      onClick={() => setIsLoadingNewPage(myJobsPageParams)}
                      type="ghost"
                    >
                      {t('my_jobs_button')}
                    </Button>
                  </div>
                )}
              </div>
              <h3>View Order Status</h3>

              {!stagedJobs.length && !isLoadingJobToEdit && <p>{t('no_staged_jobs_label')}</p>}

              {isLoadingJobToEdit && (
                <div className="vertical-center-div">
                  <Spin />
                </div>
              )}

              {stagedJobs.map((order, index) => (
                <div key={order.order_id}>
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
                        <div key={index}>
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
                        </div>
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
                        style={{ backgroundColor: 'rgba(248, 105, 66, 0.1)', color: 'black', width: '100%' }}
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
                        style={{ backgroundColor: 'rgba(248, 105, 66, 0.1)', color: 'black', width: '100%' }}
                        rows={5}
                        value={order.additional_comments}
                      />
                    </Col>
                  </Row>
                  <Row gutter={[0, 0]} justify="center">
                  <Col style={{ ...columnStyle, textAlign: 'left' }} xs={24} sm={24} md={20} lg={20} xl={16}>
                       <div className="date-item-child"  style={{  margin:'0px 0px 10px 0px' }} >
                          <b>Pickup Sheet: </b>
                  <a href={'editstatus?0=' + order.order_id+'&source=dispatch'} className="ant-btn ant-btn-primary">Edit</a>
                        </div>{' '}
                        <div className="date-item-child">
                    
                         { order.pickupSheet && (
                            <div className="float-left" style={{ marginBottom: 16 }}>
                               <a href={order.pickupSheet} target="_blank">    <img src={order.pickupSheet} width="100%"/></a>
                   </div>
                         )}
                       
                      </div>
                    </Col>
                  </Row>
                  <Row gutter={[0, 0]} justify="center">
                    <Col style={{ ...columnStyle, textAlign: 'left' }} xs={24} sm={24} md={20} lg={20} xl={16}>
                    <div className="date-item-child"  style={{  margin:'0px 0px 10px 0px' }}>
                          <b>Delivery Sheet: </b>
                          <a href={'editstatus?0=' + order.order_id+'&source=pickup'} className="ant-btn ant-btn-primary">Edit</a>
                   
                        </div>{' '}
                        <div className="date-item-child">
                          
                         { order.deliverySheet && (
                            <div className="float-left" style={{ marginBottom: 16 }}>
                              <a href={order.deliverySheet} target="_blank"> <img src={order.deliverySheet} width="100%" /></a> 
                   </div>
                         )}
                        </div>
                    </Col>
                  </Row>
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
  isAdmin: state.user.isAdmin,
  isManager: state.user.isManager,
  isShippingAgent: state.user.isShippingAgent,
  isDriver: state.user.isDriver,
  userEmail: state.user.email,
  displayName: state.user.name,
});

export default connect(mapStateToProps, null)(withTranslation('jobs_staged')(StagedJobsPage));
