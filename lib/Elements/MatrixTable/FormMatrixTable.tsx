import { theme } from 'antd';
import { Form } from '@webinex/antik';
import { type CSSProperties, useId, useMemo } from 'react';
import type { MatrixTableElementColumn } from './MatrixTable';
import styles from './FormMatrixTable.module.scss';
import { FormMatrixTableRow } from './FormMatrixTableRow';
import classNames from 'classnames';
import { clx } from '@/clx';

export interface FormMatrixTableProps {
  name: string;
  cols: MatrixTableElementColumn[];
  rows: string[];
  disabled?: boolean;
}

function useCssVariables(cols: MatrixTableElementColumn[]): CSSProperties {
  const { token } = theme.useToken();

  return useMemo(
    (): CSSProperties =>
      ({
        fontFamily: token.fontFamily,
        '--matrix-table-bg': token.colorBgContainer,
        '--matrix-table-stripe': token.colorFillAlter,
        '--matrix-table-hover': token.colorFillSecondary,
        '--matrix-table-border': token.colorBorderSecondary,
        '--matrix-table-text': token.colorText,
        '--matrix-table-muted': token.colorTextSecondary,
        '--matrix-table-primary': token.colorPrimary,
        '--matrix-table-selected': token.colorPrimaryBg,
        '--matrix-table-selected-hover': token.colorPrimaryBgHover,
        '--matrix-table-radius': `${token.borderRadiusLG / 16}rem`,
        '--matrix-table-min-width': `${15 + cols.length * 6}rem`,
      }) as CSSProperties,
    [cols, token],
  );
}

export function FormMatrixTable(props: FormMatrixTableProps) {
  const { name, cols, rows } = props;
  const disabled = Form.useDisabled(props.disabled);
  const id = useId();
  const cssVars = useCssVariables(cols);

  return (
    <div
      className={classNames(styles.tableContainer, clx('form-matrix-table'))}
      style={cssVars}
      data-disabled={disabled}
    >
      <table className={styles.table}>
        <colgroup>
          <col className={styles.questionColumn} />
          {cols.map((col, index) => (
            <col key={`${col.value}-${index}`} />
          ))}
        </colgroup>
        <thead>
          <tr>
            <th aria-hidden="true" />
            {cols.map((col, colIndex) => (
              <th key={`${col.value}-${colIndex}`} scope="col">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <FormMatrixTableRow
              key={`${row}-${index}`}
              name={`${name}[${index}]`}
              groupName={`${id}-${index}`}
              row={row}
              cols={cols}
              disabled={disabled}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
