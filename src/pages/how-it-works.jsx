import React from 'react'
import { withTranslation, Link } from '../utilities/i18n';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BaseLayout from '../components/layout';
import { Button, Row, Col, Card, Image, Menu, Dropdown  } from 'antd';

const colStyle = {
  backgroundColor: 'white', 
  padding: 20,
  minHeight: 400,
  display: 'flex',
  alignItems: 'center',
}

const HowItWorks = ({t}) => {
  return (
    <BaseLayout>
      <Row gutter={[16, 16]} justify="center">
        <h2 style={{marginTop: 40, fontSize: '2rem', fontWeight: 'bold'}}>How it works</h2>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} >
          <Row justify="center">
            <Col style={colStyle} xs={22} sm={22} md={20} lg={11} xl={11}>
            <div className="step-image">
              <img 
              width="80%"
              height="80%"
              src="images/step1.png"
              />
              </div>
            </Col>

            <Col style={colStyle} xs={22} sm={22} md={20} lg={11} xl={11}>
              <div className="step-item">
                <h3>{t('page.how_it_works.step_one.name')}</h3>
                <h2>{t('page.how_it_works.step_one.title')}</h2>
                <p>{t('page.how_it_works.step_one.info')}</p>
                <div className="step-quoting">
                  <h4>{t('page.how_it_works.step_one.step_quote.title')}</h4>
                  <p>{t('page.how_it_works.step_one.step_quote.desc')}</p>
                </div>
              </div>
            </Col>
          </Row>

          <Row justify="center">
            
            <Col style={colStyle} xs={22} sm={22} md={20} lg={11} xl={11}>
              <div className="step-item">
                <h3>{t('page.how_it_works.step_two.name')}</h3>
                <h2>{t('page.how_it_works.step_two.title')}</h2>
                <p>{t('page.how_it_works.step_two.info')}</p>
                <div className="step-quoting">
                  <h4>{t('page.how_it_works.step_two.step_quote.title')}</h4>
                  <p>{t('page.how_it_works.step_two.step_quote.desc')}</p>
                </div>
              </div>
            </Col>

            <Col style={colStyle} xs={22} sm={22} md={20} lg={11} xl={11}>
              <div className="step-image">
                <img 
                width="80%"
                height="80%"
                src="images/step2.png"
                />
              </div>       
            </Col>

          </Row>

          <Row justify="center">
            <Col style={colStyle} xs={22} sm={22} md={20} lg={11} xl={11}>
            <div className="step-image">
              <img 
              width="80%"
              height="80%"
              src="images/step3.png"
              />
              </div>
            </Col>

            <Col style={colStyle} xs={22} sm={22} md={20} lg={11} xl={11}>
              <div className="step-item">
              <h3>{t('page.how_it_works.step_three.name')}</h3>
                <h2>{t('page.how_it_works.step_three.title')}</h2>
                <p>{t('page.how_it_works.step_three.info')}</p>
                <div className="step-quoting">
                  <h4>{t('page.how_it_works.step_three.step_quote.title')}</h4>
                  <p>{t('page.how_it_works.step_three.step_quote.desc')}</p>
                </div>
              </div>
            </Col>
          </Row>
          
        </Col>
      </Row>

      <style jsx >
        {
          `
            .step-item h3{
              text-transform: uppercase;
              font-size: 1.1em;
              font-weight: lighter;
            }

            .step-item h2 {
              font-weight: bold;
            }

            .step-quoting {
              border-left: 4px solid #f78b6d;
              padding-left: 1.5em;
              background-color: rgba(255, 231, 225, 0.3);
              padding: 10px 10px 10px 20px;
            }
          `
        }
      </style>
  </BaseLayout>
  )
}

HowItWorks.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

HowItWorks.propTypes = {
  t: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    // setIsLoggedIn: bindActionCreators(setIsLoggedIn, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation('common')(HowItWorks));
