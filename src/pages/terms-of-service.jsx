import BaseLayout from '../components/layout';
import { withTranslation } from '../utilities/i18n';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Router } from '../utilities/i18n';
import { Card, Skeleton } from 'antd';
import { Row, Col, List, Divider, Popconfirm, Button } from 'antd';
import { DeleteOutlined, RightOutlined, LeftOutlined } from '@ant-design/icons';

export function TermsOfServicePage({ t }) {
  const { Meta } = Card;

  return (
    <BaseLayout>
      <Row gutter={[16, 16]} style={{paddingTop: 50}} justify="center">
        <Col xs={20} sm={18} md={10} lg={6} xl={6}>
          {'Work in Progress'}
        </Col>
      </Row>
    </BaseLayout>
  );
}

TermsOfServicePage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

TermsOfServicePage.propTypes = {
  t: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    // setIsLoggedIn: bindActionCreators(setIsLoggedIn, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation('common')(TermsOfServicePage));
