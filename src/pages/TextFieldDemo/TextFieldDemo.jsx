import React from 'react';
import { TextField } from '../../components';

const TextFieldDemo = () => (
  <div>
    <TextField placeholder="Disabled Input" labels="This is a disabled Input" active="true" />
    <TextField placeholder="Accessible" labels="A Valid Input" error2="qwerty" />
    <TextField placeholder="101" error="Could not be more than" labels="An Input with errors" />
  </div>
);

export default TextFieldDemo;
