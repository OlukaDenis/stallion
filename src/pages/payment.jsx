import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, Divider, Button, Row, Col, Select, Input, Checkbox, Alert, message } from 'antd';
import { SafetyOutlined, LockFilled, DollarOutlined, CreditCardOutlined, SelectOutlined } from '@ant-design/icons';
import BaseLayout from '../components/layout';
import { withTranslation } from '../utilities/i18n';
import SectionHeader from '../components/SectionHeader';
import PayPalPayment from '../components/PayPalPayment';
import { PAYPAL_CLIENT_ID } from '../configs';
import { calculateTotalShippingRate } from '../utilities/calculate_shipping_rate';
import Head from 'next/head';
import moment from 'moment';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { setIsPaid } from '../state/quote/action';
import { bindActionCreators } from 'redux';

const { Option } = Select;
const { TextArea } = Input;
const topMargin = { marginTop: 20 };
const inputStyle = { height: 45 };

const AdditionalComments = ({ theme, title }) => {
  return (
    <section style={topMargin}>
      <SectionHeader theme={theme} title={title} />

      <div
        class={`${
          theme === 'light' ? 'quotation_input-container' : 'quotation_input-container quotation_input-container_dark'
        }`}
      >
        <article className="summary__article_card">
          <Row gutter={[5, 8]} justify="center">
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <TextArea placeholder="Optional" autoSize={{ minRows: 4, maxRows: 10 }} />
            </Col>
          </Row>
        </article>
      </div>
    </section>
  );
};
const PaymentDetails = ({ theme, title, quote, setIsPaid }) => {
  const [selectedPaymentOption, setSelectedPaymentOption] = useState('label');

  const onPaymentSuccess = (payPalOrderID, payerID, authorizationID) => {
    // console.log(payPalOrderID, payerID, orderID);
    quote.payPalOrderID = payPalOrderID;
    quote.payerID = payerID;
    quote.authorizationID = authorizationID;

    // save quote to Firestore
    firebase
      .firestore()
      .doc('orders/' + quote.firebaseRefID)
      .set(
        {
          payment_authorized: true,
          payment_authorized_amount: Number(calculateTotalShippingRate(quote)),
          payment_method: 'PayPal',
          payment_paypal_order_id: payPalOrderID,
          payment_payer_id: payerID,
          payment_authorization_id: authorizationID,
          payment_custom_order_id: quote.id,
          payment_auth_time: firebase.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      )
      .then((data) => {
        setIsPaid(true);
      })
      .catch((error) => {
        onPaymentFailure('Failed to connect to server while saving payment status.');
      });
  };

  const onPaymentFailure = (error) => {
    message.destroy();
    message.error(error, 15);
  };

  return (
    <section style={topMargin}>
      <SectionHeader theme={theme} title={title} />
<div
        class={`${
          theme === 'light' ? 'quotation_input-container' : 'quotation_input-container quotation_input-container_dark'
        }`}
      >
      <article className="summary__article_card">
        <p style={{ borderBottom: '1px dotted #ccc', paddingBottom: 6 }}>
          Your payment will not be processed until your shipment has been confirmed & scheduled for pickup.
        </p>

        <Row gutter={[20, 8]} justify="center">
          <Col xs={24} sm={24} md={14} lg={12} xl={12}>
            <Select
              labelInValue={true}
              disabled={quote.isPaid}
              onChange={(option) => setSelectedPaymentOption(option.value)}
              defaultValue={
                quote.isPaid
                  ? {
                      value: 'card',
                      label: (
                        <>
                          <CreditCardOutlined />
                          &nbsp;Card / PayPal
                        </>
                      ),
                    }
                  : {
                      value: 'label',
                      label: (
                        <>
                          <SelectOutlined />
                          &nbsp;Select Payment Method
                        </>
                      ),
                    }
              }
              style={{ width: '100%' }}
            >
              <Option value="label" disabled>
                <SelectOutlined />
                &nbsp;Select Payment Method
              </Option>
              <Option value="cash">
                <DollarOutlined />
                &nbsp;Cash / Check
              </Option>
              <Option value="card">
                <CreditCardOutlined />
                &nbsp;Card / PayPal
              </Option>
            </Select>
            {quote.isPaid ? (
              <Alert
                type="info"
                message={
                  <p>
                    You have authorized a payment of <b>${calculateTotalShippingRate(quote)}</b> which shall be
                    processed later.
                  </p>
                }
              />
            ) : (
              <></>
            )}
          </Col>
          <Col xs={22} sm={22} md={14} lg={14} xl={14}>
            {selectedPaymentOption === 'card' ? (
              <>
                <Alert
                  type="info"
                  message={
                    <p>
                      Please authorize a payment of <b>${calculateTotalShippingRate(quote)}</b> in your preferred
                      payment method below.
                    </p>
                  }
                />
                <br />
                <PayPalPayment
                  orderID={quote.id}
                  currency="USD"
                  amount={Number(calculateTotalShippingRate(quote))}
                  onSuccess={onPaymentSuccess}
                  onFailure={onPaymentFailure}
                />
              </>
            ) : selectedPaymentOption === 'cash' ? (
              <Alert
                type="info"
                message={
                  'Our driver will pick cash/check from either you or one of your contact persons at the pickup and delivery locations.'
                }
              />
            ) : (
              <></>
            )}
          </Col>
        </Row>
      </article>
      </div>
    </section>
  );
};

const BillingAddress = ({ theme, title }) => {
  return (
    <section style={topMargin}>
      <SectionHeader theme={theme} title={title} />
      <article className="summary__article_card">
        <Row gutter={[5, 8]} justify="center">
          <Col xs={24} sm={24} md={18} lg={18} xl={18}>
            <Select defaultValue="select" style={{ width: '100%' }}>
              <Option value="select" disabled>
                Select Billing Address
              </Option>
              <Option value="pickup"> Same as Pickup</Option>
              <Option value="delivery">Same as delivery</Option>
              <Option value="other">Other</Option>
            </Select>
          </Col>
        </Row>
      </article>
    </section>
  );
};

const CarListItem = ({ car }) => {
  return (
    <Row>
      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
        <div className="shipment__summary first_child">
          <div className="summary__heading">
            <p>Vehicle</p>
          </div>

          <div className="summary__info" style={{ height: 60 }}>
            <p>2019 Alfa Romeo 4C</p>
          </div>
        </div>
      </Col>

      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
        <div className="shipment__summary second_child">
          <div className="summary__heading">
            <p>Coverage Amount</p>
          </div>

          <div className="summary__info" style={{ height: 60 }}>
            <Select defaultValue="select" style={{ width: '100%' }}>
              <Option value="select" disabled>
                Select Coverage
              </Option>
              <Option value="no"> No coverage</Option>
              <Option value="one"> $ 15,000 </Option>
              <Option value="two"> $ 25,000 </Option>
              <Option value="three"> $ 50,000 </Option>
              <Option value="four"> $ 75,000 </Option>
              <Option value="five"> $ 100,000 </Option>
              <Option value="six"> $ 150,000 </Option>
              <Option value="seven"> $ 200,000 </Option>
            </Select>
          </div>
        </div>
      </Col>

      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
        <div className="shipment__summary third_child">
          <div className="summary__heading">
            <p>Coverage Cost</p>
          </div>

          <div className="summary__info" style={{ height: 60 }}>
            <p>$10</p>
          </div>
        </div>
      </Col>
    </Row>
  );
};

const CoverageType = ({ theme, title, quote }) => {
  return (
    <section style={topMargin}>
      <SectionHeader theme={theme} title={title} />

      <article className="summary__article_card">
        <div className="type__head">
          <SafetyOutlined style={{ fontSize: 50 }} />
          <div style={{ paddingLeft: 10 }}>
            <p style={{ borderBottom: '1px dotted #ccc', paddingBottom: 6 }}>
              Standard protection provides basic liability and covers carrier negligence and equipment failure.
            </p>
            <p>Additional coverage (full or partial) is available for a higher level of protection during transit.</p>
          </div>
        </div>

        {Object.keys(quote.cars).map((key) => (
          <CarListItem key={key} index={key} car={quote.cars[key]} />
        ))}
      </article>

      <style jsx global>
        {`
          .summary__article_card {
            border: 1px solid #ccc;
            padding: 1em 2em;
          }

          .type__head {
            display: flex;
            flex-direction: row;
            justify-content: center;
            padding: 1em 0;
          }
        `}
      </style>
    </section>
  );
};

const ShipmentSummary = ({ theme, title, quote }) => {
  return (
    <section style={topMargin}>
      <SectionHeader theme={theme} title={title} />
      <Row>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <div className="shipment__summary first_child">
            <div className="summary__heading">
              <p>Shippers Details</p>
            </div>

            <div className="summary__info">
              <p>{quote.name}</p>
              <p>{quote.email}</p>
              <p>{quote.phone}</p>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <div className="shipment__summary second_child">
            <div className="summary__heading">
              <p>Pickup Location</p>
            </div>

            <div className="summary__info">
              <p>{quote.pickupLocation.contactName}</p>
              <p>{quote.pickupLocation.pickupAddress}</p>
              <p>{quote.pickupLocation.phone}</p>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <div className="shipment__summary third_child">
            <div className="summary__heading">
              <p>Delivery Location</p>
            </div>

            <div className="summary__info">
              <p>{quote.deliveryLocation.contactName}</p>
              <p>{quote.deliveryLocation.deliveryAddress}</p>
              <p>{quote.deliveryLocation.phone}</p>
            </div>
          </div>
        </Col>
      </Row>

      <Row style={{ marginTop: 30 }}>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <div className="shipment__summary first_child">
            <div className="summary__heading">
              <p>Ship Date</p>
            </div>

            <div className="summary__info">
              <p>{moment(quote.pickupDate).format('MMM Do, YYYY')}</p>
            </div>
          </div>
        </Col>

        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <div className="shipment__summary second_child">
            <div className="summary__heading">
              <p>Vehicle Details</p>
            </div>

            <div className="summary__info">
              <p>{Object.keys(quote.cars).length} vehicle(s)</p>
            </div>
          </div>
        </Col>

        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <div className="shipment__summary third_child">
            <div className="summary__heading">
              <p>Shipping Rate</p>
            </div>

            <div className="summary__info">
              <p>${calculateTotalShippingRate(quote)}</p>
            </div>
          </div>
        </Col>
      </Row>
      <style jsx global>
        {`
              .shipment__summary {
                font-size: 0.9em;
              }

              .summary__heading {
                border-width: 1px;
                height: 35px;
                border-style: solid;
                border-color: #ccc;
                padding: 0 1.2em;
                display: flex;
                flex-direction;
                background: rgba(233, 211, 204, 0.671);
              }

              .summary__heading > p {
                font-weight: 900;
                align-self: center;
                padding-top: 1em
              }
              .summary__info {
                border-width: 1px;
                border-style: solid;
                border-color: #ccc;
                padding: 1em 1.2em;
                white-space: nowrap;
                overflow-x: scroll;
              }

              .summary__info > p {
                margin: 0;
              }

              @media only screen and (max-width: 576px) {
                .shipment__summary {
                  display: grid;
                  grid-template-columns: 2fr 3fr;
                }

                .second_child .summary__heading,
                .second_child .summary__info {
                  border-top: none;
                  border-bottom: none;
                }

                .summary__heading {
                  height: 100%;
                }
              }

              @media only screen and (min-width: 768px) {

                .summary_info {
                  border-top: none;
                }

                .second_child .summary__heading,
                .second_child .summary__info {
                  border-left: none;
                  border-right: none;
                }
              }
             `}
      </style>
    </section>
  );
};

export function Payment({ t, quote, theme, setIsPaid }) {
  return (
    <BaseLayout>
      <Head>
        {/* Load the required PayPal checkout.js script */}
        <script src={'https://www.paypal.com/sdk/js?intent=authorize&client-id=' + PAYPAL_CLIENT_ID}></script>
      </Head>
      <Row gutter={[16, 16]} style={{ paddingTop: 50 }} justify="center">
        <Col xs={24} sm={24} md={20} lg={20} xl={20}>
          <Card>
            <h2>
              <LockFilled /> Protection & Payment
            </h2>
            <p>Select a coverage level and payment preference to complete your reservation.</p>
            <Divider className="small-margin-h-divider" />

            <ShipmentSummary quote={quote} theme={theme} title="Shipment Summary" />

            {/* <CoverageType quote={quote} theme={theme} title="Coverage Type" /> */}

            <PaymentDetails setIsPaid={setIsPaid} quote={quote} theme={theme} title="Payment Details" />

            {/* <BillingAddress quote={quote} theme={theme} title="Billing Address" /> */}

            <AdditionalComments quote={quote} theme={theme} title="Additional Comments" />

            <section style={topMargin}>
              <SectionHeader theme={theme} title="Terms & Conditions" />
              <div
        class={`${
          theme === 'light' ? 'quotation_input-container' : 'quotation_input-container quotation_input-container_dark'
        }`}
      >
              <article className="summary__article_card">
                <Checkbox>I have read and agreed to Super Stallion Logistics Terms & Conditions.</Checkbox>
              </article>
              </div>
            </section>

            <div style={{ display: 'flex', paddingTop: 50, justifyContent: 'center' }}>
              <Button type="primary" shape="round" size="large" style={{ width: 400 }}>
                Submit Booking
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </BaseLayout>
  );
}

Payment.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

Payment.propTypes = {
  t: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  quote: state.quote,
  theme: state.ui.theme,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setIsPaid: bindActionCreators(setIsPaid, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation('common')(Payment));
