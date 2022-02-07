"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = require("../assert");
var util_1 = require("./util");
function default_1(node, ancestors) {
    node.tag = "a-drawer";
    var parent = ancestors[ancestors.length - 1].node;
    // 检查 direction
    (0, util_1.replacePropName)((0, util_1.getPropsByName)(node, "direction"), "placement");
    // 检查wrapperClosable
    (0, util_1.replacePropName)((0, util_1.getPropsByName)(node, "wrapperClosable"), "maskClosable");
    var msg = ["before-close", "with-header", "size"].filter(function (prop) { return !!(0, util_1.getPropsByName)(node, prop); });
    if (msg.length) {
        (0, util_1.appendTransformComment)(assert_1.CommentType.PROPS, {
            node: node,
            parent: parent,
            msg: [msg.join(",")],
        });
    }
}
exports.default = default_1;
