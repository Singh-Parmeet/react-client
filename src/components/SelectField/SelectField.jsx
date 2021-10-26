import React from 'react';
import PropTypes from 'prop-types';
import style from './style';

const SelectField = (props) => {
  const {
    error, selectedValue, onChangeHandler, options, defaultText, onBlurHandler,
  } = props;
  return (
    <>
      <select
        style={style.dropDownBox}
        value={selectedValue}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
      >
        <option value="">{defaultText}</option>
        {options.map((item) => {
          const { label, value } = item;
          return (
            <option
              style={style.options}
              key={value}
              label={label}
              value={value}
            >
              {label}
            </option>
          );
        })}
      </select>
      {error && (<p style={style.error}>{error}</p>)}
    </>
  );
};

SelectField.defaultProps = {
  error: '',
  options: [],
  defaultText: 'select',
};

SelectField.propTypes = {
  onChangeHandler: PropTypes.func.isRequired,
  onBlurHandler: PropTypes.func.isRequired,
  error: PropTypes.string,
  selectedValue: PropTypes.string.isRequired,
  defaultText: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape(
    {
      value: PropTypes.string,
      label: PropTypes.string,
    },
  )),
};

export default SelectField;
