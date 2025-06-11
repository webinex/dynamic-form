import { useMemo } from 'react';
import { useDesignerContext } from '@/Designer/DesignerContext';
import { Form } from '@webinex/antik';
import { DynamicFormTheme } from '@/DynamicFormTheme';

export interface FormReferenceExpressionProps {
  name: string;
}

export const FormReferenceExpression = DynamicFormTheme.flexy(
  'FormReferenceExpression',
  (props: FormReferenceExpressionProps) => {
    const { name } = props;
    const { model } = useDesignerContext();

    const options = useMemo(
      () => model.elements.map((el) => ({ value: el.id, label: el.id })),
      [model.elements],
    );

    return <Form.Select name={`${name}.ref`} options={options} style={{ minWidth: 120 }} />;
  },
);
