import { CommentNode, isCommentNode } from "@vuedx/template-ast-types";

export enum CommentType {
  // 重构通知
  REFACTOR = 0,
  // props无法对应
  PROPS = 1,
  // 重构指令
  DIRECTIVE = 2,
  // ref
  REF = 3,
}

export interface TransformCommentNode extends CommentNode {
  commentType: CommentType;
}

export function isTransformCommentNode(
  node: unknown
): node is TransformCommentNode {
  return isCommentNode(node) && "commentType" in node;
}
