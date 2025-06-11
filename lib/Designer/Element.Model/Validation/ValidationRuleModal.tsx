import { ValidationRuleTest } from '@/Model';
import { Modal } from 'antd';
import { FormikProps } from 'formik';
import { useRef } from 'react';
import { EditValidationForm, ValidationRuleFormValue } from './ValidationRuleForm';
import { clx } from '@/clx';
import { DynamicFormTheme } from '@/DynamicFormTheme';

export interface ValidationRuleModalProps {
  title?: React.ReactNode;
  initialValue?: ValidationRuleTest;
  onSubmit: (value: ValidationRuleTest) => void;
  onClose: () => void;
}

function useSubmit(props: ValidationRuleModalProps) {
  const { onSubmit } = props;
  return (value: ValidationRuleFormValue) => onSubmit({ ...value, type: 'test' });
}

const ValidationRuleModalComponent = DynamicFormTheme.flexy(
  'ValidationRuleModal',
  (props: ValidationRuleModalProps) => {
    const {
      initialValue = EditValidationForm.initialValue,
      onClose,
      title = ValidationRuleModal.title,
    } = props;
    const form = useRef<FormikProps<ValidationRuleFormValue>>(null);
    const onSubmit = useSubmit(props);

    return (
      <Modal
        open
        title={title}
        onCancel={onClose}
        onOk={() => form.current?.submitForm()}
        width="80%"
        style={{ maxWidth: 1000 }}
        className={clx('validation-rule-modal')}
      >
        <EditValidationForm initialValue={initialValue} onSubmit={onSubmit} innerRef={form} />
      </Modal>
    );
  },
);

export const ValidationRuleModal = Object.assign(ValidationRuleModalComponent, {
  title: 'Validation Rule' as React.ReactNode,
});
