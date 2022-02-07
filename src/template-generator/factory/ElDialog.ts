import {
  createSimpleExpression,
  DirectiveNode,
  ElementNode,
  PlainElementNode,
} from "@vuedx/template-ast-types";
import { CommentType } from "../assert";
import {
  addProp,
  appendTransformComment,
  getPropsByName,
  getSlotByName,
  replacePropName,
} from "./util";

export default function (
  node: PlainElementNode,
  ancestors: Array<{ node: PlainElementNode }>
) {
  node.tag = "a-modal";
  const parent = ancestors[ancestors.length - 1].node as ElementNode;

  replacePropName(getPropsByName(node, "close-on-press-escape"), "keyboard");
  replacePropName(getPropsByName(node, "close-on-click-modal"), "maskClosable");
  replacePropName(getPropsByName(node, "custom-class"), "wrapClassName");

  const msg = ["before-close"].filter((prop) => !!getPropsByName(node, prop));
  if (msg.length) {
    appendTransformComment(CommentType.PROPS, {
      node,
      parent,
      msg: [msg.join(",")],
    });
  }
  // appendTransformComment(CommentType.REFACTOR, {
  //     node: node,
  //     parent: parent,
  //     msg: ['dialog footer']
  // })

  if (!getSlotByName(node, "footer")) {
    const footer: DirectiveNode = {
      type: 7,
      name: "bind",
      exp: createSimpleExpression("null", false),
      arg: createSimpleExpression("footer", true),
      modifiers: [],
      loc: node.loc,
    };
    addProp(node, footer);
  }
}
