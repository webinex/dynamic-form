import { useMemo, useState } from 'react';
import { Model } from './Model';

export function useDynamicForm(model: Model) {
  const initialState = useMemo(
    () =>
      model.elements.reduce(
        (acc, c) => {
          acc[c.id] = c.defaultValue ?? null;
          return acc;
        },
        {} as Record<string, any>,
      ),
    [model],
  );
  const result = useState(initialState);

  return result;
}
