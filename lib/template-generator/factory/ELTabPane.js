"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
function default_1(node) {
    node.tag = "a-tab-pane";
    (0, util_1.replacePropName)((0, util_1.getPropsByName)(node, "label"), "tab");
    (0, util_1.replacePropName)((0, util_1.getPropsByName)(node, "name"), "key");
}
exports.default = default_1;
