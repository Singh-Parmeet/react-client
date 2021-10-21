import React from 'react';
import { TextField, Slider } from '../../components';
import { BANNERS, DEFAULT_BANNER_IMAGE } from '../../config/constant';

const TextFieldDemo = () => (
  <div>
    <Slider altText="image" banners={BANNERS} defaultBanner={DEFAULT_BANNER_IMAGE} />
    <TextField placeholder="Disabled Input" labels="This is a disabled Input" active="true" />
    <TextField placeholder="Accessible" labels="A Valid Input" error2="qwerty" />
    <TextField placeholder="101" error="Could not be more than" labels="An Input with errors" />
  </div>
);

export default TextFieldDemo;
