import { AutoComplete, Input } from 'antd';

import firebase from 'firebase/app';
import 'firebase/firestore';
import { useState, useEffect } from 'react';
import { AimOutlined } from '@ant-design/icons';

export default function LocationSelector({ icon, placeholder, onSelect }) {
  const [searchText, setSearchText] = useState('');
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (!searchText || typeof searchText === 'object') return;

    if (Number.isNaN(Number(searchText))) {
      searchByCityName(searchText.toUpperCase());
    } else {
      searchByZipCode(searchText);
    }
  }, [searchText]);

  const formatZipCodeValue = (zipCodeData) =>
    [zipCodeData.City, zipCodeData.State + ' ' + zipCodeData.Zipcode, 'USA'].join(', ');

  const formatZipCodeLabel = (zipCodeData) => (
    <div key={zipCodeData.Zipcode} className="location-option">
      <AimOutlined /> &nbsp;&nbsp; {formatZipCodeValue(zipCodeData)}
    </div>
  );

  const formatCityValue = (cityData) => [cityData.City, cityData.State, 'USA'].join(', ');

  const formatCityLabel = (cityData) => (
    <div className="location-option">
      <AimOutlined /> &nbsp;&nbsp; {formatCityValue(cityData)}
    </div>
  );

  const searchByZipCode = (zipCode) => {
    firebase
      .firestore()
      .collection('/zip_codes')
      .where('Zipcode', '>=', zipCode)
      .orderBy('Zipcode')
      .limit(6)
      .get()
      .then((data) => {
        const items = [];
        data.forEach((item) => {
          const zipCodeData = item.data();
          items.push({
            value: formatZipCodeValue(zipCodeData),
            label: formatZipCodeLabel(zipCodeData),
            key: zipCodeData.Zipcode,
          });
        });
        setOptions(items);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const searchByCityName = (cityName) => {
    firebase
      .firestore()
      .collection('/cities')
      .where('City', '>=', cityName)
      .where('City', '<=', cityName+'Z')
      .orderBy('City')
      .limit(6)
      .get()
      .then((data) => {
        const items = [];
        data.forEach((item) => {
          const cityData = item.data();
           items.push({ value: formatCityValue(cityData), label: formatCityLabel(cityData), key: cityData.Location });
        });
        setOptions(items);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <AutoComplete
      onSearch={(value) => {
        setSearchText(value);
      }}
      onSelect={onSelect}
      style={{ width: '100%' }}
      options={options}
    >
      <Input size="large" placeholder={placeholder} prefix={icon} />
    </AutoComplete>
  );
}
