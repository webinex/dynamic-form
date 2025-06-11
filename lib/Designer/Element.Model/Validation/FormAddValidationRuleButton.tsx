import { Button } from 'antd';
import React, { useCallback, useState } from 'react';
import { ValidationRuleModal } from './ValidationRuleModal';
import { useField } from 'formik';
import { ValidationRule } from '@/Model';
import { ValidationRuleFormValue } from './ValidationRuleForm';
import { PlusOutlined } from '@ant-design/icons';
import { DynamicFormTheme } from '@/DynamicFormTheme';

export interface FormAddValidationRuleButtonProps {
  name: string;
  text?: React.ReactNode;
}

function useSubmit(props: FormAddValidationRuleButtonProps, onSubmitted: () => void) {
  const { name } = props;
  const [{ value }, , { setValue }] = useField<ValidationRule[] | null>(name);

  return useCallback(
    (formValue: ValidationRuleFormValue) => {
      const newValue = value?.slice() ?? [];
      newValue.push({ type: 'test', ...formValue });
      setValue(newValue);
      onSubmitted();
    },
    [value, setValue, onSubmitted],
  );
}

export const FormAddValidationRuleButton = DynamicFormTheme.flexy(
  'FormAddValidationRuleButton',
  (props: FormAddValidationRuleButtonProps) => {
    const { text = 'Add Validation Rule' } = props;
    const [modalShown, setModalShown] = useState(false);
    const toggleModal = useCallback(() => setModalShown((prev) => !prev), []);
    const onSubmit = useSubmit(props, toggleModal);

    return (
      <>
        {modalShown && <ValidationRuleModal onClose={toggleModal} onSubmit={onSubmit} />}
        <Button icon={<PlusOutlined />} color="default" variant="filled" onClick={toggleModal}>
          {text}
        </Button>
      </>
    );
  },
);
