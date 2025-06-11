import { DynamicFormTheme } from '@/DynamicFormTheme';
import { isRequiredValidationRule, ValidationRule } from '@/Model';
import { Checkbox, CheckboxChangeEvent } from 'antd';
import { useField } from 'formik';
import { useCallback, useMemo } from 'react';

export interface FormValidationRequiredProps {
  name: string;
  text?: React.ReactNode;
}

function useCheckbox(props: FormValidationRequiredProps) {
  const { name } = props;
  const [{ value }, , { setValue, setTouched }] = useField<ValidationRule[] | null>(name);
  const checked = useMemo(() => !!value && value.some(isRequiredValidationRule), [value]);

  const onChange = useCallback(
    (e: CheckboxChangeEvent) => {
      let newValue: ValidationRule[] = value?.filter((x) => !isRequiredValidationRule(x)) ?? [];
      if (e.target.checked) newValue = [...newValue, { type: 'required', message: null }];
      setValue(newValue.length > 0 ? newValue : null);
      setTouched(true, true);
    },
    [value, setValue, setTouched],
  );

  return { checked, onChange };
}

export const FormValidationRequired = DynamicFormTheme.flexy(
  'FormValidationRequired',
  (props: FormValidationRequiredProps) => {
    const { text = 'Required?' } = props;
    const { checked, onChange } = useCheckbox(props);

    return (
      <Checkbox checked={checked} onChange={onChange}>
        {text}
      </Checkbox>
    );
  },
);
