import { DatePicker, Tooltip, Button, Alert } from 'antd';
import { FlagFilled, FlagOutlined, RightOutlined, UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { withTranslation, Router } from '../utilities/i18n';
import LocationSelector from './LocationSelector';
import { bindActionCreators } from 'redux';
import { setOrigin, setDestination, setCars, setPickupDate, setEmail, setName, setPhone } from '../state/quote/action';
import moment from 'moment';
import ClearableInputElement from './ClearableInputElement';
import SelectedCars from './SelectedCars';
import { useState, useEffect } from 'react';
import { setIsLoadingNewPage } from '../state/ui/action';

export function QuotationGenerator({
  theme,
  quote,
  setOrigin,
  setDestination,
  setPickupDate,
  setName,
  setEmail,
  setPhone,
  setIsLoadingNewPage
}) {


  const [hasOriginError, setHasOriginError] = useState(false);
  const [hasDestinationError, setHasDestinationError] = useState(false);

  const [hasSelectedCarsError, setHasSelectedCarsError] = useState(false);
  
  const [hasPickupDateError, setHasPickupDateError] = useState(false);
  const [hasNameError, setHasNameError] = useState(false);
  const [hasPhoneError, setHasPhoneError] = useState(false);
  const [hasEmailError, setHasEmailError] = useState(false);
  const [hasQuoteDataError, setHasQuoteDataError] = useState(false);
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const isLightMode = theme === 'light';
  const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  useEffect(() => {
    setHasQuoteDataError(!isQuoteDataValid(quote));
  }, [quote]);

  const isQuoteDataValid = (quote) => {
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
      setHasPhoneError(false);
    } else {
      isErrorFound = true;
      setHasPhoneError(true);
    }
    return !isErrorFound;
  };


  const calculateQuote = async () => {
    
    if (isQuoteDataValid(quote)) {
      setPhone(isValidPhoneNumber(quote.phone));
      setIsLoadingNewPage(true);
      await Router.push('/quotation');
      setIsLoadingNewPage(false);
    } else {
      setIsDataSubmitted(true);
    }
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
              {isDataSubmitted && hasOriginError ? (
                <Alert message="Kindly select a valid origin" type="error" />
              ) : (
                <></>
              )}
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
              {isDataSubmitted && hasDestinationError ? (
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
            {isDataSubmitted && hasSelectedCarsError ? (
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
              {isDataSubmitted && hasPickupDateError ? (
                <Alert message="Kindly select a date for vehicle pickup" type="error" />
              ) : (
                <></>
              )}
            </Tooltip>

            {quote.pickupDate ? (
              <div>
                <ClearableInputElement value={quote.name} onChange={setName} placeholder="Name" Icon={UserOutlined} />
                {isDataSubmitted && hasNameError ? (
                  <Alert message="Kindly enter the shipper's name" type="error" />
                ) : (
                  <></>
                )}

                <ClearableInputElement
                  type="email"
                  value={quote.email}
                  onChange={setEmail}
                  placeholder="Email"
                  Icon={MailOutlined}
                />
                {isDataSubmitted && hasEmailError ? (
                  <Alert message="Kindly enter a valid email address" type="error" />
                ) : (
                  <></>
                )}

                <ClearableInputElement
                  type="tel"
                  value={quote.phone}
                  onChange={setPhone}
                  placeholder="Phone"
                  Icon={PhoneOutlined}
                />

                {isDataSubmitted && hasPhoneError ? (
                  <Alert message="Kindly enter a valid phone number" type="error" />
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <></>
            )}
          </div>

          {isDataSubmitted && hasQuoteDataError ? (
            <>
              <Alert message="Invalid input! Kindly fix the errors highlighted in the form." type="error" />
              <br/>
            </>
          ) : (
            <></>
          )}
          <Button onClick={calculateQuote} type="primary" shape="round" size="large" block>
            Calculate Quote <RightOutlined />
          </Button>
        </div>
      </div>
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
    setIsLoadingNewPage: bindActionCreators(setIsLoadingNewPage, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation('common')(QuotationGenerator));
