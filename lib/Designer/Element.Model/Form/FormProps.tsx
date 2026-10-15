import { DynamicFormTheme } from '@/DynamicFormTheme';
import { ElementBase } from '@/Elements';
import { memo, useMemo } from 'react';
import { AnyObject, ObjectSchema } from 'yup';
import { FormProp } from '.';

export interface FormPropsProps {
  name: string;
  Element: ElementBase<ObjectSchema<any, AnyObject, any, ''>>;
}

export const FormProps = DynamicFormTheme.flexy(
  'FormProps',
  memo((props: FormPropsProps) => {
    const { name, Element } = props;
    const description = useMemo(() => Element!.props.describe(), [Element!.props]);

    return (
      <>
        {Object.entries(description.fields).map(([propName, description]) => (
          <FormProp key={propName} name={`${name}.${propName}`} description={description} />
        ))}
      </>
    );
  }),
);
