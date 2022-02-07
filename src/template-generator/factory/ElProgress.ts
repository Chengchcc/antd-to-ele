import { PlainElementNode } from "@vuedx/template-ast-types";
import { getPropsByName, replacePropName } from "./util";

export default function (node: PlainElementNode) {
  node.tag = "a-progress";
  replacePropName(getPropsByName(node, "percentage"), "successPercent");
}
