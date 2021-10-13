import React from 'react';
import PropTypes from 'prop-types';
import style from './style';

const SelectField = (props) => {
  const {
    error, selectedValue, onChangeHandlerForSelect, options, defaultText,
  } = props;
  return (
    <div>
      <h2>Select the game you play!</h2>
      <select style={style.dropDownBox} value={selectedValue} onChange={onChangeHandlerForSelect}>
        <option value="">{defaultText}</option>
        <p style={{ display: 'none' }}>{error}</p>
        {options.map((item) => {
          const { label, value } = item;
          return (<option style={style.options} key={value} value={value}>{label}</option>);
        })}
      </select>
    </div>
  );
};

SelectField.propTypes = {
  onChangeHandlerForSelect: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  selectedValue: PropTypes.string.isRequired,
  defaultText: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SelectField;
