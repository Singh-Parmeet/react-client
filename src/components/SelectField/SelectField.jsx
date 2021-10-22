import React from 'react';
import PropTypes from 'prop-types';
import style from './style';

const SelectField = (props) => {
  const {
    error, selectedValue, onChangeHandlerForSelect, options, defaultText,
  } = props;
  return (
    <>
      <select style={style.dropDownBox} value={selectedValue} onChange={onChangeHandlerForSelect}>
        <option value="">{defaultText}</option>
        {options.map((item) => {
          const { label, value } = item;
          return (<option style={style.options} key={value} value={value}>{label}</option>);
        })}
      </select>
      <p style={{ display: 'none' }}>{error}</p>
    </>
  );
};

SelectField.propTypes = {
  onChangeHandlerForSelect: PropTypes.func.isRequired,
  error: PropTypes.string,
  selectedValue: PropTypes.string.isRequired,
  defaultText: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
};
SelectField.defaultProps = {
  options: [],
  error: '',
};

export default SelectField;
