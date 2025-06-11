import './ElementList.scss';
import { Button, Tag } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined, DeleteOutlined } from '@ant-design/icons';
import { ModelElement } from '@/Model';
import { useDesignerContext } from '@/Designer/DesignerContext';
import { DynamicFormTheme } from '@/DynamicFormTheme';
import { clx } from '@/clx';

export interface ElementListItemControlBlockProps {
  element: ModelElement;
}

export const ElementListItemControlBlock = DynamicFormTheme.flexy(
  'ElementListItemControlBlock',
  (props: ElementListItemControlBlockProps) => {
    const { element } = props;
    const { removeElement, moveElementUp, moveElementDown } = useDesignerContext();

    return (
      <div className={clx('element-list-item-control-block')}>
        <Tag>{element.id}</Tag>
        <Button type="link" key="up" onClick={() => moveElementUp(element)} icon={<ArrowUpOutlined />} />
        <Button
          type="link"
          key="down"
          onClick={() => moveElementDown(element)}
          icon={<ArrowDownOutlined />}
        />
        <Button type="link" key="remove" onClick={() => removeElement(element)} icon={<DeleteOutlined />} />
      </div>
    );
  },
);
