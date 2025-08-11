import { renderDynamicFormElement, RenderDynamicFormElementArgs } from './renderDynamicFormElement';
import type { DynamicFormProps } from './DynamicForm';
import { DynamicFormTheme } from './DynamicFormTheme';

export const DynamicFormElement = DynamicFormTheme.flexy(
  'DynamicFormElement',
  (props: RenderDynamicFormElementArgs & Pick<DynamicFormProps, 'renderElement'>) => {
    const { renderElement = renderDynamicFormElement, ...args } = props;
    return renderElement({ ...args });
  },
);
