import { Form, List } from 'antd';
import { useDesignerContext } from '../DesignerContext';
import { ElementListItem } from './ElementListItem';
import { DynamicFormTheme } from '@/DynamicFormTheme';

export interface ElementListProps {
  animate?: boolean;
}

export const ElementList = DynamicFormTheme.flexy('ElementList', (props: ElementListProps) => {
  const { model } = useDesignerContext();
  const { animate } = props;

  return (
    <Form layout="vertical">
      <List
        dataSource={model.elements}
        renderItem={(el) => {
          return (
            <List.Item key={el.id}>
              <ElementListItem element={el} animate={animate} />
            </List.Item>
          );
        }}
      />
    </Form>
  );
});
