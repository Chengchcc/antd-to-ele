"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var template_ast_types_1 = require("@vuedx/template-ast-types");
var util_1 = require("./util");
function default_1(node) {
    var _a;
    node.tag = "a-input";
    (0, util_1.replacePropName)((0, util_1.getPropsByName)(node, "maxlength"), "maxLength");
    (0, util_1.replacePropName)((0, util_1.getPropsByName)(node, "clearable"), "allowClear");
    var type = (0, util_1.getPropsByName)(node, "type");
    if ((0, template_ast_types_1.isAttributeNode)(type) && ((_a = type.value) === null || _a === void 0 ? void 0 : _a.content) === "textarea") {
        node.tag = "a-textarea";
    }
}
exports.default = default_1;
