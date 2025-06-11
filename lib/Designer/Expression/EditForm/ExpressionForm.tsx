import * as Yup from 'yup';
import { Expression } from '@/Model';
import { FORM_EXPRESSION_SCHEMA } from './FormExpressionSchema';
import { FormExpression } from './FormExpression';
import { ExpressionValue } from '../ExpressionValue';
import { FormBinaryExpression } from './Binary';
import { Form } from '@webinex/antik';
import { DynamicFormTheme } from '@/DynamicFormTheme';

export interface ExpressionFormProps {
  initialValue: ExpressionFormValue;
  onSubmit: (value: ExpressionFormValue) => void;
}

export interface ExpressionFormValue {
  value: Expression;
}

const SCHEMA = Yup.object({
  value: FORM_EXPRESSION_SCHEMA,
});

const INITIAL_VALUE: ExpressionFormValue = {
  value: FormBinaryExpression.initialValue,
};

const ExpressionFormComponent = DynamicFormTheme.flexy('ExpressionForm', (props: ExpressionFormProps) => {
  const { initialValue, onSubmit } = props;

  return (
    <Form
      type="formik"
      uid={ExpressionForm.uid}
      initialValues={initialValue}
      validationSchema={SCHEMA}
      onSubmit={onSubmit}
      layout="vertical"
    >
      {({ values }) => (
        <>
          <FormExpression name="value" />
          <pre style={{ marginTop: 20 }}>{values.value && <ExpressionValue value={values.value} />}</pre>
        </>
      )}
    </Form>
  );
});

export const ExpressionForm = Object.assign(ExpressionFormComponent, {
  uid: 'edit-expression-form',
  schema: SCHEMA,
  initialValue: INITIAL_VALUE,
});
