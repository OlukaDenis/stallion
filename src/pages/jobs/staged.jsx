import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, Row, Col, Select, Input, Button } from 'antd';

import firebase from 'firebase/app';
import 'firebase/firestore';

import BaseLayout from '../../components/layout';
import { withTranslation } from '../../utilities/i18n';
import TextArea from 'antd/lib/input/TextArea';
const { Option } = Select;

export function StagedJobsPage({ t, quote, theme }) {
  const [data, setData] = useState([]);

  const columnStyle = {
    backgroundColor: 'rgba(248, 105, 66, 0.3)',
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingTop: '0px',
    paddingBottom: '35px',
  };

  const fetchData = () => {
    firebase
      .firestore()
      .collection('/orders')
      .where('terms_accepted', '==', true)
      .get()
      .then((response) => {
        const newData = [];
        let order;
        response.forEach((snapshot) => {
          order = snapshot.data();
          order.key = order.order_id;
          // for(let i = 1; i < 40; i++) {
          //   order = snapshot.data();
          //   order.key = order.order_id + ('' + i);
          //   newData.push(order);
          // }
          newData.push(order);
        });
        // console.log(order);
        setData(newData);
      })
      .catch((error) => {});
  };

  return (
    <BaseLayout>
      <Row gutter={[16, 16]} style={{ paddingTop: 30 }} justify="center">
        <Col xs={24} sm={24} md={23} lg={23} xl={23}>
          <Card>
            <div className="table__section">
              <h3>Staged Jobs (3)</h3>
              <Row gutter={[0, 0]} justify="center">
                <Col
                  style={{ ...columnStyle, paddingTop: '20px', position: 'relative' }}
                  xs={24}
                  sm={24}
                  md={10}
                  lg={10}
                  xl={8}
                >
                  <div className="staged-item-number">99</div>
                  Order #: <b>909090</b>
                </Col>
                <Col style={{ ...columnStyle, paddingTop: '20px' }} xs={24} sm={24} md={10} lg={10} xl={8}>
                  Vehicle: <b>2020 Toyota Hilux</b>
                  <br />
                  Vehicle: <b>1985 Mercedes Benz C100</b>
                </Col>
              </Row>
              <Row gutter={[0, 0]} justify="center">
                <Col style={{ ...columnStyle }} xs={24} sm={24} md={10} lg={10} xl={8}>
                  <h4>Pickup</h4>
                  Kelvin Kinyunye
                  <br />
                  21886-00100, Nairobi
                  <br />
                  Washington, Washington, D.C., United States of America
                  <br />
                  <br />
                  <h4>Pickup Instructions:</h4>
                  <TextArea
                    disabled
                    style={{ backgroundColor: 'rgba(248, 105, 66, 0.1)', color: 'black' }}
                    rows={5}
                    value={'What the user said about the pickup.'}
                  />
                </Col>
                <Col style={{ ...columnStyle }} xs={24} sm={24} md={10} lg={10} xl={8}>
                  <h4>Delivery</h4>
                  Kelvin Kinyunye
                  <br />
                  21886-00100, Nairobi
                  <br />
                  Washington, Washington, D.C., United States of America
                  <br />
                  <br />
                  <h4>Delivery Instructions:</h4>
                  <TextArea
                    disabled
                    style={{ backgroundColor: 'rgba(248, 105, 66, 0.1)', color: 'black' }}
                    rows={5}
                    value={'What the user said about the delivery.'}
                  />
                </Col>
              </Row>
              <Row gutter={[0, 0]} justify="center">
                <Col style={{ ...columnStyle }} xs={24} sm={24} md={10} lg={10} xl={8}>
                  <div className="date-item-block">
                    <div className="date-item-child">
                      <b>Pickup Date: </b>
                    </div>{' '}
                    <div className="date-item-child">
                      <Input size="small" value={'2020-10-31'} />
                    </div>
                  </div>
                </Col>
                <Col style={{ ...columnStyle }} xs={24} sm={24} md={10} lg={10} xl={8}>
                  <div className="date-item-block">
                    <div className="date-item-child">
                      <b>Delivery Date: </b>
                    </div>{' '}
                    <div className="date-item-child">
                      <Input size="small" value={'2020-11-08'} />
                    </div>
                  </div>
                  <em>Suggested delivery date: 2020-11-08</em>
                </Col>
              </Row>
              <Row gutter={[0, 0]} justify="center">
                <Col style={{ ...columnStyle }} xs={24} sm={24} md={8} lg={8} xl={6}>
                  <div className="date-item-block">
                    <div className="date-item-child">
                      <b>Payout $</b>
                    </div>{' '}
                    <div className="date-item-child">
                      <Input size="small" value={'542.00'} />
                      <span style={{ fontSize: '11px' }}>
                        <em>Asking: $360.00</em>
                        <br />
                        <em>Distance: 340 miles</em>
                      </span>
                    </div>
                  </div>
                </Col>
                <Col style={{ ...columnStyle }} xs={24} sm={24} md={12} lg={12} xl={10}>
                  <div className="date-item-block">
                    <div className="date-item-child">
                      <b>Comments: </b>
                    </div>{' '}
                    <div className="date-item-child">
                      <Input size="small" value={'Some comments...'} />
                    </div>
                  </div>
                </Col>
              </Row>
              <Row gutter={[0, 0]} justify="center">
                <Col style={{ ...columnStyle, textAlign: 'center' }} xs={24} sm={24} md={20} lg={20}  xl={16}>
                  <Button type="primary">Submit</Button>&nbsp;&nbsp;&nbsp;
                  <Button type="default">Unstage Job</Button>
                </Col>
              </Row>
              <Row gutter={[0, 0]} justify="center">
                <Col
                  style={{ ...columnStyle, textAlign: 'center', fontSize: '11px' }}
                  xs={24}
                  sm={24}
                  md={20}
                  lg={20}
                   xl={16}
                >
                  This job will remain staged until <b>07-14-2020 8:27 PM</b> (US/Eastern)
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
      </Row>

      <style jsx>
        {`
          .table__section h3 {
            color: white;
            background: #111;
            padding: 0.4rem 1rem;
            display: flex;
            box-sizing: border-box;
            font-weight: 900;
          }
          .staged-item-number {
            position: absolute;
            z-index: 1;
            width: 28px;
            height: 28px;
            border: 4px solid white;
            border-radius: 14px;
            background: #f63e0c;
            color: white;
            text-align: center;
            margin-left: -35px;
            margin-top: -10px;
          }
          .date-item-block {
            display: flex;
          }
          .date-item-block div:nth-child(1) {
            flex: 2;
          }
          .date-item-block div:nth-child(2) {
            flex: 3;
          }
        `}
      </style>
    </BaseLayout>
  );
}

StagedJobsPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

StagedJobsPage.propTypes = {
  t: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  quote: state.quote,
  theme: state.ui.theme,
});

export default connect(mapStateToProps, null)(withTranslation('common')(StagedJobsPage));
