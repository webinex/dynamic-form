import './ElementList.scss';
import { ErrorBoundary } from 'react-error-boundary';
import { isRequiredValidationRule, ModelElement } from '@/Model';
import { useDesignerContext } from '@/Designer/DesignerContext';
import classNames from 'classnames';
import { ElementListItemControlBlock } from './ElementListItemControlBlock';
import { Typography } from 'antd';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { DynamicFormTheme } from '@/DynamicFormTheme';
import { clx } from '@/clx';

export interface ElementListItemProps {
  element: ModelElement;
  animate?: boolean;
}

export const ElementListItem = DynamicFormTheme.flexy('ElementListItem', (props: ElementListItemProps) => {
  const { element, animate } = props;
  const { Elements, selectedId: selected, select } = useDesignerContext();
  const [isAppearanceAnimationShown, setAppearanceAnimationShown] = useState(animate ?? false);
  const ref = useRef<HTMLDivElement>(null);

  const def = Elements.find((x) => x.id === element.element);
  const Element = def!.Component;

  useLayoutEffect(() => {
    if (animate) ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (animate) setTimeout(() => setAppearanceAnimationShown(false), 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={ref}
      className={classNames(clx('element-list-item'), {
        '--selected': selected === element.id,
        '--appearance-animation-shown': animate && isAppearanceAnimationShown,
      })}
      onClick={() => select(element.id)}
    >
      <ElementListItemControlBlock element={element} />
      <ErrorBoundary fallback={<Typography.Text type="danger">Error</Typography.Text>}>
        <Element
          {...element.props}
          name={element.id}
          disabled={false}
          required={element.validation?.some(isRequiredValidationRule) === true}
        />
      </ErrorBoundary>
    </div>
  );
});
