import { FormValidationRequired } from './FormValidationRequired';
import { useField } from 'formik';
import { ValidationRule } from '@/Model';
import { FormValidationTest } from './FormValidationTest';
import { Flex, Typography } from 'antd';
import { FormAddValidationRuleButton } from './FormAddValidationRuleButton';
import { Form } from '@webinex/antik';
import { DynamicFormTheme } from '@/DynamicFormTheme';
import { useCallback } from 'react';

export interface FormValidationBlockProps {
  name?: string;
}

function useDelete(props: FormValidationBlockProps) {
  const name = Form.useName(props.name);
  const [{ value: rules }, , { setValue }] = useField<ValidationRule[] | null>(name);

  return useCallback(
    (value: ValidationRule) => setValue(rules!.filter((x) => x !== value)),
    [setValue, rules],
  );
}

export const FormValidationBlock = DynamicFormTheme.flexy(
  'FormValidationBlock',
  (props: FormValidationBlockProps) => {
    const name = Form.useName(props.name);
    const [{ value: rules }] = useField<ValidationRule[] | null>(name);
    const onDelete = useDelete(props);

    return (
      <Flex vertical gap="small">
        <div>
          <FormValidationRequired name={name} />
        </div>
        {rules?.map((rule, index) => {
          if (rule.type === 'required') {
            return null;
          }

          if (rule.type === 'test') {
            return (
              <div key={index}>
                <FormValidationTest name={`${name}[${index}]`} onDelete={onDelete} />
              </div>
            );
          }

          return (
            <div key={index}>
              <Typography.Text type="danger">Unknown validation rule</Typography.Text>
            </div>
          );
        })}

        <div style={{ marginTop: '1rem' }}>
          <FormAddValidationRuleButton name={name} />
        </div>
      </Flex>
    );
  },
);
