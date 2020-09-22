import BaseLayout from '../components/layout';
import { withTranslation } from '../utilities/i18n';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Router } from '../utilities/i18n';
import { Card, Skeleton } from 'antd';
import { Row, Col, List, Divider, Popconfirm, Button, Tooltip, Input } from 'antd';
import { DeleteOutlined, MailOutlined, NumberOutlined, EnvironmentOutlined } from '@ant-design/icons';
const inputStyle = {
  height: 45,
  marginBottom: 20,
};


export function TrackPage({ t, theme }) {
  const { Meta } = Card;
  const isLightMode = theme === 'light';

  return (
    <BaseLayout>
      <Row gutter={[16, 16]} style={{paddingTop: 50}} justify="center">
        <Col xs={20} sm={18} md={10} lg={8} xl={8}>
          <div className={isLightMode ? 'quotation' : 'quotation quotation_dark'}>
            <div className={isLightMode ? 'quotation_section' : 'quotation_section quotation_section_dark'}>
                <span
                  className={
                    isLightMode ? 'quotation_section--step' : 'quotation_section--step quotation_section--step_dark'
                  }
                >
                  <EnvironmentOutlined />
                </span>
                <span
                  className={
                    isLightMode ? 'quotation_section--title' : 'quotation_section--title quotation_section--title_dark'
                  }
                >
                  Track a shipment
                </span>
              </div>
            <div
               className={
                isLightMode ? 'quotation_input-container' : 'quotation_input-container quotation_input-container_dark'
              }
            >

              <p style={{color: '#444'}}>Enter the details of your booking below to access the Super Stallion Logistics tracking portal.</p>

              <Tooltip
                trigger={['click', 'hover']}
                placement="topLeft"
                title="Enter your Super Stallion Booking ID"
              >
                <Input 
                placeholder="Booking ID" 
                prefix={<NumberOutlined />} 
                style={inputStyle}
                required />
              </Tooltip>

              <Tooltip
                trigger={['click', 'hover']}
                placement="topLeft"
                title="Enter your email that you used for creating your Super Stallion account"
              >
                <Input 
                placeholder="Booking Email" 
                prefix={<MailOutlined />} 
                style={inputStyle}
                required />
              </Tooltip>

              <div style={{ display: 'flex', justifyContent: 'center'}}>
                <Button type="primary" shape="round" size="large" style={{width: 400}} >
                  Track
                </Button>
              </div>

              <p style={{textAlign: 'center', marginTop: 16}}><a href="#">Problem tracking your shipment</a></p>
            </div>
          </div>
        </Col>
      </Row>
    </BaseLayout>
  );
}

TrackPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

TrackPage.propTypes = {
  t: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  theme: state.ui.theme,
});

const mapDispatchToProps = (dispatch) => {
  return {
    // setIsLoggedIn: bindActionCreators(setIsLoggedIn, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation('common')(TrackPage));
