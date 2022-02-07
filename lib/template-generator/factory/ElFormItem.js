"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var template_ast_types_1 = require("@vuedx/template-ast-types");
var assert_1 = require("../assert");
var util_1 = require("./util");
function default_1(node, ancestors) {
    node.tag = "a-form-model-item";
    var parent = ancestors[ancestors.length - 1].node;
    var msg = ["label-width", "label-suffix"].filter(function (prop) { return !!(0, util_1.getPropsByName)(node, prop); });
    if (msg.length) {
        (0, util_1.appendTransformComment)(assert_1.CommentType.PROPS, {
            node: node,
            parent: parent,
            msg: [msg.join(",")],
        });
    }
    // 删除label最后的冒号 是否需要？
    var label = (0, util_1.getPropsByName)(node, "label");
    if ((0, template_ast_types_1.isAttributeNode)(label) && label.value && label.value.content) {
        label.value.content = label.value.content.replace(/[：|:]$/, "");
    }
}
exports.default = default_1;
