import {
  DirectiveNode,
  ElementNode,
  PlainElementNode,
} from "@vuedx/template-ast-types";
import { CommentType } from "../assert";
import { appendTransformComment, isEqualName } from "./util";

export default function (
  directiveNode: DirectiveNode,
  ancestors: Array<{ node: PlainElementNode }>
) {
  if (ancestors.length === 0) return;
  const node = ancestors[ancestors.length - 1].node as ElementNode;
  const parent = ancestors[ancestors.length - 2].node as ElementNode;
  const msg = ["loading", "infinite-scroll", "el-table-infinite-scroll"]
    .filter((directive) => {
      return !!isEqualName(directiveNode.name, directive);
    })
    .map((m) => "v-" + m);
  if (msg.length) {
    appendTransformComment(CommentType.DIRECTIVE, {
      node: node,
      parent: parent,
      msg: msg,
    });
  }
}
