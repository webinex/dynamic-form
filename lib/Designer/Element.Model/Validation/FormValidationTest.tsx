import { ExpressionValue } from '@/Designer/Expression';
import { ValidationRuleTest } from '@/Model';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Tag } from 'antd';
import { useField } from 'formik';
import { ValidationRuleModal } from './ValidationRuleModal';
import { useCallback, useMemo, useState } from 'react';
import { ValidationRuleFormValue } from './ValidationRuleForm';
import { DynamicFormTheme } from '@/DynamicFormTheme';

export interface FormValidationTestProps {
  name: string;
  onDelete?: (value: ValidationRuleTest) => void;
}

function useSubmit(props: FormValidationTestProps, onSubmitted: () => void) {
  const { name } = props;
  const [{ value }, , { setValue }] = useField<ValidationRuleTest>(name);
  return useCallback(
    (values: ValidationRuleFormValue) => Promise.resolve(setValue({ ...value, ...values })).then(onSubmitted),
    [value, setValue, onSubmitted],
  );
}

export const FormValidationTest = DynamicFormTheme.flexy(
  'FormValidationTest',
  (props: FormValidationTestProps) => {
    const { name, onDelete: onDeleteProp } = props;
    const [{ value }] = useField<ValidationRuleTest>(name);
    const [modalShown, setModalShown] = useState(false);
    const toggleModal = useCallback(() => setModalShown((prev) => !prev), []);
    const onSubmit = useSubmit(props, toggleModal);
    const onDelete = useMemo(
      () => (onDeleteProp ? () => onDeleteProp(value) : undefined),
      [onDeleteProp, value],
    );

    return (
      <div>
        <Tag>
          <ExpressionValue value={value.test} />
        </Tag>
        {value.message}
        <Button type="link" icon={<EditOutlined />} onClick={toggleModal} />
        {onDelete && <Button onClick={onDelete} type="link" icon={<DeleteOutlined />} />}
        {modalShown && <ValidationRuleModal initialValue={value} onSubmit={onSubmit} onClose={toggleModal} />}
      </div>
    );
  },
);
