import * as Yup from 'yup';
import { createElement } from './ElementBase';
import { Typography } from 'antd';
import { Size, Style } from './Style';
import { FontSizeOutlined } from '@ant-design/icons';

export const Heading = createElement({
  id: 'Heading',
  value: 'readonly',
  icon: <FontSizeOutlined />,
  props: Yup.object({
    level: Yup.number()
      .oneOf([1, 2, 3, 4, 5, 6])
      .required()
      .default(1)
      .label('Size')
      .meta({ description: 'Heading level (1-6)' }),
    text: Yup.string().required().default('Heading').label('Text').meta({ description: 'Heading text' }),
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
  Component: ({ level, text, marginBottom, marginTop }) => {
    return (
      <Typography.Title
        level={level as any}
        style={{ marginBottom: Style.margin[marginBottom], marginTop: Style.margin[marginTop] }}
      >
        {text}
      </Typography.Title>
    );
  },
});
