import './ElementList.scss';
import { ErrorBoundary } from 'react-error-boundary';
import { isRequiredValidationRule, ModelElement, ModelUtil } from '@/Model';
import { useDesignerContext } from '@/Designer/DesignerContext';
import classNames from 'classnames';
import { ElementListItemControlBlock } from './ElementListItemControlBlock';
import { Typography } from 'antd';
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { DynamicFormTheme } from '@/DynamicFormTheme';
import { clx } from '@/clx';
import { Formik, useField } from 'formik';

export interface ElementListItemProps {
  element: ModelElement;
  animate?: boolean;
}

const EMPTY_SUBMIT = () => {};

function DefaultValueListener(props: { element: ModelElement }) {
  const { element } = props;
  const [{ value }] = useField(element.id);
  const { setElementDefaultValue } = useDesignerContext();

  useEffect(() => {
    if (value !== element.defaultValue) {
      setElementDefaultValue(element.id, value);
    }
  }, [value, element.id]);

  return null;
}

export const ElementListItem = DynamicFormTheme.flexy('ElementListItem', (props: ElementListItemProps) => {
  const { element, animate } = props;
  const { Elements, selectedId: selected, select } = useDesignerContext();
  const [isAppearanceAnimationShown, setAppearanceAnimationShown] = useState(animate ?? false);
  const ref = useRef<HTMLDivElement>(null);

  const def = Elements.find((x) => x.id === element.element);
  const Element = def!.Component;

  const initialValue = useMemo(() => ModelUtil.initialValue({ elements: [element] }), [element]);

  useLayoutEffect(() => {
    if (animate && selected === element.id) {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (animate) setTimeout(() => setAppearanceAnimationShown(false), 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const target = e.target as HTMLElement;
      if (target && target.closest('input, textarea, button, .ant-radio-group')) return;

      if (selected === element.id) {
        select(null);
      } else {
        select(element.id);
      }
    },
    [select, selected, element.id],
  );

  return (
    <div
      ref={ref}
      className={classNames(clx('element-list-item'), {
        '--selected': selected === element.id,
        '--appearance-animation-shown': animate && isAppearanceAnimationShown,
      })}
      onClick={onClick}
    >
      <ElementListItemControlBlock element={element} />
      <ErrorBoundary fallback={<Typography.Text type="danger">Error</Typography.Text>}>
        <Formik
          uid="designer-element-list"
          type="formik"
          layout="vertical"
          initialValues={initialValue}
          onSubmit={EMPTY_SUBMIT}
          enableReinitialize
        >
          <span className="wxd-element-list-item-element">
            <DefaultValueListener element={element} />
            <Element
              {...element.props}
              name={element.id}
              disabled={false}
              required={element.validation?.some(isRequiredValidationRule) === true}
            />
          </span>
        </Formik>
      </ErrorBoundary>
    </div>
  );
});
