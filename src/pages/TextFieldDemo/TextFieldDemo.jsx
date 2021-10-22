import React from 'react';
import { TextField, Slider } from '../../components';
import { BANNERS, DEFAULT_BANNER_IMAGE } from '../../config/constant';

const TextFieldDemo = () => (
  <>
    <Slider altText="image" banners={BANNERS} defaultBanner={DEFAULT_BANNER_IMAGE} />
    <h3>This is a disabled Input</h3>
    <TextField placeholder="Disabled Input" active="true" />
    <h2>A Valid Input</h2>
    <TextField placeholder="Accessible" error2="qwerty" />
    <h3>An Input with errors</h3>
    <TextField placeholder="101" error="Could not be more than" />
  </>
);

export default TextFieldDemo;
