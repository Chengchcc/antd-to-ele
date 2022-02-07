import {
  AttributeNode,
  createSimpleExpression,
  DirectiveNode,
  ElementNode,
  isAttributeNode,
  isDirectiveNode,
  isSimpleExpressionNode,
  PlainElementNode,
} from "@vuedx/template-ast-types";
import { CommentType } from "../assert";
import {
  addProp,
  appendTransformComment,
  delPropByName,
  getPropsByName,
  replacePropName,
} from "./util";

export default function (
  node: PlainElementNode,
  ancestors: Array<{ node: PlainElementNode }>
) {
  node.tag = "a-form-model";
  const parent = ancestors[ancestors.length - 1].node as ElementNode;

  // 替换label-position
  replacePropName(getPropsByName(node, "label-position"), "label-align");

  // 检查inline
  const prop = getPropsByName(node, "inline");
  if (
    isAttributeNode(prop) ||
    (isDirectiveNode(prop) &&
      isSimpleExpressionNode(prop.exp) &&
      prop.exp.content == "true")
  ) {
    const newProp: AttributeNode = {
      type: 6,
      name: "layout",
      value: { type: 2, content: "inline", loc: prop.loc },
      loc: prop.loc,
    };
    delPropByName(node, "inline");
    addProp(node, newProp);
  }

  const labelWidth = getPropsByName(node, "label-width");
  if (labelWidth) {
    if (isAttributeNode(labelWidth)) {
      const width = labelWidth.value?.content;
      const bind: DirectiveNode = {
        type: 7,
        name: "bind",
        exp: createSimpleExpression(
          `{
          labelCol: {style: {width: '${width}', float: 'left'}},
          wrapperCol: {style: {width: 'calc(100% - ${width})', float: 'left'}}
        }`,
          false
        ),
        arg: undefined,
        modifiers: [],
        loc: labelWidth.loc,
      };
      node.props.push(bind);
      delPropByName(node, "label-width");
    }
  }

  const msg = ["label-width", "label-suffix"].filter(
    (prop) => !!getPropsByName(node, prop)
  );
  if (msg.length) {
    appendTransformComment(CommentType.PROPS, {
      node,
      parent,
      msg: [msg.join(",")],
    });
  }
}
