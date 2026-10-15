import { useMemo, useState } from 'react';
import { Model, ModelUtil } from './Model';
import { ElementBase } from './Elements';

export function useDynamicForm(model: Model, Elements: ElementBase[]) {
  const initialState = useMemo(() => ModelUtil.initialValue(model, Elements), [model, Elements]);
  const result = useState(initialState);

  return result;
}
