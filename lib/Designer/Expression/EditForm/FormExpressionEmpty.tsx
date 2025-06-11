import { PlusOutlined } from '@ant-design/icons';
import { Button, Empty, Flex } from 'antd';
import { useField } from 'formik';
import { useCallback } from 'react';
import { FormBinaryExpression } from './Binary';
import { DynamicFormTheme } from '@/DynamicFormTheme';

export interface FormExpressionEmptyProps {
  name: string;
}

function useAdd(props: FormExpressionEmptyProps) {
  const { name } = props;
  const [, , { setValue }] = useField(name);
  return useCallback(() => setValue(FormBinaryExpression.initialValue), [setValue]);
}

function Blurb(props: FormExpressionEmptyProps) {
  const onAdd = useAdd(props);

  return (
    <div>
      <div>No expression set</div>
      <br />
      <Flex justify="center">
        <Button onClick={onAdd} type="primary" icon={<PlusOutlined />}>
          Add Expression
        </Button>
      </Flex>
    </div>
  );
}

export const FormExpressionEmpty = DynamicFormTheme.flexy(
  'FormExpressionEmpty',
  (props: FormExpressionEmptyProps) => {
    return (
      <Empty
        description={<Blurb {...props} />}
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        style={{ marginTop: 20 }}
      />
    );
  },
);
