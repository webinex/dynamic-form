import { Alert, Space } from 'antd';
import { DynamicFormTheme } from '@/DynamicFormTheme';
import { memo } from 'react';
import { clx } from '@/clx';

export interface MatrixInterpretationProps {
  score: number;
  text: string;
}

export const MatrixInterpretation = DynamicFormTheme.flexy(
  'MatrixInterpretation',
  memo(({ score, text }: MatrixInterpretationProps) => {
    return (
      <Alert
        type="info"
        className={clx('matrix-interpretation')}
        title={
          <Space separator=" - ">
            <strong>{score}</strong>
            <span>{text}</span>
          </Space>
        }
      />
    );
  }),
);
