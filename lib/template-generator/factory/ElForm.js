"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var template_ast_types_1 = require("@vuedx/template-ast-types");
var assert_1 = require("../assert");
var util_1 = require("./util");
function default_1(node, ancestors) {
    node.tag = "a-form-model";
    var parent = ancestors[ancestors.length - 1].node;
    // 替换label-position
    (0, util_1.replacePropName)((0, util_1.getPropsByName)(node, "label-position"), "label-align");
    // 检查inline
    var prop = (0, util_1.getPropsByName)(node, "inline");
    if ((0, template_ast_types_1.isAttributeNode)(prop) ||
        ((0, template_ast_types_1.isDirectiveNode)(prop) &&
            (0, template_ast_types_1.isSimpleExpressionNode)(prop.exp) &&
            prop.exp.content == "true")) {
        var newProp = {
            type: 6,
            name: "layout",
            value: { type: 2, content: "inline", loc: prop.loc },
            loc: prop.loc,
        };
        (0, util_1.delPropByName)(node, "inline");
        (0, util_1.addProp)(node, newProp);
    }
    var msg = ["label-width", "label-suffix"].filter(function (prop) { return !!(0, util_1.getPropsByName)(node, prop); });
    if (msg.length) {
        (0, util_1.appendTransformComment)(assert_1.CommentType.PROPS, {
            node: node,
            parent: parent,
            msg: [msg.join(",")],
        });
    }
}
exports.default = default_1;
