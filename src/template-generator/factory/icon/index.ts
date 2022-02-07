import {
  AttributeNode,
  ElementNode,
  isAttributeNode,
  PlainElementNode,
} from "@vuedx/template-ast-types";
import { CommentType } from "../../assert";
import { addProp, appendTransformComment, getPropsByName } from "../util";
import pairMap from "./map";
export default function (
  node: PlainElementNode,
  ancestors: Array<{ node: PlainElementNode }>
) {
  const className = getPropsByName(node, "class");
  const parent = ancestors[ancestors.length - 1].node as ElementNode;
  if (
    isAttributeNode(className) &&
    className.value?.content &&
    className.value.content.indexOf("el-icon") > -1
  ) {
    const origin = /(el-icon-[a-z|-]+)/.exec(className.value.content);
    if (origin && pairMap[origin[0]]) {
      node.tag = "a-icon";
      const newProp: AttributeNode = {
        type: 6,
        name: "type",
        value: { type: 2, content: pairMap[origin[0]], loc: node.loc },
        loc: node.loc,
      };
      className.value.content = className.value.content.replace(
        /(el-icon-[a-z|-]+)/,
        ""
      );
      addProp(node, newProp);
    } else {
      appendTransformComment(CommentType.PROPS, {
        node,
        parent,
        msg: [className.value.content],
      });
    }
  }
}
