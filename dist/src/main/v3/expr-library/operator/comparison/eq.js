"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const comparison_1 = require("./comparison");
//Interestingly enough, if I remove the `Comparison` explicit type annotation,
//TS takes *much* longer to compile.
//https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#operator_equal
exports.eq = comparison_1.comparison("=");
//# sourceMappingURL=eq.js.map