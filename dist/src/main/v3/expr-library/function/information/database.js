"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const expr_1 = require("../../../expr");
const query_tree_1 = require("../../../query-tree");
//https://dev.mysql.com/doc/refman/8.0/en/information-functions.html#function_database
function database() {
    return new expr_1.Expr({
        usedColumns: [],
        assertDelegate: sd.nullable(sd.string()),
    }, new query_tree_1.FunctionCall("DATABASE", []));
}
exports.database = database;
//# sourceMappingURL=database.js.map