import React from 'react';
import PropTypes from 'prop-types';
import style from './style';

const TextField = (props) => {
  const {
    placeholder, labels, active, error, onChangeHandlerForInput,
  } = props;
  const errorStyle = error ? style.errorInput : {};
  return (
    <>
      <div>
        <h3>{labels}</h3>
        <input style={{ ...style.base, ...errorStyle }} type="text" value={placeholder} disabled={active} onChange={onChangeHandlerForInput} />
        {
          error && (
            <div style={style.error}>{error}</div>
          )
        }
      </div>
    </>
  );
};

TextField.propTypes = {
  placeholder: PropTypes.string.isRequired,
  labels: PropTypes.string.isRequired,
  active: PropTypes.string.isRequired,
  // error2: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  onChangeHandlerForInput: PropTypes.func.isRequired,
};

export default TextField;
