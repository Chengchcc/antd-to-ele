import { ElementNode } from "@vuedx/template-ast-types";

export function previousSiblingNode(child: ElementNode, parent: ElementNode) {
  const idx = parent.children.indexOf(child);
  if (idx < 1) return null;
  return parent.children[idx - 1];
}

export function nextSiblingNode(child: ElementNode, parent: ElementNode) {
  const idx = parent.children.indexOf(child);
  if (idx > parent.children.length - 2) return null;
  return parent.children[idx + 1];
}
