import { connect } from 'react-redux';
import { withTranslation } from '../utilities/i18n';
import { bindActionCreators } from 'redux';
import { setCars } from '../state/quote/action';
import CarSelector from './CarSelector';
import { useEffect, useState } from 'react';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Divider, Alert } from 'antd';
import ClearableInputElement from './ClearableInputElement';

export function SelectedCars({ theme, quote, setCars }) {
  const [year, setYear] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [isAddingVehicle, setIsAddingVehicle] = useState(false);
  const [isAddingVehicleError, setIsAddingVehicleError] = useState(false);

  const toggleIsAddingVehicle = () => {
    if (Object.keys(quote ? quote.cars : {}).length > 0) {
      setIsAddingVehicleError(false);
      setIsAddingVehicle(!isAddingVehicle);
    } else {
      setIsAddingVehicleError(true);
    }
  };

  const removeCarFromQuote = (key) => {
    delete quote.cars[key];
    setCars(quote.cars);
  };

  const addCarToQuote = (isTruck, isOperable, hasKeys) => {
    if (!year || !make || !model) return;

    quote.cars[Object.keys(quote.cars).length] = {
      year,
      make,
      model,
      isTruck,
      isOperable,
      hasKeys,
    };
    setCars(quote.cars);
    setIsAddingVehicle(false);
    setIsAddingVehicleError(false);
  };

  // useEffect(() => {
  //   if (!year || !make || !model) return;

  //   quote.cars[Object.keys(quote.cars).length] = {
  //     year: year,
  //     make: make,
  //     model: model,
  //   };
  //   setCars(quote.cars);
  //   setIsAddingVehicle(false);
  //   setIsAddingVehicleError(false);
  // }, [model]);

  return (
    <>
      {Object.keys(quote.cars).length > 0 ? (
        <>
          {Object.keys(quote.cars).map((key) => (
            <ClearableInputElement
              Icon={DeleteOutlined}
              onClear={() => {
                removeCarFromQuote(key);
              }}
              key={key}
              placeholder={'Year, Make, Model'}
              onChange={(value) => {}}
              value={quote.cars[key]['year'] + ' ' + quote.cars[key]['make'] + ' ' + quote.cars[key]['model']}
            />
          ))}
        </>
      ) : (
        <CarSelector
          onYearChange={(value) => setYear(value)}
          onMakeChange={(value) => setMake(value)}
          onModelChange={(value) => setModel(value)}
          addCarToQuote={addCarToQuote}
        />
      )}

      <Divider orientation="left">
        {isAddingVehicle ? (
          <MinusOutlined onClick={toggleIsAddingVehicle} />
        ) : (
          <PlusOutlined onClick={toggleIsAddingVehicle} />
        )}
        {'  '}
        <span onClick={toggleIsAddingVehicle}>Add another vehicle</span>
      </Divider>
      {isAddingVehicle ? (
        <CarSelector
          onYearChange={(value) => setYear(value)}
          onMakeChange={(value) => setMake(value)}
          onModelChange={(value) => setModel(value)}
          addCarToQuote={addCarToQuote}
        />
      ) : (
        <></>
      )}
      {isAddingVehicleError ? <Alert message="Please complete the first vehicle." type="warning" /> : <></>}
    </>
  );
}

const mapStateToProps = (state) => ({
  theme: state.ui.theme,
  quote: state.quote,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setCars: bindActionCreators(setCars, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation('common')(SelectedCars));
