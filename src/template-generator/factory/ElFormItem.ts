import {
  ElementNode,
  isAttributeNode,
  PlainElementNode,
} from "@vuedx/template-ast-types";
import { CommentType } from "../assert";
import { appendTransformComment, getPropsByName } from "./util";

export default function (
  node: PlainElementNode,
  ancestors: Array<{ node: PlainElementNode }>
) {
  node.tag = "a-form-model-item";

  const parent = ancestors[ancestors.length - 1].node as ElementNode;
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

  // 删除label最后的冒号 是否需要？
  const label = getPropsByName(node, "label");
  if (isAttributeNode(label) && label.value && label.value.content) {
    label.value.content = label.value.content.replace(/[：|:]$/, "");
  }
}
