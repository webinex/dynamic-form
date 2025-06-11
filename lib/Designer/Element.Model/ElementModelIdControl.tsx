import { useCallback, useEffect, useState } from 'react';
import { useDesignerContext } from '../DesignerContext';
import { Button, Flex, Input, message, Tag } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { validateModelElementId } from '@/Model';
import type { MessageInstance } from 'antd/es/message/interface';
import { DynamicFormTheme } from '@/DynamicFormTheme';

function useEditValue(messageApi: MessageInstance) {
  const { selectedId } = useDesignerContext();
  const [isEdit, setEdit] = useState(false);
  const [idEditValue, setIdEditValue] = useState(selectedId);
  const { renameElement } = useDesignerContext();

  const toggleEdit = useCallback(() => setEdit((prev) => !prev), []);

  useEffect(() => {
    setIdEditValue(selectedId);
    setEdit(false);
  }, [selectedId]);

  const onSubmit = useCallback(() => {
    const value = idEditValue?.trim();
    const error = validateModelElementId(value);

    if (error) {
      messageApi.error(error);
      return;
    }

    if (value !== selectedId) {
      renameElement(selectedId!, value!);
    }
    setEdit(false);
  }, [idEditValue, selectedId, renameElement, messageApi]);

  return { selectedId, isEdit, toggleEdit, idEditValue, onIdEditValueChange: setIdEditValue, onSubmit };
}

export interface ElementModelIdControlProps {
  style?: React.CSSProperties;
}

export const ElementModelIdControl = DynamicFormTheme.flexy(
  'ElementModelIdControl',
  (props: ElementModelIdControlProps) => {
    const { style } = props;
    const [messageApi, messageContext] = message.useMessage();
    const { selectedId, idEditValue, isEdit, onIdEditValueChange, toggleEdit, onSubmit } =
      useEditValue(messageApi);

    if (!isEdit) {
      return (
        <Flex align="center" style={style}>
          <Tag>{selectedId}</Tag>
          <Button onClick={toggleEdit} icon={<EditOutlined />} type="link" />
        </Flex>
      );
    }

    return (
      <Flex gap="small" align="center" style={style}>
        <Input
          value={idEditValue ?? ''}
          onChange={(e) => onIdEditValueChange(e.target.value)}
          onPressEnter={onSubmit}
          autoFocus
        />
        <Button onClick={onSubmit} type="link">
          Save
        </Button>
        <Button onClick={toggleEdit} type="link">
          Discard
        </Button>
        {messageContext}
      </Flex>
    );
  },
);
