import { FormBinaryExpressionOperator } from './FormBinaryExpressionOperator';
import { FormConstantExpression } from '../Constant';
import { useCallback, useMemo } from 'react';
import { getIn, useField, useFormikContext } from 'formik';
import { BinaryExpression, BoolExpression, Expression } from '@/Model/Expression';
import { Button, Col, Row } from 'antd';
import { parseIndex, parsePath, pathToName } from '@/util';
import { DynamicFormTheme } from '@/DynamicFormTheme';
import { FormBinaryExpressionLeft } from './FormBinaryExpressionLeft';

function findParentPath(name: string): string | null {
  const path = parsePath(name);
  return path != null ? pathToName(path.slice(0, -2)) : null;
}

export interface FormBinaryExpressionProps {
  name: string;
}

const INITIAL_VALUE: BinaryExpression = {
  type: 'BinaryExpression',
  operator: '=',
  left: { type: 'ReferenceExpression', ref: null! },
  right: { type: 'ConstantExpression', value: null! },
};

function useAdd(props: FormBinaryExpressionProps) {
  const { name } = props;
  const [{ value }, , { setValue }] = useField<Expression>(name);

  return useCallback(() => {
    setValue({
      type: 'BoolExpression',
      operator: 'and',
      expressions: [value, INITIAL_VALUE],
    } satisfies BoolExpression);
  }, [value, setValue]);
}

function useParent(props: FormBinaryExpressionProps) {
  const { name: fieldName } = props;
  const { values } = useFormikContext<Expression>();
  const name = useMemo(() => findParentPath(fieldName), [fieldName]);
  const value: Expression | null = useMemo(() => name && getIn(values, name!), [values, name]);
  return name ? { value: value!, name } : null;
}

function useDelete(props: FormBinaryExpressionProps, parent: ReturnType<typeof useParent>) {
  const { name } = props;
  const { setFieldValue } = useFormikContext<Expression>();

  return useCallback(() => {
    if (!parent) {
      setFieldValue(name, null);
      return;
    }

    if (parent.value.type === 'BoolExpression' && parent.value.expressions.length === 2) {
      setFieldValue(parent.name, parent.value.expressions[0]);
      return;
    }

    if (parent.value.type === 'BoolExpression' && parent.value.expressions.length > 2) {
      const index = parseIndex(name);
      const newExpressions = [...parent.value.expressions];
      newExpressions.splice(index!, 1);
      setFieldValue(parent.name, { ...parent.value, expressions: newExpressions });
    }

    throw new Error(
      `Cannot delete expression at ${name} from parent ${parent.name}. Parent value: ${JSON.stringify(parent.value)}`,
    );
  }, [parent, setFieldValue, name]);
}

const FormBinaryExpressionComponent = DynamicFormTheme.flexy(
  'FormBinaryExpression',
  (props: FormBinaryExpressionProps) => {
    const { name } = props;
    const parent = useParent(props);
    const onAdd = useAdd(props);
    const onDelete = useDelete(props, parent);

    return (
      <Row wrap={false} gutter={8}>
        <Col flex="none">
          <FormBinaryExpressionLeft name={`${name}.left`} />
        </Col>
        <Col flex="none">
          <FormBinaryExpressionOperator name={`${name}.operator`} />
        </Col>
        <Col flex="auto">
          <FormConstantExpression name={`${name}.right`} />
        </Col>
        <Col flex="none">
          <Button color="default" variant="filled" onClick={onAdd}>
            AND
          </Button>
        </Col>
        <Col flex="none">
          <Button color="default" variant="filled" onClick={onDelete}>
            DEL
          </Button>
        </Col>
      </Row>
    );
  },
);

export const FormBinaryExpression = Object.assign(FormBinaryExpressionComponent, {
  initialValue: INITIAL_VALUE,
});
