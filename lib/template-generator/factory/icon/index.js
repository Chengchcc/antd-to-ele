"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var template_ast_types_1 = require("@vuedx/template-ast-types");
var assert_1 = require("../../assert");
var util_1 = require("../util");
var map_1 = __importDefault(require("./map"));
function default_1(node, ancestors) {
    var _a;
    var className = (0, util_1.getPropsByName)(node, "class");
    var parent = ancestors[ancestors.length - 1].node;
    if ((0, template_ast_types_1.isAttributeNode)(className) &&
        ((_a = className.value) === null || _a === void 0 ? void 0 : _a.content) &&
        className.value.content.indexOf("el-icon") > -1) {
        var origin_1 = /(el-icon-[a-z|-]+)/.exec(className.value.content);
        if (origin_1 && map_1.default[origin_1[0]]) {
            node.tag = "a-icon";
            var newProp = {
                type: 6,
                name: "type",
                value: { type: 2, content: map_1.default[origin_1[0]], loc: node.loc },
                loc: node.loc,
            };
            className.value.content = className.value.content.replace(/(el-icon-[a-z|-]+)/, "");
            (0, util_1.addProp)(node, newProp);
        }
        else {
            (0, util_1.appendTransformComment)(assert_1.CommentType.PROPS, {
                node: node,
                parent: parent,
                msg: [className.value.content],
            });
        }
    }
}
exports.default = default_1;
