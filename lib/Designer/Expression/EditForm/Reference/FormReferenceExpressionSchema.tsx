import * as Yup from 'yup';

export const FORM_REFERENCE_EXPRESSION_SCHEMA = Yup.object({
  type: Yup.string().oneOf(['ReferenceExpression']).required(),
  ref: Yup.string().required(),
});
