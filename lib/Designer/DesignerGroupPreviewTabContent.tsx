import './DesignerGroup.scss';
import { DesignerProps } from './Designer';
import { useState } from 'react';
import { Divider, Flex, Radio } from 'antd';
import { DynamicForm } from '@/DynamicForm';
import { DesignerUtil } from './DesignerUtil';
import { useDynamicForm } from '@/useDynamicForm';
import { DynamicFormTheme } from '@/DynamicFormTheme';

export const DesignerGroupPreviewTabContent = DynamicFormTheme.flexy(
  'DesignerGroupPreviewTabContent',
  (props: Pick<DesignerProps, 'Elements' | 'model'>) => {
    const { model, Elements } = props;
    const [readonly, setReadOnly] = useState(false);
    const [state, setState] = useDynamicForm(model);

    return (
      <Flex justify="center">
        <div className="wxd-preview-content">
          <div>
            <Radio.Group
              value={readonly}
              onChange={(e) => setReadOnly(e.target.value)}
              options={[
                { value: false, label: 'Editable' },
                { value: true, label: 'Read Only' },
              ]}
            />
          </div>

          <Divider />

          <DynamicForm
            Elements={DesignerUtil.flattenElements(Elements)}
            model={model}
            initialValue={state}
            onSubmit={setState}
            readonly={readonly}
          />
        </div>
      </Flex>
    );
  },
);
