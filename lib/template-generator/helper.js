"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nextSiblingNode = exports.previousSiblingNode = void 0;
function previousSiblingNode(child, parent) {
    var idx = parent.children.indexOf(child);
    if (idx < 1)
        return null;
    return parent.children[idx - 1];
}
exports.previousSiblingNode = previousSiblingNode;
function nextSiblingNode(child, parent) {
    var idx = parent.children.indexOf(child);
    if (idx > parent.children.length - 2)
        return null;
    return parent.children[idx + 1];
}
exports.nextSiblingNode = nextSiblingNode;
