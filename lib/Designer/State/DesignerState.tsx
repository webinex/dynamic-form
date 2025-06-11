import './DesignerState.scss';
import { Radio } from 'antd';
import { useDesignerContext } from '../DesignerContext';
import { memo, useMemo, useState } from 'react';
import { JsonValue } from './JsonValue';
import { clx } from '@/clx';
import { DynamicFormTheme } from '@/DynamicFormTheme';

const Schema = memo(() => {
  const { model, Elements } = useDesignerContext();
  const value = useMemo(
    () => model.elements.map((x) => Elements.find((el) => el.id === x.element)?.props.describe()),
    [model.elements, Elements],
  );

  return (
    <div className={clx('designer-state-schema')}>
      <JsonValue value={value} />
    </div>
  );
});

const Model = memo(() => {
  const { model } = useDesignerContext();
  return <JsonValue value={model} />;
});

export const DesignerState = DynamicFormTheme.flexy('DesignerState', () => {
  const [active, setActive] = useState(null);

  return (
    <div className={clx('designer-state')}>
      <div className={clx('designer-state-tabs')}>
        <Radio.Group
          value={active}
          optionType="button"
          onChange={(e) => setActive(e.target.value)}
          options={[
            { label: 'Model', value: 'model' },
            { label: 'Schema', value: 'schema' },
          ]}
        />
      </div>

      <div className={clx('designer-state-content')}>
        {active === 'model' && <Model />}
        {active === 'schema' && <Schema />}
      </div>
    </div>
  );
});
