import { connect } from 'react-redux';
import { withTranslation, Router } from '../utilities/i18n';
import { Row, Col, Steps, List, Button } from 'antd';
import {
  ClockCircleOutlined,
  FlagFilled,
  FlagOutlined,
  CheckOutlined,
  RightOutlined,
} from '@ant-design/icons';

import MapView from './MapView';
import { setIsLoadingNewPage } from '../state/ui/action';
import { bindActionCreators } from 'redux';
import { calculateTotalShippingRate } from '../utilities/calculate_shipping_rate';

const { Step } = Steps;

const QuotationView = ({ theme, quote, setIsLoadingNewPage }) => {
  const isLightMode = theme === 'light';

  const proceedToBook = async () => {
    setIsLoadingNewPage(true);
    await Router.push('/book');
    setIsLoadingNewPage(false);
  };

  const deliveryTimeRange = (seconds) => {
    let minDeliveryDays = Math.ceil(((seconds / 60) / 60) / 24);
    return minDeliveryDays + " - " + (minDeliveryDays+2);
  }

  const DeliverySteps = () => (
    <Steps size="small" current={0} labelPlacement="vertical" direction="horizontal">
      <Step title="Pickup" subTitle={quote.origin} icon={<FlagFilled />} />
      <Step title="Transit" subTitle={`(${deliveryTimeRange(quote.duration)} Days)`} icon={<ClockCircleOutlined />} />
      <Step title="Delivery" subTitle={quote.destination} icon={<FlagOutlined />} />
    </Steps>
  );

  const shippingFeatures = [
    {
      key: 'door-to-door',
      title: 'Door-to-Door Service',
    },
    {
      key: 'open-carrier',
      title: 'Open Car Carrier',
    },
    {
      key: 'no-hidden-fees',
      title: 'No Hidden Fees',
    },
    {
      key: 'online-tracking',
      title: '24/7 Online Tracking',
    },
  ];

  return (
    <Row gutter={[32, 48]} justify="center">
      <Col xs={22} sm={20} md={11} lg={10} xl={10}>
        <div className={isLightMode ? 'quotation_body' : 'quotation_body quotation_body_dark'}>
          <div className={isLightMode ? 'quotation_section' : 'quotation_section quotation_section_dark'}>
            <span
              className={
                isLightMode ? 'quotation_section--title' : 'quotation_section--title quotation_section--title_dark'
              }
            >
              Quote # {quote.id}
            </span>
          </div>
          <div
            className={
              isLightMode ? 'quotation_input-container' : 'quotation_input-container quotation_input-container_dark'
            }
          >
            <div className="quotation-details-summary">
              <div className="detail-item">
                <div className="label-cell">Pickup From</div>
                <div className="data-cell">{quote.origin}</div>
              </div>
              <div className="detail-item">
                <div className="label-cell">Deliver To</div>
                <div className="data-cell">{quote.destination}</div>
              </div>
              <div className="detail-item">
                <div className="label-cell">Vehicle(s)</div>
                <div className="data-cell">
                  <p>
                    {Object.keys(quote.cars).map((key) => (
                      <React.Fragment key={key}>
                        <span key={key}>
                          {quote.cars[key].year + ' ' + quote.cars[key].make + ' ' + quote.cars[key].model}
                        </span>
                        <br />
                      </React.Fragment>
                    ))}
                  </p>
                </div>
              </div>
              <Row justify="center">
                <Col xs={24} sm={24} md={0} lg={0} xl={0}>
                  <DeliverySteps />
                </Col>
              </Row>
            </div>
          </div>

          <div className={isLightMode ? 'quotation_section' : 'quotation_section quotation_section_dark'}>
            <span
              className={
                isLightMode ? 'quotation_section--title' : 'quotation_section--title quotation_section--title_dark'
              }
            >
              Total Shipping Rate
            </span>
          </div>
          <div
            className={
              isLightMode ? 'quotation_input-container' : 'quotation_input-container quotation_input-container_dark'
            }
          >
            <div className="quotation-details-summary">
              <div className="detail-item">
                <div className="label-cell">${calculateTotalShippingRate(quote)}</div>
                <div className="data-cell">
                  <List
                    grid={{
                      gutter: 8,
                      xs: 1,
                      sm: 1,
                      md: 1,
                      lg: 2,
                      xl: 2,
                      xxl: 2,
                    }}
                    dataSource={shippingFeatures}
                    renderItem={(item) => (
                      <List.Item className="active-features">
                        <CheckOutlined className="green-checkmark" />
                        &nbsp;{item.title}
                      </List.Item>
                    )}
                  />
                </div>
              </div>
              <br />
              <Button onClick={proceedToBook} type="primary" shape="round" size="large">
                Continue & Book Shipment <RightOutlined />
              </Button>
              <br />
              <img src="/images/credit_cards.png" className="payment-options" />
            </div>
          </div>

          {/* <div className={isLightMode ? 'quotation_section' : 'quotation_section quotation_section_dark'}>
            <span
              className={
                isLightMode ? 'quotation_section--title' : 'quotation_section--title quotation_section--title_dark'
              }
            >
              Optional Services
            </span>
          </div>
          <div
            className={
              isLightMode ? 'quotation_input-container' : 'quotation_input-container quotation_input-container_dark'
            }
          >
            <div className="quotation-optional-services">
              <div className="header-item">
                <div className="item-cell cell-1">Option</div>
                <div className="item-cell cell-2">Select</div>
                <div className="item-cell cell-3">Amount</div>
              </div>
              <div className="service-item">
                <div className="item-cell cell-1">
                  Top Load&nbsp;
                  <Tooltip title="Assures preferred placement on the top level of the carrier during transit.">
                    <QuestionCircleFilled />
                  </Tooltip>
                </div>
                <div className="item-cell cell-2">
                  <Checkbox />
                </div>
                <div className="item-cell cell-3">+$198</div>
              </div>
              <div className="service-item">
                <div className="item-cell cell-1">
                  Enclosed Carrier&nbsp;
                  <Tooltip title="Your vehicle will be shipped in a fully enclosed container. This provides maximum protection and higher coverage levels during transit.">
                    <QuestionCircleFilled />
                  </Tooltip>
                </div>
                <div className="item-cell cell-2">
                  <Checkbox />
                </div>
                <div className="item-cell cell-3">+$2,162</div>
              </div>
              <br />
              <Button onClick={proceedToBook} type="primary" shape="round" size="large">
                Continue & Book Shipment <RightOutlined />
              </Button>
              <br />
              <img src="/images/credit_cards.png" className="payment-options" />
            </div>
          </div> */}
        </div>
      </Col>
      <Col xs={0} sm={0} md={11} lg={10} xl={10}>
        <DeliverySteps />

        <MapView />
      </Col>
      <style jsx>
        {`
          .quotation-optional-services,
          .quotation-details-summary {
            margin: -1rem;
          }
          .quotation-optional-services,
          .quotation-details-summary {
            padding-bottom: 10px;
          }
          .quotation-optional-services .header-item,
          .quotation-optional-services .service-item {
            display: flex;
            min-height: 25px;
          }
          .quotation-optional-services .header-item {
            background: rgba(248, 105, 66, 0.3);
          }
          .quotation-optional-services .item-cell {
            border: 0.5px dotted grey;
            flex: 3;
          }
          .quotation-optional-services .cell-1 {
            flex: 5;
          }
          .quotation-details-summary .detail-item {
            display: flex;
            min-height: 40px;
          }
          .quotation-details-summary .label-cell {
            flex: 2;
            padding-left: 10px;
            display: flex;
            align-items: center;
            text-align: left;
            border: 0.5px dotted grey;
            background: rgba(248, 105, 66, 0.3);
          }
          .quotation-details-summary .data-cell {
            flex: 3;
            padding-left: 20px;
            display: flex;
            align-items: center;
            text-align: left;
            border: 0.5px dotted grey;
          }
          .quotation-details-summary .data-cell p {
            margin: 0px;
          }
          .active-features {
            font-size: 10px;
          }
          .green-checkmark {
            color: green;
          }
          .payment-options {
            margin-top: 10px;
            width: 40%;
            text-align: center;
          }
        `}
      </style>
    </Row>
  );
};

const mapStateToProps = (state) => ({
  theme: state.ui.theme,
  quote: state.quote,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setIsLoadingNewPage: bindActionCreators(setIsLoadingNewPage, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation('common')(QuotationView));
