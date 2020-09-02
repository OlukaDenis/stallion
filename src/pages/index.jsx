import { useState } from 'react';
import BaseLayout from '../components/layout';
import { Button, Row, Col, Card, Image, Menu, Dropdown  } from 'antd';

import { withTranslation } from '../utilities/i18n';
import { RightOutlined, } from '@ant-design/icons';
import PropTypes, { node } from 'prop-types';
import { bindActionCreators } from 'redux';
import { setIsLoadingNewPage } from '../state/ui/action';
import { connect } from 'react-redux';
import QuotationGenerator from '../components/QuotationGenerator';

const { Meta } = Card;

const imgStyle = {
  objectFit: 'cover',
  height: '100%',
  width: '100%'
}
export function HomePage({ t, setIsLoadingNewPage, theme: themeMode }) {
  const [isItemLoading, setIsItemLoading] = useState(false);
  const [key, setKey] = useState('step1');

  const tabListNoTitle = [
    {
      key: 'step1',
      tab: 'Step 1',
    },
    {
      key: 'step2',
      tab: 'Step 2',
    },
    {
      key: 'step3',
      tab: 'Step 3',
    },
  ];

  const contentListNoTitle = {
    step1: 
      <div>
        <h2> {t('page.home.step1.title')}</h2>
        <p>{t('page.home.step1.desc')}</p>
      </div>,
    step2: 
      <div>
        <h2>{t('page.home.step2.title')}</h2>
        <p>{t('page.home.step2.desc')}</p>
      </div>,
    step3:
      <div>
        <h2>{t('page.home.step3.title')}</h2>
        <p>{t('page.home.step3.desc')} </p>
      </div>,
  };

  const onTabChange = (key, type) => {
    console.log(key, type);
    setKey(key);
  };

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
          <Col xs={20} sm={20} md={12} lg={14} xl={16}>
            <Row gutter={[0, 30]}>
              <Col xs={20} sm={20} md={20} lg={8} xl={8}>
                <img alt="image" src="/images/image2.jpg" style={imgStyle} />
              </Col>
              <Col xs={20} sm={20} md={20} lg={14} xl={14}>
                <Card>
                  <h2 style={{ fontWeight: '900' }}>{t('page.home.our_goal')}</h2>
                  <p> {t('page.home.goal_info')}</p>
                  <p>
                    <b>{t('page.home.goal_headline')}</b>
                  </p>
                </Card>
              </Col>
            </Row>
            <Row gutter={[0, 30]}>
              <Col xs={20} sm={20} md={20} lg={22} xl={22}>
                <h2 className="steps-title">{t('page.home.shipping_steps')}</h2>
                <Card
                  style={{ width: '100%' }}
                  tabList={tabListNoTitle}
                  activeTabKey={key}
                  onTabChange={(key) => {
                    onTabChange(key, 'key');
                  }}
                >
                  {contentListNoTitle[key]}
                </Card>
              </Col>
            </Row>
            <Row gutter={[0, 30]}>
              <Col xs={20} sm={20} md={20} lg={22} xl={22}>
                <div className="quote-hero">
                  <div className="quote-hero-overlay">
                    <h1 style={{ fontSize: '2.5rem' }}>{t('page.home.quote_hero_title')}</h1>
                    <p style={{ fontSize: '1.1rem', margin: '20px 0' }}>{t('page.home.quote_hero_desc')}</p>
                    <Button type="primary" shape="round" size="large">
                      {t('button.quick_order')} <RightOutlined />
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
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

          .quote-hero {
            background-image: url('/images/bg2.jpg');
            background-size: cover;
            height: 400px;
          }

          .quote-hero-overlay {
            background-color: rgba(255, 255, 255, 0.76);
            display: flex;
            flex-wrap: wrap;
            padding: 2rem;
            width: 100%;
            height: 400px;
            left: 0;
            position: absolute;
            justify-content: center;
            flex-direction: column;
            align-items: center;
          }
          .steps-title {
            color: rgba(255, 255, 255, 0.9);
            background-color: #222;
            padding: 10px 20px;
            margin-bottom: 0;
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
