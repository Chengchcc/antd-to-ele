import { isAttributeNode, PlainElementNode } from "@vuedx/template-ast-types";
import { getPropsByName, replacePropName } from "./util";

export default function (node: PlainElementNode) {
  node.tag = "a-input";
  replacePropName(getPropsByName(node, "maxlength"), "maxLength");
  replacePropName(getPropsByName(node, "clearable"), "allowClear");
  const type = getPropsByName(node, "type");
  if (isAttributeNode(type) && type.value?.content === "textarea") {
    node.tag = "a-textarea";
  }
}
