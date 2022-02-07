"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var template_ast_types_1 = require("@vuedx/template-ast-types");
var util_1 = require("./util");
function default_1(node, ancestors) {
    var _a, _b;
    node.tag = "a-button";
    {
        // 检查 type
        var typeProp = (0, util_1.getPropsByName)(node, "type");
        if ((0, template_ast_types_1.isAttributeNode)(typeProp) && ((_a = typeProp.value) === null || _a === void 0 ? void 0 : _a.content) === "text") {
            typeProp.value.content = "link";
        }
    }
    {
        // 检查 size
        var sizeProp = (0, util_1.getPropsByName)(node, "size");
        if ((0, template_ast_types_1.isAttributeNode)(sizeProp) && ((_b = sizeProp.value) === null || _b === void 0 ? void 0 : _b.content) === "medium") {
            (0, util_1.delPropByName)(node, "size");
        }
    }
}
exports.default = default_1;
