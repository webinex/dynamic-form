import type { FormPropsProps } from '@/Designer';
import { ModelElement } from '@/Model';
import React from 'react';
import * as Yup from 'yup';

export type ElementRenderProps<TCustomProps> = TCustomProps & {
  name: string;
  required: boolean;
};

export type ElementValueType = 'readonly' | 'string' | 'number' | 'boolean' | 'object' | 'date';
export type ElementComplexValueType = ['arrayOf', ElementValueType];

/**
 * Base interface for form elements.
 * This interface defines the structure of an element that can be used in a dynamic form.
 */
export interface ElementBase<TPropsSchema extends Yup.ObjectSchema<Yup.AnyObject> = Yup.ObjectSchema<any>> {
  /**
   * Unique identifier for the element.
   * This ID is used later in ModelElement to infer component to render.
   */
  id: string;

  /**
   * Title of the element.
   */
  title?: string;

  /**
   * Icon to be displayed in element list.
   */
  icon?: React.ReactNode;

  /**
   * Component that will be rendered in the form.
   * It receives props that are defined in the `props` schema, along with `name` and `required`.
   */
  Component: React.ComponentType<ElementRenderProps<Yup.InferType<TPropsSchema>>>;

  /**
   * Schema for the properties of this element.
   * This schema is used to create the form for editing the element's properties.
   */
  props: TPropsSchema;

  /**
   * Declares the type of the value that this element holds in the form value.
   * Useful for validation and expression design.
   * @default 'string'
   */
  value?: ElementValueType | ElementComplexValueType;

  /**
   * Optional schema for the value of this element.
   * If provided, this schema will be used to validate the value of the element in the form.
   * If not provided, a default schema will be inferred from the `value` property.
   */
  schema?: Yup.AnySchema | ((el: ModelElement) => Yup.AnySchema);

  /**
   * Renders the designer props for this element.
   * @param props The props for the form designer.
   * @returns A React node representing the designer props.
   */
  renderDesignerProps?: (props: FormPropsProps) => React.ReactNode;
}

export function createElement<TPropsSchema extends Yup.ObjectSchema<Yup.AnyObject>>(
  args: ElementBase<TPropsSchema>,
): ElementBase<TPropsSchema> {
  return args;
}
