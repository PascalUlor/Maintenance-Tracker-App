import validator from 'validator';


const checkItem = (inputValue) => {
  const errors = {};
  Object.keys(inputValue).forEach((key) => {
    if (!inputValue[key]) {
      errors[key] = `${key} field is undefined`;
    } else {
      if (key === 'title') {
        if (!validator.isEmpty(inputValue[key])) {
          if (inputValue[key].search(/[^A-Za-z\s]/) !== -1) {
            errors[key] = `${key} must be alphabetical`;
          } else if (!(validator.isLength(inputValue[key], { min: 3, max: 50 }))) {
            errors[key] = `${key} must be between 3 to 50 characters`;
          }
        }
      }

      if (key === 'details') {
        if (!(validator.isEmpty(inputValue[key]))) {
          if (!(validator.isLength(inputValue[key], { min: 20, max: 1000 }))) {
            errors[key] = `${key} field must be between 20 to 1000 characters`;
          }
        }
      }
    }
  });
  return errors;
};
export default checkItem;
