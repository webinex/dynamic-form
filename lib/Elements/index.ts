import { Heading } from './Heading';
import { Paragraph } from './Paragraph';
import { RadioGroup } from './RadioGroup';
import { CheckboxGroup } from './CheckboxGroup';
import { ElementBase } from './ElementBase';
import { Divider } from './Divider';
import { Input } from './Input';
import { Select } from './Select';
import { Rate } from './Rate';
import { Checkbox } from './Checkbox';
import { DateTimePicker } from './DateTimePicker';
import { InputNumber } from './InputNumber';
import { Switch } from './Switch';
import { TimePicker } from './TimePicker';
import { MultiSelect } from './MultiSelect';

export * from './ElementBase';
export * from './Heading';
export * from './Input';
export * from './Paragraph';
export * from './Rate';
export * from './Select';
export * from './Style';
export * from './Checkbox';
export * from './InputNumber';
export * from './DateTimePicker';

export const ELEMENTS = Object.assign(
  [
    [
      'Form',
      Input,
      InputNumber,
      Select,
      MultiSelect,
      RadioGroup,
      Checkbox,
      CheckboxGroup,
      DateTimePicker,
      TimePicker,
      Switch,
      Rate,
    ],
    ['Layout', Heading, Paragraph, Divider],
  ] as [string, ...ElementBase[]][],
  {
    elements() {
      return ELEMENTS.flatMap((x) => x.slice(1)) as ElementBase[];
    },
  },
);
