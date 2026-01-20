import { ElementValueType } from '@/Elements';

export type Expression =
  | BinaryExpression
  | ConstantExpression
  | ReferenceExpression
  | BoolExpression
  | CallExpression;

export const BINARY_OPERATORS = ['=', '!=', '>', '<', '>=', '<=', 'contains', 'not contains'] as const;

export const CALL_EXPRESSION_FUNCTIONS = ['len'] as const;
export type CallExpressionFunction = (typeof CALL_EXPRESSION_FUNCTIONS)[number];

export const BOOL_OPERATORS = ['and', 'or'] as const;

export const COLLECTION_BINARY_OPERATORS: BinaryOperator[] = [];

export type BinaryOperator = (typeof BINARY_OPERATORS)[number];
export type BoolOperator = (typeof BOOL_OPERATORS)[number];

export const BINARY_OPERATOR_BY_TYPE: Record<ElementValueType | 'arrayof', BinaryOperator[]> = {
  string: ['=', '!=', 'contains', 'not contains'],
  boolean: ['=', '!='],
  date: ['=', '!=', '>', '<', '>=', '<='],
  number: ['=', '!=', '>', '<', '>=', '<='],
  object: [],
  readonly: [],
  arrayof: ['=', '!=', 'contains', 'not contains'],
};

export interface ConstantExpression {
  type: 'ConstantExpression';
  value: any;
}

export interface ReferenceExpression {
  type: 'ReferenceExpression';
  ref: string;
}

export interface BinaryExpression {
  type: 'BinaryExpression';
  left: Expression;
  right: Expression;
  operator: string;
}

export interface CallExpression {
  type: 'CallExpression';
  function: CallExpressionFunction;
  args: Expression[];
}

export interface BoolExpression {
  type: 'BoolExpression';
  operator: BoolOperator;
  expressions: Expression[];
}

function isExpression(x: any): x is Expression {
  return (
    x &&
    typeof x === 'object' &&
    'type' in x &&
    (x.type === 'ConstantExpression' ||
      x.type === 'ReferenceExpression' ||
      x.type === 'BinaryExpression' ||
      x.type === 'BoolExpression')
  );
}

function isReferenceExpression(x: Expression | null | undefined): x is ReferenceExpression {
  return !!x && x.type === 'ReferenceExpression';
}

function isCallExpression(x: Expression | null | undefined): x is CallExpression {
  return !!x && x.type === 'CallExpression';
}

function isLenCallExpression(x: Expression | null | undefined): x is CallExpression {
  return isCallExpression(x) && x.function === 'len';
}

function eqArray(left: any[], right: any[], orderInsensitive: boolean) {
  if (left.length !== right.length) {
    return false;
  }

  if (orderInsensitive) {
    const surplus = [...left];
    return right.every((x) => {
      const index = surplus.indexOf(x);
      if (index >= 0) surplus.splice(index, 1);
      else return false;
    });
  }

  for (let i = 0; i < left.length; i++) {
    if (left[i] !== right[i]) return false;
  }

  return true;
}

function exec(expression: Expression, values: any, options?: { orderInsensitive?: boolean }): any {
  switch (expression.type) {
    case 'ConstantExpression':
      return expression.value;

    case 'ReferenceExpression':
      return values[expression.ref];

    case 'BinaryExpression': {
      const leftValue = exec(expression.left, values);
      const rightValue = exec(expression.right, values);

      switch (expression.operator) {
        case '=':
          if (Array.isArray(leftValue) && Array.isArray(rightValue)) {
            return eqArray(leftValue, rightValue, options?.orderInsensitive ?? false);
          }

          return leftValue === rightValue;
        case '!=':
          if (Array.isArray(leftValue) && Array.isArray(rightValue)) {
            return !eqArray(leftValue, rightValue, options?.orderInsensitive ?? false);
          }
          return leftValue !== rightValue;
        case '>':
          if (leftValue == null || rightValue == null) {
            return false;
          }
          return leftValue > rightValue;
        case '<':
          if (leftValue == null || rightValue == null) {
            return false;
          }
          return leftValue < rightValue;
        case '>=':
          if (leftValue == null || rightValue == null) {
            return false;
          }
          return leftValue >= rightValue;
        case '<=':
          if (leftValue == null || rightValue == null) {
            return false;
          }
          return leftValue <= rightValue;
        case 'contains': {
          if (typeof leftValue === 'string' || typeof rightValue === 'string') {
            return String(leftValue).includes(String(rightValue));
          }

          return Array.isArray(leftValue) && leftValue.includes(rightValue);
        }
        case 'not contains': {
          if (typeof leftValue === 'string' || typeof rightValue === 'string') {
            return !String(leftValue).includes(String(rightValue));
          }

          return Array.isArray(leftValue) && !leftValue.includes(rightValue);
        }

        default:
          throw new Error(`Unknown binary operator: ${expression.operator}`);
      }
    }

    case 'BoolExpression': {
      const results = expression.expressions.map((expr) => exec(expr, values));
      switch (expression.operator) {
        case 'and':
          return results.every(Boolean);
        case 'or':
          return results.some(Boolean);
        default:
          throw new Error(`Unknown boolean operator: ${expression['operator']}`);
      }
    }

    case 'CallExpression': {
      if (expression.function !== 'len') {
        throw new Error(`Unknown function: ${expression.function}`);
      }

      if (expression.args.length !== 1) {
        throw new Error(`Function 'len' expects exactly one argument, got ${expression.args.length}`);
      }

      const argValue = exec(expression.args[0], values);

      // TODO: webinex, to think about a better solution
      if (argValue == null) {
        return 0;
      }

      return Array.isArray(argValue) ? argValue.length : String(argValue).length;
    }

    default:
      throw new Error(`Unknown expression type: ${expression['type']}`);
  }
}

function visit(expression: Expression, visitor: (value: Expression) => Expression): Expression {
  switch (expression.type) {
    case 'ConstantExpression':
      return visitor(expression);

    case 'ReferenceExpression':
      return visitor(expression);

    case 'BinaryExpression': {
      const left = visit(expression.left, visitor);
      const right = visit(expression.right, visitor);
      expression =
        left !== expression.left || right !== expression.right ? { ...expression, left, right } : expression;
      return visitor(expression);
    }

    case 'CallExpression': {
      const args = expression.args.map((arg) => visit(arg, visitor));
      const callExpression = expression;

      expression =
        args.length !== expression.args.length ||
        args.some((arg, index) => arg !== callExpression.args[index])
          ? { ...expression, args }
          : expression;
      return visitor(expression);
    }

    case 'BoolExpression': {
      const exp = expression;
      const expressions = expression.expressions.map((expr) => visit(expr, visitor));
      expression =
        expressions.length != exp.expressions.length ||
        expressions.some((expr, index) => expr !== exp.expressions[index])
          ? { ...exp, expressions }
          : exp;
      return visitor(expression);
    }

    default:
      throw new Error(`Unknown expression type: ${expression['type']}`);
  }
}

export const ExpressionUtil = {
  exec,
  isExpression,
  isReferenceExpression,
  isCallExpression,
  isLenCallExpression,
  visit,
};
