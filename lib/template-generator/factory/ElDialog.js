"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var template_ast_types_1 = require("@vuedx/template-ast-types");
var assert_1 = require("../assert");
var util_1 = require("./util");
function default_1(node, ancestors) {
    node.tag = "a-modal";
    var parent = ancestors[ancestors.length - 1].node;
    (0, util_1.replacePropName)((0, util_1.getPropsByName)(node, "close-on-press-escape"), "keyboard");
    (0, util_1.replacePropName)((0, util_1.getPropsByName)(node, "close-on-click-modal"), "maskClosable");
    (0, util_1.replacePropName)((0, util_1.getPropsByName)(node, "custom-class"), "wrapClassName");
    var msg = ["before-close"].filter(function (prop) { return !!(0, util_1.getPropsByName)(node, prop); });
    if (msg.length) {
        (0, util_1.appendTransformComment)(assert_1.CommentType.PROPS, {
            node: node,
            parent: parent,
            msg: [msg.join(",")],
        });
    }
    // appendTransformComment(CommentType.REFACTOR, {
    //     node: node,
    //     parent: parent,
    //     msg: ['dialog footer']
    // })
    if (!(0, util_1.getSlotByName)(node, "footer")) {
        var footer = {
            type: 7,
            name: "bind",
            exp: (0, template_ast_types_1.createSimpleExpression)("null", false),
            arg: (0, template_ast_types_1.createSimpleExpression)("footer", true),
            modifiers: [],
            loc: node.loc,
        };
        (0, util_1.addProp)(node, footer);
    }
}
exports.default = default_1;
