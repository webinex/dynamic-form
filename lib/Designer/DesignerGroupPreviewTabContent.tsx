import './DesignerGroup.scss';
import { useState } from 'react';
import { Checkbox, Flex, Radio } from 'antd';
import { DynamicForm } from '@/DynamicForm';
import { DesignerUtil } from './DesignerUtil';
import { useDynamicForm } from '@/useDynamicForm';
import { DynamicFormTheme } from '@/DynamicFormTheme';
import { DesignerGroupProps } from '@/Designer/DesignerGroup';
import { useFormikContext } from 'formik';
import { JsonValue } from './State/JsonValue';

function State() {
  const { values, errors, touched } = useFormikContext();
  return <JsonValue value={{ values, errors, touched }} />;
}

export const DesignerGroupPreviewTabContent = DynamicFormTheme.flexy(
  'DesignerGroupPreviewTabContent',
  (props: Pick<DesignerGroupProps, 'Elements' | 'model' | 'noPreviewControls'>) => {
    const { model, Elements, noPreviewControls } = props;
    const [readonly, setReadOnly] = useState(false);
    const [state, setState] = useDynamicForm(model);
    const [showState, setShowState] = useState(false);

    return (
      <Flex justify="center">
        <div className="wxd-preview-content">
          {!noPreviewControls && (
            <div className="wxd-preview-controls">
              <Radio.Group
                value={readonly}
                onChange={(e) => setReadOnly(e.target.value)}
                options={[
                  { value: false, label: 'Editable' },
                  { value: true, label: 'Read Only' },
                ]}
              />

              <Checkbox checked={showState} onChange={() => setShowState((prev) => !prev)}>
                Show state
              </Checkbox>
            </div>
          )}

          <DynamicForm
            Elements={DesignerUtil.flattenElements(Elements)}
            model={model}
            initialValue={state}
            onSubmit={setState}
            readonly={readonly}
            extra={showState && <State />}
          />
        </div>
      </Flex>
    );
  },
);
