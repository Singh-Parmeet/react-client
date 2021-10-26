export const getError = (formValues, field) => {
  const { touched, errors } = formValues;
  if (touched[field]) {
    return errors[field] || '';
  }
  return null;
};

export const hasErrors = (errors) => Object.keys(errors).length !== 0;
export const isTouched = (touched) => Object.keys(touched).length !== 0;
