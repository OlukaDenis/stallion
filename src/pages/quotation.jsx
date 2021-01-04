import BaseLayout from '../components/layout';
import { withTranslation } from '../utilities/i18n';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Row } from 'antd';
import QuotationGenerator from '../components/QuotationGenerator';
import QuotationView from '../components/QuotationView';
import Head from 'next/head';
import useIsValidQuoteData from '../hooks/QuoteDataValidation';

export function QuotationPage({ t, quote }) {

  const hasQuoteDataError = !useIsValidQuoteData(quote);

  return (
    <BaseLayout>
      <Head>
        <link href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css" rel="preload" as="style" />
      </Head>

      {hasQuoteDataError ? (
        <Row gutter={[16, 16]} style={{ paddingTop: 50 }} justify="center">
          <Col xs={20} sm={18} md={12} lg={10} xl={10}>
            <QuotationGenerator />
          </Col>
        </Row>
      ) : (
        <QuotationView />
      )}
    </BaseLayout>
  );
}

QuotationPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

QuotationPage.propTypes = {
  t: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  quote: state.quote
});

const mapDispatchToProps = (dispatch) => {
  return {
    // setIsLoggedIn: bindActionCreators(setIsLoggedIn, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation('common')(QuotationPage));
