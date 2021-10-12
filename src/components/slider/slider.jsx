import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { getRoundRobin, getRandomNumber } from '../../libs/utils/math';
import style from './style';
// Component Slider
const Slider = (props) => {
  const {
    altText, banner, defaultBanners, duration, height, random,
  } = props;
  // taking value in index
  const [index, setIndex] = React.useState(0);
  // using useEffect for Random number or Round Robin
  useEffect(() => {
    setInterval(() => {
      setIndex((indexv2) => {
        if (random !== 'false') {
          return getRandomNumber(0, 10);
        }
        return getRoundRobin(4, indexv2);
      });
    }, duration);
  }, []);
  // Used alt for image + image numbeer,if index use found than image path otherwise default image
  const alt = altText + index;
  const path = banner[index]?.imagPath || defaultBanners;
  // returning the image path with height and style
  return (
    <div style={style.slider}>
      <div>
        <img src={path} alt={alt} height={height} />
      </div>
    </div>
  );
};
  // Default Props
Slider.defaultProps = {
  altText: 'Default Banner',
  banner: [],
  defaultBanners: 'default.png',
  duration: 2000,
  height: 200,
  random: 'false',
};
// Default Prop-Types
Slider.propTypes = {
  altText: PropTypes.string,
  banner: PropTypes.string,
  defaultBanners: PropTypes.string,
  duration: PropTypes.number,
  height: PropTypes.number,
  random: PropTypes.string,
};

export default Slider;
