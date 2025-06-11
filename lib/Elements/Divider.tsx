import * as Yup from 'yup';
import { createElement } from './ElementBase';
import { Divider as _Divider } from 'antd';
import { Size, Style } from './Style';

export const Divider = createElement({
  id: 'Divider',
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
  }),
  Component: ({ marginBottom, marginTop }) => {
    return (
      <_Divider style={{ marginBottom: Style.margin[marginBottom], marginTop: Style.margin[marginTop] }} />
    );
  },
});
