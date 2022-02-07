"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
function default_1(node) {
    node.tag = "a-progress";
    (0, util_1.replacePropName)((0, util_1.getPropsByName)(node, "percentage"), "successPercent");
}
exports.default = default_1;
