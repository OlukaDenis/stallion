import { connect } from 'react-redux';
import { withTranslation } from '../utilities/i18n';
import { Row, Col, Steps, List, Checkbox, Button, Tooltip } from 'antd';
import { ClockCircleOutlined, FlagFilled, FlagOutlined, CheckOutlined, RightOutlined, QuestionCircleFilled } from '@ant-design/icons';

const { Step } = Steps;

const QuotationView = ({theme, quote}) => {
  
  const isLightMode = theme === 'light';

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

  const geoEncodeLocation = (location) => {
    
    if (typeof window !== 'undefined') {
      const OpenStreetMapProvider = require('leaflet-geosearch').OpenStreetMapProvider;
      const provider = new OpenStreetMapProvider();
      console.log('provider', provider);
      provider.search({ query: location }).then((results) => console.log(location, results));
    }
    
    return 'Encoding: ' + location;
  }

  const position = [51.505, -0.09];

  const getMapElement = () => {
    if (typeof window === 'undefined') {
      return <>Loading Map...</>;
    }

    const RL = require('react-leaflet');
    const Map = RL.Map; 
    const TileLayer = RL.TileLayer; 
    const Marker = RL.Marker; 
    const Popup = RL.Popup; 

    return (
      <Map center={position} zoom={8}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup.
            <br />
            Easily customizable.
          </Popup>
        </Marker>
      </Map>
    );
  };

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
              Quote # 897898
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
                  {Object.keys(quote.cars).map((key) => (
                    <>
                      {quote.cars[key].year + ' ' + quote.cars[key].make + ' ' + quote.cars[key].model}
                      <br />
                    </>
                  ))}
                </div>
              </div>
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
                <div className="label-cell">$1,965</div>
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
                      <List.Item className="active-features" key={item.key}>
                        <CheckOutlined className="green-checkmark" />
                        &nbsp;{item.title}
                      </List.Item>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={isLightMode ? 'quotation_section' : 'quotation_section quotation_section_dark'}>
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
                <div className="item-cell">Option</div>
                <div className="item-cell">Select</div>
                <div className="item-cell">Amount</div>
              </div>
              <div className="service-item">
                <div className="item-cell">
                  Top Load&nbsp;
                  <Tooltip title="Assures preferred placement on the top level of the carrier during transit.">
                    <QuestionCircleFilled />
                  </Tooltip>
                </div>
                <div className="item-cell">
                  <Checkbox />
                </div>
                <div className="item-cell">+$198</div>
              </div>
              <div className="service-item">
                <div className="item-cell">
                  Enclosed Carrier&nbsp;
                  <Tooltip title="Your vehicle will be shipped in a fully enclosed container. This provides maximum protection and higher coverage levels during transit.">
                    <QuestionCircleFilled />
                  </Tooltip>
                </div>
                <div className="item-cell">
                  <Checkbox />
                </div>
                <div className="item-cell">+$2,162</div>
              </div>
              <br />
              <Button type="primary" shape="round" size="large">
                Continue & Book Shipment <RightOutlined />
              </Button>
            </div>
          </div>
        </div>
      </Col>
      <Col xs={22} sm={20} md={11} lg={10} xl={10}>
        <Steps size="small" current={0} labelPlacement="vertical" direction="horizontal">
          <Step title="Pickup" subTitle={quote.origin} icon={<FlagFilled />} />
          <Step title="Transit" subTitle="(4 - 6 Days)" icon={<ClockCircleOutlined />} />
          <Step title="Delivery" subTitle={quote.destination} icon={<FlagOutlined />} />
        </Steps>

        <div style={{ width: '100%', height: '200px' }}>{getMapElement()}</div>
      </Col>
      <style jsx global>
        {`
          .quotation-optional-services,
          .quotation-details-summary {
            margin: -1rem;
          }
          .quotation-optional-services {
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
            flex: 1;
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
            flex: 5;
            padding-left: 20px;
            display: flex;
            align-items: center;
            text-align: left;
            border: 0.5px dotted grey;
          }
          .active-features {
            font-size: 10px;
          }
          .green-checkmark {
            color: green;
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
    // setCars: bindActionCreators(setCars, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation('common')(QuotationView));
