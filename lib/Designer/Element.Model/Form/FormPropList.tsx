import './FormPropList.scss';
import { useField } from 'formik';
import { ArrayOfSchemaFieldDescription } from '@/Designer/SchemaUtil';
import { Button, List } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { FormProp } from './FormProp';
import { clx } from '@/clx';
import { DynamicFormTheme } from '@/DynamicFormTheme';

export const FormPropList = DynamicFormTheme.flexy(
  'FormPropList',
  (props: { name: string; description: ArrayOfSchemaFieldDescription }) => {
    const { name, description } = props;
    const [{ value }, , { setValue }] = useField<any[]>(name);

    if (!value) {
      return null;
    }

    return (
      <List
        dataSource={value.map((_, index) => ({ key: index }))}
        renderItem={({ key }) => (
          <List.Item
            className={clx('form-prop-list-item')}
            actions={[
              <Button
                key="delete"
                type="link"
                icon={<DeleteOutlined />}
                onClick={() => setValue(value.filter((_, i) => i !== key))}
              />,
            ]}
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
    );
  },
);
