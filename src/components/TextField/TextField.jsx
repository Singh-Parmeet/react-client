import React from 'react';
import PropTypes from 'prop-types';
import style from './style';

const TextField = (props) => {
  const {
    value, onChangeHandler, notActive, error, onBlurHandler,
  } = props;
  const errorStyle = error ? style.errorInput : {};
  return (
    <>
      <input
        style={{ ...style.base, ...errorStyle }}
        random={false}
        type="text"
        value={value}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
        disabled={notActive}
      />
      {error && (<p style={style.error}>{error}</p>)}
    </>
  );
};

TextField.propTypes = {
  value: PropTypes.string.isRequired,
  onBlurHandler: PropTypes.func.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  notActive: PropTypes.bool.isRequired,

};

export default TextField;
