import {
  ElementNode,
  isAttributeNode,
  isPlainElementNode,
  PlainElementNode,
} from "@vuedx/template-ast-types";
import { CommentType } from "../assert";
import {
  appendTransformComment,
  getPropsByName,
  getSlotByName,
  replacePropName,
} from "./util";

export default function (
  node: PlainElementNode,
  ancestors: Array<{ node: PlainElementNode }>
) {
  node.tag = "a-tooltip";
  const parent = ancestors[ancestors.length - 1].node as ElementNode;
  replacePropName(getPropsByName(node, "content"), "title");
  const content = getSlotByName(node, "content");
  if (isPlainElementNode(content)) {
    const slot = getPropsByName(content, "slot");
    if (isAttributeNode(slot)) {
      slot.value!.content = "title";
    }
  }
  const msg = ["effect"].filter((prop) => !!getPropsByName(node, prop));
  if (msg.length) {
    appendTransformComment(CommentType.PROPS, {
      node,
      parent,
      msg: [msg.join(",")],
    });
  }
}
