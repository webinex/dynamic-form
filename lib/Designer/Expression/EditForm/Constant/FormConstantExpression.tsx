import { Input } from 'antd';
import { useField } from 'formik';
import { ConstantExpression } from '@/Model';
import { DynamicFormTheme } from '@/DynamicFormTheme';

export interface FormConstantExpressionProps {
  name: string;
}

export const FormConstantExpression = DynamicFormTheme.flexy(
  'FormConstantExpression',
  (props: FormConstantExpressionProps) => {
    const { name } = props;
    const [{ value, onBlur }, , { setValue, setTouched }] = useField<ConstantExpression | null>(name);

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
      const value = e.target.value;
      setValue({ type: 'ConstantExpression', value: value });
      setTouched(true, true);
    }

    return <Input onChange={onChange} onBlur={onBlur} value={value?.value ?? ''} />;
  },
);
