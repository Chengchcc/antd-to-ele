import { PlainElementNode } from "@vuedx/template-ast-types";
import { getPropsByName, replacePropName } from "./util";

export default function (node: PlainElementNode) {
  node.tag = "a-tab-pane";
  replacePropName(getPropsByName(node, "label"), "tab");
  replacePropName(getPropsByName(node, "name"), "key");
}
