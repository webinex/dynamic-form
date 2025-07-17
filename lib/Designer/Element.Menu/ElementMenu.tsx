import './ElementMenu.scss';
import { Affix, Button, Divider, Menu, MenuProps } from 'antd';
import { useDesignerContext } from '@/Designer/DesignerContext';
import { useCallback, useMemo } from 'react';
import { ElementBase } from '@/Elements';
import classNames from 'classnames';
import { clx } from '@/clx';
import { DynamicFormTheme } from '@/DynamicFormTheme';
import { DoubleLeftOutlined, DoubleRightOutlined, FormOutlined } from '@ant-design/icons';

export interface ElementMenuProps {
  /**
   * The top offset of the menu from the top of the viewport.
   *
   * When unspecified, the menu will have a static position.
   * When specified, the menu will be affixed to the top of the viewport with the given offset.
   * @default undefined
   */
  offsetTop?: number;

  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}

function useMenuItems() {
  const { ElementsInput } = useDesignerContext();

  return useMemo(() => {
    const mapElement = (el: ElementBase) => {
      return { key: el.id, label: el.title ?? el.id, icon: el.icon ?? <FormOutlined /> };
    };

    const mapGroup = (el: [string, ...ElementBase[]]) => {
      return {
        type: 'group',
        label: el[0],
        key: el[0],
        children: (el.slice(1) as ElementBase[]).map(mapElement),
      };
    };

    return ElementsInput.map((x) => (Array.isArray(x) ? mapGroup(x) : mapElement(x))) as NonNullable<
      MenuProps['items']
    >;
  }, [ElementsInput]);
}

export const ElementMenu = DynamicFormTheme.flexy('ElementMenu', (props: ElementMenuProps) => {
  const { offsetTop, collapsed = false, onCollapsedChange } = props;
  const { Elements, pushElement } = useDesignerContext();
  const items = useMenuItems();

  const onPush = useCallback(
    (elementBaseId: string) => {
      const el = Elements.find((x) => x.id === elementBaseId)!;
      pushElement(el);
    },
    [Elements, pushElement],
  );

  const content = (
    <div>
      <Menu
        key={String(collapsed)}
        inlineCollapsed={collapsed}
        className={clx('h-full')}
        selectable={false}
        onClick={(e) => onPush(e.key)}
        items={items}
        mode="vertical"
      />

      {onCollapsedChange && (
        <div>
          <Divider />
          <div className={clx('element-menu-toggle-container')}>
            <Button
              color="default"
              variant="text"
              onClick={() => onCollapsedChange?.(!collapsed)}
              className={clx('element-menu-toggle')}
            >
              {collapsed && <DoubleRightOutlined />}
              {!collapsed && <DoubleLeftOutlined />}
            </Button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <nav className={classNames(clx('element-menu'), clx('h-full'), { '--affix': offsetTop != null })}>
      {offsetTop != null && (
        <Affix key={String(collapsed)} offsetTop={offsetTop}>
          {content}
        </Affix>
      )}
      {offsetTop == null && content}
    </nav>
  );
});
