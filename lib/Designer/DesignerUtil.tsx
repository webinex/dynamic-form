import { ElementBase } from '@/Elements';
import { ModelElement } from '@/Model';
import { DesignerProps } from './Designer';

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
};
