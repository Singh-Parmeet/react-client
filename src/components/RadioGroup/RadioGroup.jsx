import React from 'react';
import PropTypes from 'prop-types';

const RadioGroup = (props) => {
  const {
    error, radioValue, onChangeHandlerForRadio, options,
  } = props;
  return (
    <>
      {options.map((item) => {
        const { label, value } = item;
        return (
          <>
            <label htmlFor={value}>{label}</label>
            <input type="radio" id={value} name={radioValue} value={value} onChange={onChangeHandlerForRadio} />
          </>
        );
      })}
      <p style={{ display: 'none' }}>{error}</p>
    </>
  );
};

RadioGroup.propTypes = {
  onChangeHandlerForRadio: PropTypes.func.isRequired,
  error: PropTypes.string,
  radioValue: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.arrayOfString),
};
RadioGroup.defaultProps = {
  options: [],
  error: '',
};

export default RadioGroup;
