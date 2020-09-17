import BaseLayout from '../components/layout';
import { withTranslation } from '../utilities/i18n';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Router } from '../utilities/i18n';
import { Card, Skeleton } from 'antd';
import { Row, Col, List, Divider, Popconfirm, Button } from 'antd';
import { DeleteOutlined, RightOutlined, LeftOutlined } from '@ant-design/icons';

export function PrivacyPolicyPage({ t }) {
  const { Meta } = Card;

  return (
    <BaseLayout> 
    <Row justify="center">
      <Card style={{width: '90%'}}>
        <Row gutter={[16, 16]} justify="center">

          <Col xs={22} sm={22} md={22} lg={22} xl={22}> 
            <div> 
              <h1>RoadRunner Auto Transport Privacy Policy</h1>
              <Divider />

              <p>
              RoadRunner Auto Transport (“RoadRunner”) understands that your privacy is important to you and to us. As part of the normal operation of RoadRunner’s services, we collect and, in some cases, disclose information about you to third parties. This privacy policy (“Privacy Policy”) shows you what information we gather from you and how we protect it. By using this website and the content contained therein (“Site”) and our services, you consent to the terms described in the most recent version of this Privacy Policy. You should also read our Terms of Use to understand the general rules about your use of this Site, and any additional terms that may apply when you access particular services or materials on certain areas of this Site. “We,” “our” means RoadRunner and its affiliates. “You,” “your,” visitor,” or “user” means the individual accessing this site and our services. This Privacy Policy is incorporated into and subject to the terms of the RoadRunner’s Site Terms of Use.
              </p>
              
              <h3>Minors</h3>
              <p>
              This Site is not directed towards children. If you are a minor (under the age of 18), you can use this service only with the consent of your parents or legal guardians. If you are a minor, please do not submit any personal information to this Site. IF YOU ARE 13 YEARS OR YOUNGER, PLEASE DO NOT USE THIS SITE OR ANY OF ITS SERVICES FOR ANY PURPOSE AT ANY TIME. This Site is not intended for any children under the age of 13.
              </p>
            </div>      
          </Col>
        
        </Row>
      </Card> 
      </Row>
    </BaseLayout>
  );
}

PrivacyPolicyPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

PrivacyPolicyPage.propTypes = {
  t: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    // setIsLoggedIn: bindActionCreators(setIsLoggedIn, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation('common')(PrivacyPolicyPage));
