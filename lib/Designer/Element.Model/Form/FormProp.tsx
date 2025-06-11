import { SchemaObjectDescription } from 'yup';
import { SchemaUtil } from '@/Designer/SchemaUtil';
import { Form, FormItemProps } from '@webinex/antik';
import { FormPropLabel } from './FormPropLabel';
import { memo, useCallback } from 'react';
import { FormExpressionEditable } from '@/Designer/Expression';
import { FormPropList } from './FormPropList';
import { List, Typography } from 'antd';
import classNames from 'classnames';
import { clx } from '@/clx';
import { DynamicFormTheme } from '@/DynamicFormTheme';

export interface FormPropProps {
  name: string;
  description: SchemaObjectDescription['fields'][number];
  noLabel?: boolean;
  noErrorMessage?: boolean;
}

export const FormProp = DynamicFormTheme.flexy(
  'FormProp',
  memo((props: FormPropProps) => {
    const { name, description, noLabel, noErrorMessage } = props;

    const createFormItemElement = useCallback(
      (children: React.ReactNode, props?: Partial<FormItemProps>) => (
        <Form.Item
          label={noLabel ? false : <FormPropLabel name={name} description={description} />}
          required={SchemaUtil.isRequired(description)}
          name={name}
          nameAbsolute
          noErrorMessage={noErrorMessage}
          className={classNames({ [clx('no-error-message')]: noErrorMessage })}
          {...props}
        >
          {children}
        </Form.Item>
      ),
      [name, description, noLabel, noErrorMessage],
    );

    if (
      (description.type === 'string' || description.type === 'number') &&
      SchemaUtil.isOneOfDescription(description) &&
      description.oneOf.length > 0
    ) {
      return createFormItemElement(
        <Form.Select options={description.oneOf.map((x) => ({ label: x, value: x }))} allowClear />,
      );
    }

    if (description.type === 'string' && description.meta?.control === 'textarea') {
      return createFormItemElement(<Form.TextArea autoSize={{ minRows: 4, maxRows: 10 }} />);
    }

    if (description.type === 'boolean' && description.meta?.control === 'expression') {
      return createFormItemElement(<FormExpressionEditable name={name} />);
    }

    if (description.type === 'string') {
      return createFormItemElement(<Form.Input />);
    }

    if (description.type === 'array' && SchemaUtil.isArrayOfDescription(description)) {
      return (
        <Form.Item
          label={<FormPropLabel name={name} description={description} />}
          required={SchemaUtil.isRequired(description)}
          name={name}
          nameAbsolute
        >
          <FormPropList name={name} description={description} />
        </Form.Item>
      );
    }

    if (description.type === 'number') {
      return createFormItemElement(<Form.InputNumber />);
    }

    if (description.type === 'boolean') {
      return createFormItemElement(
        <Form.Checkbox>
          <FormPropLabel name={name} description={description} />
        </Form.Checkbox>,
        { label: false },
      );
    }

    if (description.type === 'object' && 'fields' in description) {
      return (
        <List
          dataSource={Object.keys(description.fields)}
          renderItem={(key) => (
            <List.Item>
              <FormProp name={`${name}.${key}`} description={description.fields[key]} />
            </List.Item>
          )}
        />
      );
    }

    return <Typography.Text type="danger">Unknown type</Typography.Text>;
  }),
);
