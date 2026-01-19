import * as Yup from 'yup';
import { createElement } from './ElementBase';
import { Form } from '@webinex/antik';
import { ClockCircleOutlined } from '@ant-design/icons';
import { DesignerPropMeta } from '@/Designer/DesignerMeta';

export const TimePicker = createElement({
  id: 'TimePicker',
  title: 'Time Picker',
  icon: <ClockCircleOutlined />,
  value: 'date',
  props: Yup.object({
    title: Yup.string()
      .required()
      .default('Time')
      .label('Title')
      .meta({ description: 'Date Time picker field title' } satisfies DesignerPropMeta),
    placeholder: Yup.string().label('Placeholder').nullable(),
    disabled: Yup.bool()
      .nullable()
      .default(null)
      .label('Disabled When')
      .meta({ control: 'expression' } satisfies DesignerPropMeta),
  }),
  Component: ({ title, name, placeholder, required, disabled }) => {
    return (
      <Form.Item label={title} name={name} required={required}>
        <Form.TimePicker
          {...Form.DatePicker.defaultProps}
          placeholder={placeholder ?? undefined}
          disabled={disabled ?? undefined}
          allowClear
          needConfirm={false}
        />
      </Form.Item>
    );
  },
});
