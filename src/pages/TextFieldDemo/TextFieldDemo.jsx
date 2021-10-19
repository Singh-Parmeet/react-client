import React from 'react';
import { TextField, Slider } from '../../components';
import { DEFAULT_BANNER_IMAGE, BANNERS } from '../../config/constant';

const TextFieldDemo = () => (
  <div>
    <Slider altText="image" banners={BANNERS} defaultBanner={DEFAULT_BANNER_IMAGE} />
    <TextField placeHolder="Disabled Input" label="This is a Disabled Input" notActive />
    <TextField placeHolder="Accessible" label="A Valid Input" error2 />
    <TextField placeHolder="101" label="An Input With Errors" error="Could not be greater than" />
  </div>
);

export default TextFieldDemo;
