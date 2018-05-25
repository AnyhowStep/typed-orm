"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aliased_table_1 = require("./aliased-table");
const select_collection_1 = require("./select-collection");
const mysql = require("typed-mysql");
class SubqueryTable extends aliased_table_1.AliasedTable {
    constructor(alias, selectBuilder) {
        super(alias, alias, select_collection_1.SelectCollectionUtil.toColumnCollection(alias, selectBuilder.data.selects));
        this.selectBuilder = selectBuilder;
        if (selectBuilder.data.selects == undefined) {
            throw new Error(`SELECT clause expected`);
        }
        select_collection_1.SelectCollectionUtil.assertNoDuplicateColumnNames(selectBuilder.data.selects);
    }
    querify(sb) {
        sb.appendLine("(");
        sb.scope((sb) => {
            this.selectBuilder.querify(sb);
        });
        sb.append(") AS ");
        sb.appendLine(mysql.escapeId(this.alias));
    }
}
exports.SubqueryTable = SubqueryTable;
//# sourceMappingURL=subquery-table.js.map