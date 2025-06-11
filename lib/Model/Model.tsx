import { Expression } from './Expression';

export type ValidationRuleRequired = { type: 'required'; message?: string | null };
export type ValidationRuleTest = { type: 'test'; test: Expression; message: string };
export type ValidationRule = ValidationRuleRequired | ValidationRuleTest;

export function isRequiredValidationRule(x: ValidationRule): x is ValidationRuleRequired {
  return 'type' in x && x.type === 'required';
}

export function validateModelElementId(id: string | null | undefined): string | undefined {
  if (!id) return 'ID is required';
  if (!/^[a-zA-Z0-9_]+$/.test(id)) return 'ID can only contain alphanumeric characters and underscores';
  return undefined;
}

export interface ModelElement {
  id: string;
  element: string;
  props: any;
  defaultValue: any;
  condition?: Expression | null;
  validation: ValidationRule[] | null;
}

export interface Model {
  elements: ModelElement[];
}
