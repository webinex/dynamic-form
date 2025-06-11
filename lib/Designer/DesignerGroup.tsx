import './DesignerGroup.scss';
import { Designer, DesignerProps } from './Designer';
import { useEffect, useState } from 'react';
import { Flex, Tabs } from 'antd';
import { DynamicForm } from '@/DynamicForm';
import { DesignerUtil } from './DesignerUtil';
import { useDynamicForm } from '@/useDynamicForm';
import classNames from 'classnames';
import { clx } from '@/clx';
import { DynamicFormTheme } from '@/DynamicFormTheme';

export interface DesignerGroupProps extends DesignerProps {
  locationHash?: boolean;
  rootClassName?: string;
  defaultTab?: 'form' | 'designer';
}

function DynamicFormTabContent(props: Pick<DesignerGroupProps, 'Elements' | 'model'>) {
  const { model, Elements } = props;
  const [state, setState] = useDynamicForm(model);

  return (
    <Flex justify="center">
      <DynamicForm
        Elements={DesignerUtil.flattenElements(Elements)}
        model={model}
        initialValue={state}
        onSubmit={setState}
      />
    </Flex>
  );
}

export const DesignerGroup = DynamicFormTheme.flexy('DesignerGroup', (props: DesignerGroupProps) => {
  const { locationHash: _, rootClassName, defaultTab = 'designer', ...designerProps } = props;
  const { locationHash, Elements, model } = props;

  const [tab, setTab] = useState<string>(
    window.location.hash.length > 0 ? window.location.hash.substring(1) : defaultTab,
  );

  useEffect(() => {
    if (locationHash) window.location.hash = tab;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  return (
    <div className={classNames(clx('designer-group'), rootClassName)}>
      <Tabs
        activeKey={tab}
        onChange={setTab}
        items={[
          {
            key: 'form',
            label: 'Preview',
            children: tab === 'form' && <DynamicFormTabContent Elements={Elements} model={model} />,
          },
          { key: 'designer', label: 'Designer', children: <Designer {...designerProps} /> },
        ]}
      />
    </div>
  );
});
