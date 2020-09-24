import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Card, Divider, DatePicker, Tooltip, Button, Row, Col, Select, Input, Checkbox, message, Alert } from 'antd';
import {
  SafetyOutlined,
  CalendarFilled,
  CreditCardFilled,
  NumberOutlined,
  LockFilled
} from '@ant-design/icons';
import BaseLayout from '../components/layout';
import { withTranslation } from '../utilities/i18n';
import SectionHeader from '../components/SectionHeader';
const { Option } = Select;
const { TextArea } = Input;
const topMargin = { marginTop: 20 };
const inputStyle = { height: 45 };


const AdditionalComments = ({theme, title}) => {

  return (

    <section style={topMargin}>
      <SectionHeader theme={theme} title={title} />
      
      <article className="summary__article_card">
      <Row gutter={[5, 8]} justify="center">
          <Col xs={24} sm={24} md={18} lg={18} xl={18}>
            <TextArea
              placeholder="Optional"
              autoSize={{ minRows: 4, maxRows: 10 }}
            />
          </Col>
        </Row>
      </article>
    </section>
  )
}
const PaymentDetails = ({theme, title}) => {

  return (
    <section style={topMargin}>
       <SectionHeader theme={theme} title={title} />

        <article className="summary__article_card">
            <p style={{borderBottom: '1px dotted #ccc', paddingBottom: 6}}>
            Your payment will not be processed until your shipment has been confirmed & scheduled for pickup.
            </p>

            <Row gutter={[20, 8]}>
              <Col xs={24} sm={24} md={14} lg={14} xl={14}>
              <Tooltip trigger={['click', 'hover']} placement="topLeft" title="Enter your credit/debit card number">
                <Input
                    placeholder="Card Number"
                    prefix={<CreditCardFilled />}
                    style={inputStyle}
                    required
                  />
                </Tooltip>
              </Col>

              <Col xs={24} sm={24} md={5} lg={5} xl={5}>
              <Tooltip trigger={['click', 'hover']} placement="topLeft" title="Card expiration month and year">
                <Input
                    placeholder="MM / YY"
                    prefix={<CalendarFilled />}
                    style={inputStyle}
                    required
                  />
                </Tooltip>
              </Col>

              <Col xs={24} sm={24} md={5} lg={5} xl={5}>
              <Tooltip trigger={['click', 'hover']} placement="topLeft" title="Security code">
                <Input
                    placeholder="CVC"
                    prefix={<NumberOutlined />}
                    style={inputStyle}
                    required
                  />
                </Tooltip>
              </Col>
            
            </Row>
        </article>

    </section>
  )
}

const BillingAddress = ({theme, title}) => {

  return (
    <section style={topMargin}>
      <SectionHeader theme={theme} title={title} />
      <article className="summary__article_card">

        <Row gutter={[5, 8]} justify="center">
          <Col xs={24} sm={24} md={18} lg={18} xl={18}>
          <Select defaultValue="select" style={{ width: '100%'}}>
              <Option value="select" disabled>Select Billing Address</Option>
              <Option value="pickup"> Same as Pickup</Option>
              <Option value="delivery">Same as delivery</Option>
              <Option value="other">Other</Option>
              
            </Select>
          </Col>
        </Row>
      </article>
    </section>
  )
}

const CarListItem = ({car}) => {

  return (
    <Row>
      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
        <div className="shipment__summary first_child">
          <div className="summary__heading">
            <p>Vehicle</p>
          </div>

          <div className="summary__info" style={{height: 60}}>
            <p>2019 Alfa Romeo 4C</p>
          </div>
        </div>
      </Col>

      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
        <div className="shipment__summary second_child">
          <div className="summary__heading">
            <p>Coverage Amount</p>
          </div>

          <div className="summary__info" style={{height: 60}}>
            <Select defaultValue="select" style={{ width: '100%'}}>
              <Option value="select" disabled>Select Coverage</Option>
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

          <div className="summary__info" style={{height: 60}}>
            <p>$10</p>
          </div>
        </div>
      </Col>
    
    </Row>
  )
}

const CoverageType = ({theme, title}) => {

  return (
    <section style={topMargin}>
      <SectionHeader theme={theme} title={title} />

      <article className="summary__article_card">
        <div className="type__head">
            <SafetyOutlined style={{fontSize: 50}} />
            <div style={{paddingLeft: 10}}>
              <p style={{borderBottom: '1px dotted #ccc', paddingBottom: 6}}>Standard protection provides basic liability and covers carrier negligence and equipment failure.</p>
              <p>Additional coverage (full or partial) is available for a higher level of protection during transit.</p>
            </div>
          </div>

          <CarListItem />
        </article>

        <style jsx global>
          {
            `
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

            `
          }
        </style>
    </section>
  )
}

const ShipmentSummary = ({theme, title}) => {
  
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

         <Row style={{marginTop: 30}}>
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
         <style jsx global>
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
                padding: 1em 1.2em;
              }

              .summary__info > p {
                margin: 0;
              }

              @media only screen and (max-width: 576px) {
                .shipment__summary {
                  display: grid;
                  grid-template-columns: 1fr 1fr;
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
             `
           }
         </style>
    </section>
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
            title="Shipment Summary"
          />

          <CoverageType
            quote={quote}
            theme={theme}
            title="Coverage Type"
          />

          <PaymentDetails
           quote={quote}
           theme={theme}
           title="Payment Details"
         />

         <BillingAddress 
          quote={quote}
          theme={theme}
          title="Billing Address"
        />

        <AdditionalComments 
          quote={quote}
          theme={theme}
          title="Additional Comments"
        />

        <section style={topMargin}>
          <SectionHeader theme={theme} title="Terms & Conditions" />
          
          <article className="summary__article_card">
          <Checkbox>
            I have read and agreed to Super Stallion Logistics Terms & Conditions.
          </Checkbox>
          </article>
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