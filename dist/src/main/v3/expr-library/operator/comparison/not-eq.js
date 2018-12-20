"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const comparison_1 = require("./comparison");
//https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#operator_not-equal
//ANSI standard to use <>
//The other, !=, works, too
exports.notEq = comparison_1.comparison("<>");
//# sourceMappingURL=not-eq.js.map