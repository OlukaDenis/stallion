import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import moment from 'moment';
import { Card, Table, Row, Col, Select, Input, Space, Button } from 'antd';
import Highlighter from 'react-highlight-words';

import firebase from 'firebase/app';
import 'firebase/firestore';

import BaseLayout from '../../components/layout';
import { withTranslation } from '../../utilities/i18n';
import { SearchOutlined } from '@ant-design/icons';
const { Option } = Select;

export function Available ({
  t,
  quote,
  theme,
}){

  const [selectedRows, setSelectedRows] = useState([]);
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [isLoadingStagedJobsPage, setIsLoadingStagedJobsPage] = useState('');

  const searchInputRef = useRef();

  useIsLoadingNewPage(isLoadingStagedJobsPage);

  useEffect(() => {
    if (isLoadingStagedJobsPage) setIsLoadingStagedJobsPage('');
  }, [isLoadingStagedJobsPage]);

  const stageSelectedJobs = async () => {
    setIsLoadingStagedJobsPage('/jobs/staged');
  }
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={(node) => {
              searchInputRef.current = node;
            }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value, record) =>
        record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '',
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInputRef.current.select(), 100);
        }
      },
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text
        ),
    });

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
      clearFilters();
      setSearchText('');
    };

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
      title: 'Job Info',
      children: [
        {
          title: 'OrderID',
          dataIndex: 'id',
          sorter: (a, b) => a.id - b.id,
          sortDirections: ['ascend', 'descend'],
        },
        {
          title: 'Date',
          dataIndex: 'pickupDate',
          sorter: (a, b) => (moment(a.pickupDate).isBefore(b.pickupDate) ? -1 : 1),
          sortDirections: ['ascend', 'descend'],
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
            !!Object.keys(cars).filter((index) => !cars[index].isOperable || !cars[index].hasKeys).length
              ? 'inop'
              : 'good',
          // sorter: (a, b) => a.id - b.id,
          // sortDirections: ['ascend', 'descend'],
        },
      ],
    },

    {
      title: 'Pickup Info',
      children: [
        {
          title: 'Address',
          dataIndex: 'pickupLocation',
          render: (location) => location.address,
          ...getColumnSearchProps('pickupLocation'),
        },
        {
          title: 'City',
          dataIndex: 'originName',
          render: (originName) => originName.split(',')[0],
          ...getColumnSearchProps('originName'),
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
          sorter: (a, b) => (a.origin.split(',')[1].split(' ')[2] - b.origin.split(',')[1].split(' ')[2] ? -1 : 1),
          sortDirections: ['ascend', 'descend'],
        },
      ],
    },
    {
      title: 'Delivery Info',
      children: [
        {
          title: 'Address',
          dataIndex: 'deliveryLocation',
          render: (location) => location.address,
          ...getColumnSearchProps('deliveryLocation'),
        },
        {
          title: 'City',
          dataIndex: 'destinationName',
          render: (destinationName) => destinationName.split(',')[0],
          ...getColumnSearchProps('destinationName'),
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
          sorter: (a, b) => a.destination.split(',')[1].split(' ')[2] - b.destination.split(',')[1].split(' ')[2],
          sortDirections: ['ascend', 'descend'],
        },
      ],
    },
    {
      title: '',
      children: [
        {
          title: 'Distance',
          dataIndex: 'distance',
          sorter: (a, b) => a.distance - b.distance,
          sortDirections: ['ascend', 'descend'],
        },
        {
          title: 'Payout',
          dataIndex: 'payment_authorized_amount',
          render: (amount) => '$' + amount,
          sorter: (a, b) => a.payment_authorized_amount - b.payment_authorized_amount,
          sortDirections: ['ascend', 'descend'],
        },
      ],
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
    <Row gutter={[16, 16]} style={{ paddingTop: 30 }} justify="center">
      <Col xs={24} sm={24} md={23} lg={23} xl={23}>
        <Card>
          <Row gutter={[8, 8]}>
            <Col md={24} lg={24} xl={24}>
              <div className="table__section">
                <h3>Available Auction Jobs</h3>
                  
                  <Table
                    bordered
                    scroll={{ x: true }}
                    pagination={{ position: ['bottomRight'] }}
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={data}
                  />
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
      `}
    </style>
  </BaseLayout>
);
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
