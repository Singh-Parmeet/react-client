import React from 'react';
import PropTypes from 'prop-types';
import customStyle from './style';

const Button = (props) => {
  const {
    style, disabled, value, onClick, color,
  } = props;
  const finalStyle = (!disabled && color === 'primary')
    ? { ...customStyle.button, ...style, ...customStyle.primary }
    : { ...customStyle.button };
  return (
    <button type="button" style={finalStyle} disabled={disabled} onClick={onClick}>{value}</button>
  );
};

Button.defaultProps = {
  disabled: false,
  color: 'default',
  style: {},
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  color: PropTypes.oneOf(['default', 'primary']),
  style: PropTypes.objectOf(PropTypes.string),

};

export default Button;
