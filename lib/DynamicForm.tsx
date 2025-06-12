import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
import { Form } from '@webinex/antik';
import { useField, useFormikContext } from 'formik';
import classNames from 'classnames';
import { ElementBase } from './Elements';
import { ExpressionUtil, Model, ModelElement, ModelUtil } from './Model';
import { renderDynamicFormElement, RenderDynamicFormElementArgs } from './renderDynamicFormElement';
import { clx } from './clx';

export interface DynamicFormProps {
  uid?: string;
  model: Model;
  initialValue: any;
  onSubmit: (value: any) => void;
  Elements: ElementBase[];
  className?: string;
  renderElement?: typeof renderDynamicFormElement;
}

function createSchema(model: Model, Elements: ElementBase[]) {
  const findElement = (id: string) => Elements.find((el) => el.id === id)!;

  return Yup.object(
    Object.fromEntries(
      model.elements.map((x) => [x.id, ModelUtil.schemaOf(x, findElement(x.element))] as const),
    ),
  );
}

function useSchema(model: Model, Elements: ElementBase[]) {
  return useMemo(() => createSchema(model, Elements), [model, Elements]);
}

function Element(props: RenderDynamicFormElementArgs & Pick<DynamicFormProps, 'renderElement'>) {
  const { renderElement = renderDynamicFormElement, ...args } = props;
  const [, , { setValue }] = useField(args.modelElement.id);

  // Reset value to initial when unmounting
  // This is useful for elements that are conditionally rendered
  useEffect(() => {
    return () => {
      setValue(ModelUtil.elementInitialValue(args.modelElement));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return renderElement({ ...args });
}

export interface DynamicFormFieldSetProps
  extends Pick<DynamicFormProps, 'Elements' | 'model' | 'renderElement'> {
  values: any;
  namePrefix?: string;
}

function DynamicFormFieldSet(props: DynamicFormFieldSetProps) {
  const { model, renderElement, Elements, values, namePrefix } = props;

  const isShown = useCallback(
    (el: ModelElement) => !el.condition || ExpressionUtil.exec(el.condition, values),
    [values],
  );

  return model.elements
    .filter(isShown)
    .map((element) => (
      <Element
        key={element.id}
        renderElement={renderElement}
        Elements={Elements}
        model={model}
        modelElement={element}
        values={values}
        namePrefix={namePrefix}
      />
    ));
}

type ContentProps = Pick<DynamicFormProps, 'Elements' | 'model' | 'renderElement'>;

function Content(props: ContentProps) {
  const { model, renderElement, Elements } = props;
  const { values } = useFormikContext<any>();
  return (
    <DynamicFormFieldSet model={model} Elements={Elements} renderElement={renderElement} values={values} />
  );
}

export interface DynamicFormFieldProps
  extends Pick<DynamicFormProps, 'Elements' | 'model' | 'renderElement'> {
  name: string;
}

function DynamicFormField(props: DynamicFormFieldProps) {
  const { name, Elements, model, renderElement } = props;
  const [{ value }] = useField(name);

  return (
    <DynamicFormFieldSet
      Elements={Elements}
      model={model}
      values={value}
      renderElement={renderElement}
      namePrefix={name}
    />
  );
}

function DynamicFormComponent(props: DynamicFormProps) {
  const { uid = 'dynamic-form', Elements, model, initialValue, onSubmit, className, renderElement } = props;
  const schema = useSchema(model, Elements);

  return (
    <div className={classNames(clx('dynamic-form'), className)}>
      <Form
        uid={uid}
        type="formik"
        initialValues={initialValue}
        onSubmit={onSubmit}
        validationSchema={schema}
        enableReinitialize
        layout="vertical"
      >
        <Content model={model} Elements={Elements} renderElement={renderElement} />
      </Form>
    </div>
  );
}

export const DynamicForm = Object.assign(DynamicFormComponent, {
  createSchema,
  useSchema,
  Field: DynamicFormField,
  FieldSet: DynamicFormFieldSet,
});
