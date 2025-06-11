import * as Yup from 'yup';

Yup.setLocale({
  mixed: {
    required: 'This field is required',
    notType: 'Invalid value',
  },
  string: {
    email: 'Invalid email address',
    min: 'Minimum length is ${min}',
    max: 'Maximum length is ${max}',
  },
  number: {
    min: 'Minimum value is ${min}',
    max: 'Maximum value is ${max}',
  },
  array: {
    min: 'At least ${min} items are required',
    max: 'No more than ${max} items are allowed',
  },
});
