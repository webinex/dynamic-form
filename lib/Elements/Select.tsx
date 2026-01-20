import * as Yup from 'yup';
import { createElement } from './ElementBase';
import { Form } from '@webinex/antik';
import { SelectOutlined } from '@ant-design/icons';
import { DesignerPropMeta, DesignerPropsObjectMeta } from '@/Designer/DesignerMeta';

export const Select = createElement({
  id: 'Select',
  icon: <SelectOutlined />,
  value: 'string',
  props: Yup.object({
    title: Yup.string().required().default('Select').label('Title'),
    options: Yup.array().of(Yup.string().required()).required().default(['A', 'B', 'C']).label('Options'),
    showSearch: Yup.bool()
      .nullable()
      .default(true)
      .label('Show Search')
      .meta({ description: 'Enable search functionality in the select dropdown' } satisfies DesignerPropMeta),
    disabled: Yup.bool()
      .nullable()
      .default(null)
      .label('Disabled When')
      .meta({ control: 'expression' } satisfies DesignerPropMeta),
  }).meta({
    constantExpressionControl: { type: 'select', options: 'options' },
  } satisfies DesignerPropsObjectMeta),
  Component: ({ title, options, name, disabled, required, showSearch }) => {
    return (
      <Form.Item label={title} name={name} required={required}>
        <Form.Select
          disabled={disabled ?? undefined}
          options={options.map((x) => ({ label: x, value: x }))}
          allowClear={!required}
          showSearch={showSearch ?? undefined}
        />
      </Form.Item>
    );
  },
});
