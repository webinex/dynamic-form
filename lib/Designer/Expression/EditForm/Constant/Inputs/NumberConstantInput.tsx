import { DynamicFormTheme } from '@/DynamicFormTheme';
import { InputNumber } from 'antd';

export interface NumberConstantInputProps {
  value: number | null;
  onChange: (value: number | null) => void;
}

export const NumberConstantInput = DynamicFormTheme.flexy(
  'NumberConstantInput',
  (props: NumberConstantInputProps) => {
    return <InputNumber style={{ width: '100%' }} {...props} />;
  },
);
