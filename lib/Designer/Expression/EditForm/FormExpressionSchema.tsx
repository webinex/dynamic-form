import * as Yup from 'yup';
import { Expression } from '../../../Model/Expression';
import { FORM_BOOL_EXPRESSION_SCHEMA } from './Bool';
import { FORM_CONSTANT_EXPRESSION_SCHEMA } from './Constant';
import { FORM_REFERENCE_EXPRESSION_SCHEMA } from './Reference';
import { FORM_BINARY_EXPRESSION_SCHEMA } from './Binary';
import { CALL_EXPRESSION_SCHEMA } from './Call';

export const FORM_EXPRESSION_SCHEMA: Yup.LazySchema<Yup.ObjectSchema<Expression, Yup.AnyObject, object, ''>> =
  Yup.lazy((value: Expression | null) => {
    if (!value) {
      return Yup.object().nullable();
    }

    switch (value.type) {
      case 'ConstantExpression':
        return FORM_CONSTANT_EXPRESSION_SCHEMA.required();

      case 'ReferenceExpression':
        return FORM_REFERENCE_EXPRESSION_SCHEMA.required();

      case 'BoolExpression':
        return FORM_BOOL_EXPRESSION_SCHEMA.required();

      case 'BinaryExpression':
        return FORM_BINARY_EXPRESSION_SCHEMA.required();

      case 'CallExpression':
        return CALL_EXPRESSION_SCHEMA.required();

      default:
        throw new Error(`Unknown expression type: ${(value as any).type}`);
    }
  }) as never;
