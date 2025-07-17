import { useMemo, useState } from 'react';
import { Model, ModelUtil } from './Model';

export function useDynamicForm(model: Model) {
  const initialState = useMemo(() => ModelUtil.initialValue(model), [model]);
  const result = useState(initialState);

  return result;
}
