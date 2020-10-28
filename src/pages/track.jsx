import BaseLayout from '../components/layout';
import { Link, withTranslation } from '../utilities/i18n';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Alert, Card, message, Timeline } from 'antd';
import { Row, Col, Button, Tooltip, Input } from 'antd';
import { MailOutlined, NumberOutlined, EnvironmentOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useIsValidEmail } from '../hooks/QuoteDataValidation';
const inputStyle = {
  height: 45,
  marginBottom: 5,
  marginTop: 15,
};

export function TrackPage({ t, theme }) {
  const { Meta } = Card;
  const isLightMode = theme === 'light';

  const [data, setData] = useState([]);
  const [unsubscribeFunction, setUnsubscribeFunction] = useState();

  useEffect(() => {
    return 'function' === typeof unsubscribeFunction ? unsubscribeFunction() : undefined;
  }, []);

  const BookingDetails = () => {
    const [orderID, setOrderID] = useState('');//('0011001');
    const [orderIDError, setOrderIDError] = useState(false);
    const [bookingEmail, setBookingEmail] = useState('');//('chariwahome@gmail.com');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isFetchingOrder, setIsFetchingOrder] = useState(false);
    const isValidEmail = useIsValidEmail(bookingEmail);

    const trackOrder = async () => {
      setIsSubmitted(true);

      if (!orderID || orderID.length < 6) {
        setOrderIDError(true);
      }

      if (isValidEmail && orderID && orderID.length > 5) {
        fetchOrder(orderID, bookingEmail);
      }
    };

    const fetchOrder = (orderID, bookingEmail) => {
      setIsFetchingOrder(true);
      const unsubscribe = firebase
        .firestore()
        .collection(`/orders`)
        .where('id', '==', orderID)
        .where('email', '==', bookingEmail)
        // .where('terms_accepted', '==', true)
        .onSnapshot(
          (response) => {
            const newData = [];
            response.forEach((snapshot) => {
              const data = snapshot.data();
              newData.push(data);
            });
            setData(newData);
            setIsFetchingOrder(false);
          },
          (error) => {
            message.error('No order was found with those details.');
            setIsFetchingOrder(false);
            console.log('error', error);
          }
        );
      // setUnsubscribeFunction(unsubscribe);
    };

    return (
      <div className={isLightMode ? 'quotation' : 'quotation quotation_dark'}>
        <div className={isLightMode ? 'quotation_section' : 'quotation_section quotation_section_dark'}>
          <span
            className={isLightMode ? 'quotation_section--step' : 'quotation_section--step quotation_section--step_dark'}
          >
            <EnvironmentOutlined />
          </span>
          <span
            className={
              isLightMode ? 'quotation_section--title' : 'quotation_section--title quotation_section--title_dark'
            }
          >
            Track a shipment
          </span>
        </div>
        <div
          className={
            isLightMode ? 'quotation_input-container' : 'quotation_input-container quotation_input-container_dark'
          }
        >
          <p style={{ color: '#444' }}>
            Enter the details of your booking below to access the Super Stallion Logistics tracking portal.
          </p>

          <Tooltip trigger={['click', 'hover']} placement="topLeft" title="Enter your Super Stallion Order ID">
            <Input
              onChange={(e) => {
                setOrderID(e.target.value);
                setOrderIDError(false);
              }}
              value={orderID}
              placeholder="Order ID"
              prefix={<NumberOutlined />}
              style={inputStyle}
              required
            />
            {orderIDError && <Alert message="Kindly enter the order number (check email)" type="error" />}
          </Tooltip>

          <Tooltip
            trigger={['click', 'hover']}
            placement="topLeft"
            title="Enter your email that you used for creating your Super Stallion account"
          >
            <Input
              onChange={(e) => setBookingEmail(e.target.value)}
              value={bookingEmail}
              placeholder="Booking Email"
              prefix={<MailOutlined />}
              style={inputStyle}
              required
            />
          </Tooltip>
          {isSubmitted && !isValidEmail && (
            <Alert message="Kindly enter the primary email address used to book the order" type="error" />
          )}

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              loading={isFetchingOrder}
              onClick={trackOrder}
              type="primary"
              shape="round"
              size="large"
              style={{ width: 400, marginTop: '10px' }}
            >
              Track
            </Button>
          </div>

          <p style={{ textAlign: 'center', marginTop: 16 }}>
            <Link href="/contact">
              <a>Problem tracking your shipment?</a>
            </Link>
          </p>
        </div>
      </div>
    );
  };

  const getFormattedDateTimeFromTimestamp = (timestamp, altDate=null) => {
    return timestamp
      ? moment(new Date(timestamp.seconds * 1000)).format('MM/DD/YYYY HH:mm A')
      : altDate
      ? moment(altDate, 'YYYY-MM-DD').format('MM/DD/YYYY')
      : '';
  };

  const isTimestampInFuture = (timestamp) => {
    return timestamp ? moment(new Date(timestamp.seconds * 1000)).isAfter(new Date()) : true;
  };

  const getTimelineItemProps = (timestamp) => {
    return isTimestampInFuture(timestamp)
      ? {
          dot: <ClockCircleOutlined />,
          color: 'gray',
        }
      : {
          dot: <ClockCircleOutlined />,
          color: 'green',
        };
  };

  return (
    <BaseLayout>
      <Row gutter={[16, 16]} style={{ paddingTop: 50 }} justify="center">
        <Col xs={20} sm={18} md={10} lg={8} xl={8}>
          {data.length < 1 && <BookingDetails />}
          {data.map((order) => (
            <Card key={order.order_id} title={`Track: Order # ${order.id} of ${order.name}`}>
              <Timeline>
                <Timeline.Item dot={<ClockCircleOutlined />} color="green">
                  Booking: {getFormattedDateTimeFromTimestamp(order.booking_timestamp)}{' '}
                </Timeline.Item>
                <Timeline.Item {...getTimelineItemProps(order.driver_submit_timestamp)}>
                  Bid:{' '}
                  {getFormattedDateTimeFromTimestamp(
                    order.driver_submit_timestamp,
                    moment(new Date()).format('YYYY-MM-DD')
                  )}
                </Timeline.Item>
                <Timeline.Item {...getTimelineItemProps(order.approving_timestamp)}>
                  Dispatch:{' '}
                  {getFormattedDateTimeFromTimestamp(
                    order.approving_timestamp,
                    moment(new Date()).format('YYYY-MM-DD')
                  )}
                </Timeline.Item>
                <Timeline.Item {...getTimelineItemProps(order.pickup_timestamp)}>
                  Pickup:{' '}
                  {getFormattedDateTimeFromTimestamp(order.pickup_timestamp, order.driver_suggested_pickup_date) ||
                    '1 - 7 days'}
                </Timeline.Item>
                <Timeline.Item {...getTimelineItemProps(order.delivery_timestamp)}>
                  Delivery:{' '}
                  {getFormattedDateTimeFromTimestamp(order.delivery_timestamp, order.driver_suggested_delivery_date) || 
                    '2 - 21 days'}
                </Timeline.Item>
              </Timeline>
            </Card>
          ))}
        </Col>
      </Row>
    </BaseLayout>
  );
}

TrackPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

TrackPage.propTypes = {
  t: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  theme: state.ui.theme,
});

const mapDispatchToProps = (dispatch) => {
  return {
    // setIsLoggedIn: bindActionCreators(setIsLoggedIn, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation('common')(TrackPage));
