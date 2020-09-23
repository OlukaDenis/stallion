import React from 'react'
import PropTypes from 'prop-types'
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
  CarOutlined,
  LockFilled
} from '@ant-design/icons';
import BaseLayout from '../components/layout';
import { withTranslation } from '../utilities/i18n';
import SectionHeader from '../components/SectionHeader';

const ShipmentSummary = ({theme, title}) => {
  
  return (
    <div style={{marginTop: 20}}>
       <SectionHeader theme={theme} title="Shipment Summary" />
    
         <Row gutter={[0, 16]}>
           <Col xs={24} sm={24} md={8} lg={8} xl={8}>
             <div className="shipment__summary first_child">
                <div className="summary__heading">
                  <p>Shippers Details</p>
                </div>

                <div className="summary__info">
                  <p>Denis O</p>
                  <p>myemail@me.com</p>
                  <p>89392730</p>
                </div>
             </div>
           </Col>
           <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <div className="shipment__summary second_child">
              <div className="summary__heading">
                <p>Pickup Location</p>
              </div>

              <div className="summary__info">
                <p>Denis O</p>
                <p>Kampala</p>
                <p>Plot 782B, Spring road</p>
              </div>
            </div>
            </Col>
           <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <div className="shipment__summary third_child">
              <div className="summary__heading">
                <p>Pickup Location</p>
              </div>

              <div className="summary__info">
                <p>Denis O</p>
                <p>Kampala</p>
                <p>Plot 782B, Spring road</p>
              </div>    
            </div>
           </Col>
         </Row>

         <Row gutter={[0, 16]}>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <div className="shipment__summary first_child">
                <div className="summary__heading">
                  <p>Ship Date</p>
                </div>

                <div className="summary__info">
                  <p>8/9/2020</p>
                </div>
              </div>
            </Col>

            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <div className="shipment__summary second_child">
                <div className="summary__heading">
                  <p>Vehicle Details</p>
                </div>

                <div className="summary__info">
                  <p>2 vehicles</p>
                </div>
              </div>
            </Col>

            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <div className="shipment__summary third_child">
                <div className="summary__heading">
                  <p>Shipping Rate</p>
                </div>

                <div className="summary__info">
                  <p>$1,000</p>
                </div>
              </div>
            </Col>
           
          </Row>
         <style jsx>
           {
             `
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
                border-top: none;
                padding: 1em 1.2em;
              }

              .summary__info > p {
                margin: 0;
              }

              .second_child .summary__heading,
              .second_child .summary__info {
                border-left: none;
                border-right: none;
              }

              @media only screen and (max-width: 576px) {
                .shipment__summary {
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                }

                .second_child .summary__heading {
                  border-top: none;
                  border-bottom: none;
                }

                .summary__heading {
                  height: 100%;
                }
              }
             `
           }
         </style>
    </div>
  )
}
export function Payment ({
    t,
    quote,
    theme,
  }){

  return (
    <BaseLayout>
    <Row gutter={[16, 16]} style={{paddingTop: 50}} justify="center">
      <Col xs={24} sm={24} md={20} lg={20} xl={20}>
        <Card>
          <h2>
            <LockFilled /> Protection & Payment
          </h2>
          <p>Select a coverage level and payment preference to complete your reservation.</p>
          <Divider className="small-margin-h-divider" />

          <ShipmentSummary
              quote={quote}
              theme={theme}
             
          />

        </Card>
        </Col>
      </Row>
    </BaseLayout>
  )
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

export default connect(mapStateToProps, null)(withTranslation('common')(Payment));
