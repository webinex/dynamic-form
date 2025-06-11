import { useField } from 'formik';
import { BoolExpression } from '@/Model';
import { useCallback } from 'react';
import { Button } from 'antd';
import { DynamicFormTheme } from '@/DynamicFormTheme';
import type { FormBoolExpressionProps } from './FormBoolExpression';

export const FormBoolExpressionAddButton = DynamicFormTheme.flexy(
  'FormBoolExpressionAddButton',
  (props: Pick<FormBoolExpressionProps, 'name'>) => {
    const { name } = props;
    const [{ value }, , { setValue }] = useField<BoolExpression>(name);

    const onClick = useCallback(
      () =>
        setValue({
          ...value,
          expressions: [
            ...value.expressions,
            { type: 'BinaryExpression', operator: '=', left: null!, right: null! },
          ],
        }),
      [value, setValue],
    );

    return (
      <Button color="default" variant="filled" onClick={onClick}>
        Add Expression
      </Button>
    );
  },
);
