import * as Yup from 'yup';
import { createElement } from './ElementBase';
import { Typography } from 'antd';
import { Form } from '@webinex/antik';

export const CheckboxGroup = createElement({
  id: 'CheckboxGroup',
  title: 'Checkbox Group',
  props: Yup.object({
    title: Yup.string().default('Checkbox').label('Title').nullable(),
    description: Yup.string().nullable().default(null).label('Description'),
    options: Yup.array().of(Yup.string().required()).required().default(['A', 'B', 'C']).label('Options'),
    disabled: Yup.object().nullable().default(null).label('Disabled When').meta({ control: 'expression' }),
  }),
  Component: ({ title, description, options, name }) => {
    const label = (
      <div>
        <div>{title}</div>
        {description && (
          <div>
            <Typography.Text type="secondary" style={{ fontSize: '0.875rem' }}>
              {description}
            </Typography.Text>
          </div>
        )}
      </div>
    );

    return (
      <Form.Item name={name} label={label}>
        <Form.CheckboxGroup options={options} />
      </Form.Item>
    );
  },
});
