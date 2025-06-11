import './FormBoolExpression.scss';
import { useField } from 'formik';
import { BoolExpression } from '@/Model';
import { FormBoolExpressionOperator } from './FormBoolExpressionOperator';
import { FormExpression } from '../FormExpression';
import { Button, Flex } from 'antd';
import { DynamicFormTheme } from '@/DynamicFormTheme';
import { clx } from '@/clx';
import { FormBoolExpressionAddButton } from './FormBoolExpressionAddButton';

export interface FormBoolExpressionProps {
  name: string;
}

export const FormBoolExpression = DynamicFormTheme.flexy(
  'FormBoolExpression',
  (props: FormBoolExpressionProps) => {
    const { name } = props;
    const [{ value }] = useField<BoolExpression>(name);

    return (
      <Flex vertical gap="small" align="start">
        <Flex gap="small">
          <FormBoolExpressionOperator name={`${name}.operator`} />
          <Button color="default" variant="filled" onClick={() => {}}>
            DEL
          </Button>
        </Flex>
        <div className={clx('form-bool-expression-list')}>
          {value.expressions.map((_, index) => (
            <FormExpression name={`${name}.expressions[${index}]`} key={index} />
          ))}
          <div>
            <FormBoolExpressionAddButton name={name} />
          </div>
        </div>
      </Flex>
    );
  },
);
