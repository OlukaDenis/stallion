import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Card, Table, Divider, DatePicker, Pagination, Button, Row, Col, Select, Input, Checkbox, message, Alert } from 'antd';
import {
  SafetyOutlined,
  CalendarFilled,
  CreditCardFilled,
  NumberOutlined,
  LockFilled
} from '@ant-design/icons';
import BaseLayout from '../../components/layout';
import { withTranslation } from '../../utilities/i18n';
import SectionHeader from '../../components/SectionHeader';
const { Option } = Select;
const { TextArea } = Input;
const topMargin = { marginTop: 20 };
const inputStyle = { height: 45 };

const data = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i,
      orderId: `John Doe ${i}`,
      date: '2/3/2020',
      vehicle: `Golf 4849. ${i}`,
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
      payout: '$ 1090'
    });
  }
  console.log(data);

export function Available ({
  t,
  quote,
  theme,
}){

  const [selectedRows, setSelectedRows] = useState([])
  const columns = [
    {
      title: 'OrderID',
      dataIndex: 'orderId',
    },
    {
      title: 'Date',
      dataIndex: 'date',
    },
    {
      title: 'Vehicle',
      dataIndex: 'vehicle',
    },
    {
      title: 'Inop?',
      dataIndex: 'inop',
    },

    {
      title: 'Address',
      dataIndex: 'address1',
    },
    {
      title: 'City',
      dataIndex: 'city1',
    },
    {
      title: 'State',
      dataIndex: 'state1',
    },
    {
      title: 'Zip',
      dataIndex: 'zip1',
    },

    {
      title: 'Address',
      dataIndex: 'address2',
    },
    {
      title: 'City',
      dataIndex: 'city2',
    },
    {
      title: 'State',
      dataIndex: 'state2',
    },
    {
      title: 'Zip',
      dataIndex: 'zip2',
    },
    {
      title: 'Distance',
      dataIndex: 'distance',
    },
    {
      title: 'Payout',
      dataIndex: 'payout',
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
