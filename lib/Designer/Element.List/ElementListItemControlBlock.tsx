import './ElementList.scss';
import { Button, Tag, Tooltip } from 'antd';
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  CopyOutlined,
  DeleteOutlined,
  MinusSquareOutlined,
} from '@ant-design/icons';
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
    const { removeElement, moveElementUp, moveElementDown, duplicateElement, resetElementDefaultValue } =
      useDesignerContext();

    return (
      <div className={clx('element-list-item-control-block')}>
        <Tag>{element.id}</Tag>
        <Tooltip title="Move element up">
          <Button type="link" key="up" onClick={() => moveElementUp(element)} icon={<ArrowUpOutlined />} />
        </Tooltip>
        <Tooltip title="Move element down">
          <Button
            type="link"
            key="down"
            onClick={() => moveElementDown(element)}
            icon={<ArrowDownOutlined />}
          />
        </Tooltip>
        <Tooltip title="Duplicate element">
          <Button type="link" onClick={() => duplicateElement(element)} icon={<CopyOutlined />} />
        </Tooltip>
        <Tooltip title="Reset default value">
          <Button
            type="link"
            onClick={() => resetElementDefaultValue(element.id)}
            icon={<MinusSquareOutlined />}
          />
        </Tooltip>
        <Tooltip title="Remove element">
          <Button type="link" danger onClick={() => removeElement(element)} icon={<DeleteOutlined />} />
        </Tooltip>
      </div>
    );
  },
);
