import React from 'react';
import PropTypes from 'prop-types';
import style from './style';

const RadioGroup = (props) => {
  const {
    error, radioValue, onChangeHandler, options, name, onBlurHandler,
  } = props;
  return (
    <div>
      <h2>What you do?</h2>
      <div onFocus={onBlurHandler}>
        {options.map((item) => {
          const { label, value } = item;
          return (
            <label htmlFor={value}>
              <input
                type="radio"
                id={value}
                name={name}
                value={value}
                onChange={onChangeHandler}
                checked={radioValue === value}
              />
              {label}
            </label>
          );
        })}
        { error && (<p style={style.error}>{error}</p>)}
      </div>
    </div>
  );
};

RadioGroup.propTypes = {
  onChangeHandler: PropTypes.func.isRequired,
  onBlurHandler: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  radioValue: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape(
    {
      value: PropTypes.string,
      label: PropTypes.string,
    },
  )),
};

RadioGroup.defaultProps = {
  error: '',
  options: [],
};

export default RadioGroup;
