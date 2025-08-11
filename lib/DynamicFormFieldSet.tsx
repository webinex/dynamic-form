import { ModelElement, ModelUtil } from './Model';
import { DynamicFormTheme } from './DynamicFormTheme';
import type { DynamicFormProps } from './DynamicForm';
import { DynamicFormElement } from './DynamicFormElement';
import React, { useEffect } from 'react';
import { useFormikContext } from 'formik';
import { Form } from '@webinex/antik';

export interface DynamicFormFieldSetProps
  extends Pick<DynamicFormProps, 'Elements' | 'model' | 'renderElement' | 'readonly' | 'extra'> {
  values: any;
  namePrefix?: string;
}

/**
 * Resets the initial value of form fields when they are hidden.
 * This is necessary to ensure that the initial value is not retained when a field is conditionally hidden.
 * @param props Props for the DynamicFormFieldSet component.
 */
function useModelChangeEffect(props: DynamicFormFieldSetProps) {
  const { model, values } = props;
  const { setFieldValue } = useFormikContext<any>();
  const prev = React.useRef<Record<string, boolean>>();

  useEffect(() => {
    if (!prev.current) {
      // Snapshot of the initial visible state
      prev.current = Object.fromEntries(model.elements.map((el) => [el.id, ModelUtil.isShown(el, values)]));
      return;
    }

    function resetInitialState(el: ModelElement) {
      setFieldValue(el.id, ModelUtil.elementInitialValue(el));
    }

    for (const el of model.elements) {
      const isShown = ModelUtil.isShown(el, values);
      if (prev.current[el.id] !== isShown) {
        if (!isShown) {
          // Reset initial value when the element is hidden
          resetInitialState(el);
        }
        prev.current[el.id] = isShown; // Update the snapshot
      }
    }
  }, [model.elements, values]);
}

export const DynamicFormFieldSet = DynamicFormTheme.flexy(
  'DynamicFormFieldSet',
  (props: DynamicFormFieldSetProps) => {
    const { model, renderElement, Elements, values, namePrefix, extra, readonly } = props;
    useModelChangeEffect(props);

    return (
      <Form.FieldSet disabled={readonly}>
        {model.elements
          .filter((x) => ModelUtil.isShown(x, values))
          .map((element) => (
            <DynamicFormElement
              key={element.id}
              renderElement={renderElement}
              Elements={Elements}
              model={model}
              modelElement={element}
              values={values}
              namePrefix={namePrefix}
            />
          ))}
        {extra}
      </Form.FieldSet>
    );
  },
);
