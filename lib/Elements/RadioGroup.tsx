import * as Yup from 'yup';
import { createElement } from './ElementBase';
import { Form } from '@webinex/antik';
import { CheckCircleOutlined } from '@ant-design/icons';
import { RadioGroupProps } from 'antd';

export const RadioGroup = createElement({
  id: 'RadioGroup',
  title: 'Radio Group',
  icon: <CheckCircleOutlined />,
  props: Yup.object({
    title: Yup.string().required().default('Select').label('Title'),
    options: Yup.array()
      .of(Yup.string().required())
      .required()
      .default(['A', 'B', 'C'])
      .label('Options')
      .min(1, 'At least one option is required')
      .meta({ description: 'Options for the radio group, each option is a string.' }),
    optionType: Yup.string<NonNullable<RadioGroupProps['optionType']>>()
      .oneOf(['default', 'button'])
      .default('default')
      .nullable()
      .label('Option Type')
      .meta({ description: 'Type of radio options, either default or button.' }),
  }),
  Component: ({ name, title, options, optionType, required }) => {
    return (
      <Form.Item name={name} label={title} required={required}>
        <Form.RadioGroup options={options} optionType={optionType ?? undefined} />
      </Form.Item>
    );
  },
});
