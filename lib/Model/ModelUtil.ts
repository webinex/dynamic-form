import * as Yup from 'yup';
import { ExpressionUtil } from '@/Model/Expression';
import { isRequiredValidationRule, Model, ModelElement } from './Model';
import { ElementBase, ElementComplexValueType, ElementValueType } from '@/Elements';

function initialValue(model: Model, Elements: ElementBase[]) {
  return model.elements.reduce(
    (acc, x) => {
      const Element = Elements.find((e) => e.id === x.element);
      if (!Element) throw new Error(`Element with id ${x.element} not found in Elements`);
      acc[x.id] = elementInitialValue(x, Element);
      return acc;
    },
    {} as Record<string, any>,
  );
}

function elementInitialValue(el: ModelElement, Element: ElementBase) {
  if (el.defaultValue != null) return el.defaultValue;

  if (Array.isArray(Element.value) && Element.value[0] === 'arrayOf') {
    return [];
  }

  if (Element.value === 'object') {
    return {};
  }

  return null;
}

function propsOf(el: ModelElement, values: any) {
  const props = { ...el.props };

  for (const key in props) {
    if (Object.prototype.hasOwnProperty.call(props, key)) {
      if (ExpressionUtil.isExpression(props[key])) props[key] = ExpressionUtil.exec(props[key], values);
    }
  }

  return props;
}

function schemaOfType(type: ElementValueType | ElementComplexValueType): Yup.Schema<any> {
  if (Array.isArray(type) && type[0] === 'arrayOf') {
    return Yup.array(schemaOfType(type[1])).nullable();
  }

  switch (type) {
    case 'string':
      return Yup.string().nullable();
    case 'number':
      return Yup.number().nullable();
    case 'boolean':
      return Yup.boolean().nullable();
    case 'date':
      return Yup.date().nullable();
    case 'object':
      return Yup.object().nullable();
    default:
      return Yup.string().nullable();
  }
}

function schemaOf(model: ModelElement, Element: ElementBase) {
  let base =
    typeof Element.schema === 'function'
      ? Element.schema(model)
      : (Element.schema ?? schemaOfType(Element.value ?? 'string'));

  let testIndex = -1;

  for (const validation of model.validation ?? []) {
    if (isRequiredValidationRule(validation)) {
      base = validation.message ? base.required(validation.message) : base.required();
    }

    if (validation.type === 'test') {
      base = base.test({
        name: `test-${++testIndex}`,
        message: validation.message,
        test: (_, context) => {
          return !ExpressionUtil.exec(validation.test, context.parent);
        },
      });
    }
  }

  return base;
}

function isShown(el: ModelElement, values: any) {
  return !el.condition || ExpressionUtil.exec(el.condition, values);
}

export const ModelUtil = {
  initialValue,
  elementInitialValue,
  propsOf,
  schemaOf,
  isShown,
};
