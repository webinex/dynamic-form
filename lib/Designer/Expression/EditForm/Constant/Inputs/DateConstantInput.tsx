import { DynamicFormTheme } from '@/DynamicFormTheme';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { useCallback, useMemo } from 'react';

export interface DateConstantInputProps {
  type: 'date' | 'date-time';
  value: Date | undefined;
  onChange: (value: Date | undefined) => void;
}

function useValue(props: DateConstantInputProps) {
  const { value } = props;

  return useMemo(() => {
    if (value == null) return value;

    if ('tz' in dayjs) {
      const tz = dayjs.tz as any;
      const valueDjs = dayjs(value) as any;
      return valueDjs.tz(tz.guess(), true);
    }

    return dayjs(value);
  }, [value]);
}

function useChange(props: DateConstantInputProps) {
  const { onChange } = props;
  return useCallback(
    (date: dayjs.Dayjs | null) => {
      if (date == null) {
        onChange(undefined);
        return;
      }

      if ('tz' in dayjs) {
        const value = (date as any).tz(undefined, true).toDate();
        onChange(value);
      }

      onChange(date.toDate());
    },
    [onChange],
  );
}

export const DateConstantInput = DynamicFormTheme.flexy(
  'DateConstantInput',
  (props: DateConstantInputProps) => {
    const { type } = props;
    const value = useValue(props);
    const onChange = useChange(props);
    return <DatePicker value={value} onChange={onChange} showTime={type === 'date-time'} />;
  },
);
