import './FormPropList.scss';
import { setIn, useField, useFormikContext } from 'formik';
import { ArrayOfSchemaFieldDescription } from '@/Designer/SchemaUtil';
import { Button, List } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { FormProp } from './FormProp';
import { clx } from '@/clx';
import { DynamicFormTheme } from '@/DynamicFormTheme';
import type { ModelElement } from '@/Model';

export const FormPropList = DynamicFormTheme.flexy(
  'FormPropList',
  (props: { name: string; description: ArrayOfSchemaFieldDescription }) => {
    const { name, description } = props;
    const [{ value }, , { setValue }] = useField<any[]>(name);
    const { setValues } = useFormikContext<ModelElement>();

    if (!value) {
      return null;
    }

    function removeItem(index: number) {
      const items = value.filter((_, i) => i !== index);

      setValues((values) => {
        const next = setIn(values, name, items);
        next.defaultValue = null;
        return next;
      });
    }

    return (
      <>
        <List
          dataSource={value.map((_, index) => ({ key: index }))}
          itemLayout="vertical"
          renderItem={({ key }) => (
            <List.Item
              className={clx('form-prop-list-item')}
              extra={
                <Button
                  type="link"
                  icon={<DeleteOutlined />}
                  onClick={() => removeItem(key)}
                />
              }
            >
              <FormProp name={`${name}[${key}]`} description={description.innerType} noLabel noErrorMessage />
            </List.Item>
          )}
          footer={
            <Button
              color="default"
              variant="filled"
              onClick={() => setValue([...value, null])}
              icon={<PlusOutlined />}
            >
              Add item
            </Button>
          }
          locale={{ emptyText: 'No items' }}
          rootClassName={clx('form-prop-list')}
        />
      </>
    );
  },
);
