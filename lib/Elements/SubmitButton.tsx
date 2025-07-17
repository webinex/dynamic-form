import * as Yup from 'yup';
import { createElement } from './ElementBase';
import { ButtonProps, Rate as _Rate } from 'antd';
import { Form } from '@webinex/antik';
import { BorderOutlined } from '@ant-design/icons';

export const SubmitButton = createElement({
  id: 'SubmitButton',
  title: 'Submit Button',
  value: 'readonly',
  icon: <BorderOutlined />,
  props: Yup.object({
    type: Yup.string<NonNullable<ButtonProps['type']>>()
      .oneOf(['primary', 'default', 'dashed', 'text', 'link'])
      .required()
      .default('primary')
      .label('Type')
      .meta({ description: 'Button type' }),

    text: Yup.string().required().default('Submit').label('Text').meta({ description: 'Text of the button' }),

    disabled: Yup.bool().nullable().label('Disabled When').meta({ control: 'expression' }),

    align: Yup.string<'left' | 'center' | 'right'>()
      .oneOf(['left', 'center', 'right'])
      .required()
      .default('left')
      .label('Align')
      .meta({ description: 'Alignment of the button' }),
  }),
  Component: ({ text, type, disabled, align }) => {
    return (
      <div style={{ textAlign: align }}>
        <Form.Submit disabled={disabled ?? undefined} type={type ?? undefined}>
          {text}
        </Form.Submit>
      </div>
    );
  },
});
