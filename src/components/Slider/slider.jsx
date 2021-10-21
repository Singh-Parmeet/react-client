import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { PUBLIC_IMAGE_FOLDER, DEFAULT_BANNER_IMAGE } from '../../config/constant';
import { getRoundRobin, getRandomNumber } from '../../libs/utils/math';
import style from './style';

const Slider = (props) => {
  const {
    altText, banners, defaultBanner, height, random, duration,
  } = props;

  const [index, setIndex] = useState(0);
  console.log(index, random);
  useEffect(() => {
    setInterval(() => {
      setIndex((indexv2) => {
        if (random) {
          return getRandomNumber(0, 5);
        }
        return getRoundRobin(4, indexv2);
      });
    }, duration);
  }, []);

  const path = banners[index] ? PUBLIC_IMAGE_FOLDER + banners[index] : defaultBanner;
  const alt = altText + banners[index];
  return (
    <div style={style.slider}>
      <img src={path} alt={alt} height={height} />
    </div>
  );
};
Slider.defaultProps = {
  altText: 'Default Banner',
  banners: [],
  defaultBanner: DEFAULT_BANNER_IMAGE,
  duration: 2000,
  height: 200,
  random: false,
};

Slider.propTypes = {
  altText: PropTypes.string,
  banners: PropTypes.string,
  defaultBanner: PropTypes.string,
  duration: PropTypes.number,
  height: PropTypes.number,
  random: PropTypes.bool,
};

export default Slider;
