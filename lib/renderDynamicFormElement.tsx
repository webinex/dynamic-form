import { ElementBase } from './Elements';
import { isRequiredValidationRule, Model, ModelUtil, ModelElement } from './Model';

export interface RenderDynamicFormElementArgs {
  modelElement: ModelElement;
  model: Model;
  Elements: ElementBase[];
  values: any;
  namePrefix?: string;
}

export function renderDynamicFormElement(args: RenderDynamicFormElementArgs) {
  const { Elements, modelElement, values, namePrefix } = args;
  const Element = Elements.find((x) => x.id === modelElement.element)!.Component;
  const name = namePrefix ? `${namePrefix}.${modelElement.id}` : modelElement.id;

  return (
    <Element
      key={modelElement.id}
      {...ModelUtil.propsOf(modelElement, values)}
      name={name}
      required={modelElement.validation?.some(isRequiredValidationRule) === true}
    />
  );
}
