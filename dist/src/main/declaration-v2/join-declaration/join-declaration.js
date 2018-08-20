"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aliased_table_1 = require("../aliased-table");
const join_to_delegate_1 = require("../join-to-delegate");
const join_1 = require("../join");
class JoinDeclaration {
    constructor(fromTable, toTable, fromColumns, toColumns, defaultJoinType) {
        this.fromTable = fromTable;
        this.toTable = toTable;
        this.fromColumns = fromColumns;
        this.toColumns = toColumns;
        this.defaultJoinType = defaultJoinType;
        aliased_table_1.AliasedTableUtil.assertHasColumns(fromTable, fromColumns);
        aliased_table_1.AliasedTableUtil.assertHasColumns(toTable, toColumns);
        if (toColumns.length != fromColumns.length) {
            throw new Error(`Expected JOIN to columns of length ${fromColumns.length}; received ${toColumns.length}`);
        }
    }
    setDefaultJoinType(newDefaultJoinType) {
        return new JoinDeclaration(this.fromTable, this.toTable, this.fromColumns, this.toColumns, newDefaultJoinType);
    }
    reverse() {
        return new JoinDeclaration(this.toTable, this.fromTable, this.toColumns, this.fromColumns, this.defaultJoinType);
    }
}
exports.JoinDeclaration = JoinDeclaration;
function joinFrom(fromTable, fromDelegate) {
    const fromColumns = fromDelegate(fromTable.columns);
    aliased_table_1.AliasedTableUtil.assertHasColumns(fromTable, fromColumns);
    return {
        to: (toTable, toDelegate) => {
            const toColumns = join_to_delegate_1.JoinToDelegateUtil.execute(toTable, fromColumns, toDelegate);
            return new JoinDeclaration(fromTable, toTable, fromColumns, toColumns, join_1.JoinType.INNER);
        }
    };
}
exports.joinFrom = joinFrom;
function joinUsing(fromTable, toTable, fromDelegate) {
    const fromColumns = fromDelegate(fromTable.columns);
    aliased_table_1.AliasedTableUtil.assertHasColumns(fromTable, fromColumns);
    const toColumns = join_to_delegate_1.JoinToDelegateUtil.createUsing(toTable, fromColumns);
    aliased_table_1.AliasedTableUtil.assertHasColumns(toTable, toColumns);
    return new JoinDeclaration(fromTable, toTable, fromColumns, toColumns, join_1.JoinType.INNER);
}
exports.joinUsing = joinUsing;
function leftJoinUsing(fromTable, toTable, fromDelegate) {
    const fromColumns = fromDelegate(fromTable.columns);
    aliased_table_1.AliasedTableUtil.assertHasColumns(fromTable, fromColumns);
    const toColumns = join_to_delegate_1.JoinToDelegateUtil.createUsing(toTable, fromColumns);
    aliased_table_1.AliasedTableUtil.assertHasColumns(toTable, toColumns);
    return new JoinDeclaration(fromTable, toTable, fromColumns, toColumns, join_1.JoinType.LEFT);
}
exports.leftJoinUsing = leftJoinUsing;
//# sourceMappingURL=join-declaration.js.map