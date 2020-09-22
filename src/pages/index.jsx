import { useState } from 'react';
import BaseLayout from '../components/layout';
import { Button, Row, Col, Card, Image, Menu, Dropdown  } from 'antd';

import { Link, withTranslation } from '../utilities/i18n';
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
  width: '100%',
}

const advImg = {
  width: 80,
  height: 60,
}

const gridStyle = {
  width: '100%',
  textAlign: 'center',
  minHeight: 250,
};

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

            <Link href="#Quotation-Generator">
              <Button type="primary" shape="round" size="large">
                {t('button.quick_order')} <RightOutlined />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="items-section">        
        <Row justify="center">
            <Col xs={22} sm={22} md={22} lg={22} xl={22}>
        
            <section className="home-items">
              <article className="home-goal">
                <Row justify="center" gutter={[0, 30]}>
                  <Col xs={24} sm={24} md={22} lg={8} xl={8}>
                    <img alt="image" src="/images/image2.jpg" style={imgStyle} />
                  </Col>
                  <Col xs={24} sm={24} md={22} lg={16} xl={16}>
                    <Card>
                      <h2 className="s-heading" style={{ fontWeight: '900' }}>{t('page.home.our_goal')}</h2>
                      <p> {t('page.home.goal_info')}</p>
                      <p>
                        <b>{t('page.home.goal_headline')}</b>
                      </p>
                    </Card>
                  </Col>
              </Row>
              </article>

              <article className="home-qoute">
                <QuotationGenerator />
              </article>

              <article className="home-steps">
                <h2 className="custom-title s-heading">{t('page.home.shipping_steps')}</h2>
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
              </article>

              <article className="home-hero">
                <div className="quote-hero">
                    <div className="quote-hero-overlay">
                      <h1 style={{ fontSize: '2.5rem' }}>{t('page.home.quote_hero_title')}</h1>
                      <p style={{ fontSize: '1.1rem', margin: '20px 0' }}>{t('page.home.quote_hero_desc')}</p>
                      <Link href="#Quotation-Generator">
                        <Button type="primary" shape="round" size="large">
                          {t('button.quick_order')} <RightOutlined />
                        </Button>
                      </Link>
                    </div>
                </div>
              </article>

              <article className="home-advantage">
                <h2 className="custom-title s-heading">{t('page.home.advantage.title')}</h2>
                
                <Card>
                  <Row>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Card.Grid style={gridStyle}>
                    <img 
                      style={advImg}
                      src="images/advantage/factory.png"
                    />
                    <h3 className="advantage-title">{t('page.home.advantage.01.title')}</h3>
                    <p>{t('page.home.advantage.01.info')}</p>
                  </Card.Grid>
                  </Col>

                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Card.Grid style={gridStyle}>
                    <img 
                        style={advImg}
                        src="images/advantage/delivery.png"
                      />
                    <h3 className="advantage-title">{t('page.home.advantage.02.title')}</h3>
                    <p>{t('page.home.advantage.02.info')}</p>
                  </Card.Grid>
                  </Col>

                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Card.Grid style={gridStyle}>
                  <img 
                      style={advImg}
                      src="images/advantage/car.png"
                    />
                    <h3 className="advantage-title">{t('page.home.advantage.03.title')}</h3>
                    <p>{t('page.home.advantage.03.info')}</p>
                  </Card.Grid>
                  </Col>
                  
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Card.Grid style={gridStyle}>
                    <img 
                        style={advImg}
                        src="images/advantage/credit.png"
                      />
                    <h3 className="advantage-title">{t('page.home.advantage.04.title')}</h3>
                    <p>{t('page.home.advantage.04.info')}</p>
                  </Card.Grid>
                  </Col>

                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Card.Grid style={gridStyle}>
                    <img 
                        style={advImg}
                        src="images/advantage/office.png"
                      />
                    <h3 className="advantage-title">{t('page.home.advantage.05.title')}</h3>
                    <p>{t('page.home.advantage.05.info')}</p>
                  </Card.Grid>
                  </Col>

                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Card.Grid style={gridStyle}>
                    <img 
                      style={advImg}
                      src="images/advantage/location.png"
                    />
                    <h3 className="advantage-title">{t('page.home.advantage.06.title')}</h3>
                    <p>{t('page.home.advantage.06.info')}</p>
                  </Card.Grid>
                  </Col>
                  </Row>
                </Card>
              </article>
            </section>  

            </Col>     
        </Row>
        
        <Row justify="center" style={{marginTop: 20}} gutter={[10, 0]}>
          <Col xs={22} sm={22} md={7} lg={7} xl={7} style={{textAlign: 'center' }}>
          <div className="service-item">
           
            <div className="service-item-content">
              <h1>How it works</h1>
              <p>Find how Super Stallion makes vehicle shipping easy as 1-2-3</p>
              <Link href="/how-it-works">
                <Button type="primary" shape="round" size="medium">
                  {t('button.learn_more')}
                </Button>
              </Link>
            </div>             
          </div>
        </Col>

          <Col xs={22} sm={22} md={7} lg={7} xl={7} style={{textAlign: 'center' }}>
            <div className="service-item" >
              
                <div className="service-item-content">
                  <h1>Shipping Checklist</h1>
                  <p>A list of helpful and good to know tips for you to follow to prepare your vehicle</p>
                  <Link href="/how-it-works">
                    <Button type="primary" shape="round" size="medium">
                      {t('button.learn_more')}
                    </Button>
                  </Link>
                </div>              
            
            </div>
            </Col>

          <Col xs={22} sm={22} md={7} lg={7} xl={7} style={{ textAlign: 'center' }}>
            <div className="service-item">
              <div className="service-item-content">
                <h1>Our advantage</h1>
                <p>View the benefits and advantages of shipping with super stallion</p>
                <Link href="/how-it-works">
                  <Button type="primary" shape="round" size="medium">
                    {t('button.learn_more')}
                  </Button>
                </Link>
              </div>
            </div>
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
          .items-section {
            margin-top: 20px;
            padding: 20px;
          }

          .home-items {
            display: grid;
            grid-template-columns: 2fr 1fr;
            grid-column-gap: 30px;
            grid-row-gap: 20px;
          }

          .home-items .home-qoute {
            grid-row: auto / span 3;
          }

          .home-items .home-advantage {
            grid-column: auto / span 2;
          }

          .service-item {
            height: 260px;
            background-color: white;
            background-size: cover;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .service-item-content {
            padding: 20px 40px;
          }

          .service-item-content h1 {
            font-weight: 900;
            font-size: 1.5rem;
          }

          @media only screen and (max-width: 576px) {
            .top-section-content {
              padding-right: 1em;
            }

            .s-heading {
              font-size: 1.2em;
            }

            .home-items {
              display: flex;
              flex-direction: column;
            }
          }

          @media only screen and (min-width: 768px) and (max-width: 992px) {
              .home-items .home-hero {
                grid-column: auto / span 2;
              }

              .home-items {
                grid-column-gap: 20px;
                grid-row-gap: 20px;
              }

              .s-heading {
                font-size: 1.4em;
              }
          }

          @media only screen and (max-width: 720px) {
            .items-section {
              padding: 5px;
            }
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

          .home-hero {
            background-image: url('/images/bg2.jpg');
            background-size: cover;
          }

          .quote-hero {            
            height: 400px;
            width: 100%;
          }

          .quote-hero-overlay {
            background-color: rgba(255, 255, 255, 0.76);
            display: flex;
            flex-direction: column;
            padding: 2rem;
            width: 100%;
            height: 400px;
            left: 0;
            z-index: 10px;
            align-items: center;
            justify-content: center;
          }
          .custom-title {
            color: rgba(255, 255, 255, 0.9);
            background-color: #222;
            padding: 10px 20px;
            margin-bottom: 0;
          }

          .advantage-title {
            font-weight: bold;
          }

          .adv-grid {
            width: 100%;
            text-align: center;
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
