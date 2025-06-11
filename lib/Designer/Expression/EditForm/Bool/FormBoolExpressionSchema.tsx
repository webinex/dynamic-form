import * as Yup from 'yup';
import { BoolOperator, BOOL_OPERATORS } from '../../../../Model/Expression';
import { FORM_EXPRESSION_SCHEMA } from '../FormExpressionSchema';

export const FORM_BOOL_EXPRESSION_SCHEMA = Yup.object({
  type: Yup.string().oneOf(['BoolExpression']).required(),
  operator: Yup.string<BoolOperator>().oneOf(BOOL_OPERATORS).required(),
  expressions: Yup.lazy(() => Yup.array(FORM_EXPRESSION_SCHEMA).required()),
});
