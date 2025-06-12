import * as Yup from 'yup';
import { createElement } from './ElementBase';
import { Form } from '@webinex/antik';
import { BarsOutlined } from '@ant-design/icons';

export const Select = createElement({
  id: 'Select',
  icon: <BarsOutlined />,
  props: Yup.object({
    title: Yup.string().required().default('Select').label('Title'),
    options: Yup.array().of(Yup.string().required()).required().default(['A', 'B', 'C']).label('Options'),
    disabled: Yup.bool().nullable().default(null).label('Disabled When').meta({ control: 'expression' }),
  }),
  Component: ({ title, options, name, disabled, required }) => {
    return (
      <Form.Item label={title} name={name} required={required}>
        <Form.Select
          disabled={disabled ?? undefined}
          options={options.map((x) => ({ label: x, value: x }))}
          allowClear={!required}
        />
      </Form.Item>
    );
  },
});
