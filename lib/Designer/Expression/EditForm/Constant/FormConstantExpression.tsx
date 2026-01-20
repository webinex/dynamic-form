import { Input } from 'antd';
import { useField } from 'formik';
import { BinaryOperator, ConstantExpression, Expression, ExpressionUtil } from '@/Model';
import { DynamicFormTheme } from '@/DynamicFormTheme';
import { BooleanConstantInput } from './Inputs/BooleanConstantInput';
import { OptionConstantInput } from './Inputs/OptionConstantInput';
import { DesignerUtil } from '@/Designer/DesignerUtil';
import { NumberConstantInput } from './Inputs/NumberConstantInput';
import { DateConstantInput } from './Inputs/DateConstantInput';
import { useEffect, useRef } from 'react';
import { useReferenceExpressionReference } from '@/Designer/Expression/EditForm/Reference';
import { OptionMultiSelectConstantInput } from './Inputs/OptionMultiSelectConstantInput';

export interface FormConstantExpressionProps {
  name: string;
  for: Expression | null | undefined;
  operator: BinaryOperator | null | undefined;
}

function useResetWhenElementChange(props: FormConstantExpressionProps) {
  const [, , { setValue }] = useField<ConstantExpression | null>(props.name);
  const { Element } = useReferenceExpressionReference(props.for) ?? {};
  const prevElement = useRef(Element);

  useEffect(() => {
    if (prevElement.current !== Element) {
      setValue(null);
      prevElement.current = Element;
    }
  }, [Element, setValue]);
}

const MULTISELECT_OPERATORS: BinaryOperator[] = ['=', '!='];

export const FormConstantExpression = DynamicFormTheme.flexy(
  'FormConstantExpression',
  (props: FormConstantExpressionProps) => {
    const { name, for: forProp, operator } = props;
    const [{ value, onBlur }, , { setValue, setTouched }] = useField<ConstantExpression | null>(name);
    const { reference, modelElement, Element } = useReferenceExpressionReference(forProp) ?? {};
    useResetWhenElementChange(props);

    function setConstant(value: any) {
      if (value == null || (typeof value === 'string' && value.trim() === '')) {
        setValue(null);
        setTouched(true, true);
        return;
      }
      setValue({ type: 'ConstantExpression', value: value });
      setTouched(true, true);
    }

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
      const value = e.target.value;
      setConstant(value);
    }

    if (Element?.value === 'object') {
      return <span>Object values is not supported</span>;
    }

    if (ExpressionUtil.isLenCallExpression(forProp))
      return <NumberConstantInput value={value?.value ?? null} onChange={setConstant} />;

    if (Element && modelElement && Array.isArray(Element.value) && Element.value[0] === 'arrayOf') {
      if (
        operator &&
        MULTISELECT_OPERATORS.includes(operator) &&
        DesignerUtil.options(Element, modelElement)
      ) {
        return (
          <OptionMultiSelectConstantInput
            Element={Element}
            modelElement={modelElement}
            onChange={setConstant}
            value={value?.value}
          />
        );
      }
    }

    if (Element && modelElement && DesignerUtil.options(Element, modelElement) != null)
      return (
        <OptionConstantInput
          Element={Element}
          modelElement={modelElement}
          onChange={setConstant}
          value={value?.value}
        />
      );

    if (Element?.value === 'boolean')
      return <BooleanConstantInput value={value?.value} onChange={setConstant} />;

    if (Element?.value === 'number')
      return <NumberConstantInput value={value?.value ?? null} onChange={setConstant} />;

    if (Element?.value === 'date')
      return (
        <DateConstantInput
          value={value?.value ?? undefined}
          onChange={setConstant}
          type={modelElement!.props['type']}
        />
      );

    return (
      <Input
        onChange={onChange}
        onBlur={onBlur}
        value={value?.value ?? ''}
        disabled={!reference}
        title={
          !reference ? 'Cannot set constant value when there is no valid reference expression.' : undefined
        }
      />
    );
  },
);
