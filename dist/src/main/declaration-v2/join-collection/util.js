"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tuple_1 = require("../tuple");
const column_collection_1 = require("../column-collection");
const join_1 = require("../join");
const aliased_table_1 = require("../aliased-table");
const join_from_delegate_1 = require("../join-from-delegate");
const join_to_delegate_1 = require("../join-to-delegate");
const column_1 = require("../column");
const aliased_table_2 = require("../aliased-table");
column_1.Column;
aliased_table_2.AliasedTable;
var JoinCollectionUtil;
(function (JoinCollectionUtil) {
    function toTableCollection(joins) {
        return joins.reduce((memo, join) => {
            memo[join.table.alias] = join.table;
            return memo;
        }, {});
    }
    JoinCollectionUtil.toTableCollection = toTableCollection;
    //Types with implementation
    JoinCollectionUtil.push = tuple_1.tupleWPush();
    function toColumnReferences(joins) {
        return joins.reduce((memo, join) => {
            if (join.nullable) {
                memo[join.table.alias] = column_collection_1.ColumnCollectionUtil.toNullable(join.columns);
            }
            else {
                memo[join.table.alias] = join.columns;
            }
            return memo;
        }, {});
    }
    JoinCollectionUtil.toColumnReferences = toColumnReferences;
    function toConvenientColumnReferences(joins) {
        if (joins.length == 1) {
            return toColumnReferences(joins)[joins[0].table.alias];
        }
        else {
            return toColumnReferences(joins);
        }
    }
    JoinCollectionUtil.toConvenientColumnReferences = toConvenientColumnReferences;
    function toNullable(joins) {
        return joins.map(join_1.JoinUtil.toNullable);
    }
    JoinCollectionUtil.toNullable = toNullable;
    function assertNonDuplicateTableAlias(joins, tableAlias) {
        joins.forEach((join, index) => {
            if (join.table.alias == tableAlias) {
                throw new Error(`Alias ${tableAlias} was already used as join ${index}`);
            }
        });
    }
    JoinCollectionUtil.assertNonDuplicateTableAlias = assertNonDuplicateTableAlias;
    function assertHasColumn(joins, column) {
        const join = joins.find((join) => {
            if (join.table.alias != column.tableAlias) {
                return false;
            }
            return column_collection_1.ColumnCollectionUtil.hasColumn(join.columns, column);
        });
        if (join == null) {
            throw new Error(`Column ${column.tableAlias}.${column.name} does not exist in joins`);
        }
    }
    JoinCollectionUtil.assertHasColumn = assertHasColumn;
    function assertHasColumns(joins, arr) {
        for (let i of arr) {
            assertHasColumn(joins, i);
        }
    }
    JoinCollectionUtil.assertHasColumns = assertHasColumns;
    function checkedJoin(joins, toTable, resultDelegate) {
        assertNonDuplicateTableAlias(joins, toTable.alias);
        //TODO https://github.com/Microsoft/TypeScript/issues/24277
        return resultDelegate();
    }
    function checkedJoinUsing(joins, toTable, fromDelegate, resultDelegate) {
        const from = join_from_delegate_1.JoinFromDelegateUtil.execute(joins, fromDelegate);
        const to = join_to_delegate_1.JoinToDelegateUtil.createUsing(toTable, from);
        return checkedJoin(joins, toTable, () => {
            return resultDelegate(from, to);
        });
    }
    function innerJoin(joins, toTable, fromDelegate, toDelegate) {
        return checkedJoin(joins, toTable, () => {
            const from = join_from_delegate_1.JoinFromDelegateUtil.execute(joins, fromDelegate);
            const to = join_to_delegate_1.JoinToDelegateUtil.execute(toTable, from, toDelegate);
            return JoinCollectionUtil.push(joins, new join_1.Join(join_1.JoinType.INNER, toTable, toTable.columns, false, from, to));
        });
    }
    JoinCollectionUtil.innerJoin = innerJoin;
    function innerJoinUsing(joins, toTable, fromDelegate) {
        return checkedJoinUsing(joins, toTable, fromDelegate, (from, to) => {
            return JoinCollectionUtil.push(joins, new join_1.Join(join_1.JoinType.INNER, toTable, toTable.columns, false, from, to));
        });
    }
    JoinCollectionUtil.innerJoinUsing = innerJoinUsing;
    function rightJoin(joins, toTable, fromDelegate, toDelegate) {
        return checkedJoin(joins, toTable, () => {
            const from = join_from_delegate_1.JoinFromDelegateUtil.execute(joins, fromDelegate);
            const to = join_to_delegate_1.JoinToDelegateUtil.execute(toTable, from, toDelegate);
            return JoinCollectionUtil.push(JoinCollectionUtil.toNullable(joins), new join_1.Join(join_1.JoinType.RIGHT, toTable, toTable.columns, false, from, to));
        });
    }
    JoinCollectionUtil.rightJoin = rightJoin;
    function rightJoinUsing(joins, toTable, fromDelegate) {
        return checkedJoinUsing(joins, toTable, fromDelegate, (from, to) => {
            return JoinCollectionUtil.push(JoinCollectionUtil.toNullable(joins), new join_1.Join(join_1.JoinType.RIGHT, toTable, toTable.columns, false, from, to));
        });
    }
    JoinCollectionUtil.rightJoinUsing = rightJoinUsing;
    function leftJoin(joins, toTable, fromDelegate, toDelegate) {
        return checkedJoin(joins, toTable, () => {
            const from = join_from_delegate_1.JoinFromDelegateUtil.execute(joins, fromDelegate);
            const to = join_to_delegate_1.JoinToDelegateUtil.execute(toTable, from, toDelegate);
            return JoinCollectionUtil.push(joins, new join_1.Join(join_1.JoinType.LEFT, toTable, toTable.columns, true, from, to));
        });
    }
    JoinCollectionUtil.leftJoin = leftJoin;
    function leftJoinUsing(joins, toTable, fromDelegate) {
        return checkedJoinUsing(joins, toTable, fromDelegate, (from, to) => {
            return JoinCollectionUtil.push(joins, new join_1.Join(join_1.JoinType.LEFT, toTable, toTable.columns, true, from, to));
        });
    }
    JoinCollectionUtil.leftJoinUsing = leftJoinUsing;
    function isReplaceableBy(joins, tableA, tableB) {
        const join = joins.find(join => join.table == tableA);
        if (join == undefined) {
            return false;
        }
        if (!aliased_table_1.AliasedTableUtil.isReplaceableBy(tableA, tableB)) {
            return false;
        }
        if (!column_collection_1.ColumnCollectionUtil.isReplaceableBy(join.columns, tableB.columns)) {
            return false;
        }
        return true;
    }
    JoinCollectionUtil.isReplaceableBy = isReplaceableBy;
    ;
    function replaceTable(joins, tableA, tableB) {
        assertNonDuplicateTableAlias(joins, tableB.alias);
        if (!aliased_table_1.AliasedTableUtil.isReplaceableBy(tableA, tableB)) {
            throw new Error(`Cannot replace ${tableA.alias} with ${tableB.alias}`);
        }
        return joins.map((join) => {
            if (join.table == tableA) {
                const aliasedB = aliased_table_1.AliasedTableUtil.as(tableB, tableA.alias);
                return new join_1.Join(join.joinType, aliasedB, column_collection_1.ColumnCollectionUtil.andType(aliasedB.columns, join.columns), join.nullable, 
                //With this, we are potentially comparing
                //columns of different data types...
                //TODO Fix? Might be undesirable?
                join.from, join.to);
            }
            else {
                return join;
            }
        });
    }
    JoinCollectionUtil.replaceTable = replaceTable;
    function replaceColumnType(joins, tableAlias, columnName, newAssertDelegate) {
        return joins.map((join) => {
            return join_1.JoinUtil.replaceColumnType(join, tableAlias, columnName, newAssertDelegate);
        });
    }
    JoinCollectionUtil.replaceColumnType = replaceColumnType;
    ;
})(JoinCollectionUtil = exports.JoinCollectionUtil || (exports.JoinCollectionUtil = {}));
//# sourceMappingURL=util.js.map