import React from 'react';
import { TextField, Slider } from '../../components';
import { Banner, BANNER_DEFAULT } from '../../config/constant';

const TextFieldDemo = () => (
  <div>
    <Slider altText="image" banner={Banner} defaultBanner={BANNER_DEFAULT} />
    <TextField placeholder="Disabled Input" labels="This is a disabled Input" active="true" />
    <TextField placeholder="Accessible" labels="A Valid Input" error2="qwerty" />
    <TextField placeholder="101" error="Could not be more than" labels="An Input with errors" />
  </div>
);

export default TextFieldDemo;
