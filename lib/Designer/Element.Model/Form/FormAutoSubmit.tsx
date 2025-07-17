import { debounce } from '@/util';
import { useFormikContext } from 'formik';
import { useEffect, useMemo } from 'react';
import * as Yup from 'yup';

export function FormAutoSubmit({ schema }: { schema: Yup.ObjectSchema<Yup.AnyObject> }) {
  const { values, submitForm } = useFormikContext();
  const submitFormDebounced = useMemo(() => debounce(submitForm, 500), [submitForm]);

  useEffect(() => {
    if (schema.isValidSync(values)) {
      submitFormDebounced();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  return <></>;
}
