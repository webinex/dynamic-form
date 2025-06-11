import * as Yup from 'yup';
import { ExpressionValue, FormBinaryExpression, FormExpression } from '@/Designer/Expression';
import { Expression } from '@/Model/Expression';
import { Form } from '@webinex/antik';
import { FormikProps, useFormikContext } from 'formik';
import { DynamicFormTheme } from '@/DynamicFormTheme';

const SCHEMA = Yup.object({
  test: Yup.mixed<Expression>().required(),
  message: Yup.string().nullable().required(),
});

export type ValidationRuleFormValue = Yup.InferType<typeof SCHEMA>;

const INITIAL_VALUE: ValidationRuleFormValue = {
  message: null!,
  test: FormBinaryExpression.initialValue,
};

export interface ValidationRuleFormProps {
  uid?: string;
  schema?: Yup.ObjectSchema<Yup.AnyObject>;
  initialValue: ValidationRuleFormValue;
  onSubmit: (value: ValidationRuleFormValue) => void;
  innerRef?: React.Ref<FormikProps<ValidationRuleFormValue>>;
}

function FormContent() {
  const { values } = useFormikContext<ValidationRuleFormValue>();

  return (
    <>
      <Form.Item
        name="test"
        label="Test"
        required
        extra={
          values.test && (
            <pre>
              <ExpressionValue value={values.test} />
            </pre>
          )
        }
      >
        <FormExpression name="test" />
      </Form.Item>

      <Form.Item name="message" label="Message" required>
        <Form.Input />
      </Form.Item>
    </>
  );
}

const ValidationRuleFormComponent = DynamicFormTheme.flexy(
  'ValidationRuleForm',
  (props: ValidationRuleFormProps) => {
    const {
      initialValue,
      onSubmit,
      innerRef,
      uid = EditValidationForm.uid,
      schema = EditValidationForm.schema,
    } = props;

    return (
      <Form<ValidationRuleFormValue>
        type="formik"
        uid={uid}
        initialValues={initialValue}
        onSubmit={onSubmit}
        validationSchema={schema}
        innerRef={innerRef}
        layout="vertical"
        enableReinitialize
      >
        <FormContent />
      </Form>
    );
  },
);

export const EditValidationForm = Object.assign(ValidationRuleFormComponent, {
  schema: SCHEMA,
  initialValue: INITIAL_VALUE,
  uid: 'validation-rule-form',
});
