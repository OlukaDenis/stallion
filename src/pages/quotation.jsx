import BaseLayout from '../components/layout';
import { withTranslation } from '../utilities/i18n';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card } from 'antd';
import { Row, Col } from 'antd';
import QuotationGenerator from '../components/QuotationGenerator';
import QuotationView from '../components/QuotationView';
import Head from 'next/head';

export function QuotationPage({ t }) {
  const { Meta } = Card;

  return (
    <BaseLayout>
      <Head>
        <link href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css" rel="stylesheet" />
      </Head>
      <QuotationView />

      {/* <Row gutter={[16, 16]} justify="center">
        <Col xs={20} sm={18} md={12} lg={10} xl={10}>
          <QuotationGenerator />
        </Col>
      </Row> */}
    </BaseLayout>
  );
}

QuotationPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

QuotationPage.propTypes = {
  t: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    // setIsLoggedIn: bindActionCreators(setIsLoggedIn, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation('common')(QuotationPage));
