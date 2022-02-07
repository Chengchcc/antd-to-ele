import { PlainElementNode } from "@vuedx/template-ast-types";

export default function (node: PlainElementNode) {
  node.tag = "a-col";
}
