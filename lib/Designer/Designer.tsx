import './Designer.scss';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Model } from '@/Model';
import { Affix, Col, Row } from 'antd';
import { ElementMenu } from './Element.Menu';
import { DesignerContextProvider, DesignerContextProviderProps, useDesignerContext } from './DesignerContext';
import { ElementModelDesigner } from './Element.Model';
import { ElementList } from './Element.List';
import { DesignerState } from './State';
import { ModelUtil } from '@/Model/ModelUtil';
import { Formik } from 'formik';
import { DesignerGroup } from './DesignerGroup';
import { clx } from '@/clx';
import { DynamicFormTheme } from '@/DynamicFormTheme';
import classNames from 'classnames';

export interface DesignerProps extends Pick<DesignerContextProviderProps, 'model' | 'Elements'> {
  onChange: DesignerContextProviderProps['set'];

  /**
   * The top offset of the affixed element model designer section from the top of the viewport.
   * When unspecified, the element model designer section will not be affixed.
   * @default undefined
   */
  offsetTop?: number;

  style?: React.CSSProperties;
  className?: string;
}

const EMPTY_SUBMIT = () => {};

function useDesignerState(props: DesignerProps) {
  const { onChange: onChangeProp } = props;
  const [selected, setSelected] = useState<string | null>(null);
  const [animate, setAnimate] = useState(false);

  const onChange = useCallback(
    (model: Model) => {
      if (selected && !model.elements.some((el) => el.id === selected)) {
        setSelected(null);
      }

      onChangeProp(model);
    },
    [onChangeProp, selected],
  );

  useEffect(() => {
    setAnimate(true);
  }, []);

  return { ...props, onChange, selected, onSelect: setSelected, animate };
}

function ElementModelSection(props: Pick<DesignerProps, 'offsetTop'>) {
  const { offsetTop } = props;
  const { model, selectedId } = useDesignerContext();

  const content = model.elements.find((el) => el.id === selectedId) && <ElementModelDesigner />;
  return offsetTop == null ? content : <Affix offsetTop={offsetTop}>{content}</Affix>;
}

const DesignerComponent = DynamicFormTheme.flexy('Designer', (props: DesignerProps) => {
  const { Elements, model, offsetTop, className, style } = props;
  const { onChange, selected, onSelect, animate } = useDesignerState(props);
  const initialValues = useMemo(() => ModelUtil.initialValue(model), [model]);

  return (
    <DesignerContextProvider
      Elements={Elements}
      model={model}
      set={onChange}
      selectedId={selected}
      select={onSelect}
    >
      <div className={classNames(clx('designer'), className)} style={style}>
        <Row>
          <Col flex="none" className={clx('designer-menu-section')}>
            <ElementMenu offsetTop={offsetTop} />
          </Col>
          <Col flex="auto" className={clx('designer-main-section')}>
            <Formik
              uid="designer-element-list"
              type="formik"
              layout="vertical"
              initialValues={initialValues}
              onSubmit={EMPTY_SUBMIT}
              enableReinitialize
            >
              <>
                <div className={clx('designer-element-list-section')}>
                  <ElementList animate={animate} />
                </div>
                <div className={clx('designer-state-section')}>
                  <DesignerState />
                </div>
              </>
            </Formik>
          </Col>
          {selected && (
            <Col flex="none" className={clx('designer-element-model-section')}>
              <ElementModelSection offsetTop={offsetTop} />
            </Col>
          )}
        </Row>
      </div>
    </DesignerContextProvider>
  );
});

export const Designer = Object.assign(DesignerComponent, {
  Group: DesignerGroup,
});
