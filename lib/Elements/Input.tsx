import * as Yup from 'yup';
import { createElement } from './ElementBase';
import { useField } from 'formik';
import { Form } from '@webinex/antik';

export const Input = createElement({
  id: 'Input',
  props: Yup.object({
    title: Yup.string().required().default('Input').label('Title').meta({ description: 'Input field title' }),
    type: Yup.string<'input' | 'textarea'>()
      .oneOf(['input', 'textarea'])
      .default('input')
      .label('Type')
      .required(),
    htmlType: Yup.string<'text' | 'email' | 'password'>()
      .oneOf(['text', 'email', 'password'])
      .default('text')
      .label('HTML Type')
      .meta({
        description:
          'HTML input type.\n\nWhen `email` selected, browser will auto suggest users email.\n\nWhen `password` selected, input will be masked.',
      }),
    placeholder: Yup.string().label('Placeholder').nullable(),
    disabled: Yup.bool().nullable().default(null).label('Disabled When').meta({ control: 'expression' }),
  }),
  Component: ({ title, name, placeholder, type, required, htmlType, disabled }) => {
    const [{ value }] = useField<string | undefined>(name);

    return (
      <Form.Item label={title} name={name} required={required}>
        {type === 'textarea' && (
          <Form.TextArea
            value={value ?? ''}
            placeholder={placeholder ?? undefined}
            disabled={disabled ?? undefined}
          />
        )}
        {type === 'input' && (
          <Form.Input
            type={htmlType}
            placeholder={placeholder ?? undefined}
            disabled={disabled ?? undefined}
          />
        )}
      </Form.Item>
    );
  },
});
