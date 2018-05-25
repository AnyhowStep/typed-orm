"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expr_1 = require("../expr");
const sd = require("schema-decorator");
exports.NOW = new expr_1.Expr({}, sd.date(), "NOW()");
//# sourceMappingURL=now.js.map