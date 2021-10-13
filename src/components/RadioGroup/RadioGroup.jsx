import React from 'react';
import PropTypes from 'prop-types';

const RadioGroup = (props) => {
  const {
    error, radioValue, onChangeHandlerForRadio, options,
  } = props;
  return (
    <div>
      <h2>What you do?</h2>
      {options.map((item) => {
        const { label, value } = item;
        return (
          <div>
            <input type="radio" id={value} name={radioValue} value={value} onChange={onChangeHandlerForRadio} />
            <label htmlFor={value}>{label}</label>
            <p style={{ display: 'none' }}>{error}</p>
          </div>
        );
      })}
    </div>
  );
};

RadioGroup.propTypes = {
  onChangeHandlerForRadio: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  radioValue: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.arrayOfString).isRequired,
};

export default RadioGroup;
