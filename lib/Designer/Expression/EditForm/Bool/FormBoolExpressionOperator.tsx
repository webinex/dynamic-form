import { useField } from 'formik';
import { BinaryOperator, BOOL_OPERATORS } from '@/Model';
import { Select, SelectProps } from 'antd';
import { DynamicFormTheme } from '@/DynamicFormTheme';

export interface FormBoolExpressionOperatorProps
  extends Omit<SelectProps, 'value' | 'onChange' | 'onBlur' | 'options'> {
  name: string;
}

const options = BOOL_OPERATORS.map((op) => ({ label: op, value: op }));

export const FormBoolExpressionOperator = DynamicFormTheme.flexy(
  'FormBoolExpressionOperator',
  (props: FormBoolExpressionOperatorProps) => {
    const { name, ...selectProps } = props;
    const [{ value, onBlur }, , { setTouched, setValue }] = useField<BinaryOperator | null>(name);

    function onChange(value: BinaryOperator | null) {
      setValue(value);
      setTouched(true, true);
    }

    return <Select {...selectProps} value={value} options={options} onChange={onChange} onBlur={onBlur} />;
  },
);
