import { DynamicFormTheme } from '@/DynamicFormTheme';
import { BINARY_OPERATOR_BY_TYPE, BinaryOperator, Expression, ExpressionUtil } from '@/Model';
import { Form } from '@webinex/antik';
import { useEffect, useMemo } from 'react';
import { useReferenceExpressionReference } from '../Reference';
import { useField } from 'formik';
import { DesignerUtil } from '@/Designer/DesignerUtil';

export interface FormBinaryExpressionOperatorProps {
  name: string;
  for: Expression | null | undefined;
}

const BINARY_OPERATOR_DESCRIPTIONS: Record<BinaryOperator, string> = {
  '=': 'Equal to',
  '!=': 'Not equal to',
  '>': 'Greater than',
  '>=': 'Greater than or equal to',
  '<': 'Less than',
  '<=': 'Less than or equal to',
  contains: 'When the "left" value is a text or collection, checks if it contains the "right" value',
  'not contains':
    'When the "left" value is a text or collection, checks if it does not contain the "right" value',
};

function useOperators(props: FormBinaryExpressionOperatorProps): BinaryOperator[] {
  const { for: forProp } = props;
  const { Element } = useReferenceExpressionReference(forProp) ?? {};

  return useMemo(() => {
    if (ExpressionUtil.isLenCallExpression(forProp)) return BINARY_OPERATOR_BY_TYPE['number'];
    if (!Element) return [];
    if (Element && DesignerUtil.isOptionsElement(Element) && !DesignerUtil.isMultiElement(Element))
      return ['=', '!='];
    const key = Array.isArray(Element?.value) ? 'arrayof' : (Element?.value ?? 'string');
    return BINARY_OPERATOR_BY_TYPE[key] ?? [];
  }, [Element]);
}

function useResetOperatorWhenUnavailable(props: FormBinaryExpressionOperatorProps) {
  const { name } = props;
  const [{ value }, , { setValue }] = useField<BinaryOperator | null>(name);
  const operators = useOperators(props);

  useEffect(() => {
    if (value && !operators.includes(value)) setValue(operators.length > 0 ? operators[0] : null);
  }, [operators, value]);
}

function useOptions(props: FormBinaryExpressionOperatorProps) {
  const operators = useOperators(props);
  return useMemo(
    () => operators.map((op) => ({ label: op, title: BINARY_OPERATOR_DESCRIPTIONS[op], value: op })),
    [operators],
  );
}

export const FormBinaryExpressionOperator = DynamicFormTheme.flexy(
  'FormBinaryExpressionOperator',
  (props: FormBinaryExpressionOperatorProps) => {
    const { name } = props;
    const options = useOptions(props);
    useResetOperatorWhenUnavailable(props);
    return <Form.Select name={name} options={options} style={{ minWidth: 150 }} />;
  },
);
