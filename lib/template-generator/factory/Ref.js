"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = require("../assert");
var util_1 = require("./util");
function default_1(node, ancestors) {
    if (node.tag.startsWith("el-") && (0, util_1.getPropsByName)(node, "ref")) {
        var parentNode = ancestors[ancestors.length - 1].node;
        (0, util_1.appendTransformComment)(assert_1.CommentType.REF, {
            node: node,
            parent: parentNode,
        });
    }
}
exports.default = default_1;
