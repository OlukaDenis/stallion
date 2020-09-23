import BaseLayout from '../components/layout';
import { withTranslation } from '../utilities/i18n';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, Divider, DatePicker, Tooltip, Button, Row, Col, Select, Input, Checkbox, message, Alert } from 'antd';
import {
  CalendarOutlined,
  PhoneOutlined,
  UserOutlined,
  EnvironmentOutlined,
  MailOutlined,
  AimOutlined,
  BankOutlined,
  HomeOutlined, 
  CarOutlined
} from '@ant-design/icons';
import { QuotationSummary } from '../components/QuotationSummary';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { setDeliveryLocation, setPickupLocation, setPrimaryBookingContact, setPickupDate, setCars } from '../state/quote/action';
import { bindActionCreators } from 'redux';
import { calculateTotalShippingRate } from '../utilities/calculate_shipping_rate';
import SectionHeader from '../components/SectionHeader';
import {
  useIsValidAddress, 
  useIsValidBusinessName,
  useIsValidEmail,
  useIsValidName,
  useIsValidPhoneNumber,
  useIsValidPickupDate,
} from '../hooks/QuoteDataValidation';

const { Option } = Select;

const inputStyle = {
  height: 45,
};

const AddressTypeSelector = ({ onChange, isBusiness = false }) => {
  return (
    <Select
      labelInValue={true}
      onChange={(option) => onChange(option.value)}
      defaultValue={
        isBusiness
          ? {
              value: 'business',
              label: (
                <>
                  <BankOutlined />
                  &nbsp;Business
                </>
              ),
            }
          : {
              value: 'residence',
              label: (
                <>
                  <HomeOutlined />
                  &nbsp;Residence
                </>
              ),
            }
      }
      style={{ width: '100%' }}
    >
      <Option value="residence">
        <HomeOutlined />
        &nbsp;Residence
      </Option>
      <Option value="business">
        <BankOutlined />
        &nbsp;Business
      </Option>
    </Select>
  );
};

const PrimaryBooking = ({ theme, quote, setPrimaryBookingContact, showErrors, setHasErrors }) => {
  const isLightMode = theme === 'light';

  const [firstName, setFirstName] = useState(quote.primaryBookingContact.firstName || quote.name.split(' ')[0]);
  const [lastName, setLastName] = useState(quote.primaryBookingContact.lastName || quote.name.split(' ')[1]);
  const [email, setEmail] = useState(quote.primaryBookingContact.email || quote.email);
  const [phone, setPhone] = useState(quote.primaryBookingContact.phone || quote.phone);

  const hasFirstNameError = !useIsValidName(quote.primaryBookingContact.firstName);
  const hasLastNameError = !useIsValidName(quote.primaryBookingContact.lastName);
  const hasEmailError = !useIsValidEmail(quote.primaryBookingContact.email);
  const hasPhoneError = !useIsValidPhoneNumber(quote.primaryBookingContact.phone);

  useEffect(() => {
    setHasErrors(hasFirstNameError || hasLastNameError || hasEmailError || hasPhoneError);
  }, [hasFirstNameError, hasLastNameError, hasEmailError, hasPhoneError]);

  useEffect(() => {
    let contact = {};
    contact.firstName = firstName;
    contact.lastName = lastName;
    contact.email = email;
    contact.phone = phone;
    setPrimaryBookingContact(contact);
  }, [firstName, lastName, email, phone]);

  return (
    <>
      <SectionHeader theme={theme} title="Primary Booking Contact" />
      <div
        className={
          isLightMode ? 'quotation_input-container' : 'quotation_input-container quotation_input-container_dark'
        }
      >
        <div className="booking-item">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12} lg={12}>
              <Tooltip trigger={['click', 'hover']} placement="topLeft" title="First name of the contact person">
                <Input
                  placeholder="First Name"
                  defaultValue={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  prefix={<UserOutlined />}
                  style={inputStyle}
                  required
                />
              </Tooltip>
              {showErrors && hasFirstNameError ? (
                <Alert message="Kindly enter the first name of the contact person" type="error" />
              ) : (
                <></>
              )}
            </Col>

            <Col xs={24} sm={24} md={12} lg={12}>
              <Tooltip trigger={['click', 'hover']} placement="topLeft" title="Last name of the contact person">
                <Input
                  placeholder="Last Name"
                  defaultValue={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  prefix={<UserOutlined />}
                  style={inputStyle}
                  required
                />
              </Tooltip>
              {showErrors && hasLastNameError ? (
                <Alert message="Kindly enter the last name of the contact person" type="error" />
              ) : (
                <></>
              )}
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12} lg={12}>
              <Tooltip trigger={['click', 'hover']} placement="topLeft" title="Email of the primary contact person">
                <Input
                  defaultValue={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  prefix={<MailOutlined />}
                  style={inputStyle}
                  type="email"
                  required
                />
              </Tooltip>
              {showErrors && hasEmailError ? (
                <Alert message="Kindly enter a valid email of the contact person" type="error" />
              ) : (
                <></>
              )}
            </Col>

            <Col xs={24} sm={24} md={12} lg={12}>
              <Tooltip
                trigger={['click', 'hover']}
                placement="topLeft"
                title="Phone number of the primary contact person"
              >
                <Input
                  placeholder="Phone Number"
                  maxLength={25}
                  defaultValue={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={inputStyle}
                  prefix={<PhoneOutlined />}
                  type="tel"
                  required
                />
              </Tooltip>
              {showErrors && hasPhoneError ? (
                <Alert message="Kindly enter a valid phone number of the contact person" type="error" />
              ) : (
                <></>
              )}
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

const DeliveryLocation = ({ theme, quote, setDeliveryLocation, showErrors, setHasErrors }) => {
  const isLightMode = theme === 'light';

  const [isBusiness, setIsBusiness] = useState(quote.deliveryLocation.isBusiness);
  const [contactName, setContactName] = useState(quote.deliveryLocation.contactName);
  const [businessName, setBusinessName] = useState(quote.deliveryLocation.businessName);
  const [deliveryAddress, setDeliveryAddress] = useState(quote.deliveryLocation.deliveryAddress);
  const [phone, setPhone] = useState(quote.deliveryLocation.phone);
  const [altPhone, setAltPhone] = useState(quote.deliveryLocation.altPhone);


  const hasNameError = !useIsValidName(quote.deliveryLocation.contactName);
  const hasBusinessNameError = !useIsValidBusinessName(quote.deliveryLocation.businessName) && isBusiness;
  const hasDeliveryAddressError = !useIsValidAddress(quote.deliveryLocation.deliveryAddress);
  const hasPhoneError = !useIsValidPhoneNumber(quote.deliveryLocation.phone);
  const hasAltPhoneError = !useIsValidPhoneNumber(quote.deliveryLocation.altPhone) && quote.deliveryLocation.altPhone;

  
  useEffect(() => {
    setHasErrors(hasNameError || hasBusinessNameError || hasDeliveryAddressError || hasPhoneError || hasAltPhoneError);
  }, [hasNameError, hasBusinessNameError, hasDeliveryAddressError, hasPhoneError, hasAltPhoneError]);

  const setContactsSameAsPrimary = (isPrimaryContactDeliveryContact) => {
    if (isPrimaryContactDeliveryContact) {
      setContactName(quote.primaryBookingContact.firstName + ' ' + quote.primaryBookingContact.lastName);
      setPhone(quote.primaryBookingContact.phone);
    } else {
      setContactName('');
      setPhone('');
    }
  };

  useEffect(() => {
    setDeliveryLocation({
      isBusiness,
      contactName,
      businessName,
      deliveryAddress,
      phone,
      altPhone,
    });
  }, [isBusiness, contactName, businessName, deliveryAddress, phone, altPhone]);

  return (
    <>
      <SectionHeader theme={theme} title="Delivery Location" />
      <div
        className={
          isLightMode ? 'quotation_input-container' : 'quotation_input-container quotation_input-container_dark'
        }
      >
        <div className="booking-item">
          <Checkbox onChange={(e) => setContactsSameAsPrimary(e.target.checked)}>
            Delivery contact same as primary contact
          </Checkbox>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12} lg={12}>
              <Tooltip trigger={['click', 'hover']} placement="topLeft" title="Location of the delivery contact person">
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
                title="Name of the contact person at the delivery location"
              >
                <Input
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
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
                  title="Name of the business where the shipment will be delivered to"
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
                title="Address where the shipment will be delivered to"
              >
                <Input
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="Delivery Address"
                  prefix={<AimOutlined />}
                  style={inputStyle}
                  required
                />
              </Tooltip>
              {showErrors && hasDeliveryAddressError ? (
                <Alert message="Kindly enter the shipment's delivery address" type="error" />
              ) : (
                <></>
              )}
            </Col>

            <Col xs={24} sm={24} {...(isBusiness ? { md: 24, lg: 24, xl: 24 } : { md: 12, lg: 12, xl: 12 })}>
              <Input
                placeholder="Delivery Location"
                style={inputStyle}
                prefix={<EnvironmentOutlined />}
                value={quote.destinationName}
                disabled
                required
              />
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12} lg={12}>
              <Tooltip
                trigger={['click', 'hover']}
                placement="topLeft"
                title="Primary phone number of the delivery contact person"
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
                title="Secondary phone number of the delivery contact person"
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

const VehicleDetails = ({ theme, quote, setCars }) => {
  const isLightMode = theme === 'light';

  const changeCarStatus = (index, newStatus) => {
    const statuses = newStatus.split('-');
    quote.cars[index].isTruck = statuses[2] === 'it';
    quote.cars[index].isOperable = statuses[1] === 'io';
    quote.cars[index].hasKeys = statuses[0] === 'hk';
    message.destroy();
    message.success(
      <p>
        The revised shipping cost is: <b> ${calculateTotalShippingRate(quote)}</b>
        <br />
        <br />
        (Changing the car type or condition affects the shipping cost.)
      </p>,
      15
    );
    setCars(quote.cars);
  };

  const parseCarStatus = (car) => {
    return (car.hasKeys ? 'hk-' : 'nk-') + (car.isOperable ? 'io-' : 'no-') + (car.isTruck ? 'it' : 'nt');
  };

  return (
    <>
      <SectionHeader theme={theme} title="Vehicle Details" />
      <div
        className={
          isLightMode ? 'quotation_input-container' : 'quotation_input-container quotation_input-container_dark'
        }
      >
        <div className="booking-item">
          {Object.keys(quote.cars).map((key) => (
            <Row gutter={[16, 16]} key={key}>
              <Divider className="medium-margin-h-divider" orientation="left">
                {Number(key) + 1} of {Object.keys(quote.cars).length}
              </Divider>
              <Col xs={24} sm={24} md={12} lg={12}>
                <Input
                  placeholder="Car"
                  prefix={<CarOutlined />}
                  style={inputStyle}
                  value={quote.cars[key].year + ' ' + quote.cars[key].make + ' ' + quote.cars[key].model}
                  disabled
                  required
                />
              </Col>

              <Col xs={24} sm={24} md={12} lg={12}>
                <Tooltip
                  trigger={['click', 'hover']}
                  placement="topLeft"
                  title="Type and condition of the car and availability of keys"
                >
                  <Select
                    onSelect={(value) => changeCarStatus(key, value)}
                    defaultValue={parseCarStatus(quote.cars[key])}
                    style={{ width: '100%' }}
                  >
                    <Option value="hk-io-it">Operable Truck</Option>
                    <Option value="nk-io-it">Operable Truck (No Keys)</Option>
                    <Option value="hk-io-nt">Operable Car</Option>
                    <Option value="nk-io-nt">Operable Car (No Keys)</Option>
                    <Option value="hk-no-it">Inoperable Truck</Option>
                    <Option value="nk-no-it">Inoperable Truck (No Keys)</Option>
                    <Option value="hk-no-nt">Inoperable Car</Option>
                    <Option value="nk-no-nt">Inoperable Car (No Keys)</Option>
                  </Select>
                </Tooltip>
              </Col>
            </Row>
          ))}
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

const PickupLocation = ({ theme, quote, setPickupLocation, showErrors, setHasErrors }) => {
  const isLightMode = theme === 'light';

  const [isBusiness, setIsBusiness] = useState(quote.pickupLocation.isBusiness);
  const [contactName, setContactName] = useState(quote.pickupLocation.contactName);
  const [businessName, setBusinessName] = useState(quote.pickupLocation.businessName);
  const [pickupAddress, setPickupAddress] = useState(quote.pickupLocation.pickupAddress);
  const [phone, setPhone] = useState(quote.pickupLocation.phone);
  const [altPhone, setAltPhone] = useState(quote.pickupLocation.altPhone);

  const hasNameError = !useIsValidName(quote.pickupLocation.contactName);
  const hasBusinessNameError = !useIsValidBusinessName(quote.pickupLocation.businessName) && isBusiness;
  const hasPickupAddressError = !useIsValidAddress(quote.pickupLocation.pickupAddress);
  const hasPhoneError = !useIsValidPhoneNumber(quote.pickupLocation.phone);
  const hasAltPhoneError = !useIsValidPhoneNumber(quote.pickupLocation.altPhone) && quote.pickupLocation.altPhone;

  useEffect(() => {
    setHasErrors(hasNameError || hasBusinessNameError || hasPickupAddressError || hasPhoneError || hasAltPhoneError);
  }, [hasNameError, hasBusinessNameError, hasPickupAddressError, hasPhoneError, hasAltPhoneError]);

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
    setPickupLocation({
      isBusiness,
      contactName,
      businessName,
      pickupAddress,
      phone,
      altPhone,
    });
  }, [isBusiness, contactName, businessName, pickupAddress, phone, altPhone]);

  return (
    <>
      <SectionHeader theme={theme} title="Pickup Location" />
      <div
        className={
          isLightMode ? 'quotation_input-container' : 'quotation_input-container quotation_input-container_dark'
        }
      >
        <div className="booking-item">
          <Checkbox onChange={(e) => setContactsSameAsPrimary(e.target.checked)}>
            Pickup contact same as primary contact
          </Checkbox>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12} lg={12}>
              <Tooltip trigger={['click', 'hover']} placement="topLeft" title="Location of the pickup contact person">
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
                title="Name of the contact person at the pickup location"
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
                  title="Name of the business where the shipment will be picked up from"
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
                title="Address where the shipment will be picked up from"
              >
                <Input
                  value={pickupAddress}
                  onChange={(e) => setPickupAddress(e.target.value)}
                  placeholder="Pickup Address"
                  prefix={<AimOutlined />}
                  style={inputStyle}
                  required
                />
              </Tooltip>
              {showErrors && hasPickupAddressError ? (
                <Alert message="Kindly enter the address where to pickup the shipment" type="error" />
              ) : (
                <></>
              )}
            </Col>

            <Col xs={24} sm={24} {...(isBusiness ? { md: 24, lg: 24, xl: 24 } : { md: 12, lg: 12, xl: 12 })}>
              <Input
                placeholder="Pickup Location"
                style={inputStyle}
                prefix={<EnvironmentOutlined />}
                value={quote.originName}
                disabled
                required
              />
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12} lg={12}>
              <Tooltip
                trigger={['click', 'hover']}
                placement="topLeft"
                title="Primary phone number of the pickup contact person"
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
                title="Secondary phone number of the pickup contact person"
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

const ShipmentDetails = ({ quote, theme, setPickupDate, showErrors, setHasErrors }) => {
  const isLightMode = theme === 'light';
  const hasPickupDateError = !useIsValidPickupDate(quote.pickupDate);

  useEffect(() => {
    setHasErrors(hasPickupDateError);
  }, [hasPickupDateError]);

  return (
    <>
      <SectionHeader theme={theme} title="Shipment Details" />
      <div
        className={
          isLightMode ? 'quotation_input-container' : 'quotation_input-container quotation_input-container_dark'
        }
      >
        <div className="quotation-details-summary">
          <div className="detail-item">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={12} lg={12}>
                <Tooltip
                  trigger={['click', 'hover']}
                  title="Select the date when your shipment will be available for pickup"
                >
                  <DatePicker
                    placeholder="Ship Date"
                    size="large"
                    style={{ width: '100%', height: 45 }}
                    disabledDate={(moment) => moment.isBefore(new Date())}
                    showToday={true}
                    defaultValue={quote.pickupDate ? moment(quote.pickupDate, 'YYYY-MM-DD') : null}
                    onChange={(date) => {
                      setPickupDate(date == null ? '' : date.format('YYYY-MM-DD'));
                    }}
                  />
                </Tooltip>
                {showErrors && hasPickupDateError ? (
                  <Alert message="Kindly select a date for vehicle pickup" type="error" />
                ) : (
                  <></>
                )}
              </Col>
              <Col xs={24} sm={24} md={12} lg={12}>
                <Tooltip rigger={['click', 'hover']} title="Select how your vehicle is to be shipped, open or enclosed">
                  <Select defaultValue="standard" style={{ width: '100%' }}>
                    <Option value="standard">Open/Standard</Option>
                    <Option disabled value="top">
                      Open/Top Load[+$198]
                    </Option>
                    <Option disabled value="enclosed">
                      Enclosed[+2,162]
                    </Option>
                  </Select>
                </Tooltip>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <style jsx global>
        {`
          // .shipment-details--step {
          //   font-size: 17px;
          //   text-align: center;
          //   font-weight: 700;
          //   padding-right: 1.1rem;
          //   border-right: 1px solid hsla(0, 0%, 100%, 0.3);
          //   margin: 0.6rem 0;
          // }
        `}
      </style>
    </>
  );
};

export function BookPage({
  t,
  quote,
  theme,
  setDeliveryLocation,
  setPickupLocation,
  setPrimaryBookingContact,
  setPickupDate,
  setCars
}) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [hasShipmentDetailsErrors, setHasShipmentDetailsErrors] = useState(false);
  const [hasPrimaryBookingErrors, setHasPrimaryBookingErrors] = useState(false);
  const [hasPickupLocationErrors, setHasPickupLocationErrors] = useState(false);
  const [hasDeliveryLocationErrors, setHasDeliveryLocationErrors] = useState(false);

  const submitData = () => {
    setIsSubmitted(true);
    if (!hasShipmentDetailsErrors && !hasPrimaryBookingErrors && !hasPickupLocationErrors && !hasDeliveryLocationErrors) {
      console.log(quote);
    }    
  };

  return (
    <BaseLayout>
      <Row gutter={[16, 16]} justify="center">
        <Col xs={24} sm={24} md={20} lg={20} xl={20}>
          <Card>
            <h2>
              <CalendarOutlined /> Online Shipment Reservation
            </h2>
            <Divider className="small-margin-h-divider" />
            <p>Complete the secure online reservation form below to book your vehicle shipment.</p>

            <QuotationSummary quote={quote} theme={theme} />
            <ShipmentDetails
              showErrors={isSubmitted}
              setHasErrors={setHasShipmentDetailsErrors}
              quote={quote}
              theme={theme}
              setPickupDate={setPickupDate}
            />
            <PrimaryBooking
              showErrors={isSubmitted}
              setHasErrors={setHasPrimaryBookingErrors}
              quote={quote}
              theme={theme}
              setPrimaryBookingContact={setPrimaryBookingContact}
            />
            <PickupLocation
              showErrors={isSubmitted}
              setHasErrors={setHasPickupLocationErrors}
              quote={quote}
              theme={theme}
              setPickupLocation={setPickupLocation}
            />
            <DeliveryLocation
              showErrors={isSubmitted}
              setHasErrors={setHasDeliveryLocationErrors}
              quote={quote}
              theme={theme}
              setDeliveryLocation={setDeliveryLocation}
            />
            <VehicleDetails quote={quote} theme={theme} setCars={setCars} />

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button onClick={submitData} type="primary" shape="round" size="large" style={{ width: 400 }}>
                Submit & Continue
              </Button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>{isSubmitted &&
            (hasShipmentDetailsErrors ||
              hasPrimaryBookingErrors ||
              hasPickupLocationErrors ||
              hasDeliveryLocationErrors) ? (
              <>
                <Alert message="Invalid input! Kindly fix the errors highlighted in the form." type="error" />
                <br />
              </>
            ) : (
              <></>
            )} </div>
          </Card>
        </Col>
      </Row>
    </BaseLayout>
  );
}

BookPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

BookPage.propTypes = {
  t: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  quote: state.quote,
  theme: state.ui.theme,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setPrimaryBookingContact: bindActionCreators(setPrimaryBookingContact, dispatch),
    setDeliveryLocation: bindActionCreators(setDeliveryLocation, dispatch),
    setPickupLocation: bindActionCreators(setPickupLocation, dispatch),
    setPickupDate: bindActionCreators(setPickupDate, dispatch),
    setCars: bindActionCreators(setCars, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation('common')(BookPage));
