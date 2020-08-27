import BaseLayout from '../components/layout';
import { Button, Row, Col } from 'antd';

import { withTranslation } from '../utilities/i18n';
import { Card } from 'antd';
import { RightOutlined, } from '@ant-design/icons';
import { useState } from 'react';

import { Menu, Dropdown } from 'antd';
import PropTypes, { node } from 'prop-types';
import { bindActionCreators } from 'redux';
import { setIsLoadingNewPage } from '../state/ui/action';
import { connect } from 'react-redux';
import { QuotationGenerator } from '../components/QuotationGenerator';

const { Meta } = Card;

import firebase from 'firebase/app';
import 'firebase/firestore';
import { firebaseTestConfig as firebaseConfig } from '../configs';

export function HomePage({ t, setIsLoadingNewPage, theme: themeMode }) {
         const [isItemLoading, setIsItemLoading] = useState(false);

         return (
           <BaseLayout>
             <section className="top-section">
               <div className="top-section-overlay"></div>
               <div className="top-section-content vertical-center-div">
                 <div>
                   <h1 className={`${themeMode == 'light' ? 'white-text' : 'off-white-text'} intro-text`}>
                     {t('page.home.title')}
                   </h1>
                   <h3 className={`${themeMode == 'light' ? 'white-text' : 'off-white-text'} intro-sub-text`}>
                     {t('page.home.subtitle')}
                   </h3>

                   <Button type="primary" shape="round" size="large">
                     {t('button.quick_order')} <RightOutlined />
                   </Button>
                 </div>
               </div>
             </section>

             <section className="items-section">
               <Row gutter={[16, 16]} justify="center">
                 <Col xs={0} sm={0} md={12} lg={14} xl={16}>
                   {'Work in Progress: '}
                 </Col>
                 <Col xs={20} sm={20} md={10} lg={8} xl={6}>
                   <QuotationGenerator />
                 </Col>
               </Row>
             </section>

             <style jsx>
               {`
                 .top-section {
                   min-height: 400px;
                   width: 100%;
                   background-color: rgba(1.6, 0.8, 0.8, 0);
                   background-position: bottom center;
                   background-repeat: no-repeat;
                   background-size: cover;
                   position: relative;
                 }
                 .top-section-content {
                   height: 100%;
                   width: 100%;
                   top: 0;
                   left: 0;
                   position: absolute;
                   text-align: center;
                   padding: 1em;
                   padding-right: 80px;
                 }
                 @media only screen and (max-width: 576px) {
                   .top-section-content {
                     padding-right: 1em;
                   }
                 }
                 .items-section {
                   margin-top: 20px;
                   padding: 20px;
                 }
                 @media only screen and (min-width: 576px) and (max-width: 720px) {
                   .items-section {
                     padding-right: 100px;
                   }
                 }
                 .top-section-overlay {
                   background-color: #04081d;
                   opacity: 0.68;
                   height: 100%;
                   width: 100%;
                   top: 0;
                   left: 0;
                   position: absolute;
                 }
                 .intro-text {
                   font-size: 5em;
                   margin-bottom: 0em;
                 }
                 .intro-sub-text {
                   font-size: 2em;
                   margin-bottom: 2em;
                   font-weight: 300;
                 }
                 .principles,
                 .services {
                   background-color: white;
                 }
                 .principles h2,
                 .services h2 {
                   padding: 10px;
                 }
                 .principles-text {
                   font-weight: 300;
                   font-size: 18px;
                   line-height: 1.5em;
                   padding: 10px;
                 }

                 .principles img {
                   height: 96%;
                   padding: 2%;
                 }

                 .card-cover-picture img {
                   max-width: 100%;
                 }

                 @media only screen and (max-width: 410px) {
                   .intro-text {
                     font-size: 3em;
                     margin-bottom: 0em;
                   }
                   .intro-sub-text {
                     font-size: 1.6em;
                     margin-bottom: 2em;
                     font-weight: 300;
                   }
                 }
               `}
             </style>
           </BaseLayout>
         );
       }

HomePage.getInitialProps = async () => {
  return {
    namespacesRequired: ['common'],
  };
};

HomePage.propTypes = {
  t: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  theme: state.ui.theme,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setIsLoadingNewPage: bindActionCreators(setIsLoadingNewPage, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation('common')(HomePage));
