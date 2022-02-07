"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
function default_1(node) {
    node.tag = "a-radio-button";
    (0, util_1.replacePropName)((0, util_1.getPropsByName)(node, "label"), "value");
}
exports.default = default_1;
