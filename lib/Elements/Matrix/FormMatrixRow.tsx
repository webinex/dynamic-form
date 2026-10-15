import { Form } from '@webinex/antik';
import { Radio } from 'antd';
import { useField, useFormikContext } from 'formik';

export interface MatrixOption {
  label: React.ReactNode;
  value: number;
}

export interface MatrixRow {
  title: string;
  required?: boolean;
  options: MatrixOption[];
}

export interface FormMatrixProps {
  name: string;
  disabled?: boolean;
  rows: MatrixRow[];
}

function FormMatrixRow(props: { name: string; row: MatrixRow; disabled?: boolean; noErrorMessage: boolean }) {
  const { name, row, noErrorMessage } = props;
  const disabled = Form.useDisabled(props.disabled);
  const [{ value }, { error }, { setValue, setTouched }] = useField<number | null | undefined>(name);
  const { submitCount } = useFormikContext();
  const showSubmitError = !noErrorMessage && submitCount > 0 && !!error;

  return (
    <Form.Item
      label={row.title}
      name={name}
      nameAbsolute
      required={row.required}
      // Suppresses the error message for a row when the whole matrix has an error
      // to avoid errors.matrix[0] being displayed as first char of the error message
      noErrorMessage={noErrorMessage}
      validateStatus={noErrorMessage ? '' : showSubmitError ? 'error' : undefined}
      // Workaround to show error message when the form is submitted and the values is [] or null
      // values[0] will not be marked as touched when the form is submitted, so we need to show the error message manually
      help={showSubmitError ? <Form.ErrorMessage name={name} label={row.title} mode="always" /> : undefined}
    >
      <Form.RadioGroup disabled={disabled} optionType="default">
        {row.options.map((option) => (
          <Radio
            key={option.value}
            value={option.value}
            onClick={() => {
              if (!disabled && value === option.value) {
                setValue(null);
                setTouched(true, false);
              }
            }}
          >
            {option.label}
          </Radio>
        ))}
      </Form.RadioGroup>
    </Form.Item>
  );
}

export function FormMatrix(props: FormMatrixProps) {
  const { name, disabled, rows } = props;
  const [, { error, touched }] = useField(name);
  const { submitCount } = useFormikContext();
  const hasFormError = error != null && !Array.isArray(error);
  const showFormError = hasFormError && (touched || submitCount > 0);

  return (
    <Form.Item
      name={name}
      nameAbsolute
      label={false}
      htmlFor=""
      noErrorMessage={!hasFormError}
      validateStatus={showFormError ? 'error' : ''}
      help={showFormError ? <Form.ErrorMessage name={name} mode="always" /> : undefined}
      style={{ marginBottom: 0 }}
    >
      <div>
        {rows.map((row, index) => {
          const fieldName = `${name}[${index}]`;
          return (
            <FormMatrixRow
              key={fieldName}
              name={fieldName}
              row={row}
              disabled={disabled}
              noErrorMessage={hasFormError}
            />
          );
        })}
      </div>
    </Form.Item>
  );
}
