import { CALL_EXPRESSION_FUNCTIONS, CallExpressionFunction } from '@/Model';
import { CallExpression } from 'jsep';
import * as Yup from 'yup';
import { FORM_EXPRESSION_SCHEMA } from '../FormExpressionSchema';

export const CALL_EXPRESSION_SCHEMA = Yup.object({
  type: Yup.string<CallExpression['type']>().oneOf(['CallExpression']).required(),
  function: Yup.string<CallExpressionFunction>().oneOf(CALL_EXPRESSION_FUNCTIONS).required(),
  args: Yup.lazy(() => Yup.array(FORM_EXPRESSION_SCHEMA).required()),
});
