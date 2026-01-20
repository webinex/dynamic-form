import * as Yup from 'yup';
import { createElement } from '@/Elements';
import { Form } from '@webinex/antik';
import { SwapOutlined } from '@ant-design/icons';

export const Switch = createElement({
  id: 'Switch',
  icon: <SwapOutlined />,
  value: 'boolean',
  props: Yup.object({
    textOn: Yup.string().required().default('ON').label('Text displayed when switch is ON'),
    textOff: Yup.string().required().default('OFF').label('Text displayed when switch is OFF'),
  }),
  Component: ({ name, textOn, textOff }) => {
    return (
      <Form.Item name={name} label={false}>
        <Form.Switch checkedChildren={textOn} unCheckedChildren={textOff} />
      </Form.Item>
    );
  },
});
