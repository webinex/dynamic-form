import React, { PropsWithChildren, useCallback, useContext, useMemo } from 'react';
import { ElementBase } from '@/Elements';
import { Model, ModelElement, validateModelElementId } from '@/Model';
import { DesignerUtil } from './DesignerUtil';
import { swap } from '@/util';
import { ExpressionUtil } from '@/Model/Expression';

export interface DesignerContextValue {
  Elements: ElementBase[];
  ElementsInput: Array<ElementBase | [string, ...ElementBase[]]>;
  model: Model;
  set: (model: Model) => void;

  selectedId: string | null;
  selected: ModelElement | null;
  selectedElement: ElementBase | null;
  select(id: string | null): void;

  pushElement(element: ElementBase): string;
  removeElement(element: ModelElement): void;
  moveElementUp(element: ModelElement): void;
  moveElementDown(element: ModelElement): void;
  renameElement(id: string, newId: string): void;
}

export const DesignerContext = React.createContext<DesignerContextValue>(null!);

export type DesignerContextProviderProps = Pick<
  DesignerContextValue,
  'model' | 'set' | 'selectedId' | 'select'
> & {
  Elements: Array<ElementBase | [string, ...ElementBase[]]>;
};

function usePushElement(props: DesignerContextProviderProps) {
  const { model, set } = props;

  return useCallback(
    (x: ElementBase) => {
      const last = model.elements
        .filter((el) => el.id.startsWith('el'))
        .slice()
        .sort((a, b) =>
          b.id.length != a.id.length
            ? b.id.length - a.id.length
            : b.id.substring(2).localeCompare(a.id.substring(2)),
        )[0];

      const nextNumber = last ? +last.id.substring(2) + 1 : 1;
      const id = `el${nextNumber}`;

      set({
        ...model,
        elements: [
          ...model.elements,
          {
            id,
            element: x.id,
            defaultValue: null,
            ...DesignerUtil.initialValue(x),
            validation: null,
          },
        ],
      });

      return id;
    },
    [model, set],
  );
}

function useRemoveElement(props: DesignerContextProviderProps) {
  const { model, set } = props;

  return useCallback(
    (el: ModelElement) => {
      set({ ...model, elements: model.elements.filter((x) => x.id !== el.id) });
    },
    [model, set],
  );
}

function useMoveElement(props: DesignerContextProviderProps, value: -1 | 1) {
  const { model, set } = props;

  return useCallback(
    (el: ModelElement) => {
      const index = model.elements.findIndex((x) => x.id === el.id);
      if (index + value < 0 || index + value >= model.elements.length) {
        return;
      }

      set({ ...model, elements: swap(model.elements, index, index + value) });
    },
    [model, set, value],
  );
}

function useRenameElement(props: DesignerContextProviderProps) {
  const { set, select, selectedId, model } = props;

  return useCallback(
    (id: string, newId: string) => {
      const error = validateModelElementId(newId);

      if (error) {
        throw new Error(error);
        return;
      }

      set({
        ...model,
        elements: model.elements.map((x) => {
          if (x.id === id) {
            x = { ...x, id: newId };
          }

          for (const key in x.props) {
            if (Object.prototype.hasOwnProperty.call(x.props, key)) {
              if (ExpressionUtil.isExpression(x.props[key])) {
                x = {
                  ...x,
                  props: {
                    ...x.props,
                    [key]: ExpressionUtil.visit(x.props[key], (node) =>
                      node.type === 'ReferenceExpression' && node.ref === id ? { ...node, ref: newId } : node,
                    ),
                  },
                };
              }
            }
          }

          if (x.condition) {
            x = {
              ...x,
              condition: ExpressionUtil.visit(x.condition, (node) =>
                node.type === 'ReferenceExpression' && node.ref === id ? { ...node, ref: newId } : node,
              ),
            };
          }

          if (x.validation) {
            x = {
              ...x,
              validation: x.validation.map((x) =>
                x.type === 'test'
                  ? {
                      ...x,
                      test: ExpressionUtil.visit(x.test, (node) =>
                        node.type === 'ReferenceExpression' && node.ref === id
                          ? { ...node, ref: newId }
                          : node,
                      ),
                    }
                  : x,
              ),
            };
          }

          return x;
        }),
      });

      if (selectedId === id) {
        select(newId);
      }
    },
    [model, set, select, selectedId],
  );
}

export function DesignerContextProvider(props: PropsWithChildren<DesignerContextProviderProps>) {
  const { children, Elements, model, set, selectedId, select } = props;
  const pushElement = usePushElement(props);
  const removeElement = useRemoveElement(props);
  const moveElementUp = useMoveElement(props, -1);
  const moveElementDown = useMoveElement(props, 1);
  const renameElement = useRenameElement(props);
  const ElementValues = useMemo(
    () => Elements.flatMap((x) => (Array.isArray(x) ? x.slice(1) : x)) as ElementBase[],
    [Elements],
  );

  const value = useMemo(
    () =>
      ({
        ElementsInput: Elements,
        Elements: Elements.flatMap((x) => (Array.isArray(x) ? x.slice(1) : x)) as ElementBase[],
        model,
        set,
        pushElement,
        removeElement,
        moveElementUp,
        moveElementDown,
        selectedId,
        select,
        selected: model.elements.find((x) => x.id === selectedId) ?? null,
        selectedElement:
          ElementValues.find((x) => x.id === model.elements.find((el) => el.id === selectedId)?.element) ??
          null,
        renameElement,
      }) satisfies DesignerContextValue,
    [
      Elements,
      ElementValues,
      model,
      set,
      pushElement,
      removeElement,
      moveElementUp,
      moveElementDown,
      select,
      selectedId,
      renameElement,
    ],
  );

  return <DesignerContext.Provider value={value}>{children}</DesignerContext.Provider>;
}

export function useDesignerContext() {
  return useContext(DesignerContext);
}
