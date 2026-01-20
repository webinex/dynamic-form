import * as Yup from 'yup';
import { ElementBase } from '@/Elements';
import { ModelElement } from '@/Model';
import { DesignerProps } from './Designer';
import { DesignerPropsObjectMeta } from './DesignerMeta';

function options<TSchema extends Yup.ObjectSchema<Yup.AnyObject, Yup.AnyObject, any, ''>>(
  Element: ElementBase<TSchema>,
  modelElement: ModelElement,
): any[] | null {
  const description = Element.props.describe();
  const meta = description.meta as DesignerPropsObjectMeta | undefined;
  return meta?.constantExpressionControl?.type === 'select'
    ? (modelElement.props[meta.constantExpressionControl.options] ?? [])
    : null;
}

function isOptionsElement<TSchema extends Yup.ObjectSchema<Yup.AnyObject, Yup.AnyObject, any, ''>>(
  Element: ElementBase<TSchema>,
) {
  const description = Element.props.describe();
  const meta = description.meta as DesignerPropsObjectMeta | undefined;
  return meta?.constantExpressionControl?.type === 'select';
}

function isMultiElement<TSchema extends Yup.ObjectSchema<Yup.AnyObject, Yup.AnyObject, any, ''>>(
  Element: ElementBase<TSchema>,
) {
  return Array.isArray(Element.value) && Element.value[0] === 'arrayOf';
}

export const DesignerUtil = {
  initialValue: (el: ElementBase): ModelElement['props'] => {
    const describe = el.props.describe();
    const props: Record<string, any> = describe.default ?? {};

    // for (const key in describe.fields) {
    //   const field = describe.fields[key] as SchemaFieldDescription & { optional: boolean; nullable: boolean };

    //   if ('defaults' in field) {
    //     props[key] = field.defaults;
    //     continue;
    //   }

    //   if (field.type === 'string' && !field.optional && !field.nullable) {
    //     props[key] = x.id;
    //     continue;
    //   }

    //   if (field.type === 'array' && !field.optional && !field.nullable) {
    //     props[key] = [];
    //     continue;
    //   }
    // }

    return { props };
  },

  flattenElements: (elements: DesignerProps['Elements']) => {
    return elements.flatMap((x) => (Array.isArray(x) ? x.slice(1) : x)) as ElementBase[];
  },

  options,

  isMultiElement,
  isOptionsElement,
};
