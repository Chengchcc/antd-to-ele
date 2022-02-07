import { ElementNode, PlainElementNode } from "@vuedx/template-ast-types";
import { CommentType } from "../assert";
import { appendTransformComment } from "./util";

export default function (
  node: PlainElementNode,
  ancestors: Array<{ node: PlainElementNode }>
) {
  const parentNode = ancestors[ancestors.length - 1].node as ElementNode;
  appendTransformComment(CommentType.REFACTOR, {
    node: node,
    parent: parentNode,
    msg: ["el-select"],
  });
}
