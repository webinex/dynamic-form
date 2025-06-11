import { DynamicFormTheme } from '@/DynamicFormTheme';
import { CallExpression, ReferenceExpression } from '@/Model';
import { useField } from 'formik';
import { FormReferenceExpression } from '../Reference';
import { Select, Space } from 'antd';
import { useCallback } from 'react';

export interface FormBinaryExpressionLeftProps {
  name: string;
}

function FormControl(props: FormBinaryExpressionLeftProps) {
  const { name } = props;
  const [{ value }] = useField<ReferenceExpression | CallExpression>(name);

  if (value.type === 'ReferenceExpression') {
    return <FormReferenceExpression name={name} />;
  }

  if (value.type === 'CallExpression') {
    return <FormReferenceExpression name={`${name}.args[0]`} />;
  }
}

type ValueType = 'value' | 'len';
type OptionType = { value: ValueType; label: React.ReactNode };

function useValueChange(props: FormBinaryExpressionLeftProps) {
  const { name } = props;
  const [{ value }, , { setValue }] = useField<ReferenceExpression | CallExpression>(name);

  return useCallback(
    (newValue: ValueType) => {
      if (newValue === 'value' && value.type === 'CallExpression') {
        setValue(value.args[0] as ReferenceExpression);
      }

      if (newValue === 'len' && value.type === 'ReferenceExpression') {
        setValue({
          type: 'CallExpression',
          function: 'len',
          args: [value],
        } satisfies CallExpression);
      }
    },
    [value, setValue],
  );
}

export const FormBinaryExpressionLeft = DynamicFormTheme.flexy(
  'FormBinaryExpressionLeft',
  (props: FormBinaryExpressionLeftProps) => {
    const { name } = props;
    const [{ value }] = useField<ReferenceExpression | CallExpression>(name);
    const onValueChange = useValueChange(props);

    return (
      <Space>
        <FormControl name={name} />
        <Select<ValueType, OptionType>
          value={value.type === 'ReferenceExpression' ? 'value' : 'len'}
          onChange={onValueChange}
          options={[
            { value: 'value', label: 'Value' },
            { value: 'len', label: 'Length()' },
          ]}
        />
      </Space>
    );
  },
);
