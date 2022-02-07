"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var template_ast_types_1 = require("@vuedx/template-ast-types");
var assert_1 = __importDefault(require("assert"));
var factory_1 = require("./factory");
var Directive_1 = __importDefault(require("./factory/Directive"));
var Ref_1 = __importDefault(require("./factory/Ref"));
var TemplateGenerator = /** @class */ (function () {
    function TemplateGenerator(options) {
        if (options === null || options === void 0 ? void 0 : options.ast) {
            this.ast = options === null || options === void 0 ? void 0 : options.ast;
        }
    }
    TemplateGenerator.prototype.generate = function (ast) {
        var _this = this;
        ast && (this.ast = ast);
        assert_1.default.ok(this.ast, "ast required");
        return new Promise(function (resolve, reject) {
            var code = (0, template_ast_types_1.stringify)(_this.ast.children);
            resolve(code);
        });
    };
    TemplateGenerator.prototype.transform = function (ast) {
        ast && (this.ast = ast);
        assert_1.default.ok(this.ast, "ast required");
        (0, template_ast_types_1.traverse)(this.ast, function (node, ancestors, state) {
            if ((0, template_ast_types_1.isPlainElementNode)(node)) {
                var impl = factory_1.FACTORY[node.tag];
                if (impl) {
                    (0, Ref_1.default)(node, ancestors);
                    impl(node, ancestors, state);
                }
            }
            else if ((0, template_ast_types_1.isDirectiveNode)(node)) {
                (0, Directive_1.default)(node, ancestors);
            }
        });
        return this;
    };
    return TemplateGenerator;
}());
exports.default = TemplateGenerator;
