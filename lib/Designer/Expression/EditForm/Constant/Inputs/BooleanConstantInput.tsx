import { Select } from 'antd';
import { DynamicFormTheme } from '@/DynamicFormTheme';

const OPTIONS = [
  { label: 'Checked', value: true },
  { label: 'Unchecked', value: false },
];

export interface BooleanConstantInputProps {
  value: boolean | undefined;
  onChange: (value: boolean | undefined) => void;
}

export const BooleanConstantInput = DynamicFormTheme.flexy(
  'BooleanConstantInput',
  (props: BooleanConstantInputProps) => {
    return <Select style={{ width: '100%' }} options={OPTIONS} {...props} />;
  },
);
