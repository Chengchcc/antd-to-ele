import { ElementNode, PlainElementNode } from "@vuedx/template-ast-types";
import { CommentType } from "../assert";
import {
  appendTransformComment,
  getPropsByName,
  replacePropName,
} from "./util";

export default function (
  node: PlainElementNode,
  ancestors: Array<{ node: PlainElementNode }>
) {
  node.tag = "a-drawer";
  const parent = ancestors[ancestors.length - 1].node as ElementNode;

  // 检查 direction
  replacePropName(getPropsByName(node, "direction"), "placement");
  // 检查wrapperClosable
  replacePropName(getPropsByName(node, "wrapperClosable"), "maskClosable");

  const msg = ["before-close", "with-header", "size"].filter(
    (prop) => !!getPropsByName(node, prop)
  );
  if (msg.length) {
    appendTransformComment(CommentType.PROPS, {
      node,
      parent,
      msg: [msg.join(",")],
    });
  }
}
