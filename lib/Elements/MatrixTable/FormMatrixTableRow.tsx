import { Radio } from 'antd';
import { useField } from 'formik';
import styles from './FormMatrixTable.module.scss';
import type { FormMatrixTableProps } from './FormMatrixTable';
import { DynamicFormTheme } from '@/DynamicFormTheme';
import { memo } from 'react';

export interface FormMatrixTableRowProps extends Pick<FormMatrixTableProps, 'name' | 'cols' | 'disabled'> {
  row: string;
  groupName: string;
}

export const FormMatrixTableRow = DynamicFormTheme.flexy(
  'FormMatrixTableRow',
  memo((props: FormMatrixTableRowProps) => {
    const { name, row, cols, disabled, groupName } = props;
    const [{ value }, , { setValue, setTouched }] = useField<number | null | undefined>(name);

    return (
      <tr>
        <th scope="row" className={styles.rowHeading}>
          {row}
        </th>
        {cols.map((col, index) => (
          <td key={`${col.value}-${index}`} className={styles.optionCell} data-selected={value === col.value}>
            <Radio
              className={styles.radio}
              name={groupName}
              value={col.value}
              checked={value === col.value}
              disabled={disabled}
              aria-label={`${row}: ${col.label}`}
              onClick={() => {
                if (!disabled && value === col.value) {
                  setValue(null);
                  setTouched(true, false);
                }
              }}
              onChange={() => {
                setValue(col.value);
                setTouched(true, false);
              }}
              onBlur={() => setTouched(true)}
            />
          </td>
        ))}
      </tr>
    );
  }),
);
