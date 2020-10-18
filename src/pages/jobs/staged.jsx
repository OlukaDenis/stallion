import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, Row, Col, Select } from 'antd';

import firebase from 'firebase/app';
import 'firebase/firestore';

import BaseLayout from '../../components/layout';
import { withTranslation } from '../../utilities/i18n';
const { Option } = Select;

export function StagedJobsPage({ t, quote, theme }) {
  const [data, setData] = useState([]);

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
            <Row gutter={[8, 8]}>
              <Col md={24} lg={24} xl={24}>
                <div className="table__section">
                  <h3>Staged Jobs</h3>
                  Something or other!
                  <Row gutter={[8, 8]} justify="center">
                    <span className="staged-item-number">99</span>
                    <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                      Col 1
                    </Col>
                    <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                      Col 2
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
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
            width: 20px;
            height: 20px;
            border-radius: 10px;
            background: #f63e0c;
            color: white;
            text-align: center;
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
