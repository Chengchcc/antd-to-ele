import {
  AttributeNode,
  DirectiveNode,
  ElementNode,
  isAttributeNode,
  isDirectiveNode,
  isElementNode,
  isSimpleExpressionNode,
} from "@vuedx/template-ast-types";
import {
  CommentType,
  isTransformCommentNode,
  TransformCommentNode,
} from "../assert";

const commentLocale: Record<CommentType, string> = {
  [CommentType.REFACTOR]: "迁移TODO: 请手动重构{0}",
  [CommentType.PROPS]: "迁移FIXME: {0}无法对应",
  [CommentType.DIRECTIVE]: "迁移FIXME: 请重构指令{0}",
  [CommentType.REF]: "迁移TODO: 请检查ref相关方法",
};

export function appendTransformComment(
  commentType: CommentType,
  ctx: {
    node: ElementNode;
    parent: ElementNode;
    msg?: string[];
  }
) {
  const { node, parent, msg } = ctx;
  let idx = parent.children.findIndex((child) => child == node) - 1;
  const prevCommentNodes = [];
  while (idx > 0) {
    const curr = parent.children[idx];
    if (isTransformCommentNode(curr)) {
      prevCommentNodes.push(curr);
    } else {
      break;
    }
    idx--;
  }
  if (
    prevCommentNodes.every((comment) => comment.commentType !== commentType)
  ) {
    const comment = commentLocale[commentType].format(...msg!);
    const commentNode: TransformCommentNode = {
      type: 3,
      content: comment,
      commentType: commentType,
      loc: node.loc,
    };
    parent.children.splice(parent.children.indexOf(node), 0, commentNode);
  }
}

export function getPropsByName(node: ElementNode, name: string) {
  return node.props.find((child) => {
    if (isAttributeNode(child)) {
      return isEqualName(child.name, name);
    } else if (isDirectiveNode(child) && isSimpleExpressionNode(child.arg)) {
      return isEqualName(child.arg.content, name);
    }
    return false;
  });
}

export function replacePropName(
  node: AttributeNode | DirectiveNode | undefined,
  name: string
) {
  if (isAttributeNode(node)) {
    node.name = name;
  } else if (isDirectiveNode(node)) {
    if (isSimpleExpressionNode(node.arg)) {
      node.arg.content = name;
    }
  }
}

export function delPropByName(node: ElementNode, name: string) {
  const prop = getPropsByName(node, name);
  const idx = node.props.findIndex((child) => child === prop);
  node.props.splice(idx, 1);
}

export function addProp(
  node: ElementNode,
  prop: DirectiveNode | AttributeNode
) {
  node.props.push(prop);
}

export function getSlotByName(node: ElementNode, name: string) {
  return node.children.find((child) => {
    if (isElementNode(child)) {
      return child.props.some((prop) => {
        return (
          (isAttributeNode(prop) && isEqualName(prop.value?.content, name)) ||
          (isDirectiveNode(prop) &&
            isSimpleExpressionNode(prop.arg) &&
            isEqualName(prop.arg?.content, name))
        );
      });
    }
    return false;
  });
}

export function isEqualName(a: string | undefined, b: string | undefined) {
  if (!a || !b) return false;
  return a.replace("-", "").toLowerCase() === b.replace("-", "").toLowerCase();
}
