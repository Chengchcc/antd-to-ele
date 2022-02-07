import { AttributeNode, PlainElementNode } from "@vuedx/template-ast-types";
import { addProp } from "./util";

export default function (node: PlainElementNode) {
  node.tag = "a-button";
  const newProp: AttributeNode = {
    type: 6,
    name: "type",
    value: { type: 2, content: "link", loc: node.loc },
    loc: node.loc,
  };
  addProp(node, newProp);
}
