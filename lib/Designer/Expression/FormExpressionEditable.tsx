import { useState } from 'react';
import { Expression } from '@/Model';
import { useField } from 'formik';
import { ExpressionValue } from './ExpressionValue';
import { Button, Tag, Typography } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { EditExpressionModal } from './EditExpressionModal';
import { Form } from '@webinex/antik';
import { DynamicFormTheme } from '@/DynamicFormTheme';

export interface FormExpressionEditableProps {
  name?: string;
}

export const FormExpressionEditable = DynamicFormTheme.flexy(
  'FormExpressionEditable',
  (props: FormExpressionEditableProps) => {
    const name = Form.useName(props.name);
    const [{ value }, , { setTouched, setValue }] = useField<Expression | null>(name);
    const [isOpen, setOpen] = useState(false);

    function onChange(value: Expression | null) {
      setOpen(false);
      setValue(value);
      setTouched(true, true);
    }

    return (
      <div>
        {value && (
          <Tag>
            <ExpressionValue value={value} />
          </Tag>
        )}
        {!value && (
          <Typography.Text type="secondary" italic>
            No expression set
          </Typography.Text>
        )}
        <Button type="link" icon={<EditOutlined />} onClick={() => setOpen(true)} />
        {isOpen && (
          <EditExpressionModal initialValue={value} onClose={() => setOpen(false)} onSubmit={onChange} />
        )}
      </div>
    );
  },
);
