"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const select_as_1 = require("./select-as");
//import {toColumnCollection} from "./column-collection";
const typed_mysql_1 = require("typed-mysql");
class SubSelectJoinTable {
    constructor(alias, selectBuilder) {
        const columnReferences = selectBuilder.data.columnReferences;
        const selectTuple = selectBuilder.data.selectTuple;
        if (!select_as_1.isJoinableSelectTuple(columnReferences, selectTuple)) {
            throw new Error(`Invalid select tuple`);
        }
        if (select_as_1.joinableSelectTupleHasDuplicateColumnName(selectTuple)) {
            throw new Error(`selectTuple has duplicate names`);
        }
        this.alias = alias;
        this.name = alias;
        this.columns = select_as_1.joinableSelectTupleToColumnCollection(this.alias, selectTuple);
        /*this.columns = toColumnCollection(
            this.alias,
            joinableSelectTupleToRawColumnCollection(selectTuple) as any
        ) as any;*/
        this.selectBuilder = selectBuilder;
    }
    querify(sb) {
        sb.appendLine("(");
        sb.scope((sb) => {
            this.selectBuilder.querify(sb);
        });
        sb.append(") AS ");
        sb.appendLine(typed_mysql_1.Database.EscapeId(this.alias));
    }
}
exports.SubSelectJoinTable = SubSelectJoinTable;
//# sourceMappingURL=sub-select-join-table.js.map