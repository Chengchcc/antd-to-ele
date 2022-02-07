"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = require("../assert");
var util_1 = require("./util");
function default_1(node, ancestors) {
    node.tag = "a-tag";
    var parent = ancestors[ancestors.length - 1].node;
    var msg = ["type"].filter(function (prop) { return !!(0, util_1.getPropsByName)(node, prop); });
    if (msg.length) {
        (0, util_1.appendTransformComment)(assert_1.CommentType.PROPS, {
            node: node,
            parent: parent,
            msg: [msg.join(",")],
        });
    }
}
exports.default = default_1;
