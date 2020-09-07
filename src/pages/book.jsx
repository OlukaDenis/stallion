import BaseLayout from '../components/layout';
import { withTranslation } from '../utilities/i18n';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, Divider } from 'antd';
import { Row, Col } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { QuotationSummary } from '../components/QuotationSummary';

export function ShipmentDetails({ quote, theme }) {
  const isLightMode = theme === 'light'; 
  return (
    <>
      <div className={isLightMode ? 'shipment-details' : 'shipment-details shipment-details_dark'}>
        <span
          className={isLightMode ? 'shipment-details--title' : 'shipment-details--title shipment-details--title_dark'}
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
            <div className="data-cell">List</div>
          </div>
        </div>
      </div>
      <style jsx global>
        {`
          .shipment-details {
            background: #000;
            padding: 0.2rem 1.4rem;
            display: flex;
            color: #fff;
            box-sizing: border-box;
          }
          .shipment-details_dark {
          }
          .shipment-details--title {
            font-size: 16px;
            padding-left: 1.1rem;
            line-height: 2.05rem;
            margin: 0.6rem 0;
          }
          .shipment-details--step {
            font-size: 17px;
            text-align: center;
            font-weight: 700;
            padding-right: 1.1rem;
            border-right: 1px solid hsla(0, 0%, 100%, 0.3);
            margin: 0.6rem 0;
          }
        `}
      </style>
    </>
  );
}

export function BookPage({ t, quote, theme }) {
  
  return (
    <BaseLayout>
      <Row gutter={[16, 16]} justify="center">
        <Col xs={22} sm={22} md={20} lg={20} xl={20}>
          <Card>
            <h2>
              <CalendarOutlined /> Online Shipment Reservation
            </h2>
            <Divider className="small-margin-h-divider" />
            <p>Complete the secure online reservation form below to book your vehicle shipment.</p>
            
            <QuotationSummary quote={quote} theme={theme} />
            <ShipmentDetails quote={quote} theme={theme} />

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
    theme: state.theme
});

const mapDispatchToProps = (dispatch) => {
  return {
    // setIsLoggedIn: bindActionCreators(setIsLoggedIn, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation('common')(BookPage));
