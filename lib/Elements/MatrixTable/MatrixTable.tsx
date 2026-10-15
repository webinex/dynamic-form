import * as Yup from 'yup';
import { Alert, Typography } from 'antd';
import { useField } from 'formik';
import { useMemo } from 'react';
import { TableOutlined } from '@ant-design/icons';
import { createElement as createDynamicFormElement } from '../ElementBase';
import { FormMatrixTable } from './FormMatrixTable';
import { MatrixInterpretation } from '../Matrix/MatrixInterpretation';
import styles from './MatrixTable.module.scss';
import { Form } from '@webinex/antik';

const COLUMN_PROPS_SCHEMA = Yup.object({
  label: Yup.string().label('Option').required(),
  value: Yup.number().label('Score').required(),
});

const INTERPRETATION_PROPS_SCHEMA = Yup.object({
  from: Yup.number().label('From').required(),
  to: Yup.number().label('To').required(),
  text: Yup.string().label('Text').required(),
});

export type MatrixTableElementColumn = Yup.InferType<typeof COLUMN_PROPS_SCHEMA>;
export type MatrixTableElementInterpretation = Yup.InferType<typeof INTERPRETATION_PROPS_SCHEMA>;

export interface MatrixTableElementProps extends Yup.InferType<typeof PROPS_SCHEMA> {
  name: string;
  required?: boolean;
}

const PROPS_SCHEMA = Yup.object({
  title: Yup.string().nullable().default('Questions').label('Title').required(),
  cols: Yup.array(COLUMN_PROPS_SCHEMA.required())
    .default([
      { label: 'Unknown', value: 0 },
      { label: 'No', value: 1 },
      { label: 'Yes', value: 2 },
    ])
    .min(1)
    .label('Columns')
    .required()
    .test(
      'unique-scores',
      'Each column must have a unique score value.',
      (cols) => cols.length === new Set(cols.map((col) => col?.value)).size,
    )
    .meta({ description: 'Column options and their scores.' }),
  rows: Yup.array(Yup.string().label('Row').required())
    .min(1)
    .label('Rows')
    .default(['Row 1', 'Row 2', 'Row 3'])
    .required(),
  interpretations: Yup.array()
    .of(INTERPRETATION_PROPS_SCHEMA.required())
    .label('Results Interpretation')
    .default([])
    .required(),
  disabled: Yup.boolean().label('Disabled').meta({ control: 'expression' }),
});

function sum(arr: number[]): number {
  return arr.reduce((acc, val) => acc + val, 0);
}

function useResult(props: MatrixTableElementProps) {
  const { rows = [], interpretations } = props;
  const [{ value }] = useField<number[] | null>(props.name);

  return useMemo(() => {
    const isComplete = rows.length === (value?.filter((x) => x != null).length ?? 0);
    const totalScore = sum(value ?? []);
    const interpretation = isComplete
      ? (interpretations?.find((i) => totalScore >= i.from && totalScore <= i.to) ?? null)
      : null;
    return { isComplete, totalScore, interpretation };
  }, [rows, value, interpretations]);
}

const Element = (props: MatrixTableElementProps) => {
  const { title, name, cols, rows, disabled, required } = props;
  const { interpretation, isComplete, totalScore } = useResult(props);

  if (cols.length !== new Set(cols.map((col) => col.value)).size) {
    return (
      <Alert
        title="Duplicate score values found in columns. Please ensure that each column has a unique score value."
        type="error"
        showIcon={false}
      />
    );
  }

  return (
    <div className={styles.root}>
      <Form.Item
        name={name}
        htmlFor=""
        label={<Typography.Title level={5}>{title}</Typography.Title>}
        required={required}
      >
        <FormMatrixTable name={name} cols={cols} rows={rows} disabled={disabled} />
      </Form.Item>

      {isComplete && interpretation && <MatrixInterpretation score={totalScore} text={interpretation.text} />}
    </div>
  );
};

export const MatrixTable = createDynamicFormElement({
  id: 'MatrixTable',
  title: 'Matrix (Table)',
  value: ['arrayOf', 'number'],
  props: PROPS_SCHEMA,
  schema: (el) =>
    Yup.array(Yup.number().nullable()).test({
      exclusive: true,
      name: 'matrix-table',
      message: 'Please answer all questions in the table before submitting.',
      test: (value) => {
        if (!value) return false;
        const isRequired = el.validation?.some((x) => x.type === 'required') ?? false;
        if (!isRequired && value.filter((x) => x != null).length === 0) return true;

        return (
          value.filter((x) => x != null).length === el.props.rows.length && value.every((v) => v != null)
        );
      },
    }),
  Component: Element,
  icon: <TableOutlined />,
});
