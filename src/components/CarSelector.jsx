import { Select, Button, Checkbox } from 'antd';
const { Option } = Select;
import firebase from 'firebase/app';
import 'firebase/firestore';
import { useState, useEffect } from 'react';

export default function CarSelector({ onYearChange, onMakeChange, onModelChange, addCarToQuote }) {
  const [year, setYear] = useState('');
  const [make, setMake] = useState('label');
  const [makes, setMakes] = useState([]);
  const [model, setModel] = useState('label');
  const [models, setModels] = useState([]);

  const [isTruck, setIsTruck] = useState(false);
  const [isOperable, setIsOperable] = useState(true);
  const [hasKeys, setHasKeys] = useState(true);

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
        className="input-element-v-margin"
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

      <Select
        className="input-element-v-margin"
        onSelect={onMakeSelected}
        size="large"
        value={make}
        placeholder="Make →"
        style={{ width: '100%' }}
      >
        <Option disabled key="label" value="label">
          Make →
        </Option>
        {makes.map((data) => (
          <Option key={data.key} value={data.value}>
            {data.label}
          </Option>
        ))}
      </Select>

      <Select
        className="input-element-v-margin"
        onSelect={onModelSelected}
        size="large"
        value={model}
        placeholder="Model →"
        style={{ width: '100%' }}
      >
        <Option disabled key="label" value="label">
          Model →
        </Option>
        {models.map((data) => (
          <Option key={data.key} value={data.value}>
            {data.label}
          </Option>
        ))}
      </Select>

      <Checkbox defaultChecked={isTruck} onChange={setIsTruck}>
        Is Truck?
      </Checkbox>
      <Checkbox defaultChecked={hasKeys} onChange={setHasKeys}>
        Has Keys?
      </Checkbox>
      <Checkbox defaultChecked={isOperable} onChange={setIsOperable}>
        Is Operable?
      </Checkbox>
      <br />
      <Button onClick={() => addCarToQuote(isTruck, isOperable, hasKeys)} type="primary" shape="round" size="small" block>
        Add
      </Button>

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
