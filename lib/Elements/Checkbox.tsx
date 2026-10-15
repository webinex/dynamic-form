import * as Yup from 'yup';
import { createElement } from './ElementBase';
import { Typography } from 'antd';
import { Form } from '@webinex/antik';
import { CheckSquareOutlined } from '@ant-design/icons';
import { DesignerPropMeta } from '@/Designer/DesignerMeta';

export const Checkbox = createElement({
  id: 'Checkbox',
  title: 'Checkbox',
  icon: <CheckSquareOutlined />,
  value: 'boolean',
  props: Yup.object({
    title: Yup.string().default('Checkbox').label('Title').nullable(),
    description: Yup.string().nullable().default(null).label('Description'),
    disabled: Yup.bool()
      .nullable()
      .default(null)
      .label('Disabled When')
      .meta({ control: 'expression' } satisfies DesignerPropMeta),
  }),
  Component: ({ title, description, name, disabled }) => {
    return (
      <Form.Item name={name} label={false}>
        <Form.Checkbox disabled={disabled ?? undefined}>{title}</Form.Checkbox>
        {description && (
          <div>
            <Typography.Text type="secondary" style={{ fontSize: '0.875rem' }}>
              {description}
            </Typography.Text>
          </div>
        )}
      </Form.Item>
    );
  },
});
