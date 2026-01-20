import * as Yup from 'yup';
import { createElement } from './ElementBase';
import { Form } from '@webinex/antik';
import { FieldBinaryOutlined } from '@ant-design/icons';
import { DesignerPropMeta } from '@/Designer/DesignerMeta';

export const InputNumber = createElement({
  id: 'InputNumber',
  title: 'Number Input',
  value: 'number',
  icon: <FieldBinaryOutlined />,
  props: Yup.object({
    title: Yup.string()
      .required()
      .default('Number')
      .label('Title')
      .meta({ description: 'Input Number field title' } satisfies DesignerPropMeta),
    placeholder: Yup.string().label('Placeholder').nullable(),
    prefix: Yup.string().label('Prefix').nullable(),
    min: Yup.number()
      .nullable()
      .label('Minimum Value')
      .meta({ description: 'Minimum value allowed' } satisfies DesignerPropMeta),
    max: Yup.number()
      .nullable()
      .label('Maximum Value')
      .meta({ description: 'Maximum value allowed' } satisfies DesignerPropMeta),
    precision: Yup.number()
      .nullable()
      .label('Decimal Places')
      .meta({ description: 'Number of decimal places allowed' } satisfies DesignerPropMeta),
    disabled: Yup.bool()
      .nullable()
      .default(null)
      .label('Disabled When')
      .meta({ control: 'expression' } satisfies DesignerPropMeta),
  }),
  Component: ({ title, name, placeholder, prefix, required, min, max, precision, disabled }) => {
    return (
      <Form.Item label={title} name={name} required={required}>
        <Form.InputNumber
          prefix={prefix}
          {...Form.InputNumber.defaultProps}
          placeholder={placeholder ?? undefined}
          disabled={disabled ?? undefined}
          min={min ?? undefined}
          max={max ?? undefined}
          precision={precision ?? undefined}
        />
      </Form.Item>
    );
  },
});
