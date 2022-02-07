import { ElementNode, PlainElementNode } from "@vuedx/template-ast-types";
import { CommentType } from "../assert";
import { getPropsByName, appendTransformComment } from "./util";

export default function (
  node: PlainElementNode,
  ancestors: Array<{ node: PlainElementNode }>
) {
  node.tag = "a-tag";
  const parent = ancestors[ancestors.length - 1].node as ElementNode;

  const msg = ["type"].filter((prop) => !!getPropsByName(node, prop));
  if (msg.length) {
    appendTransformComment(CommentType.PROPS, {
      node,
      parent,
      msg: [msg.join(",")],
    });
  }
}
