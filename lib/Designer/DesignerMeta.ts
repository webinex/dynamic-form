export interface DesignerPropMeta {
  /**
   * Description of the property to be shown in the Designer panel.
   */
  description?: string;

  /**
   * Property control type for the Designer panel.
   */
  control?: 'expression' | 'textarea';

  /**
   * Whether the property should be auto-focused when the element is selected in the Designer.
   */
  autoFocus?: boolean;
}

export interface DesignerConstantExpressionControl {
  type: 'select';

  /**
   * The name of the property that contains the options for the select control.
   */
  options: string;
}

export interface DesignerPropsObjectMeta {
  constantExpressionControl?: DesignerConstantExpressionControl;
}
