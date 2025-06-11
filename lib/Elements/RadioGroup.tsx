import * as Yup from 'yup';
import { createElement } from './ElementBase';
import { Form } from '@webinex/antik';

export const RadioGroup = createElement({
  id: 'RadioGroup',
  title: 'Radio Group',
  props: Yup.object({
    title: Yup.string().required().default('Select').label('Title'),
    options: Yup.array()
      .of(Yup.string().required())
      .required()
      .default(['A', 'B', 'C'])
      .label('Options')
      .min(1, 'At least one option is required')
      .meta({ description: 'Options for the radio group, each option is a string.' }),
  }),
  Component: ({ name, title, options, required }) => {
    return (
      <Form.Item name={name} label={title} required={required}>
        <Form.RadioGroup options={options} />
      </Form.Item>
    );
  },
});
