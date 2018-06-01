import validator from 'validator';


const checkItem = (inputValue) => {
  const errors = {};
  Object.keys(inputValue).forEach((key) => {
    if (!inputValue[key]) {
      errors[key] = `${key} field is undefined`;
    } else {
      /*
      *Request Validation
      */
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
      /*
      *User Validation
      */
      if (key === 'firstName' || key === 'lastName') {
        if (!(validator.isEmpty(inputValue[key]))) {
          if (inputValue[key].search(/[^A-Za-z\s]/) !== -1) {
            errors[key] = `${key} can only be alphabetical`;
          }
        }
      }
      if (key === 'email') {
        if (!(validator.isEmpty(inputValue[key]))) {
          if (!validator.isEmail(inputValue[key])) {
            errors[key] = `Invalid ${key}`;
          }
        }
      }
      if (key === 'password') {
        if (!(validator.isEmpty(inputValue[key]))) {
          if (!validator.isLength(inputValue[key], { min: 8, max: 50 })) {
            errors[key] = `${key} must between 8 and 50 characters`;
          }
        }
      }
    }
  });
  return errors;
};
export default checkItem;
