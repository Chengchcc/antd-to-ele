"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
function default_1(node) {
    node.tag = "a-button";
    var newProp = {
        type: 6,
        name: "type",
        value: { type: 2, content: "link", loc: node.loc },
        loc: node.loc,
    };
    (0, util_1.addProp)(node, newProp);
}
exports.default = default_1;
