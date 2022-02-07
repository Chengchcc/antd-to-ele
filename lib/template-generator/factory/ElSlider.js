"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
function default_1(node, ancestors) {
    node.tag = "a-slider";
    (0, util_1.replacePropName)((0, util_1.getPropsByName)(node, "show-tooltip"), "tooltip-visible");
    (0, util_1.replacePropName)((0, util_1.getPropsByName)(node, "input"), "change");
}
exports.default = default_1;
