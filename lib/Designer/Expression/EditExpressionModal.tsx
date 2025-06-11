import './EditExpressionModal.scss';
import { Modal } from 'antd';
import { Expression } from '@/Model/Expression';
import { ExpressionForm, ExpressionFormValue } from './EditForm';
import { useCallback, useMemo } from 'react';
import { Form } from '@webinex/antik';
import { clx } from '@/clx';
import { DynamicFormTheme } from '@/DynamicFormTheme';

export interface EditExpressionModalProps {
  title?: React.ReactNode;
  initialValue: Expression | null;
  onClose: () => void;
  onSubmit: (value: Expression | null) => void;
}

function useFormValue(props: EditExpressionModalProps) {
  const { initialValue } = props;
  return useMemo(
    () => (initialValue ? { value: initialValue } : ExpressionForm.initialValue),
    [initialValue],
  );
}

function useSubmit(props: EditExpressionModalProps) {
  const { onSubmit } = props;
  return useCallback((value: ExpressionFormValue) => onSubmit(value.value), [onSubmit]);
}

export const EditExpressionModal = DynamicFormTheme.flexy(
  'EditExpressionModal',
  (props: EditExpressionModalProps) => {
    const { onClose, title = 'Edit Expression' } = props;
    const submitForm = Form.useSubmit(ExpressionForm.uid);
    const formValue = useFormValue(props);
    const onSubmit = useSubmit(props);

    return (
      <Modal
        open
        title={title}
        onCancel={onClose}
        onOk={submitForm}
        width="80%"
        style={{ maxWidth: 1000 }}
        className={clx('edit-expression-modal')}
      >
        <ExpressionForm initialValue={formValue} onSubmit={onSubmit} />
      </Modal>
    );
  },
);
