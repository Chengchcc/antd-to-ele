"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTransformCommentNode = exports.CommentType = void 0;
var template_ast_types_1 = require("@vuedx/template-ast-types");
var CommentType;
(function (CommentType) {
    // 重构通知
    CommentType[CommentType["REFACTOR"] = 0] = "REFACTOR";
    // props无法对应
    CommentType[CommentType["PROPS"] = 1] = "PROPS";
    // 重构指令
    CommentType[CommentType["DIRECTIVE"] = 2] = "DIRECTIVE";
    // ref
    CommentType[CommentType["REF"] = 3] = "REF";
})(CommentType = exports.CommentType || (exports.CommentType = {}));
function isTransformCommentNode(node) {
    return (0, template_ast_types_1.isCommentNode)(node) && "commentType" in node;
}
exports.isTransformCommentNode = isTransformCommentNode;
