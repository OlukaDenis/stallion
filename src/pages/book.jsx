import  { useState } from 'react';
import BaseLayout from '../components/layout';
import { withTranslation } from '../utilities/i18n';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, Divider, DatePicker, Tooltip, Button, Row, Col, Select, Input, Checkbox } from 'antd';
import { CalendarOutlined, PhoneOutlined, UserOutlined, ShoppingCartOutlined, EnvironmentOutlined, MailOutlined, AimOutlined } from '@ant-design/icons';
import { QuotationSummary } from '../components/QuotationSummary';
const inputStyle = {
  height: 45,
}

const SectionHeader = ({ theme, title }) => {
  const isLightMode = theme === 'light'; 
  return (
    <div className={isLightMode ? 'shipment-details' : 'shipment-details shipment-details_dark'}>
      <span
        className={isLightMode ? 'shipment-details--title' : 'shipment-details--title shipment-details--title_dark'}
      >
        {title}
      </span>
      <style jsx global>
        {`
          .shipment-details {
            background: rgba(248,105,66,0.3);
            padding: 0.2rem 1.4rem;
            display: flex;
            box-sizing: border-box;
          }
          .shipment-details_dark {
            background: #000;
            color: #fff;
          }
          .shipment-details--title {
            font-size: 16px;
            padding-left: 1.1rem;
            line-height: 2.05rem;
            margin: 0.6rem 0;
          }
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
    </div>
  );
}

const PrimaryBooking = ({theme, title}) => {
  const isLightMode = theme === 'light'; 
  
  return (
    <>
    <SectionHeader theme={theme} title="Primary Booking Contact" />
      <div
        className={
          isLightMode ? 'quotation_input-container' : 'quotation_input-container quotation_input-container_dark'
        }
      >

        <div className="booking-item" >

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Tooltip
              trigger={['click', 'hover']}
              placement="topLeft"
              title="First name of the contact person"
            >
              <Input 
              placeholder="First Name" 
              prefix={<UserOutlined />} 
              style={inputStyle}
              required />
            </Tooltip>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12}>
            <Tooltip
              trigger={['click', 'hover']}
              placement="topLeft"
              title="Last name of the contact person"
            >
              <Input 
              placeholder="Last Name" 
              prefix={<UserOutlined />}
               style={inputStyle}
              required />
              </Tooltip>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Tooltip
              trigger={['click', 'hover']}
              placement="topLeft"
              title="Email of the primary contact person"
            >
              <Input placeholder="Email Address"
              prefix={<MailOutlined />} 
              style={inputStyle}
              type="email"
              required />
            </Tooltip>
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
                style={inputStyle}
                prefix={<PhoneOutlined />} 
                type="number"
                required
              />
              </Tooltip>
          </Col>
        </Row>
        </div>
      </div>
    </>
  )
}

const DeliveryLocation = ({theme, title}) => {
  const isLightMode = theme === 'light'; 

  return(
    <>
    <SectionHeader theme={theme} title="Delivery Location" />
      <div
        className={
          isLightMode ? 'quotation_input-container' : 'quotation_input-container quotation_input-container_dark'
        }
      >

        <div className="booking-item" >
          <Checkbox >Delivery contact same as primary contact</Checkbox>
          <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Tooltip
              trigger={['click', 'hover']}
              placement="topLeft"
              title="Location of the delivery contact person"
            >
             <Select defaultValue="residence"  style={{ width: '100%'}} >
                <Option value="residence">Residence</Option>
                <Option value="business">Business]</Option>
              </Select>
            </Tooltip>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12}>
            <Tooltip
              trigger={['click', 'hover']}
              placement="topLeft"
              title="Name of the contact person at the delivery location"
            >
              <Input 
              placeholder="Contact Person (Full Name)" 
              prefix={<UserOutlined />}
               style={inputStyle}
              required />
              </Tooltip>
          </Col>
        </Row>

          <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Tooltip
              trigger={['click', 'hover']}
              placement="topLeft"
              title="Address where the shipment will be delivered to"
            >
              <Input placeholder="Pickup Address"
              prefix={<AimOutlined />} 
              style={inputStyle}
              required />
            </Tooltip>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12}>
          <Input
              placeholder="Pickup Location"
              style={inputStyle}
              prefix={<EnvironmentOutlined />} 
              value="North Myrtle Beach, SC 29582"
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
              placeholder="Primary Phone"
              maxLength={25}
              style={inputStyle}
              prefix={<PhoneOutlined />} 
              type="number"
              required
            />
          </Tooltip>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12}>
          <Tooltip
              trigger={['click', 'hover']}
              placement="topLeft"
              title="Secondary phone number of the delivery contact person"
            >
              <Input
                placeholder="Secondary Phone (Optional)"
                maxLength={25}
                style={inputStyle}
                prefix={<PhoneOutlined />} 
                type="number"
              />
              </Tooltip>
          </Col>
        </Row>
        </div>
      </div>

      <style jsx global>
        {`
          .ant-select-single:not(.ant-select-customize-input)
          .ant-select-selector {
            height: 45px;
            align-items: center;
          }
        `}
      </style>
    </>
  )
}

const VehicleDetails = ({theme, title}) => {
  const isLightMode = theme === 'light'; 

  return(
    <>
    <SectionHeader theme={theme} title="Vehicle Details" />
      <div
        className={
          isLightMode ? 'quotation_input-container' : 'quotation_input-container quotation_input-container_dark'
        }
      >

        <div className="booking-item" >
         
        <Row gutter={[16, 16]}>

        <Col xs={24} sm={24} md={12} lg={12}>
          <Input 
              placeholder="Contact Person (Full Name)" 
              prefix={<ShoppingCartOutlined />}
               style={inputStyle}
               value="2019 Alfa Romeo 4C"
               disabled
              required />
          </Col>

          <Col xs={24} sm={24} md={12} lg={12}>
            <Select defaultValue="runs"  style={{ width: '100%'}} >
                <Option value="runs">Runs & Drives</Option>
                <Option value="inoperable">Inoperable[+$100]</Option>
              </Select>
          </Col>
        </Row>

        </div>
      </div>

      <style jsx global>
        {`
          .ant-select-single:not(.ant-select-customize-input)
          .ant-select-selector {
            height: 45px;
            align-items: center;
          }
        `}
      </style>
    </>
  )
}

const PickupLocation = ({theme, title}) => {
  const isLightMode = theme === 'light'; 

  return(
    <>
    <SectionHeader theme={theme} title="Pickup Location" />
      <div
        className={
          isLightMode ? 'quotation_input-container' : 'quotation_input-container quotation_input-container_dark'
        }
      >

        <div className="booking-item" >
          <Checkbox >Pickup contact same as primary contact</Checkbox>
          <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Tooltip
              trigger={['click', 'hover']}
              placement="topLeft"
              title="Location of the pickup contact person"
            >
             <Select defaultValue="residence"  style={{ width: '100%'}} >
                <Option value="residence">Residence</Option>
                <Option value="business">Business]</Option>
              </Select>
            </Tooltip>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12}>
          <Tooltip
              trigger={['click', 'hover']}
              placement="topLeft"
              title="Name of the contact person at the pickup location"
            >
              <Input 
              placeholder="Contact Person (Full Name)" 
              prefix={<UserOutlined />}
               style={inputStyle}
              required />
              </Tooltip>
          </Col>
        </Row>

          <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Tooltip
              trigger={['click', 'hover']}
              placement="topLeft"
              title="Address where the shipment will be picked up from"
            >
              <Input placeholder="Pickup Address"
              prefix={<AimOutlined />} 
              style={inputStyle}
              required />
            </Tooltip>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12}>
          <Input
              placeholder="Pickup Location"
              style={inputStyle}
              prefix={<EnvironmentOutlined />} 
              value="North Myrtle Beach, SC 29582"
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
              placeholder="Primary Phone"
              maxLength={25}
              style={inputStyle}
              prefix={<PhoneOutlined />} 
              type="number"
              required
            />
          </Tooltip>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12}>
          <Tooltip
              trigger={['click', 'hover']}
              placement="topLeft"
              title="Secondary phone number of the pickup contact person"
            >
              <Input
                placeholder="Secondary Phone (Optional)"
                maxLength={25}
                style={inputStyle}
                prefix={<PhoneOutlined />} 
                type="number"
              />
              </Tooltip>
          </Col>
        </Row>
        </div>
      </div>

      <style jsx global>
        {`
          .ant-select-single:not(.ant-select-customize-input)
          .ant-select-selector {
            height: 45px;
            align-items: center;
          }
        `}
      </style>
    </>
  )
}

const ShipmentDetails = ({ quote, theme }) => {
  const isLightMode = theme === 'light'; 
  
  return (
    <>
      <SectionHeader theme={theme} title="Total Shipping Rate" />
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
                      onChange={(date) => {
                        setPickupDate(date == null ? '' : date.format('YYYY-MM-DD'));
                      }}
                    />
                
                </Tooltip>

              </Col>
              <Col xs={24} sm={24} md={12} lg={12}>
                <Tooltip
                rigger={['click', 'hover']}
                title="Select how your vehicle is to be shipped, open or enclosed"
                  >
                <Select defaultValue="standard"  style={{ width: '100%' }} >
                  <Option value="standard">Open/Standard</Option>
                  <Option value="top">Open/Top Load[+$198]</Option>
                  <Option value="enclosed">Enclosed[+2,162]</Option>
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
}

export function BookPage({ t, quote, theme }) {
  
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
            <ShipmentDetails quote={quote} theme={theme} />
            <PrimaryBooking quote={quote} theme={theme} />
            <PickupLocation quote={quote} theme={theme} />
            <DeliveryLocation quote={quote} theme={theme} />
            <VehicleDetails quote={quote} theme={theme} />

            <div style={{ display: 'flex', justifyContent: 'center'}}>
              <Button type="primary" shape="round" size="large" style={{width: 400}} >
               Submit & Continue
              </Button>
            </div>
            
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
    theme: state.ui.theme
});

const mapDispatchToProps = (dispatch) => {
  return {
    // setIsLoggedIn: bindActionCreators(setIsLoggedIn, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation('common')(BookPage));
