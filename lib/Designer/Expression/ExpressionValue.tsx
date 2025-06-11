import {
  BinaryExpression,
  BoolExpression,
  CallExpression,
  ConstantExpression,
  Expression,
  ReferenceExpression,
} from '@/Model';
import { Space } from 'antd';
import { DynamicFormTheme } from '@/DynamicFormTheme';

export interface ExpressionValueProps {
  value: Expression;
}

export const ConstantExpressionValue = DynamicFormTheme.flexy(
  'ConstantExpressionValue',
  (props: { value: ConstantExpression }) => {
    const { value } = props;

    if (Array.isArray(value.value)) {
      return <span>{value.value.join(', ')}</span>;
    }

    return <span>{value.value}</span>;
  },
);

export const BinaryExpressionValue = DynamicFormTheme.flexy(
  'BinaryExpressionValue',
  (props: { value: BinaryExpression }) => {
    const { value } = props;

    return (
      <span>
        {value.left ? <ExpressionValue value={value.left} /> : 'NULL'}
        {` ${value.operator} `}
        {value.right ? <ExpressionValue value={value.right} /> : 'NULL'}
      </span>
    );
  },
);

export const BoolExpressionValue = DynamicFormTheme.flexy(
  'BoolExpressionValue',
  (props: { value: BoolExpression }) => {
    const { value } = props;

    return (
      <>
        (
        <Space split={value.operator}>
          {value.expressions.map((expression, index) => (
            <ExpressionValue key={index} value={expression} />
          ))}
        </Space>
        )
      </>
    );
  },
);

export const ReferenceExpressionValue = DynamicFormTheme.flexy(
  'ReferenceExpressionValue',
  (props: { value: ReferenceExpression }) => {
    const { value } = props;
    return <span>{value.ref}</span>;
  },
);

export const CallExpressionValue = DynamicFormTheme.flexy(
  'CallExpressionValue',
  (props: { value: CallExpression }) => {
    const { value } = props;

    return (
      <span>
        {value.function}(
        {value.args.map((arg, index) => (
          <span key={index}>
            <ExpressionValue value={arg} />
            {index < value.args.length - 1 ? ', ' : ''}
          </span>
        ))}
        )
      </span>
    );
  },
);

export const ExpressionValue = DynamicFormTheme.flexy('ExpressionValue', (props: ExpressionValueProps) => {
  const { value } = props;

  switch (value.type) {
    case 'ReferenceExpression':
      return <ReferenceExpressionValue value={value} />;
    case 'ConstantExpression':
      return <ConstantExpressionValue value={value} />;
    case 'BinaryExpression':
      return <BinaryExpressionValue value={value} />;
    case 'BoolExpression':
      return <BoolExpressionValue value={value} />;
    case 'CallExpression':
      return <CallExpressionValue value={value} />;
    default:
      return <span style={{ color: 'red' }}>Unknown Expression Type</span>;
  }
});
