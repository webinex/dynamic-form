import { DynamicFormTheme } from '@/DynamicFormTheme';
import { BINARY_OPERATORS } from '@/Model';
import { Form } from '@webinex/antik';

export interface FormBinaryExpressionOperatorProps {
  name: string;
}

const OPTIONS = BINARY_OPERATORS.map((op) => ({ label: op, value: op }));

export const FormBinaryExpressionOperator = DynamicFormTheme.flexy(
  'FormBinaryExpressionOperator',
  (props: FormBinaryExpressionOperatorProps) => {
    const { name } = props;
    return <Form.Select name={name} options={OPTIONS} style={{ minWidth: 150 }} />;
  },
);
