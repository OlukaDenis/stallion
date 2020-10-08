import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Card, Table, DatePicker, Pagination, Button, Row, Col, Select, Input } from 'antd';

import firebase from 'firebase/app';
import 'firebase/firestore';

import BaseLayout from '../../components/layout';
import { withTranslation } from '../../utilities/i18n';
const { Option } = Select;

const data = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i,
      orderId: `John Doe ${i}`,
      date: '2/3/2020',
      vehicle: `Golf 4849 ${i}`,
      inop: 'good',
      address1: 'Spring Road',
      city1: 'Kampala',
      state1: 'Nakawa',
      zip1: '2939',
      address2: 'Spring Road',
      city2: 'Kampala',
      state2: 'Nakawa',
      zip2: '2939',
      distance: '10km',
      payout: '$1090'
    });
  }
  // console.log(data);

export function Available ({
  t,
  quote,
  theme,
}){

  const [selectedRows, setSelectedRows] = useState([]);
  const [data, setData] = useState([]);

  const fetchData = () => {
    firebase.firestore().collection('/orders')
    .get()
    .then(response => {
      const newData = [];
      let car;
      response.forEach(snapshot => {
        car = snapshot.data(); 
        newData.push(car);
      });
      console.log(car);
      setData(newData);
    })
    .catch(error => {

    })
  }

  useEffect(() => {
    fetchData();
  }, [])

  const columns = [
    {
      title: 'OrderID',
      dataIndex: 'id',
    },
    {
      title: 'Date',
      dataIndex: 'pickupDate',
    },
    {
      title: 'Vehicle',
      dataIndex: 'cars',
      render: (cars) => cars[0].make + ' ' + cars[0].model + ' ' + cars[0].year,
    },
    {
      title: 'Inop?',
      dataIndex: 'cars',
      render: (cars) =>
        !!Object.keys(cars).filter((index) => !cars[index].isOperable || !cars[index].hasKeys).length ? 'inop' : 'good',
    },

    {
      title: 'Address',
      dataIndex: 'pickupLocation',
      render: (location) => location.address,
    },
    {
      title: 'City',
      dataIndex: 'originName',
      render: (originName) => originName.split(',')[0],
    },
    {
      title: 'State',
      dataIndex: 'origin',
      render: (origin) => origin.split(',')[1].split(' ')[1],
    },
    {
      title: 'Zip',
      dataIndex: 'origin',
      render: (origin) => origin.split(',')[1].split(' ')[2],
    },

    {
      title: 'Address',
      dataIndex: 'deliveryLocation',
      render: (location) => location.address,
    },
    {
      title: 'City',
      dataIndex: 'destinationName',
      render: (destinationName) => destinationName.split(',')[0],
    },
    {
      title: 'State',
      dataIndex: 'destination',
      render: (destination) => destination.split(',')[1].split(' ')[1],
    },
    {
      title: 'Zip',
      dataIndex: 'destination',
      render: (destination) => destination.split(',')[1].split(' ')[2],
    },
    {
      title: 'Distance',
      dataIndex: 'distance',
    },
    {
      title: 'Payout',
      dataIndex: 'payment_authorized_amount',
      render: (amount) => '$' + amount,
    },
  ];

  const onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRows(selectedRowKeys);
  };

  const rowSelection = {
    selectedRows,
    onChange: onSelectChange,
  }

return (
  <BaseLayout>
    <Row gutter={[16, 16]} style={{paddingTop: 30}} justify="center">
      <Col xs={24} sm={24} md={23} lg={23} xl={23} >
        <Card>
          <Row gutter={[8, 20]}>
            <Col md={8} lg={8} xl={8} >
              <div className="dates__section">
                <div>
                  <p>Start Date</p>
                    <DatePicker
                        placeholder="mm/dd/yyy"
                        size="small"
                        showToday={true}
                        style={{ width: '100%'}}
                      />
                </div> 

                <div>
                  <p>End Date</p>
                    <DatePicker
                        placeholder="mm/dd/yyy"
                        size="small"
                        showToday={true}
                        style={{ width: '100%'}}
                      />
                </div> 

              </div> 
            </Col>  
            <Col md={13} lg={13} xl={13}>
              <div className="filters__section">
                <div>
                  <p>Pickup state</p>
                  <Select defaultValue="any" style={{ width: '100%' }}>
                    <Option disabled value="any">Any</Option>
                    <Option>//Todo</Option>
                    <Option>//Todo</Option>
                    <Option>//Todo</Option>
                  </Select>
                </div>

                <div>
                  <p>Delivery state</p>
                  <Select defaultValue="any" style={{ width: '100%' }}>
                    <Option disabled value="any">Any</Option>
                    <Option>//Todo</Option>
                    <Option>//Todo</Option>
                    <Option>//Todo</Option>
                  </Select>
                </div>

                <div>
                  <p>Search</p>
                  <Input 
                   placeholder="Search here..."
                   style={{ width: '100%'}}
                   />
                </div>

                <div>
                  <Button
                   type="primary"
                   shape="square"
                   style={{ width: '100%' }}
                    size="large">
                    Filter
                  </Button>
                </div>
              </div>
            </Col>  
            <Col md={3} lg={3} xl={3} >
              <div style={{display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center'}}>
                <Button
                  type="primary"
                  shape="square"
                  style={{ width: '100%' }}
                  size="large">
                    Export CSV
                </Button>
              </div>  
            </Col>  
          </Row>        
          <Row gutter={[8, 8]}>
            <Col md={24} lg={24} xl={24}>
              <div>
                  <Button
                    type="primary"
                    shape="square"
                    style={{marginBottom: 20}}
                    size="medium">
                    Select Jobs
                  </Button>

                  <div className="sorting__section">
                    <div className="job__sorting">
                      <p className="total__jobs"  style={{marginRight: '1em'}}>
                        Showing
                        <span><b> 100 </b></span>
                        of
                        <span><b> 500 </b></span>
                      </p>
                      
                      <div>
                        <span style={{marginRight: 4}}>Sort</span>
                        <Select defaultValue="job" size="small">
                          <Option value="job">JobID</Option>
                          <Option>//Todo</Option>
                          <Option>//Todo</Option>
                          <Option>//Todo</Option>
                        </Select>
                      </div>

                      <div>
                        <span style={{marginRight: 4}}>Dir</span>
                        <Select defaultValue="asc" style={{height: 30}} size="small" >
                          <Option value="asc">ASC</Option>
                          <Option  value="asc">DESC</Option>
                        </Select>
                      </div>

                      <div>
                        <Button
                          type="primary"
                          shape="square"
                          style={{marginBottom: 20}}
                          size="small">
                          Sort
                        </Button>
                      </div>
                    </div>
                    <div className="pagination__section">
                      <Pagination size="small" total={50} showSizeChanger showQuickJumper />
                    </div>
                  </div>
              </div>
            </Col>
          </Row>        
          <Row gutter={[8, 8]} >
            <Col  md={24} lg={24} xl={24}>
            <div className="table__section">
              <h3>Available Auction Jobs</h3> 

              <div className="jobs__table_list">
                <Row justify="center">
                <Col md={1} lg={1} xl={1} style={{border: '1px solid #ccc'}}></Col>
                  <Col md={7} lg={7} xl={7} style={{border: '1px solid #ccc'}}>
                    <div className="table__head">
                      <p>Job Info</p>
                    </div>
                  </Col>
                  <Col  md={7} lg={6} xl={6} style={{border: '1px solid #ccc'}}>
                  <div className="table__head">
                      <p>Pickup Info</p>
                    </div>
                  </Col>
                  <Col md={6} lg={6} xl={6} style={{border: '1px solid #ccc'}}>
                  <div className="table__head">
                      <p>Delivery Info</p>
                    </div>
                  </Col>
                  <Col md={4} lg={4} xl={4} style={{border: '1px solid #ccc'}}></Col>
                </Row>
                <Table pagination={{position: ['bottomLeft', 'bottomLeft']}} rowSelection={rowSelection} columns={columns} dataSource={data} />
              </div> 
            </div>
            </Col>
             
          </Row>        
        </Card>
      </Col>
    </Row>

    <style jsx>
      {
        `
          .dates__section,
          .filters__section {
            display:flex;
            flex-direction: row;
            align-items: center;
          }

          .dates__section div ,
          .filters__section div {
            margin: 6px;
            width: 100%;
          }

          .dates__section div > p,
          .filters__section div > p {
            margin: 0;
            font-size: 0.8em;
          }

          .sorting__section {
            width: 100%;
            display:flex;
            flex-direction: row;
            justify-content: space-between;
          }

          .job__sorting {
            display: inline-flex;
          }

          .job__sorting div {
            margin-left: 6px;
            margin-right: 6px;
          }

          .table__section {
            
          }

          .table__section h3 {
            color: white;
            background: #111;
            padding: 0.4rem 1rem;
            display: flex;
            box-sizing: border-box;
            font-weight: 900;
          }

          .table__head {
            text-align: center;
          }

          .table__head p {
            margin: 0;
          }
        `
      }
    </style>
  </BaseLayout>
)
}

Available.getInitialProps = async () => ({
namespacesRequired: ['common'],
});

Available.propTypes = {
t: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
quote: state.quote,
theme: state.ui.theme,
});

export default connect(mapStateToProps, null)(withTranslation('common')(Available));
