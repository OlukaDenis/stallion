import { Input } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from '../utilities/i18n';

export const ClearableInputElement = ({ placeholder, value, onChange, Icon, onClear, type }) => {
         const [isMouseOverInput, setIsMouseOverInput] = useState(false);
         return (
           <>
             <Input
               className="input-element-v-margin"
               onMouseOver={() => setIsMouseOverInput(true)}
               onMouseOut={() => setIsMouseOverInput(false)}
               placeholder={placeholder}
               size="large"
               type={type ? type : 'text'}
               value={value}
               onChange={(e) => onChange(e.target.value)}
               suffix={
                 isMouseOverInput && value ? (
                   <CloseOutlined
                     onClick={() => {
                       onChange('');
                       onClear ? onClear() : '';
                     }}
                     onMouseOut={() => setIsMouseOverInput(false)}
                   />
                 ) : (
                   <Icon onMouseOver={() => setIsMouseOverInput(true)} />
                 )
               }
             />
           </>
         );
       };

const mapStateToProps = (state) => ({
  theme: state.ui.theme,
});

const mapDispatchToProps = (dispatch) => {
  return {
    // setCars: bindActionCreators(setCars, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation('common')(ClearableInputElement));
