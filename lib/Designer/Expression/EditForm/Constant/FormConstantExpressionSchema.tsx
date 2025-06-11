import * as Yup from 'yup';

export const FORM_CONSTANT_EXPRESSION_SCHEMA = Yup.object({
  type: Yup.string().oneOf(['ConstantExpression']).required(),
  value: Yup.mixed().required(),
});
