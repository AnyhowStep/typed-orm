"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("type-mapping");
const query_1 = require("../../query");
const column_ref_1 = require("../../../column-ref");
const column_map_1 = require("../../../column-map");
const expr_select_item_1 = require("../../../expr-select-item");
const column_1 = require("../../../column");
const column_identifier_1 = require("../../../column-identifier");
const column_identifier_ref_1 = require("../../../column-identifier-ref");
const order_1 = require("../../../order");
function eraseSelectsUsedRef(arr) {
    return arr.map(selectItem => {
        if (expr_select_item_1.ExprSelectItemUtil.isExprSelectItem(selectItem)) {
            const result = {
                assertDelegate: selectItem.assertDelegate,
                tableAlias: selectItem.tableAlias,
                alias: selectItem.alias,
                usedRef: {},
                unaliasedQuery: selectItem.unaliasedQuery,
                asc: () => [
                    {
                        usedRef: {},
                        assertDelegate: selectItem.assertDelegate,
                        queryTree: selectItem.unaliasedQuery
                    },
                    order_1.ASC
                ],
                desc: () => [
                    {
                        usedRef: {},
                        assertDelegate: selectItem.assertDelegate,
                        queryTree: selectItem.unaliasedQuery
                    },
                    order_1.DESC
                ],
                sort: (sortDirection) => [
                    {
                        usedRef: {},
                        assertDelegate: selectItem.assertDelegate,
                        queryTree: selectItem.unaliasedQuery
                    },
                    sortDirection
                ],
            };
            return result;
        }
        else {
            return selectItem;
        }
    });
}
exports.eraseSelectsUsedRef = eraseSelectsUsedRef;
;
function select(query, delegate) {
    if (query._unions != undefined) {
        throw new Error(`Cannot use SELECT after UNION clause`);
    }
    const queryRef = column_ref_1.ColumnRefUtil.fromQueryJoins(query);
    const selects = delegate(column_ref_1.ColumnRefUtil.toConvenient(queryRef), query);
    for (let selectItem of selects) {
        if (expr_select_item_1.ExprSelectItemUtil.isExprSelectItem(selectItem)) {
            //+ If SelectItem is IExprSelectItem,
            //  the usedRef must be a subset of the queryRef
            column_ref_1.ColumnRefUtil.assertIsSubset(selectItem.usedRef, queryRef);
            //ExprSelectItem *must not* shadow columns in FROM/JOIN clause
            if (column_identifier_ref_1.ColumnIdentifierRefUtil.hasColumnIdentifier(queryRef, column_identifier_1.ColumnIdentifierUtil.fromExprSelectItem(selectItem))) {
                throw new Error(`IExprSelectItem ${selectItem.tableAlias}.${selectItem.alias} cannot hide columns in FROM/JOIN clause`);
            }
        }
        else if (column_1.ColumnUtil.isColumn(selectItem)) {
            //+ Selected columns must exist
            const columnMap = queryRef[selectItem.tableAlias];
            if (columnMap == undefined) {
                throw new Error(`Invalid column in SELECT clause; no such table alias ${selectItem.tableAlias}`);
            }
            const column = columnMap[selectItem.name];
            if (!column_1.ColumnUtil.isColumn(column)) {
                throw new Error(`Invalid column in SELECT clause; cannot select ${selectItem.tableAlias}.${selectItem.name}`);
            }
            if (sd.canOutputNull(column.assertDelegate) != sd.canOutputNull(selectItem.assertDelegate)) {
                throw new Error(`Invalid column in SELECT clause; cannot select ${selectItem.tableAlias}.${selectItem.name}; the column identifier exists but the data types are different. One is nullable, the other is not.`);
            }
        }
        else if (column_map_1.ColumnMapUtil.isColumnMap(selectItem)) {
            //+ columnMaps must exist
            let hasColumnMap = false;
            for (let tableAlias in queryRef) {
                const columnMap = queryRef[tableAlias];
                if (columnMap === selectItem) {
                    hasColumnMap = true;
                    break;
                }
            }
            if (!hasColumnMap) {
                throw new Error(`Invalid column map in SELECT clause`);
            }
        }
        else if (column_ref_1.ColumnRefUtil.isColumnRef(selectItem)) {
            //+ columnRefs must exist
            for (let tableAlias in selectItem) {
                const selectItemMap = selectItem[tableAlias];
                const queryMap = queryRef[tableAlias];
                if (selectItemMap !== queryMap) {
                    throw new Error(`Invalid column ref in SELECT clause`);
                }
            }
        }
        else {
            throw new Error(`Unknown select item`);
        }
    }
    const selectColumnIdentifiers = column_identifier_1.ColumnIdentifierUtil.Array
        .fromSelectItemArray(selects);
    //+ Duplicates not allowed with new selects
    column_identifier_1.ColumnIdentifierUtil.Array.assertNoDuplicate(selectColumnIdentifiers);
    if (query._selects != undefined) {
        //+ Duplicates not allowed with existing selects
        const querySelectColumnIdentifiers = column_identifier_1.ColumnIdentifierUtil.Array
            .fromSelectItemArray(query._selects);
        column_identifier_1.ColumnIdentifierUtil.Array.assertDisjoint(selectColumnIdentifiers, querySelectColumnIdentifiers);
    }
    const newSelects = ((query._selects == undefined) ?
        eraseSelectsUsedRef(selects) :
        [...query._selects, ...eraseSelectsUsedRef(selects)]);
    const { _distinct, _sqlCalcFoundRows, _joins, _parentJoins, _where, _grouped, _having, _orders, _limit, _unions, _unionOrders, _unionLimit, _mapDelegate, } = query;
    return new query_1.Query({
        _distinct,
        _sqlCalcFoundRows,
        _joins,
        _parentJoins,
        _selects: newSelects,
        _where,
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
exports.select = select;
//# sourceMappingURL=select.js.map