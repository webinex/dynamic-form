import './ElementMenu.scss';
import { Affix, Menu, MenuProps } from 'antd';
import { useDesignerContext } from '@/Designer/DesignerContext';
import { useCallback, useMemo } from 'react';
import { ElementBase } from '@/Elements';
import classNames from 'classnames';
import { clx } from '@/clx';
import { DynamicFormTheme } from '@/DynamicFormTheme';

export interface ElementMenuProps {
  /**
   * The top offset of the menu from the top of the viewport.
   *
   * When unspecified, the menu will have a static position.
   * When specified, the menu will be affixed to the top of the viewport with the given offset.
   * @default undefined
   */
  offsetTop?: number;
}

function useMenuItems() {
  const { ElementsInput } = useDesignerContext();

  return useMemo(() => {
    return ElementsInput.map((x) =>
      Array.isArray(x)
        ? {
            type: 'group',
            label: x[0],
            key: x[0],
            children: (x.slice(1) as ElementBase[]).map((x) => ({ key: x.id, label: x.title ?? x.id })),
          }
        : { key: x.id, label: x.title ?? x.id },
    ) as NonNullable<MenuProps['items']>;
  }, [ElementsInput]);
}

export const ElementMenu = DynamicFormTheme.flexy('ElementMenu', (props: ElementMenuProps) => {
  const { offsetTop } = props;
  const { Elements, pushElement } = useDesignerContext();
  const items = useMenuItems();

  const onPush = useCallback(
    (elementBaseId: string) => {
      const el = Elements.find((x) => x.id === elementBaseId)!;
      pushElement(el);
    },
    [Elements, pushElement],
  );

  const menu = (
    <Menu className={clx('h-full')} selectable={false} onClick={(e) => onPush(e.key)} items={items} />
  );

  return (
    <nav className={classNames(clx('element-menu'), clx('h-full'), { '--affix': offsetTop != null })}>
      {offsetTop != null && (
        <Affix className={clx('h-full')} rootClassName={clx('h-full')} offsetTop={offsetTop}>
          {menu}
        </Affix>
      )}
      {offsetTop == null && menu}
    </nav>
  );
});
