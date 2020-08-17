import BaseLayout from '../components/layout';
import { withTranslation } from '../utilities/i18n';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Router } from '../utilities/i18n';
import { Card, Skeleton } from 'antd';
import { Row, Col, List, Divider, Popconfirm, Button } from 'antd';
import { DeleteOutlined, RightOutlined, LeftOutlined } from '@ant-design/icons';

export function DeliveryPage({
         t,
       }) {

        const { Meta } = Card;

         return (
           <BaseLayout>
             <section className="items-section">
               <Row gutter={[8, 8]} justify="center">
                 <Col xs={22} sm={20} md={11} lg={5} xl={5}>
                   <h1 className="cart-heading">Checkout</h1>
                 </Col>
                 <Col xs={0} sm={0} md={0} lg={5} xl={5}></Col>
                 <Col xs={0} sm={0} md={0} lg={5} xl={5}></Col>
                 <Col xs={0} sm={0} md={0} lg={5} xl={5}></Col>
               </Row>
               <Row gutter={[24, 32]} justify="center" className="items-row">
                 <Col xs={22} sm={20} md={14} lg={14} xl={14}>
                   <Card hoverable>
                     <h3 className="small-margin-h-divider">1. Address Details</h3>
                     <Divider className="small-margin-h-divider" />
                   </Card>
                 </Col>
                 <Col xs={0} sm={0} md={6} lg={6} xl={6}>
                   <Card hoverable>
                     <Skeleton loading={false} avatar active>
                       <Meta title="Your Order (6 Items)" description="Items" />
                     </Skeleton>
                   </Card>
                   <br />
                   <Card hoverable>
                     <Skeleton loading={false} avatar active>
                       <Meta title="Need Help?" description="Contact an expert to support you." />
                     </Skeleton>
                   </Card>
                 </Col>
               </Row>
               <Row gutter={[24, 32]} justify="center" className="items-row">
                 <Col xs={22} sm={20} md={20} lg={20} xl={20}>
                   <Row gutter={[24, 32]} justify="center" className="items-row">
                     <Col xs={0} sm={0} md={2} lg={4} xl={7}></Col>
                     <Col xs={0} sm={0} md={2} lg={4} xl={7}></Col>
                     <Col xs={24} sm={12} md={10} lg={8} xl={5}>
                       <Button
                         onClick={() => {
                           goToPage('/');
                         }}
                         shape="round"
                         size="large"
                         className="float-right"
                       >
                         <LeftOutlined />
                         {t('button.continue_shopping')}
                       </Button>
                     </Col>
                     <Col xs={24} sm={12} md={10} lg={8} xl={5}>
                       <Button
                         onClick={() => {
                           goToPage('/delivery');
                         }}
                         type="primary"
                         shape="round"
                         size="large"
                         className="float-right"
                       >
                         {t('button.proceed_to_checkout')} <RightOutlined />
                       </Button>
                     </Col>
                   </Row>
                 </Col>
               </Row>
             </section>
           </BaseLayout>
         );
       }

DeliveryPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

DeliveryPage.propTypes = {
  t: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => {
  return {
    // setIsLoggedIn: bindActionCreators(setIsLoggedIn, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation('common')(DeliveryPage));
