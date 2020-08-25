import BaseLayout from '../components/layout';
import { withTranslation } from '../utilities/i18n';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Router } from '../utilities/i18n';
import { Card, Skeleton } from 'antd';
import { Row, Col, List, Divider, Popconfirm, Button } from 'antd';
import { DeleteOutlined, RightOutlined, LeftOutlined } from '@ant-design/icons';
import QuotationGenerator from '../components/QuotationGenerator';

export function QuotationPage({ t }) {
  const { Meta } = Card;

  return (
    <BaseLayout>
      <Row gutter={[16, 16]} justify="center">
        <Col xs={20} sm={18} md={12} lg={10} xl={10}>
          <QuotationGenerator />
        </Col>
      </Row>
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
