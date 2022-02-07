import { isAttributeNode, PlainElementNode } from "@vuedx/template-ast-types";
import { delPropByName, getPropsByName } from "./util";

export default function (
  node: PlainElementNode,
  ancestors: Array<{ node: PlainElementNode }>
) {
  node.tag = "a-button";
  {
    // 检查 type
    const typeProp = getPropsByName(node, "type");
    if (isAttributeNode(typeProp) && typeProp.value?.content === "text") {
      typeProp.value.content = "link";
    }
  }

  {
    // 检查 size
    const sizeProp = getPropsByName(node, "size");
    if (isAttributeNode(sizeProp) && sizeProp.value?.content === "medium") {
      delPropByName(node, "size");
    }
  }
}
