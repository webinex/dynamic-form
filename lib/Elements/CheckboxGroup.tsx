import * as Yup from 'yup';
import { createElement } from './ElementBase';
import { Typography } from 'antd';
import { Form } from '@webinex/antik';
import { BlockOutlined } from '@ant-design/icons';
import { DesignerPropMeta, DesignerPropsObjectMeta } from '@/Designer/DesignerMeta';

export const CheckboxGroup = createElement({
  id: 'CheckboxGroup',
  title: 'Checkbox Group',
  icon: <BlockOutlined />,
  value: ['arrayOf', 'string'],
  props: Yup.object({
    title: Yup.string().default('Checkbox').label('Title').nullable(),
    description: Yup.string().nullable().default(null).label('Description'),
    options: Yup.array().of(Yup.string().required()).required().default(['A', 'B', 'C']).label('Options'),
    disabled: Yup.bool()
      .nullable()
      .default(null)
      .label('Disabled When')
      .meta({ control: 'expression' } satisfies DesignerPropMeta),
  }).meta({
    constantExpressionControl: { type: 'select', options: 'options' },
  } satisfies DesignerPropsObjectMeta),
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
