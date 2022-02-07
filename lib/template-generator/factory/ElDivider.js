"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
function default_1(node) {
    node.tag = "a-divider";
    (0, util_1.replacePropName)((0, util_1.getPropsByName)(node, "content-position"), "orientation");
    (0, util_1.replacePropName)((0, util_1.getPropsByName)(node, "direction"), "type");
}
exports.default = default_1;
