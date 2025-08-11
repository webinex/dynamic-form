import * as Yup from 'yup';
import { createElement } from './ElementBase';
import { Divider as _Divider } from 'antd';
import { Size, Style } from './Style';
import { LineOutlined } from '@ant-design/icons';

export const Divider = createElement({
  id: 'Divider',
  value: 'readonly',
  icon: <LineOutlined />,
  props: Yup.object({
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
    width: Yup.number().oneOf([1, 2, 3, 4, 5]).label('Width').default(1).required(),
  }),
  Component: ({ marginBottom, marginTop, width }) => {
    return (
      <_Divider
        style={{
          marginBottom: Style.margin[marginBottom],
          marginTop: Style.margin[marginTop],
          borderBlockStartWidth: width,
        }}
      />
    );
  },
});
