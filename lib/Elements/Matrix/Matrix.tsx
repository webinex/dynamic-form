import styles from './Matrix.module.scss';
import * as Yup from 'yup';
import { Alert, Typography } from 'antd';
import { useField } from 'formik';
import { useMemo } from 'react';
import { TableOutlined } from '@ant-design/icons';
import { createElement as createDynamicFormElement } from '../ElementBase';
import { FormMatrix } from './FormMatrixRow';
import { MatrixInterpretation } from './MatrixInterpretation';

const OPTION_PROPS_SCHEMA = Yup.object({
  label: Yup.string().label('Option').required(),
  value: Yup.number().label('Score').required(),
});

const ROW_PROPS_SCHEMA = Yup.object({
  title: Yup.string().label('Title').required(),
  required: Yup.boolean().label('Required?').default(false),
  options: Yup.array()
    .of(OPTION_PROPS_SCHEMA.required())
    .required()
    .default([
      { label: 'A', value: 0 },
      { label: 'B', value: 1 },
      { label: 'C', value: 2 },
    ])
    .label('Options')
    .min(1)
    .meta({ description: 'Row options and their scores.' }),
});

const INTERPRETATION_PROPS_SCHEMA = Yup.object({
  from: Yup.number().label('From').required(),
  to: Yup.number().label('To').required(),
  text: Yup.string().label('Text').required(),
});

export type MatrixElementOption = Yup.InferType<typeof OPTION_PROPS_SCHEMA>;
export type MatrixElementRow = Yup.InferType<typeof ROW_PROPS_SCHEMA>;
export type MatrixElementInterpretation = Yup.InferType<typeof INTERPRETATION_PROPS_SCHEMA>;

export interface MatrixElementProps extends Yup.InferType<typeof PROPS_SCHEMA> {
  name: string;
  required?: boolean;
}

const PROPS_SCHEMA = Yup.object({
  title: Yup.string().nullable().default('Questions').label('Title'),
  rows: Yup.array()
    .of(ROW_PROPS_SCHEMA.required())
    .label('Rows')
    .default([
      {
        title: 'Question 1',
        options: [
          { label: 'Unknown', value: 0 },
          { label: 'No', value: 1 },
          { label: 'Yes', value: 2 },
        ],
        required: false,
      },
    ])
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

function useResult(props: MatrixElementProps) {
  const { rows = [], interpretations } = props;
  const [{ value }] = useField<number[] | null>(props.name);

  return useMemo(() => {
    const isComplete = rows.every(
      (row, index) => row.required !== true || (value?.[index] != null && !Number.isNaN(value[index])),
    );
    const totalScore = sum(value ?? []);
    const interpretation = isComplete
      ? (interpretations?.find((i) => totalScore >= i.from && totalScore <= i.to) ?? null)
      : null;
    return { isComplete, totalScore, interpretation };
  }, [rows, value, interpretations]);
}

const Element = (props: MatrixElementProps) => {
  const { title, interpretations: _, disabled, ...formControlProps } = props;
  const { rows } = props;
  const { interpretation, isComplete, totalScore } = useResult(props);

  if (rows.some((row) => row.options.length !== new Set(row.options.map((o) => o.value)).size)) {
    return (
      <Alert
        title="Duplicate score values found within one row. Please ensure that each option has a unique score value."
        type="error"
        showIcon={false}
      />
    );
  }

  return (
    <div className={styles.root}>
      <Typography.Title level={5}>{title}</Typography.Title>
      <FormMatrix {...formControlProps} disabled={disabled} />
      {isComplete && interpretation && <MatrixInterpretation score={totalScore} text={interpretation.text} />}
    </div>
  );
};

export const Matrix = createDynamicFormElement({
  id: 'Matrix',
  title: 'Matrix',
  value: ['arrayOf', 'number'],
  props: PROPS_SCHEMA,
  schema: (el) => {
    const rows: MatrixElementRow[] = el.props.rows ?? PROPS_SCHEMA.getDefault().rows;

    return rows.reduce(
      (schema, row, index) =>
        row.required
          ? schema.test({
              name: `required-row-${index}`,
              message: 'This question is required.',
              test: (value, context) =>
                value?.[index] != null ||
                context.createError({ path: `${context.path}[${index}]`, params: { label: row.title } }),
            })
          : schema,
      Yup.array(Yup.number().nullable()).nullable(),
    );
  },
  Component: Element,
  icon: <TableOutlined />,
});
