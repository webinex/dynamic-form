import { useField } from 'formik';
import { Expression } from '@/Model/Expression';
import { FormBoolExpression } from './Bool';
import { FormBinaryExpression } from './Binary';
import { FormExpressionEmpty } from './FormExpressionEmpty';
import { DynamicFormTheme } from '@/DynamicFormTheme';

export interface FormExpressionProps {
  name: string;
}

export const FormExpression = DynamicFormTheme.flexy('FormExpression', (props: FormExpressionProps) => {
  const { name } = props;
  const [{ value }] = useField<Expression | null>(name);

  if (value == null) {
    return <FormExpressionEmpty name={name} />;
  }

  switch (value?.type) {
    case 'BoolExpression':
      return <FormBoolExpression name={name} />;

    case 'BinaryExpression':
      return <FormBinaryExpression name={name} />;

    default:
      return <div>Unknown Expression Type</div>;
  }
});
