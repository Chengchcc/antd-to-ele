import { ElementNode, PlainElementNode } from "@vuedx/template-ast-types";
import { CommentType } from "../assert";
import { appendTransformComment, getPropsByName } from "./util";

export default function (
  node: PlainElementNode,
  ancestors: Array<{ node: PlainElementNode }>
) {
  if (node.tag.startsWith("el-") && getPropsByName(node, "ref")) {
    const parentNode = ancestors[ancestors.length - 1].node as ElementNode;
    appendTransformComment(CommentType.REF, {
      node: node,
      parent: parentNode,
    });
  }
}
