"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = require("../assert");
var util_1 = require("./util");
function default_1(directiveNode, ancestors) {
    if (ancestors.length === 0)
        return;
    var node = ancestors[ancestors.length - 1].node;
    var parent = ancestors[ancestors.length - 2].node;
    var msg = ["loading", "infinite-scroll", "el-table-infinite-scroll"]
        .filter(function (directive) {
        return !!(0, util_1.isEqualName)(directiveNode.name, directive);
    })
        .map(function (m) { return "v-" + m; });
    if (msg.length) {
        (0, util_1.appendTransformComment)(assert_1.CommentType.DIRECTIVE, {
            node: node,
            parent: parent,
            msg: msg,
        });
    }
}
exports.default = default_1;
