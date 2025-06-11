import { ElementBase } from './Elements';
import { isRequiredValidationRule, Model, ModelUtil, ModelElement } from './Model';

export interface RenderDynamicFormElementArgs {
  modelElement: ModelElement;
  model: Model;
  Elements: ElementBase[];
  values: any;
}

export function renderDynamicFormElement(args: RenderDynamicFormElementArgs) {
  const { Elements, modelElement, values } = args;
  const Element = Elements.find((x) => x.id === modelElement.element)!.Component;

  return (
    <Element
      key={modelElement.id}
      {...ModelUtil.propsOf(modelElement, values)}
      name={modelElement.id}
      required={modelElement.validation?.some(isRequiredValidationRule) === true}
    />
  );
}
