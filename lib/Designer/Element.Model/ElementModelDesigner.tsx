import './ElementModelDesigner.scss';
import { useCallback, useMemo } from 'react';
import { Button, Space, Tooltip } from 'antd';
import { FormAutoSubmit, FormProp } from './Form';
import { useDesignerContext } from '../DesignerContext';
import { useElementModelSchema } from './useElementModelSchema';
import { FormValidationBlock } from './Validation';
import { ElementModelIdControl } from './ElementModelIdControl';
import { FormExpressionEditable } from '../Expression';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Form } from '@webinex/antik';
import { clx } from '@/clx';
import { DynamicFormTheme } from '@/DynamicFormTheme';

export const ElementModelDesigner = DynamicFormTheme.flexy('ElementModelDesigner', () => {
  const { model, set, selected, selectedElement: Element } = useDesignerContext();

  const schema = useElementModelSchema();
  const description = useMemo(() => Element!.props.describe(), [Element!.props]);

  const onSubmit = useCallback(
    (values: any) =>
      set({
        ...model,
        elements: model.elements.map((el) => (el.id === selected!.id ? { ...el, ...values } : el)),
      }),
    [model, selected, set],
  );

  return (
    <div className={clx('element-model-designer')}>
      <Form
        type="formik"
        uid="element-model-designer-form"
        onSubmit={onSubmit}
        initialValues={selected!}
        validationSchema={schema}
        enableReinitialize
        layout="vertical"
        rootClassName={clx('element-model-designer-form')}
      >
        <h4>{Element?.title ?? Element?.id}</h4>
        <ElementModelIdControl style={{ marginBottom: '1rem' }} />
        <FormAutoSubmit schema={schema} />
        {Object.entries(description.fields).map(([name, description]) => (
          <FormProp key={name} name={`props.${name}`} description={description} />
        ))}

        <Form.Item
          name="condition"
          label={
            <Space size={0}>
              Condition
              <Tooltip
                title={`This condition is used to determine when this element should be displayed. It can be an
                  expression that evaluates to true or false.`}
              >
                <Button type="link" icon={<QuestionCircleOutlined />} />
              </Tooltip>
            </Space>
          }
        >
          <FormExpressionEditable name="condition" />
        </Form.Item>

        {Element?.value !== 'readonly' && (
          <Form.Item
            name="validation"
            label={
              <Space size={0}>
                Validation
                <Tooltip
                  title={`Validation rules for this element. You can define multiple rules, each with a test expression and a message.`}
                >
                  <Button type="link" icon={<QuestionCircleOutlined />} />
                </Tooltip>
              </Space>
            }
          >
            <FormValidationBlock name="validation" />
          </Form.Item>
        )}
      </Form>
    </div>
  );
});
