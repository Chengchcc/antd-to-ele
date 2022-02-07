import {
  createSimpleExpression,
  InterpolationNode,
  isAttributeNode,
  isDirectiveNode,
  PlainElementNode,
  TextNode,
} from "@vuedx/template-ast-types";
import { getPropsByName, replacePropName } from "./util";

export default function (node: PlainElementNode) {
  node.tag = "a-radio-button";
  const label = getPropsByName(node, "label");
  if (label) {
    // 插入children
    if (isAttributeNode(label)) {
      node.isSelfClosing = false;
      const child: TextNode = {
        type: 2,
        content: label.value?.content as string,
        loc: node.loc,
      };
      node.children.push(child);
    } else if (isDirectiveNode(label)) {
      node.isSelfClosing = false;
      const child: InterpolationNode = {
        type: 5,
        content: createSimpleExpression(
          String(label.exp && (label.exp as any).content),
          false,
          node.loc
        ),
        loc: node.loc,
      };
      node.children.push(child);
    }

    replacePropName(getPropsByName(node, "label"), "value");
  }
}
