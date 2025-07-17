import * as Yup from 'yup';
import { createElement } from './ElementBase';
import { Typography } from 'antd';
import { Form } from '@webinex/antik';
import { CheckSquareOutlined } from '@ant-design/icons';

export const CheckboxGroup = createElement({
  id: 'CheckboxGroup',
  title: 'Checkbox Group',
  icon: <CheckSquareOutlined />,
  props: Yup.object({
    title: Yup.string().default('Checkbox').label('Title').nullable(),
    description: Yup.string().nullable().default(null).label('Description'),
    options: Yup.array().of(Yup.string().required()).required().default(['A', 'B', 'C']).label('Options'),
    disabled: Yup.bool().nullable().default(null).label('Disabled When').meta({ control: 'expression' }),
  }),
  Component: ({ title, description, options, name, disabled }) => {
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
        <Form.CheckboxGroup options={options} disabled={disabled ?? undefined} />
      </Form.Item>
    );
  },
});
