"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = require("../assert");
var util_1 = require("./util");
function default_1(node, ancestors) {
    var parentNode = ancestors[ancestors.length - 1].node;
    (0, util_1.appendTransformComment)(assert_1.CommentType.REFACTOR, {
        node: node,
        parent: parentNode,
        msg: ["el-table"],
    });
}
exports.default = default_1;
