import { PlainElementNode } from "@vuedx/template-ast-types";
import { getPropsByName, replacePropName } from "./util";

export default function (node: PlainElementNode) {
  node.tag = "a-divider";
  replacePropName(getPropsByName(node, "content-position"), "orientation");
  replacePropName(getPropsByName(node, "direction"), "type");
}
