import * as Yup from 'yup';
import { createElement } from './ElementBase';
import { useField } from 'formik';
import { Rate as _Rate } from 'antd';
import { Form } from '@webinex/antik';
import { StarOutlined } from '@ant-design/icons';

export const Rate = createElement({
  id: 'Rate',
  icon: <StarOutlined />,
  props: Yup.object({
    title: Yup.string().required().default('Rate').label('Title').meta({ description: 'Rate component' }),
    count: Yup.number().required().default(5).label('Count'),
    disabled: Yup.bool()
      .nullable()
      .meta({ control: 'expression', description: 'Disable when expression is true' }),
  }),
  Component: ({ title, name, disabled, count }) => {
    const [{ value }, , { setValue, setTouched }] = useField<number | undefined>(name);
    const onChange = (val: number) => {
      setValue(val);
      setTouched(true);
    };

    return (
      <Form.Item label={title} name={name}>
        <_Rate disabled={disabled ?? undefined} value={value} onChange={onChange} count={count} allowClear />
      </Form.Item>
    );
  },
});
