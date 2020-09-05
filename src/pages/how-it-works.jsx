import React from 'react'
import { withTranslation, Link } from '../utilities/i18n';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BaseLayout from '../components/layout';
import { Button, Row, Col, Card, Image, Menu, Dropdown  } from 'antd';

const colStyle = {
  backgroundColor: 'white', 
  padding: 20,
  minHeight: 400,
  display: 'flex',
  alignItems: 'center',
}

const HowItWorks = ({t}) => {
  return (
    <BaseLayout>
      <Row gutter={[16, 16]} justify="center">
        <h2 style={{marginTop: 40, fontSize: '2rem', fontWeight: 'bold'}}>How it works</h2>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} >
          <Row justify="center">
            <Col style={colStyle} xs={22} sm={22} md={20} lg={11} xl={11}>
            <div className="step-image">
              <img 
              width="80%"
              height="80%"
              src="images/step1.png"
              />
              </div>
            </Col>

            <Col style={colStyle} xs={22} sm={22} md={20} lg={11} xl={11}>
              <div className="step-item">
                <h3>Step 1:</h3>
                <h2>Instant Car Shipping Quote</h2>
                <p>
                  Begin by getting an instant quote from our <Link href="/quotation"><a>online car shipping cost calculator<a></a></a></Link>, 
                  or by speaking with a car shipping specialist at +1 971 248 0579
                </p>
                <div className="step-quoting">
                  <h4>Secure Online Shipment Reservation</h4>
                  <p>Schedule a convenient time for pickup via our secure online booking form or by phone with a shipping agent.</p>
                </div>
              </div>
            </Col>
          </Row>

          <Row justify="center">
            
            <Col style={colStyle} xs={22} sm={22} md={20} lg={11} xl={11}>
              <div className="step-item">
                <h3>Step 2:</h3>
                <h2>Vehicle Pick Up</h2>
                <p>
                Your shipment will be assigned to the carrier that can best accommodate your route and timeframe.
                 On the day of pickup, your vehicle will be safely loaded and will begin heading to the destination.
                </p>
                <div className="step-quoting">
                  <h4>Online Shipment Tracking</h4>
                  <p>Track the status of your shipment and get priority support from a live shipping agent with our online transport tracker.</p>
                </div>
              </div>
            </Col>

            <Col style={colStyle} xs={22} sm={22} md={20} lg={11} xl={11}>
              <div className="step-image">
                <img 
                width="80%"
                height="80%"
                src="images/step2.png"
                />
              </div>
             
            </Col>

          </Row>

          <Row justify="center">
            <Col style={colStyle} xs={22} sm={22} md={20} lg={11} xl={11}>
            <div className="step-image">
              <img 
              width="80%"
              height="80%"
              src="images/step3.png"
              />
              </div>
            </Col>

            <Col style={colStyle} xs={22} sm={22} md={20} lg={11} xl={11}>
              <div className="step-item">
                <h3>Step 3:</h3>
                <h2>Vehicle Delivery</h2>
                <p>
                Upon arrival at the destination, your vehicle will be safely offloaded. 
                A final inspection is completed and the driver hands over the keys.
                </p>
                <div className="step-quoting">
                  <h4>That's it! That's all there is to it!</h4>
                  <p>Join the hundreds of thousands of customers that trusted RoadRunner Auto Transport with the safe delivery of their vehicles.</p>
                </div>
              </div>
            </Col>
          </Row>
          
        </Col>
      </Row>

      <style jsx >
        {
          `
            .step-item h3{
              text-transform: uppercase;
              font-size: 1.1em;
              font-weight: lighter;
            }

            .step-item h2 {
              font-weight: bold;
            }

            .step-quoting {
              border-left: 4px solid #f78b6d;
              padding-left: 1.5em;
              background-color: rgba(255, 231, 225, 0.3);
              padding: 10px 10px 10px 20px;
            }
          `
        }
      </style>
  </BaseLayout>
  )
}

HowItWorks.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

HowItWorks.propTypes = {
  t: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    // setIsLoggedIn: bindActionCreators(setIsLoggedIn, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation('common')(HowItWorks));
