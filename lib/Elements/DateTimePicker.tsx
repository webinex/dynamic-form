import * as Yup from 'yup';
import { createElement } from './ElementBase';
import { Form } from '@webinex/antik';
import { CalendarOutlined } from '@ant-design/icons';
import { DesignerPropMeta } from '@/Designer/DesignerMeta';

export const DateTimePicker = createElement({
  id: 'DateTimePicker',
  title: 'Date & Time Picker',
  icon: <CalendarOutlined />,
  value: 'date',
  props: Yup.object({
    title: Yup.string()
      .required()
      .default('Date Time')
      .label('Title')
      .meta({ description: 'Date Time picker field title' } satisfies DesignerPropMeta),
    type: Yup.string<'date-time' | 'date'>()
      .oneOf(['date-time', 'date'])
      .default('date-time')
      .label('Type')
      .required(),
    placeholder: Yup.string().label('Placeholder').nullable(),
    disabled: Yup.bool()
      .nullable()
      .default(null)
      .label('Disabled When')
      .meta({ control: 'expression' } satisfies DesignerPropMeta),
  }),
  Component: ({ title, name, placeholder, type, required, disabled }) => {
    return (
      <Form.Item label={title} name={name} required={required}>
        <Form.DatePicker
          {...Form.DatePicker.defaultProps}
          placeholder={placeholder ?? undefined}
          disabled={disabled ?? undefined}
          showTime={type === 'date-time'}
          allowClear
          needConfirm={false}
        />
      </Form.Item>
    );
  },
});
