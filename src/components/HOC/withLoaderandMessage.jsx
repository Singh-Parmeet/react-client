/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

const withLoaderAndMessage = (Component) => {
  const EnhancedComponent = (props) => {
    console.log(props);
    const { dataLength, loader, ...rest } = props;
    if (loader) {
      return <h1>Loading.......</h1>;
    }
    if (dataLength === 0) {
      return <h2>OOPS!, No List Found !</h2>;
    }
    return (
      <>
        <Component {...rest} />
      </>
    );
  };
  EnhancedComponent.propTypes = {
    dataLength: PropTypes.number,
    loader: PropTypes.bool,
  };
  EnhancedComponent.defaultProps = {
    dataLength: 0,
    loader: false,
  };
  return EnhancedComponent;
};

export default withLoaderAndMessage;
