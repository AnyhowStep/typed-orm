"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const column_ref_1 = require("../../../column-ref");
const raw_expr_1 = require("../../../raw-expr");
const table_1 = require("../../../table");
const update_1 = require("../../update");
function mutableColumnIdentifiers(query) {
    const result = [];
    for (let join of query._joins) {
        const table = join.aliasedTable;
        if (table_1.TableUtil.isTable(table)) {
            for (let columnName of table.mutable) {
                result.push({
                    tableAlias: table.alias,
                    name: columnName,
                });
            }
        }
    }
    return result;
}
exports.mutableColumnIdentifiers = mutableColumnIdentifiers;
function toAssignments(ref) {
    const result = [];
    for (let tableAlias in ref) {
        const map = ref[tableAlias];
        if (map == undefined) {
            continue;
        }
        for (let columnName in map) {
            const rawExpr = map[columnName];
            //`null` is a valid rawExpr
            if (rawExpr === undefined) {
                continue;
            }
            result.push({
                tableAlias,
                columnName,
                value: rawExpr,
            });
        }
    }
    return result;
}
exports.toAssignments = toAssignments;
function update(query, modifier, delegate) {
    const ref = column_ref_1.ColumnRefUtil.fromJoinArray(query._joins);
    const assignmentRef = delegate(column_ref_1.ColumnRefUtil.toConvenient(ref));
    const mutableIdentifiers = mutableColumnIdentifiers(query);
    //usedRefs must be valid,
    //columns in assignment must be mutable
    for (let tableAlias in assignmentRef) {
        const assignmentMap = assignmentRef[tableAlias];
        if (assignmentMap == undefined) {
            continue;
        }
        for (let columnName in assignmentMap) {
            const isMutable = mutableIdentifiers.findIndex(i => (i.tableAlias == tableAlias &&
                i.name == columnName)) >= 0;
            if (!isMutable) {
                throw new Error(`${tableAlias}.${columnName} is not mutable`);
            }
            const rawExpr = assignmentMap[columnName];
            //`null` is a valid RawExpr
            if (rawExpr === undefined) {
                continue;
            }
            const usedRef = raw_expr_1.RawExprUtil.usedRef(rawExpr);
            column_ref_1.ColumnRefUtil.assertIsSubset(usedRef, ref);
        }
    }
    return new update_1.Update({
        _query: query,
        _assignments: toAssignments(assignmentRef),
        _modifier: modifier,
    });
}
exports.update = update;
/*TODO Move to compile-time tests
import * as o from "../../../index";
import { ColumnIdentifierRefUtil } from "../../../column-identifier-ref";
import { ColumnIdentifierUtil } from "../../../column-identifier";

const table = o.table(
    "table",
    { x : o.bigint(), y : o.boolean() }
).setAutoIncrement(c => c.x);
const table2 = o.table("table2", { x : o.bigint(), y : o.boolean() });
const q = o.from(table);
declare const m : ToMutableColumnIdentifier<typeof q>;
const u = update(
    q,
    c => {
        return {
            table : {
                x : c.x,//table2.columns.x,
                y : true,
                z : c.x,
            },
            doesNotExist : {
                t : true
            }
        }
    }
)
*/ 
//# sourceMappingURL=update.js.map