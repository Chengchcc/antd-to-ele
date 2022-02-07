"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEqualName = exports.getSlotByName = exports.addProp = exports.delPropByName = exports.replacePropName = exports.getPropsByName = exports.appendTransformComment = void 0;
var template_ast_types_1 = require("@vuedx/template-ast-types");
var assert_1 = require("../assert");
var commentLocale = (_a = {},
    _a[assert_1.CommentType.REFACTOR] = "迁移TODO: 请手动重构{0}",
    _a[assert_1.CommentType.PROPS] = "迁移FIXME: {0}无法对应",
    _a[assert_1.CommentType.DIRECTIVE] = "迁移FIXME: 请重构指令{0}",
    _a[assert_1.CommentType.REF] = "迁移TODO: 请检查ref相关方法",
    _a);
function appendTransformComment(commentType, ctx) {
    var _a;
    var node = ctx.node, parent = ctx.parent, msg = ctx.msg;
    var idx = parent.children.findIndex(function (child) { return child == node; }) - 1;
    var prevCommentNodes = [];
    while (idx > 0) {
        var curr = parent.children[idx];
        if ((0, assert_1.isTransformCommentNode)(curr)) {
            prevCommentNodes.push(curr);
        }
        else {
            break;
        }
        idx--;
    }
    if (prevCommentNodes.every(function (comment) { return comment.commentType !== commentType; })) {
        var comment = (_a = commentLocale[commentType]).format.apply(_a, msg);
        var commentNode = {
            type: 3,
            content: comment,
            commentType: commentType,
            loc: node.loc,
        };
        parent.children.splice(parent.children.indexOf(node), 0, commentNode);
    }
}
exports.appendTransformComment = appendTransformComment;
function getPropsByName(node, name) {
    return node.props.find(function (child) {
        if ((0, template_ast_types_1.isAttributeNode)(child)) {
            return isEqualName(child.name, name);
        }
        else if ((0, template_ast_types_1.isDirectiveNode)(child) && (0, template_ast_types_1.isSimpleExpressionNode)(child.arg)) {
            return isEqualName(child.arg.content, name);
        }
        return false;
    });
}
exports.getPropsByName = getPropsByName;
function replacePropName(node, name) {
    if ((0, template_ast_types_1.isAttributeNode)(node)) {
        node.name = name;
    }
    else if ((0, template_ast_types_1.isDirectiveNode)(node)) {
        if ((0, template_ast_types_1.isSimpleExpressionNode)(node.arg)) {
            node.arg.content = name;
        }
    }
}
exports.replacePropName = replacePropName;
function delPropByName(node, name) {
    var prop = getPropsByName(node, name);
    var idx = node.props.findIndex(function (child) { return child === prop; });
    node.props.splice(idx, 1);
}
exports.delPropByName = delPropByName;
function addProp(node, prop) {
    node.props.push(prop);
}
exports.addProp = addProp;
function getSlotByName(node, name) {
    return node.children.find(function (child) {
        if ((0, template_ast_types_1.isElementNode)(child)) {
            return child.props.some(function (prop) {
                var _a, _b;
                return (((0, template_ast_types_1.isAttributeNode)(prop) && isEqualName((_a = prop.value) === null || _a === void 0 ? void 0 : _a.content, name)) ||
                    ((0, template_ast_types_1.isDirectiveNode)(prop) &&
                        (0, template_ast_types_1.isSimpleExpressionNode)(prop.arg) &&
                        isEqualName((_b = prop.arg) === null || _b === void 0 ? void 0 : _b.content, name)));
            });
        }
        return false;
    });
}
exports.getSlotByName = getSlotByName;
function isEqualName(a, b) {
    if (!a || !b)
        return false;
    return a.replace("-", "").toLowerCase() === b.replace("-", "").toLowerCase();
}
exports.isEqualName = isEqualName;
