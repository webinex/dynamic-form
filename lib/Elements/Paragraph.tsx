import * as Yup from 'yup';
import { createElement } from './ElementBase';
import { Typography } from 'antd';
import { Size, Style } from './Style';
import { MenuOutlined } from '@ant-design/icons';

export const Paragraph = createElement({
  id: 'Paragraph',
  value: 'readonly',
  icon: <MenuOutlined />,
  props: Yup.object({
    text: Yup.string()
      .required()
      .default('Paragraph')
      .label('Text')
      .meta({ description: 'Paragraph text', control: 'textarea' }),
    type: Yup.string()
      .oneOf(['default', 'secondary', 'success', 'warning', 'danger'])
      .default('default')
      .nullable()
      .label('Type'),
    marginTop: Yup.string<Size>()
      .oneOf(Object.keys(Style.margin) as Size[])
      .label('Margin Top')
      .default('none')
      .required(),
    marginBottom: Yup.string<Size>()
      .oneOf(Object.keys(Style.margin) as Size[])
      .label('Margin Bottom')
      .default('none')
      .required(),
  }),
  Component: ({ text, marginTop, marginBottom, type }) => {
    const paragraphType = type === 'default' ? undefined : type;

    return (
      <Typography.Paragraph
        type={paragraphType ?? undefined}
        style={{
          whiteSpace: 'pre-line',
          marginTop: Style.margin[marginTop],
          marginBottom: Style.margin[marginBottom],
        }}
      >
        {text}
      </Typography.Paragraph>
    );
  },
});
