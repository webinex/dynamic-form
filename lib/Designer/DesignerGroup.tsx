import './DesignerGroup.scss';
import { Designer, DesignerProps } from './Designer';
import { useEffect, useMemo, useState } from 'react';
import { Tabs, TabsProps } from 'antd';
import classNames from 'classnames';
import { clx } from '@/clx';
import { DynamicFormTheme } from '@/DynamicFormTheme';
import { DesignerGroupPreviewTabContent } from './DesignerGroupPreviewTabContent';

export interface DesignerGroupProps extends DesignerProps {
  locationHash?: boolean;
  rootClassName?: string;
  defaultTab?: 'form' | 'designer';
}

function useTabs(props: DesignerGroupProps) {
  const { locationHash: _, rootClassName, defaultTab, ...designerProps } = props;
  const { Elements, model } = props;

  return useMemo(
    (): TabsProps['items'] => [
      {
        key: 'form',
        label: 'Preview',
        children: <DesignerGroupPreviewTabContent Elements={Elements} model={model} />,
      },
      { key: 'designer', label: 'Designer', children: <Designer {...designerProps} /> },
    ],
    [Elements, model, ...Object.keys(designerProps), ...Object.values(designerProps)],
  );
}

export const DesignerGroup = DynamicFormTheme.flexy('DesignerGroup', (props: DesignerGroupProps) => {
  const { locationHash, rootClassName, defaultTab = 'designer' } = props;
  const tabs = useTabs(props);

  const [tab, setTab] = useState<string>(
    window.location.hash.length > 0 ? window.location.hash.substring(1) : defaultTab,
  );

  useEffect(() => {
    if (locationHash) window.location.hash = tab;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  return (
    <div className={classNames(clx('designer-group'), rootClassName)}>
      <Tabs activeKey={tab} onChange={setTab} items={tabs} destroyInactiveTabPane />
    </div>
  );
});
