"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var template_ast_types_1 = require("@vuedx/template-ast-types");
var assert_1 = require("../assert");
var util_1 = require("./util");
function default_1(node, ancestors) {
    node.tag = "a-tooltip";
    var parent = ancestors[ancestors.length - 1].node;
    (0, util_1.replacePropName)((0, util_1.getPropsByName)(node, "content"), "title");
    var content = (0, util_1.getSlotByName)(node, "content");
    if ((0, template_ast_types_1.isPlainElementNode)(content)) {
        var slot = (0, util_1.getPropsByName)(content, "slot");
        if ((0, template_ast_types_1.isAttributeNode)(slot)) {
            slot.value.content = "title";
        }
    }
    var msg = ["effect"].filter(function (prop) { return !!(0, util_1.getPropsByName)(node, prop); });
    if (msg.length) {
        (0, util_1.appendTransformComment)(assert_1.CommentType.PROPS, {
            node: node,
            parent: parent,
            msg: [msg.join(",")],
        });
    }
}
exports.default = default_1;
