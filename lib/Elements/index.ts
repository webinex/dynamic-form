import { Heading } from './Heading';
import { Paragraph } from './Paragraph';
import { RadioGroup } from './RadioGroup';
import { CheckboxGroup } from './CheckboxGroup';
import { ElementBase } from './ElementBase';
import { Divider } from './Divider';
import { Input } from './Input';
import { Select } from './Select';
import { Rate } from './Rate';
import { SubmitButton } from './SubmitButton';

export * from './ElementBase';
export * from './Heading';
export * from './Input';
export * from './Paragraph';
export * from './Rate';
export * from './Select';
export * from './Style';

export const ELEMENTS = Object.assign(
  [
    ['Form', Input, Select, RadioGroup, CheckboxGroup, Rate, SubmitButton],
    ['Layout', Heading, Paragraph, Divider],
  ] as [string, ...ElementBase[]][],
  {
    elements() {
      return ELEMENTS.flatMap((x) => x.slice(1)) as ElementBase[];
    },
  },
);
