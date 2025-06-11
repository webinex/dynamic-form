import * as Yup from 'yup';
import { createElement } from '@/Elements';
import { Form } from '@webinex/antik';

export const Switch = createElement({
  id: 'Switch',
  props: Yup.object({
    textOn: Yup.string().required().default('ON').label('Text displayed when switch is ON'),
    textOff: Yup.string().required().default('OFF').label('Text displayed when switch is OFF'),
  }),
  Component: ({ name, textOn, textOff }) => {
    return <Form.Switch name={name} checkedChildren={textOn} unCheckedChildren={textOff} />;
  },
});
