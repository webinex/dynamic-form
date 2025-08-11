import * as Yup from 'yup';
import { useMemo } from 'react';
import { Form } from '@webinex/antik';
import { FormikProps, useField, useFormikContext } from 'formik';
import classNames from 'classnames';
import { ElementBase } from './Elements';
import { Model, ModelUtil } from './Model';
import { renderDynamicFormElement } from './renderDynamicFormElement';
import { clx } from './clx';
import { DynamicFormFieldSet } from './DynamicFormFieldSet';

export interface DynamicFormProps {
  uid?: string;
  ns?: string;
  model: Model;
  initialValue: any;
  onSubmit: (value: any) => void;
  Elements: ElementBase[];
  className?: string;
  renderElement?: typeof renderDynamicFormElement;
  readonly?: boolean;
  innerRef?: React.RefObject<FormikProps<any>>;

  /**
   * Content to be rendered after the form elements.
   * Useful for adding buttons or other controls that are not part of the form elements.
   */
  extra?: React.ReactNode;
}

function createSchema(model: Model, Elements: ElementBase[]) {
  const findElement = (id: string) => Elements.find((el) => el.id === id)!;

  return Yup.lazy((values: any) =>
    Yup.object(
      Object.fromEntries(
        model.elements
          .filter((x) => ModelUtil.isShown(x, values))
          .map((x) => [x.id, ModelUtil.schemaOf(x, findElement(x.element))] as const),
      ),
    ),
  );
}

function useSchema(model: Model, Elements: ElementBase[]) {
  return useMemo(() => createSchema(model, Elements), [model, Elements]);
}

type ContentProps = Pick<
  DynamicFormProps,
  'Elements' | 'model' | 'renderElement' | 'extra' | 'className' | 'readonly'
>;

function Content(props: ContentProps) {
  const { model, renderElement, Elements, className, extra, readonly } = props;
  const { values } = useFormikContext<any>();
  return (
    <div className={classNames(clx('dynamic-form-content'), className)}>
      <DynamicFormFieldSet
        model={model}
        Elements={Elements}
        renderElement={renderElement}
        values={values}
        readonly={readonly}
      />
      {extra}
    </div>
  );
}

export interface DynamicFormFieldProps
  extends Pick<
    DynamicFormProps,
    'Elements' | 'model' | 'renderElement' | 'readonly' | 'className' | 'extra'
  > {
  name: string;
}

function DynamicFormField(props: DynamicFormFieldProps) {
  const { name, Elements, model, renderElement, readonly, className, extra } = props;
  const [{ value }] = useField(name);

  return (
    <div className={className}>
      <DynamicFormFieldSet
        Elements={Elements}
        model={model}
        values={value}
        renderElement={renderElement}
        namePrefix={name}
        readonly={readonly}
      />
      {extra}
    </div>
  );
}

function DynamicFormComponent(props: DynamicFormProps) {
  const {
    uid = 'dynamic-form',
    ns,
    Elements,
    model,
    initialValue,
    onSubmit,
    className,
    renderElement,
    extra,
    innerRef,
    readonly,
  } = props;
  const schema = useSchema(model, Elements);

  return (
    <div className={classNames(clx('dynamic-form'), className)}>
      <Form
        uid={uid}
        ns={ns}
        type="formik"
        initialValues={initialValue}
        onSubmit={onSubmit}
        validationSchema={schema}
        enableReinitialize
        layout="vertical"
        innerRef={innerRef}
      >
        <Content
          model={model}
          Elements={Elements}
          renderElement={renderElement}
          extra={extra}
          readonly={readonly}
        />
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
