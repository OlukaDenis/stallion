import { Select, Button } from 'antd';
const { Option } = Select;
import firebase from 'firebase/app';
import 'firebase/firestore';
import { useState, useEffect } from 'react';

export default function CarSelector({ onYearChange, onMakeChange, onModelChange }) {
  const [year, setYear] = useState('');
  const [make, setMake] = useState('label');
  const [makes, setMakes] = useState([]);
  const [model, setModel] = useState('label');
  const [models, setModels] = useState([]);

  const years = [];
  const currentYear = new Date().getFullYear();
  for (let i = currentYear; i >= 1904; i--) {
    years.push(''+i);
  }

  useEffect(() => {
    firebase
      .firestore()
      .collection('/vehicle_makes')
      .where('year', '==', year)
      .orderBy('make')
      .get()
      .then((data) => {
        const items = [];
        data.forEach((item) => {
          const carMakeData = item.data();
          items.push({
            value: carMakeData.make,
            label: carMakeData.make,
            key: carMakeData.make,
          });
        });
        setMakes(items);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [year]);

  useEffect(() => {
    firebase
      .firestore()
      .collection('/vehicle_models')
      .where('year', '==', year)
      .where('make', '==', make)
      .orderBy('model')
      .get()
      .then((data) => {
        const items = [];
        data.forEach((item) => {
          const carModelData = item.data();
          items.push({
            value: carModelData.model,
            label: carModelData.model,
            key: carModelData.model,
          });
        });
        setModels(items);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [make]);

  const onYearSelected = (value) => {
    setYear(value);
    onYearChange(value);
    setMake('label');
    setModel('label');
  };

  const onMakeSelected = (value) => {
    setMake(value);
    onMakeChange(value);
    setModel('label');
  };

  const onModelSelected = (value) => {
    setModel(value);
    onModelChange(value);
  };

  return (
    <div className="car-selector">
      <Select
        onSelect={onYearSelected}
        size="large"
        defaultValue={'label'}
        placeholder="Year →"
        style={{ width: '100%' }}
      >
        <Option disabled key="label" value="label">
          Year →
        </Option>
        {years.map((year) => (
          <Option key={year} value={year}>
            {year}
          </Option>
        ))}
      </Select>
      
      
      <Select onSelect={onMakeSelected} size="large" value={make} placeholder="Make →" style={{ width: '100%' }}>
        <Option disabled key="label" value="label">
          Make →
        </Option>
        {makes.map((data) => (
          <Option key={data.key} value={data.value}>
            {data.label}
          </Option>
        ))}
      </Select>
      
      
      <Select onSelect={onModelSelected} size="large" value={model} placeholder="Model →" style={{ width: '100%' }}>
        <Option disabled key="label" value="label">
          Model →
        </Option>
        {models.map((data) => (
          <Option key={data.key} value={data.value}>
            {data.label}
          </Option>
        ))}
      </Select>
      <style jsx global>
        {`
        .car-selector {
          border: 0.5px solid gray;
          padding: 5px;
        }
        `}
      </style>
    </div>
  );
}
