import React, { useState } from 'react';
import { TextField, SelectField, RadioGroup } from '../../components';
import { DROPDOWN_OPTIONS, CRICKET_OPTIONS, FOOTBALL_OPTIONS } from '../../config/constant';

const InputDemo = () => {
  const [name, setName] = useState('');
  const [showRadio, setShowRadio] = useState(false);
  const [dropDown, setDropDown] = useState(undefined);
  const [radioValueForCricket, setRadioValueForCricket] = useState('');
  const [radioValueForFootball, setRadioValueForFootball] = useState('');

  const onChangeHandlerForInput = (event) => {
    const { value } = event.target;
    setName(value);
  };

  const onChangeHandlerForSelect = (event) => {
    const { value } = event.target;
    setDropDown(value);
    if (value !== undefined) { setShowRadio(true); } else { setShowRadio(false); }
  };

  const onChangeHandlerForRadio = (event) => {
    const { value } = event.target;
    if (dropDown === 'cricket') { setRadioValueForCricket(value); } else { setRadioValueForFootball(value); }
  };
  console.log({
    'name ': name, 'sports ': dropDown, 'cricket ': radioValueForCricket, 'football ': radioValueForFootball,
  });
  return (
    <>
      <TextField
        value={name}
        onChangeHandlerForInput={onChangeHandlerForInput}
        error=""
        notActive={false}
        labels="Name"
      />
      <SelectField
        error=""
        selectedValue={dropDown}
        onChangeHandlerForSelect={onChangeHandlerForSelect}
        options={DROPDOWN_OPTIONS}
        defaultText="Select"
      />
      {showRadio
        && (
          <RadioGroup
            error=""
            radioValue={dropDown === 'cricket' ? 'cricket' : 'football'}
            onChangeHandlerForRadio={onChangeHandlerForRadio}
            options={dropDown === 'cricket' ? CRICKET_OPTIONS : FOOTBALL_OPTIONS}
          />
        )}
    </>
  );
};

export default InputDemo;
