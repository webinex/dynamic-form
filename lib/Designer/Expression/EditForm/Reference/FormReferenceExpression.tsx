import { useMemo } from 'react';
import { useDesignerContext } from '@/Designer/DesignerContext';
import { Form } from '@webinex/antik';
import { DynamicFormTheme } from '@/DynamicFormTheme';
import { Tag } from 'antd';
import { ModelElement } from '@/Model';

export interface FormReferenceExpressionProps {
  name: string;
}

function resolvePropLabel(element: ModelElement): string | undefined {
  function byProp(prop: string): string | undefined {
    if (prop in element.props && typeof element.props[prop] === 'string') {
      return element.props[prop] as string;
    }
  }

  return byProp('title') || byProp('label') || byProp('name') || byProp('text');
}

function resolveLabel(element: ModelElement): React.ReactNode {
  const labelPropValue = resolvePropLabel(element);
  const { Elements } = useDesignerContext();
  const Element = Elements.find((el) => el.id === element.element);
  const type = Element?.title ?? Element?.id;

  return (
    <div title={`${element.id}${labelPropValue ? ` - ${labelPropValue}` : ''}${type ? ` (${type})` : ''}`}>
      <Tag>{element.id}</Tag>
      {labelPropValue && <span> {labelPropValue}</span>}
      {type && <span> ({type})</span>}
    </div>
  );
}

export const FormReferenceExpression = DynamicFormTheme.flexy(
  'FormReferenceExpression',
  (props: FormReferenceExpressionProps) => {
    const { name } = props;
    const { model } = useDesignerContext();

    const options = useMemo(
      () => model.elements.map((el) => ({ value: el.id, label: resolveLabel(el) })),
      [model.elements],
    );

    return <Form.Select name={`${name}.ref`} options={options} style={{ minWidth: 0, width: '100%' }} />;
  },
);
