import { useFormikContext } from 'formik';
import { useEffect } from 'react';
import * as Yup from 'yup';

export function FormAutoSubmit({ schema }: { schema: Yup.ObjectSchema<Yup.AnyObject> }) {
  const { values, submitForm } = useFormikContext();

  useEffect(() => {
    if (schema.isValidSync(values)) {
      submitForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  return <></>;
}
