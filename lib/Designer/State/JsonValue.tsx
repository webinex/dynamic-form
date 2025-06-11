import { DynamicFormTheme } from '@/DynamicFormTheme';
import { Button } from 'antd';
import { memo, useState } from 'react';

export interface JsonValueProps {
  value: any;
}

export const JsonValue = DynamicFormTheme.flexy(
  'JsonValue',
  memo((props: JsonValueProps) => {
    const { value } = props;
    const [expanded, setExpanded] = useState(false);

    return (
      <div style={{ position: 'relative' }}>
        <pre style={{ overflowY: 'auto', maxHeight: expanded ? undefined : 500 }}>
          {JSON.stringify(value, undefined, 2)}
        </pre>

        {!expanded && (
          <Button
            style={{ position: 'absolute', bottom: 25, right: 25 }}
            color="default"
            variant="solid"
            onClick={() => setExpanded(true)}
          >
            EXPAND
          </Button>
        )}
      </div>
    );
  }),
);
