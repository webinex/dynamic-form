import { Select } from 'antd';
import { DynamicFormTheme } from '@/DynamicFormTheme';
import { ElementBase } from '@/Elements';
import { ModelElement } from '@/Model';
import React, { useMemo } from 'react';
import { DesignerUtil } from '@/Designer/DesignerUtil';

export interface OptionConstantInputProps {
  value: React.Key | undefined;
  Element: ElementBase;
  modelElement: ModelElement;
  onChange: (value: React.Key | undefined) => void;
}

function useOptions(props: OptionConstantInputProps) {
  const { Element, modelElement } = props;

  return useMemo(() => {
    const options = DesignerUtil.options(Element, modelElement) ?? [];
    return options.length > 0 && typeof options[0] === 'object'
      ? options
      : options.map((x) => ({ label: x, value: x }));
  }, [Element, modelElement]);
}

export const OptionConstantInput = DynamicFormTheme.flexy(
  'OptionConstantInput',
  (props: OptionConstantInputProps) => {
    const options = useOptions(props);
    return <Select style={{ width: '100%' }} options={options ?? undefined} {...props} />;
  },
);
