import * as Yup from 'yup';
import { FORM_CONSTANT_EXPRESSION_SCHEMA } from '../Constant';
import { FORM_EXPRESSION_SCHEMA } from '../FormExpressionSchema';

export const FORM_BINARY_EXPRESSION_SCHEMA = Yup.object({
  type: Yup.string().oneOf(['BinaryExpression']).required(),
  left: Yup.lazy(() => FORM_EXPRESSION_SCHEMA),
  operator: Yup.string().required(),
  right: Yup.lazy(() => FORM_CONSTANT_EXPRESSION_SCHEMA),
});
