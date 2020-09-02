import { DatePicker, Tooltip, Button, Divider, Alert, Input } from 'antd';
import { FlagFilled, FlagOutlined, RightOutlined, UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { withTranslation } from '../utilities/i18n';
import LocationSelector from './LocationSelector';
import { bindActionCreators } from 'redux';
import { setOrigin, setDestination, setCars, setPickupDate, setEmail, setName, setPhone } from '../state/quote/action';
import moment from 'moment';
import ClearableInputElement from './ClearableInputElement';
import SelectedCars from './SelectedCars';
import { useState } from 'react';

export function QuotationGenerator({
  theme,
  quote,
  setOrigin,
  setDestination,
  setPickupDate,
  setName,
  setEmail,
  setPhone,
}) {


  const [hasOriginError, setHasOriginError] = useState(false);
  const [hasDestinationError, setHasDestinationError] = useState(false);

  const [hasSelectedCarsError, setHasSelectedCarsError] = useState(false);
  
  const [hasPickupDateError, setHasPickupDateError] = useState(false);
  const [hasNameError, setHasNameError] = useState(false);
  const [hasPhoneError, setHasPhoneError] = useState(false);
  const [hasEmailError, setHasEmailError] = useState(false);

  const isLightMode = theme === 'light';
  const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const validateInput = () => {
    let isErrorFound = false;

    if ((quote.origin.match(/,/g) || []).length) {
      setHasOriginError(false);
    } else {
      isErrorFound = true;
      setHasOriginError(true);
    }

    if ((quote.destination.match(/,/g) || []).length) {
      setHasDestinationError(false);
    } else {
      isErrorFound = true;
      setHasDestinationError(true);
    }

    if (Object.keys(quote.cars).length > 0) {
      setHasSelectedCarsError(false);
    } else {
      isErrorFound = true;
      setHasSelectedCarsError(true);
    }

    if (quote.pickupDate) {
      setHasPickupDateError(false);
    } else {
      isErrorFound = true;
      setHasPickupDateError(true);
    }

    if (quote.name) {
      setHasNameError(false);
    } else {
      isErrorFound = true;
      setHasNameError(true);
    }

    if (isValidEmail(quote.email)) {
      setHasEmailError(false);
    } else {
      isErrorFound = true;
      setHasEmailError(true);
    }

    if (isValidPhoneNumber(quote.phone)) {
      setPhone(isValidPhoneNumber(quote.phone));
      setHasPhoneError(false);
    } else {
      isErrorFound = true;
      setHasPhoneError(true);
    }

    return isErrorFound;
  };


  const calculateQuote = () => {
    console.log('Validating quote={}');
    if (validateInput()) return;
    console.log(quote);
  };

  const isValidPhoneNumber = (phone) => (phoneRegex.test(phone) ? phone.replace(phoneRegex, '($1) $2-$3') : null);
  const isValidEmail = (email) => (emailRegex.test(email) ? email : null);

  return (
    <>
      <div className={isLightMode ? 'quotation' : 'quotation quotation_dark'}>
        <div className={isLightMode ? 'quotation_header' : 'quotation_header quotation_header_dark'}>
          <h3>Instant Car Shipping Quote</h3>
          <p>Calculate your car shipping rate in 3 easy steps!</p>
        </div>

        <div className={isLightMode ? 'quotation_body' : 'quotation_body quotation_body_dark'}>
          <div className={isLightMode ? 'quotation_section' : 'quotation_section quotation_section_dark'}>
            <span
              className={
                isLightMode ? 'quotation_section--step' : 'quotation_section--step quotation_section--step_dark'
              }
            >
              1
            </span>
            <span
              className={
                isLightMode ? 'quotation_section--title' : 'quotation_section--title quotation_section--title_dark'
              }
            >
              Origin &amp; Destination
            </span>
          </div>
          <div
            className={
              isLightMode ? 'quotation_input-container' : 'quotation_input-container quotation_input-container_dark'
            }
          >
            <Tooltip
              trigger={['click', 'hover']}
              title="Begin typing a zip code or city and then select a suggested location"
            >
              <LocationSelector
                value={quote.origin}
                onSelect={(value) => setOrigin(value)}
                placeholder="Pickup Location"
                icon={<FlagFilled />}
              />
              {hasOriginError ? <Alert message="Kindly select a valid origin" type="error" /> : <></>}
            </Tooltip>

            <Tooltip
              trigger={['click', 'hover']}
              title="Begin typing a zip code or city and then select a suggested location"
            >
              <LocationSelector
                value={quote.destination}
                onSelect={(value) => setDestination(value)}
                placeholder="Delivery Location"
                icon={<FlagOutlined />}
              />
              {hasDestinationError ? (
                <Alert message="Kindly select a valid delivery destination" type="error" />
              ) : (
                <></>
              )}
            </Tooltip>
          </div>

          <div className={isLightMode ? 'quotation_section' : 'quotation_section quotation_section_dark'}>
            <span
              className={
                isLightMode ? 'quotation_section--step' : 'quotation_section--step quotation_section--step_dark'
              }
            >
              2
            </span>
            <span
              className={
                isLightMode ? 'quotation_section--title' : 'quotation_section--title quotation_section--title_dark'
              }
            >
              Vehicle Details
            </span>
          </div>
          <div
            className={
              isLightMode ? 'quotation_input-container' : 'quotation_input-container quotation_input-container_dark'
            }
          >
            <SelectedCars />
            {hasSelectedCarsError ? (
              <Alert message="Kindly add a car, select in order Year > Make > Model" type="error" />
            ) : (
              <></>
            )}
          </div>

          <div className={isLightMode ? 'quotation_section' : 'quotation_section quotation_section_dark'}>
            <span
              className={
                isLightMode ? 'quotation_section--step' : 'quotation_section--step quotation_section--step_dark'
              }
            >
              3
            </span>
            <span
              className={
                isLightMode ? 'quotation_section--title' : 'quotation_section--title quotation_section--title_dark'
              }
            >
              Shipment Details
            </span>
          </div>
          <div
            className={
              isLightMode ? 'quotation_input-container' : 'quotation_input-container quotation_input-container_dark'
            }
          >
            <Tooltip
              trigger={['click', 'hover']}
              title="Select the date when your shipment will be available for pickup"
            >
              <DatePicker
                placeholder="Ship Date"
                size="large"
                style={{ width: '100%' }}
                defaultValue={quote.pickupDate ? moment(quote.pickupDate, 'YYYY-MM-DD') : null}
                disabledDate={(moment) => moment.isBefore(new Date())}
                showToday={false}
                onChange={(date) => {
                  setPickupDate(date == null ? '' : date.format('YYYY-MM-DD'));
                }}
              />
              {hasPickupDateError ? <Alert message="Kindly select a date for vehicle pickup" type="error" /> : <></>}
            </Tooltip>

            {quote.pickupDate ? (
              <div>
                <ClearableInputElement value={quote.name} onChange={setName} placeholder="Name" Icon={UserOutlined} />
                {hasNameError ? <Alert message="Kindly enter the shipper's name" type="error" /> : <></>}

                <ClearableInputElement
                  type="email"
                  value={quote.email}
                  onChange={setEmail}
                  placeholder="Email"
                  Icon={MailOutlined}
                />
                {hasEmailError ? <Alert message="Kindly enter a valid email address" type="error" /> : <></>}

                <ClearableInputElement
                  type="tel"
                  value={quote.phone}
                  onChange={setPhone}
                  placeholder="Phone"
                  Icon={PhoneOutlined}
                />

                {hasPhoneError ? <Alert message="Kindly enter a valid phone number" type="error" /> : <></>}
              </div>
            ) : (
              <></>
            )}
          </div>
          <Button onClick={calculateQuote} type="primary" shape="round" size="large" block>
            Calculate Quote <RightOutlined />
          </Button>
        </div>
      </div>

      <style jsx global>
        {`
          .quotation {
            z-index: 3;
            right: 0;
            padding-bottom: 3px;
            border: 2px solid #fff;
            box-shadow: 0 0 0 0.5rem rgba(0, 0, 0, 0.4);
            background: #fff;
          }

          .quotation_header {
            text-align: center;
            width: 100%;
            padding-top: 1.2rem;
            padding-bottom: 1.2rem;
            background-color: #f63e0c;
            background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEoAAABMAgMAAAC358n/AAAACVBMVEX///9HcEz///9EorLRAAAAA3RSTlMaAA4Mf89/AAABQElEQVQ4y3WUMVLEMAxFHWZSQEWzR9h77BFSxJkt9yhbAhUNPQ0FnBL/SNr5X3bcSHnOWN+SrPKHVesG81uxlnIvpTw1LyzYrfnlS9kCdqo19sCu8M/wbA/eBv+51thjtroFi8M3Zhd8sJjGImDsgcXhDzHEHoEb2w+flFX4LxQYLAIyy1lg9u0WLIsBW1MWwCQzs7GcBWZhd3bzFDNLgXt2MpZKIsztzpIYY1oSY1oSYypGmVljWhJj1ZkFdsZiJmdSksR2MZ/GRAyz2Zv1tXhbt/Wj/0mmVcuIsWbp89nY6mH5vqNcxTVGjHMvaXEm6Tuu+VWkHPeQhHV20cdw1Luprfq+Px+/mWXARm8wTyxi/Ka1GMa0GMezRIuhjGcTj43JWR4vMf8mnYnduCLGM7Ybf411Y7Kxt7Y+WljYd2P/340aPNbGbJEAAAAASUVORK5CYII=);
            background-repeat: no-repeat;
            background-size: auto 100%;
            color: #fff;
          }

          .quotation_header_dark {
            color: rgba(255, 255, 255, 0.9);
            background-color: #000;
          }

          .quotation_header h3 {
            font-weight: 700;
            font-size: 18px;
            border-bottom: 1px solid black;
            padding-bottom: 0.8rem;
            margin: 0 1.5rem 0.5rem;
            color: #fff;
          }
          .quotation_header_dark h3 {
            color: rgba(255, 255, 255, 0.9);
          }

          .quotation_header p {
            font-size: 14px;
            font-weight: 400;
            margin-bottom: 0;
            line-height: 1.8rem;
            opacity: 1;
          }

          .quotation_body {
            text-align: center;
            padding: 0.6rem 0.6rem 0.2rem;
          }

          .quotation_section {
            background: #000;
            padding: 0.2rem 1.4rem;
            display: flex;
            color: #fff;
            box-sizing: border-box;
          }
          .quotation_section_dark {
            color: rgba(255, 255, 255, 0.9);
          }
          .quotation_section--step {
            font-size: 17px;
            text-align: center;
            font-weight: 700;
            padding-right: 1.1rem;
            border-right: 1px solid hsla(0, 0%, 100%, 0.3);
            margin: 0.6rem 0;
          }

          .quotation_section--title {
            font-size: 16px;
            padding-left: 1.1rem;
            line-height: 2.05rem;
            margin: 0.6rem 0;
          }

          .quotation_input-container {
            border: 1px solid #ccc;
            border-top: 0;
            padding: 1rem;
            margin-bottom: 1rem;
          }
          .quotation_input-container_dark {
            background: #f0f0f0;
          }
        `}
      </style>
    </>
  );
}

const mapStateToProps = (state) => ({
  theme: state.ui.theme,
  quote: state.quote,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setCars: bindActionCreators(setCars, dispatch),
    setOrigin: bindActionCreators(setOrigin, dispatch),
    setDestination: bindActionCreators(setDestination, dispatch),
    setPickupDate: bindActionCreators(setPickupDate, dispatch),
    setName: bindActionCreators(setName, dispatch),
    setEmail: bindActionCreators(setEmail, dispatch),
    setPhone: bindActionCreators(setPhone, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation('common')(QuotationGenerator));
