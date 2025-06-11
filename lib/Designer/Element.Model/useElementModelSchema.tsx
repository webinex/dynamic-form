import { useDesignerContext } from '@/Designer/DesignerContext';
import { useMemo } from 'react';
import * as Yup from 'yup';
import { SchemaUtil } from '../SchemaUtil';

export function useElementModelSchema() {
  const { selectedElement } = useDesignerContext();
  const { props } = selectedElement!;

  return useMemo(() => {
    let propsSchema = props;
    const fields = props.describe().fields;

    for (const key in fields) {
      if (Object.prototype.hasOwnProperty.call(fields, key)) {
        const element = fields[key];

        if (element.type === 'boolean' && element.meta && element.meta.control === 'expression') {
          const isRequired = SchemaUtil.isRequired(element);
          let newPropSchema = Yup.boolean().nullable();
          if (isRequired) newPropSchema = newPropSchema.required();
          propsSchema = propsSchema.concat(Yup.object({ [key]: newPropSchema }));
        }
      }
    }

    return Yup.object({ props: props.required(), validation: Yup.array(Yup.object().required()).nullable() });
  }, [props]);
}
