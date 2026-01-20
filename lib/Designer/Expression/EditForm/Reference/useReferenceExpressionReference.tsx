import { useDesignerContext } from '@/Designer/DesignerContext';
import { Expression, ExpressionUtil } from '@/Model';

export function useReferenceExpressionReference(expression: Expression | null | undefined) {
  const { model, Elements } = useDesignerContext();

  if (expression == null || !ExpressionUtil.isReferenceExpression(expression)) {
    return null;
  }

  const reference =
    expression && ExpressionUtil.isReferenceExpression(expression) && expression.ref != null
      ? expression.ref
      : null;

  const modelElement =
    expression && ExpressionUtil.isReferenceExpression(expression)
      ? model.elements.find((x) => x.id === expression.ref)
      : null;

  const Element = modelElement && Elements.find((x) => x.id === modelElement.element);
  return { reference, modelElement, Element };
}
