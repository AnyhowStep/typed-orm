"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../query");
const expr_library_1 = require("../../../expr-library");
const table_1 = require("../../../table");
const column_identifier_ref_1 = require("../../../column-identifier-ref");
const column_ref_1 = require("../../../column-ref");
const primary_key_1 = require("../../../primary-key");
/*
    If the PK is (id) but you pass (id, otherField) and
    somehow get it to compile, the run-time will ignore
    otherField.
*/
function whereEqPk(query, table, key) {
    if (query._joins == undefined) {
        throw new Error(`Cannot use whereEqPk() before FROM clause`);
    }
    const primaryKeyAssertDelegate = (table instanceof table_1.Table) ?
        table.primaryKeyAssertDelegate() :
        primary_key_1.PrimaryKeyUtil.assertDelegate(table);
    key = primaryKeyAssertDelegate(`${table.alias} PK`, key);
    const ref = column_identifier_ref_1.ColumnIdentifierRefUtil.fromJoinArray(query._joins);
    const condition = table_1.TableUtil.eqPrimaryKey(table, key);
    column_ref_1.ColumnRefUtil.assertIsSubset(condition.usedRef, ref);
    const { _distinct, _sqlCalcFoundRows, _joins, _parentJoins, _selects, _grouped, _having, _orders, _limit, _unions, _unionOrders, _unionLimit, _mapDelegate, } = query;
    return new query_1.Query({
        _distinct,
        _sqlCalcFoundRows,
        _joins,
        _parentJoins,
        _selects,
        _where: (query._where == undefined ?
            condition :
            expr_library_1.and(query._where, condition)),
        _grouped,
        _having,
        _orders,
        _limit,
        _unions,
        _unionOrders,
        _unionLimit,
        _mapDelegate,
    });
}
exports.whereEqPk = whereEqPk;
//# sourceMappingURL=where-eq-pk.js.map