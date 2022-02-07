import { PlainElementNode } from "@vuedx/template-ast-types";
import { getPropsByName, replacePropName } from "./util";

export default function (
  node: PlainElementNode,
  ancestors: Array<{ node: PlainElementNode }>
) {
  node.tag = "a-slider";
  replacePropName(getPropsByName(node, "show-tooltip"), "tooltip-visible");
  replacePropName(getPropsByName(node, "input"), "change");
}
