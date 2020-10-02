import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, Divider, Button, Row, Col, Select, Input, Checkbox, Alert, message, Tooltip, Result } from 'antd';
import {
  SafetyOutlined,
  LockFilled,
  DollarOutlined,
  CreditCardOutlined,
  SelectOutlined,
  UserOutlined,
  BankOutlined,
  AimOutlined,
  PhoneOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';
import BaseLayout from '../components/layout';
import { Link, Router, withTranslation } from '../utilities/i18n';
import SectionHeader from '../components/SectionHeader';
import PayPalPayment from '../components/PayPalPayment';
import { PAYPAL_CLIENT_ID } from '../configs';
import { calculateTotalShippingRate } from '../utilities/calculate_shipping_rate';
import Head from 'next/head';
import moment from 'moment';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { clearQuoteData, setBillingAddress, setIsPaid } from '../state/quote/action';
import { bindActionCreators } from 'redux';
import {
  useIsValidAddress,
  useIsValidBusinessName,
  useIsValidName,
  useIsValidPhoneNumber,
} from '../hooks/QuoteDataValidation';
import { AddressTypeSelector } from './book';
import { setIsLoadingNewPage } from '../state/ui/action';

const { Option } = Select;
const { TextArea } = Input;
const topMargin = { marginTop: 20 };
const inputStyle = {
  height: 45,
};

const AdditionalComments = ({ theme, title, additionalComments, setAdditionalComments }) => {
  return (
    <section style={topMargin}>
      <SectionHeader theme={theme} title={title} />

      <div
        className={`${
          theme === 'light' ? 'quotation_input-container' : 'quotation_input-container quotation_input-container_dark'
        }`}
      >
        <article className="summary__article_card">
          <Row gutter={[5, 8]} justify="center">
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <TextArea
                onChange={(e) => setAdditionalComments(e.target.value)}
                value={additionalComments}
                placeholder="Optional comments..."
                autoSize={{ minRows: 4, maxRows: 10 }}
              />
            </Col>
          </Row>
        </article>
      </div>
    </section>
  );
};
const PaymentDetails = ({
  theme,
  title,
  quote,
  setIsPaid,
  showErrors,
  setBillingAddress,
  setHasBillingAddressErrors,
  setPaymentMethod,
}) => {
  const [selectedPaymentOption, setSelectedPaymentOption] = useState(quote.isPaid ? 'card' : 'label');
  const [selectedBillingAddress, setSelectedBillingAddress] = useState('label');

  useEffect(() => {
    setPaymentMethod(selectedPaymentOption);
  }, [selectedPaymentOption]);

  useEffect(() => {
    const isPayPalPaymentValid = selectedPaymentOption === 'card' && quote.isPaid;
    const isCashPaymentValid = selectedPaymentOption === 'cash' && selectedBillingAddress !== 'label';
    setHasBillingAddressErrors(!isPayPalPaymentValid && !isCashPaymentValid);
  }, [selectedBillingAddress, selectedPaymentOption]);

  useEffect(() => {
    if (selectedBillingAddress === 'pickup') {
      setBillingAddress(quote.pickupLocation);
    } else if (selectedBillingAddress === 'delivery') {
      setBillingAddress(quote.deliveryLocation);
    }
  }, [selectedBillingAddress]);

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
    message.error(error, 30);
  };

  return (
    <section style={topMargin}>
      <SectionHeader theme={theme} title={title} />
      <div
        className={`${
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
              {showErrors && selectedPaymentOption === 'label' ? (
                <Alert message="Kindly select your preferred payment method." type="error" />
              ) : (
                <></>
              )}
            </Col>
            <Col xs={22} sm={22} md={14} lg={14} xl={14}>
              {selectedPaymentOption === 'card' && !quote.isPaid ? (
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
                  <br />
                  {showErrors && selectedPaymentOption === 'card' && !quote.isPaid ? (
                    <Alert message="Kindly authorize the payment from PayPal or credit/debit card." type="error" />
                  ) : (
                    <></>
                  )}
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
            {selectedPaymentOption === 'cash' ? (
              <Col xs={24} sm={24} md={14} lg={12} xl={12}>
                <Tooltip
                  trigger={['click', 'hover']}
                  placement="topLeft"
                  title="The address where the cash/check payment shall be picked"
                >
                  <Select
                    value={selectedBillingAddress}
                    onChange={(value) => setSelectedBillingAddress(value)}
                    style={{ width: '100%' }}
                  >
                    <Option value="label" disabled>
                      Select Billing Address
                    </Option>
                    <Option value="pickup">Same as Pickup Address</Option>
                    <Option value="delivery">Same as Delivery Address</Option>
                    <Option value="other">Other</Option>
                  </Select>
                </Tooltip>
                {showErrors && selectedBillingAddress === 'label' ? (
                  <Alert message="Kindly specify the billing address." type="error" />
                ) : (
                  <></>
                )}
              </Col>
            ) : (
              <></>
            )}
          </Row>
        </article>
      </div>

      {selectedBillingAddress === 'other' ? (
        <BillingAddress
          showErrors={showErrors}
          setHasErrors={setHasBillingAddressErrors}
          quote={quote}
          theme={theme}
          setBillingAddress={setBillingAddress}
        />
      ) : (
        <></>
      )}
    </section>
  );
};

const BillingAddress = ({ theme, quote, setBillingAddress, showErrors, setHasErrors }) => {
  const isLightMode = theme === 'light';

  const [isBusiness, setIsBusiness] = useState(quote.billingAddress.isBusiness);
  const [contactName, setContactName] = useState(quote.billingAddress.contactName);
  const [businessName, setBusinessName] = useState(quote.billingAddress.businessName);
  const [address, setAddress] = useState(quote.billingAddress.address);
  const [phone, setPhone] = useState(quote.billingAddress.phone);
  const [altPhone, setAltPhone] = useState(quote.billingAddress.altPhone);

  const hasNameError = !useIsValidName(quote.billingAddress.contactName);
  const hasBusinessNameError = !useIsValidBusinessName(quote.billingAddress.businessName) && isBusiness;
  const hasAddressError = !useIsValidAddress(quote.billingAddress.address);
  const hasPhoneError = !useIsValidPhoneNumber(quote.billingAddress.phone);
  const hasAltPhoneError = !useIsValidPhoneNumber(quote.billingAddress.altPhone) && quote.billingAddress.altPhone;

  useEffect(() => {
    setHasErrors(hasNameError || hasBusinessNameError || hasAddressError || hasPhoneError || hasAltPhoneError);
  }, [hasNameError, hasBusinessNameError, hasAddressError, hasPhoneError, hasAltPhoneError]);

  const setContactsSameAsPrimary = (isPrimaryContactPickupContact) => {
    if (isPrimaryContactPickupContact) {
      setContactName(quote.primaryBookingContact.firstName + ' ' + quote.primaryBookingContact.lastName);
      setPhone(quote.primaryBookingContact.phone);
    } else {
      setContactName('');
      setPhone('');
    }
  };

  useEffect(() => {
    setBillingAddress({
      isBusiness,
      contactName,
      businessName,
      address,
      phone,
      altPhone,
    });
  }, [isBusiness, contactName, businessName, address, phone, altPhone]);

  return (
    <>
      <SectionHeader theme={theme} title="Billing Address" />
      <div
        className={
          isLightMode ? 'quotation_input-container' : 'quotation_input-container quotation_input-container_dark'
        }
      >
        <div className="booking-item">
          <Checkbox onChange={(e) => setContactsSameAsPrimary(e.target.checked)}>
            Billing contact same as primary contact
          </Checkbox>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12} lg={12}>
              <Tooltip trigger={['click', 'hover']} placement="topLeft" title="Location of the billing contact person">
                <AddressTypeSelector
                  isBusiness={isBusiness}
                  onChange={(value) => setIsBusiness(value === 'business')}
                />
              </Tooltip>
            </Col>

            <Col xs={24} sm={24} md={12} lg={12}>
              <Tooltip
                trigger={['click', 'hover']}
                placement="topLeft"
                title="Name of the contact person at the billing location"
              >
                <Input
                  onChange={(e) => setContactName(e.target.value)}
                  value={contactName}
                  placeholder="Contact Person (Full Name)"
                  prefix={<UserOutlined />}
                  style={inputStyle}
                  required
                />
              </Tooltip>
              {showErrors && hasNameError ? (
                <Alert message="Kindly enter the name of the contact person" type="error" />
              ) : (
                <></>
              )}
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            {isBusiness ? (
              <Col xs={24} sm={24} md={12} lg={12}>
                <Tooltip
                  trigger={['click', 'hover']}
                  placement="topLeft"
                  title="Name of the business where the payment will be picked up from"
                >
                  <Input
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="Business Name"
                    prefix={<BankOutlined />}
                    style={inputStyle}
                    required
                  />
                </Tooltip>
                {showErrors && isBusiness && hasBusinessNameError ? (
                  <Alert message="Kindly enter the name of the business" type="error" />
                ) : (
                  <></>
                )}
              </Col>
            ) : (
              <></>
            )}
            <Col xs={24} sm={24} md={12} lg={12}>
              <Tooltip
                trigger={['click', 'hover']}
                placement="topLeft"
                title="Address where the payment will be picked up from"
              >
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Billing Address"
                  prefix={<AimOutlined />}
                  style={inputStyle}
                  required
                />
              </Tooltip>
              {showErrors && hasAddressError ? (
                <Alert message="Kindly enter the address where to collect the payment" type="error" />
              ) : (
                <></>
              )}
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12} lg={12}>
              <Tooltip
                trigger={['click', 'hover']}
                placement="topLeft"
                title="Primary phone number of the billing contact person"
              >
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Primary Phone"
                  maxLength={25}
                  style={inputStyle}
                  prefix={<PhoneOutlined />}
                  type="tel"
                  required
                />
              </Tooltip>
              {showErrors && hasPhoneError ? (
                <Alert message="Kindly enter the phone number of the contact person" type="error" />
              ) : (
                <></>
              )}
            </Col>

            <Col xs={24} sm={24} md={12} lg={12}>
              <Tooltip
                trigger={['click', 'hover']}
                placement="topLeft"
                title="Secondary phone number of the billing contact person"
              >
                <Input
                  value={altPhone}
                  onChange={(e) => setAltPhone(e.target.value)}
                  placeholder="Secondary Phone (Optional)"
                  maxLength={25}
                  style={inputStyle}
                  prefix={<PhoneOutlined />}
                  type="tel"
                />
              </Tooltip>
              {showErrors && hasAltPhoneError ? (
                <Alert message="Kindly correct the alternative phone number" type="error" />
              ) : (
                <></>
              )}
            </Col>
          </Row>
        </div>
      </div>

      <style jsx global>
        {`
          .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
            height: 45px;
            align-items: center;
          }
        `}
      </style>
    </>
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
              <p>Shipper's Details</p>
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
              <p>{quote.pickupLocation.address}</p>
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
              <p>{quote.deliveryLocation.address}</p>
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

export function Payment({ t, quote, theme, setIsPaid, setBillingAddress, setIsLoadingNewPage, clearQuoteData }) {
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);
  const [hasAcceptedTermsError, setHasAcceptedTermsError] = useState(false);
  const [hasBillingAddressErrors, setHasBillingAddressErrors] = useState(false);
  const [additionalComments, setAdditionalComments] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasFormErrors, setHasFormErrors] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isUploadingData, setIsUploadingData] = useState(false);
  const [isOperationSuccess, setIsOperationSuccess] = useState(false);
  const [bookingID, setBookingID] = useState(quote.id);

  useEffect(() => {
    setHasFormErrors(hasAcceptedTermsError || hasBillingAddressErrors || (paymentMethod === 'card' && !quote.isPaid));
  }, [hasAcceptedTermsError, hasBillingAddressErrors, paymentMethod, quote]);

  const toggleHasAcceptedTerms = () => {
    setHasAcceptedTerms(!hasAcceptedTerms);
    setHasAcceptedTermsError(false);
  };

  const submitBooking = () => {
    setIsSubmitted(true);

    if (!hasAcceptedTerms) {
      setHasAcceptedTermsError(true);
    }

    if (
      !hasBillingAddressErrors &&
      hasAcceptedTerms &&
      ((paymentMethod === 'card' && quote.isPaid) || paymentMethod === 'cash')
    ) {
      const data = {
        payment_method: paymentMethod === 'card' ? 'PayPal' : 'Cash/Check',
        terms_accepted: hasAcceptedTerms,
        additional_comments: additionalComments,
        billingAddress: paymentMethod === 'cash' ? quote.billingAddress : {},
      };
      setIsUploadingData(true);
      firebase
        .firestore()
        .doc('orders/' + quote.firebaseRefID)
        .set(data, { merge: true })
        .then((response) => {
          setIsUploadingData(false);
          setIsOperationSuccess(true);
          clearQuoteData();
        })
        .catch((error) => {
          setIsUploadingData(false);
          onPaymentFailure('Failed to connect to server while updating payment status.');
        });
    }
  };

  return (
    <BaseLayout>
      <Head>
        {/* Load the required PayPal checkout.js script */}
        <script src={'https://www.paypal.com/sdk/js?intent=authorize&client-id=' + PAYPAL_CLIENT_ID}></script>
      </Head>
      <Row gutter={[16, 16]} style={{ paddingTop: 50 }} justify="center">
        <Col xs={24} sm={24} md={20} lg={20} xl={20}>
          {!isOperationSuccess ? (
            <Card>
              <h2>
                <LockFilled /> Protection & Payment
              </h2>
              <p>Select a coverage level and payment preference to complete your reservation.</p>
              <Divider className="small-margin-h-divider" />

              <ShipmentSummary quote={quote} theme={theme} title="Shipment Summary" />

              {/* <CoverageType quote={quote} theme={theme} title="Coverage Type" /> */}

              <PaymentDetails
                showErrors={isSubmitted}
                setIsPaid={setIsPaid}
                quote={quote}
                theme={theme}
                setBillingAddress={setBillingAddress}
                setPaymentMethod={setPaymentMethod}
                setHasBillingAddressErrors={setHasBillingAddressErrors}
                title="Payment Details"
              />

              <AdditionalComments
                additionalComments={additionalComments}
                setAdditionalComments={setAdditionalComments}
                quote={quote}
                theme={theme}
                title="Additional Comments"
              />

              <section style={topMargin}>
                <SectionHeader theme={theme} title="Terms & Conditions" />
                <div
                  className={`${
                    theme === 'light'
                      ? 'quotation_input-container'
                      : 'quotation_input-container quotation_input-container_dark'
                  }`}
                >
                  <article className="summary__article_card">
                    <Checkbox checked={hasAcceptedTerms} onChange={() => toggleHasAcceptedTerms()}>
                      I have read and agreed to Super Stallion Logistics Terms & Conditions.
                    </Checkbox>
                    {isSubmitted && hasAcceptedTermsError ? (
                      <>
                        <Alert message="Please accept the terms & conditions to proceed." type="error" />
                        <br />
                      </>
                    ) : (
                      <></>
                    )}
                  </article>
                </div>
              </section>

              <div style={{ display: 'flex', paddingTop: 30, justifyContent: 'center' }}>
                <div>
                  {isSubmitted && hasFormErrors ? (
                    <>
                      <Alert message="Please fix the highlighted errors in the form." type="error" />
                      <br />
                    </>
                  ) : (
                    <></>
                  )}
                  <Button
                    loading={isUploadingData}
                    onClick={submitBooking}
                    type="primary"
                    shape="round"
                    size="large"
                    style={{ width: 400 }}
                  >
                    Submit Booking
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <Result
              status="success"
              title="Successfully Booked your Shipment!"
              subTitle={
                <p>
                  Order/booking ID: {bookingID}. Save and use this order/booking ID to{' '}
                  <Link href="/track">
                    <a>track your shipment</a>
                  </Link>
                  .
                </p>
              }
              extra={[
                <Button
                  onClick={async () => {
                    setIsLoadingNewPage(true);
                    await Router.push('/');
                    setIsLoadingNewPage(false);
                  }}
                  type="primary"
                  key="home"
                >
                  HomePage <ArrowRightOutlined />
                </Button>,
                <Button
                  onClick={async () => {
                    setIsLoadingNewPage(true);
                    await Router.push('/quotation');
                    setIsLoadingNewPage(false);
                  }}
                  key="book"
                >
                  New Booking
                </Button>,
              ]}
            />
          )}
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
    setBillingAddress: bindActionCreators(setBillingAddress, dispatch),
    setIsLoadingNewPage: bindActionCreators(setIsLoadingNewPage, dispatch),
    clearQuoteData: bindActionCreators(clearQuoteData, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation('common')(Payment));
