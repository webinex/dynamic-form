import { Select } from 'antd';
import { DynamicFormTheme } from '@/DynamicFormTheme';
import { ElementBase } from '@/Elements';
import { ModelElement } from '@/Model';
import { useMemo } from 'react';
import { DesignerUtil } from '@/Designer/DesignerUtil';

export interface OptionMultiSelectConstantInputProps {
  value: React.Key[] | undefined;
  Element: ElementBase;
  modelElement: ModelElement;
  onChange: (value: React.Key[] | undefined) => void;
}

function useOptions(props: OptionMultiSelectConstantInputProps) {
  const { Element, modelElement } = props;

  return useMemo(() => {
    const options = DesignerUtil.options(Element, modelElement) ?? [];
    return options.length > 0 && typeof options[0] === 'object'
      ? options
      : options.map((x) => ({ label: x, value: x }));
  }, [Element, modelElement]);
}

export const OptionMultiSelectConstantInput = DynamicFormTheme.flexy(
  'OptionMultiSelectConstantInput',
  (props: OptionMultiSelectConstantInputProps) => {
    const options = useOptions(props);
    return <Select style={{ width: '100%' }} options={options ?? undefined} {...props} mode="multiple" />;
  },
);
