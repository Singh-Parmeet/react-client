import React, { useState } from 'react';
import * as Yup from 'yup';
import {
  TextField, SelectField, RadioGroup, Button,
} from '../../components';
import style from './style';
import {
  DROPDOWN_OPTIONS, CRICKET_OPTIONS, FOOTBALL_OPTIONS,
} from '../../config/constant';
import { hasErrors, isTouched, getError } from '../../helpers/helpers';

const InputDemo = () => {
  const [showRadio, setShowRadio] = useState(false);

  const [formValues, setFormValues] = useState({
    name: '',
    sport: '',
    cricket: '',
    football: '',
    touched: {},
    errors: {},
  });

  const {
    name, sport, cricket, football, errors, touched,
  } = formValues;

  const validationSchema = Yup.object({
    name: Yup.string().min(3).max(10).label('Name')
      .required(),
    sport: Yup.string().required().label('Sport'),
    football: Yup.string().label('What you do?').when('sport', {
      is: (val) => val === 'football',
      then: Yup.string().required(),
      otherwise: Yup.string().min(0),
    }),
    cricket: Yup.string().label('What you do?').when('sport', {
      is: (val) => val === 'cricket',
      then: Yup.string().required(),
      otherwise: Yup.string().min(0),
    }),
  });
  const handleErrors = (values) => {
    const {
      name: newName, sport: newSport, cricket: newCricket, football: newFootball,
    } = values;
    validationSchema.validate({
      name: newName, sport: newSport, football: newFootball, cricket: newCricket,
    }, { abortEarly: false })
      .then(() => {
        setFormValues({
          ...values,
          errors: {},
        });
      })
      .catch((allErrors) => {
        const schemaErrors = {};
        if (allErrors) {
          allErrors.inner.forEach((err) => { schemaErrors[err.path] = err.message; });
          setFormValues({
            ...values,
            errors: schemaErrors,
          });
          console.log('Form values ', formValues);
        }
      });
  };
  const onBlurHandler = (event, type) => {
    const { value } = event.target;
    if (value === '' || value === 'Select') {
      touched[type] = true;
      const newValue = {
        ...formValues,
        touched,
      };
      setFormValues(newValue);
      handleErrors(newValue);
    }
  };

  const onChangeHandler = (event, field) => {
    const { value } = event.target;
    touched[field] = true;
    const newValue = {
      ...formValues,
      touched,
      [field]: value,
    };
    setFormValues(newValue);
    handleErrors(newValue);
  };

  const onChangeHandlerForSport = (event) => {
    const { value } = event.target;
    const newValues = {
      ...formValues,
      sport: value,
      cricket: '',
      football: '',
    };
    setFormValues(newValues);
    handleErrors(newValues);
    if (value !== '' && value !== 'Select') {
      setShowRadio(true);
    } else {
      setShowRadio(false);
    }
  };

  const onClickHandler = () => {};

  return (
    <>
      <TextField
        value={name}
        onBlurHandler={(event) => { onBlurHandler(event, 'name'); }}
        onChangeHandler={(event) => { onChangeHandler(event, 'name'); }}
        error={getError(formValues, 'name')}
        notActive={false}
        label="Name"
      />
      <SelectField
        error={getError(formValues, 'sport')}
        selectedValue={sport}
        onBlurHandler={(event) => { onBlurHandler(event, 'sport'); }}
        onChangeHandler={onChangeHandlerForSport}
        options={DROPDOWN_OPTIONS}
        defaultText="Select"
        label="Sport"
      />
      {showRadio
        && (sport === 'cricket'
          ? (
            <RadioGroup
              error={getError(formValues, 'cricket')}
              name={sport}
              radioValue={cricket}
              onBlurHandler={(event) => { onBlurHandler(event, 'cricket'); }}
              options={CRICKET_OPTIONS}
              onChangeHandler={(event) => { onChangeHandler(event, 'cricket'); }}
            />
          )
          : (
            <RadioGroup
              error={getError(formValues, 'football')}
              name={sport}
              radioValue={football}
              onBlurHandler={(event) => { onBlurHandler(event, 'football'); }}
              options={FOOTBALL_OPTIONS}
              onChangeHandler={(event) => { onChangeHandler(event, 'football'); }}
            />
          )
        )}
      <div style={style.contentRight}>
        <Button
          value="Cancel"
          onClick={onClickHandler}
          disabled={false}
        />
        <Button
          value="Submit"
          color="primary"
          onClick={onClickHandler}
          disabled={hasErrors(errors) || !isTouched(touched)}
        />
      </div>
    </>
  );
};

export default InputDemo;
