import BaseLayout from '../components/layout';
import { Button, Row, Col } from 'antd';

import { withTranslation } from '../utilities/i18n';
import { Card } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { useState } from 'react';

import { Menu, Dropdown } from 'antd';
import PropTypes, { node } from 'prop-types';
import { bindActionCreators } from 'redux';
import { setIsLoadingNewPage } from '../state/ui/action';
import { connect } from 'react-redux';
import { QuotationGenerator } from '../components/QuotationGenerator';

import firebase from 'firebase/app';
import 'firebase/firestore';
import { firebaseTestConfig as firebaseConfig } from '../configs';

const { Meta } = Card;

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

// HomePage.getInitialProps = async () => {
//   return {
//     namespacesRequired: ['common'],
//   };
// };

export const getServerSideProps = async (context) => {
  const neatCsv = require('neat-csv');
  const fs = require('fs-extra');

  const rawData = await fs.readFile(
    '/Users/admin/Documents/PREMAR/super-stallion-logistics-website/potential_assets/cars/vehicles.csv'
  );

  const csvData = await neatCsv(rawData);

  const altFirebase = firebase.initializeApp(firebaseConfig, 'firebase_alt');

  console.log(csvData);

  const carMakeKeysArr = [];
  const carModelKeysArr = [];
  let carMakeKey;
  let carModelKey;

  csvData.map((data) => {
    // make: 'Rolls-Royce',
    // model: 'Brooklands/Brklnds L',
    const carMake = {
      year: data.year,
      make: data.make,
    };

    carMakeKey = [data.year, data.make].join('_');
    carMakeKey = carMakeKey.replace(/\//g, '_');

    if (carMakeKeysArr.indexOf(carMakeKey) < 0) {
      carMakeKeysArr.push(carMakeKey);
      altFirebase
        .firestore()
        .doc('/vehicle_makes/' + carMakeKey)
        .set(carMake, { merge: true })
        .then((success) => {
          console.log('carMakeKey', carMakeKey);
        })
        .catch((error) => {
          console.error('carMakeKey', carMakeKey);
        });
    }

    const carModel = {
      year: data.year,
      make: data.make,
      model: data.model,
    };

    carModelKey = [data.year, data.make, data.model].join('_');
    carModelKey = carModelKey.replace(/\//g, '_');
    if (carModelKeysArr.indexOf(carModelKey) < 0) {
      carModelKeysArr.push(carModelKey);
      altFirebase
        .firestore()
        .doc('/vehicle_models/' + carModelKey)
        .set(carModel, { merge: true })
        .then((success) => {
          console.log('carModelKey', carModelKey);
        })
        .catch((error) => {
          console.error('carModelKey', carModelKey);
        });
    }
  });

  console.log('CSV Length ', csvData.length);

  return {
    props: { namespacesRequired: ['common'], csvData: csvData.length },
  };
};

/*
{
    barrels08: '29.96454545454546',
    barrelsA08: '0.0',
    charge120: '0.0',
    charge240: '0.0',
    city08: '9',
    city08U: '0.0',
    cityA08: '0',
    cityA08U: '0.0',
    cityCD: '0.0',
    cityE: '0.0',
    cityUF: '0.0',
    co2: '-1',
    co2A: '-1',
    co2TailpipeAGpm: '0.0',
    co2TailpipeGpm: '807.9090909090909',
    comb08: '11',
    comb08U: '0.0',
    combA08: '0',
    combA08U: '0.0',
    combE: '0.0',
    combinedCD: '0.0',
    combinedUF: '0.0',
    cylinders: '8',
    displ: '6.8',
    drive: 'Rear-Wheel Drive',
    engId: '44001',
    eng_dscr: '(GUZZLER)  (FFS)      (MPFI)',
    feScore: '-1',
    fuelCost08: '3850',
    fuelCostA08: '0',
    fuelType: 'Premium',
    fuelType1: 'Premium Gasoline',
    ghgScore: '-1',
    ghgScoreA: '-1',
    highway08: '13',
    highway08U: '0.0',
    highwayA08: '0',
    highwayA08U: '0.0',
    highwayCD: '0.0',
    highwayE: '0.0',
    highwayUF: '0.0',
    hlv: '0',
    hpv: '0',
    id: '10087',
    lv2: '0',
    lv4: '12',
    make: 'Rolls-Royce',
    model: 'Brooklands/Brklnds L',
    mpgData: 'N',
    phevBlended: 'false',
    pv2: '0',
    pv4: '98',
    range: '0',
    rangeCity: '0.0',
    rangeCityA: '0.0',
    rangeHwy: '0.0',
    rangeHwyA: '0.0',
    trany: 'Automatic 4-spd',
    UCity: '11.1111',
    UCityA: '0.0',
    UHighway: '18.0',
    UHighwayA: '0.0',
    VClass: 'Midsize Cars',
    year: '1993',
    youSaveSpend: '-13250',
    guzzler: 'T',
    trans_dscr: '3MODE',
    tCharger: '',
    sCharger: '',
    atvType: '',
    fuelType2: '',
    rangeA: '',
    evMotor: '',
    mfrCode: '',
    c240Dscr: '',
    charge240b: '0.0',
    c240bDscr: '',
    createdOn: 'Tue Jan 01 00:00:00 EST 2013',
    modifiedOn: 'Tue Jan 01 00:00:00 EST 2013',
    startStop: '',
    phevCity: '0',
    phevHwy: '0',
    phevComb: '0'
  }
*/

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
