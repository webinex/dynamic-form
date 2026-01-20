import { clx } from '@/clx';
import { DesignerPropMeta } from '@/Designer/DesignerMeta';
import { DynamicFormTheme } from '@/DynamicFormTheme';
import QuestionCircleOutlined from '@ant-design/icons/QuestionCircleOutlined';
import { Button, Space, Tooltip } from 'antd';
import { memo } from 'react';
import { SchemaObjectDescription } from 'yup';

export interface FormPropLabelProps {
  name: string;
  description: SchemaObjectDescription['fields'][number];
}

export const FormPropLabel = DynamicFormTheme.flexy(
  'FormPropLabel',
  memo((props: FormPropLabelProps) => {
    const { name, description } = props;

    const label = 'label' in description ? (description.label?.toString() ?? name) : name;
    const meta = 'meta' in description ? (description.meta as DesignerPropMeta | undefined) : undefined;

    if (!meta || meta.description == null) {
      return label;
    }

    return (
      <Space size={0}>
        {label}
        <Tooltip title={<div className={clx('text-pre-wrap')}>{meta.description}</div>}>
          <Button type="link" icon={<QuestionCircleOutlined />} />
        </Tooltip>
      </Space>
    );
  }),
);
