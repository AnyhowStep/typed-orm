"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const column_1 = require("./column");
const expr_1 = require("./expr");
const column_references_operation_1 = require("./column-references-operation");
const table_operation_1 = require("./table-operation");
function replaceColumnOfSelectTuple(tuple, newColumn) {
    return tuple.map((element) => {
        if (element instanceof expr_1.ColumnExpr) {
            if (element.table == newColumn.table && element.name == newColumn.name) {
                return new expr_1.ColumnExpr(element.usedReferences, element.table, element.name, newColumn.assertDelegate, 
                //TODO Test if this is correct
                element.originalQuery);
            }
            else {
                return element;
            }
        }
        else if (element instanceof column_1.Column) {
            if (element.table == newColumn.table && element.name == newColumn.name) {
                return newColumn;
            }
            else {
                return element;
            }
        }
        else if (element instanceof Object) {
            let tmp = {
                [newColumn.table]: element
            };
            tmp = column_references_operation_1.replaceColumnOfReference(tmp, newColumn);
            return tmp[newColumn.table];
        }
        else {
            throw new Error(`Unknown select tuple element; (${typeof element})${element}`);
        }
    });
}
exports.replaceColumnOfSelectTuple = replaceColumnOfSelectTuple;
function selectTupleHasDuplicateColumn(tuple) {
    const columns = tuple.reduce((memo, element) => {
        if (element instanceof expr_1.ColumnExpr) {
            memo.push([element.table, element.name]);
        }
        else if (element instanceof column_1.Column) {
            memo.push([element.table, element.name]);
        }
        else if (element instanceof Object) {
            for (let name in element) {
                if (element.hasOwnProperty(name)) {
                    const sub = element[name];
                    memo.push([sub.table, sub.name]);
                }
            }
        }
        else {
            throw new Error(`Unknown select tuple element; (${typeof element})${element}`);
        }
        return memo;
    }, []);
    //TODO Not use nested for-loop?
    for (let i = 0; i < columns.length; ++i) {
        for (let j = i + 1; j < columns.length; ++j) {
            if (columns[i][0] == columns[j][0] &&
                columns[i][1] == columns[j][1]) {
                return true;
            }
        }
    }
    return false;
}
exports.selectTupleHasDuplicateColumn = selectTupleHasDuplicateColumn;
function selectTupleToReferences(tuple) {
    return tuple.reduce((memo, element) => {
        if (element instanceof expr_1.ColumnExpr) {
            if (memo[element.table] == undefined) {
                memo[element.table] = {};
            }
            //TODO Check if this works, kind of dubious
            memo[element.table][element.name] = new column_1.Column(element.table, element.name, element.assertDelegate, undefined, true);
        }
        else if (element instanceof column_1.Column) {
            if (memo[element.table] == undefined) {
                memo[element.table] = {};
            }
            //memo[element.table][element.name] = element;
            memo[element.table][element.name] = new column_1.Column(element.table, element.name, element.assertDelegate, undefined, true);
        }
        else if (element instanceof Object) {
            for (let name in element) {
                if (element.hasOwnProperty(name)) {
                    const sub = element[name];
                    if (memo[sub.table] == undefined) {
                        memo[sub.table] = {};
                    }
                    //memo[sub.table][sub.name] = sub;
                    memo[sub.table][sub.name] = new column_1.Column(sub.table, sub.name, sub.assertDelegate, undefined, true);
                }
            }
        }
        else {
            throw new Error(`Unknown select tuple element; (${typeof element})${element}`);
        }
        return memo;
    }, {});
}
exports.selectTupleToReferences = selectTupleToReferences;
function selectAllReference(columnReferences) {
    const result = column_references_operation_1.copyReferences(columnReferences);
    for (let table in result) {
        for (let name in result[table]) {
            const element = result[table][name];
            result[table][name] = new column_1.Column(element.table, element.name, element.assertDelegate, undefined, true);
        }
    }
    return result;
}
exports.selectAllReference = selectAllReference;
function joinTupleToSelectTuple(joinTuple) {
    const result = [];
    for (let join of joinTuple) {
        result.push(table_operation_1.tableToReference(join.table)[join.table.alias]);
    }
    return result;
}
exports.joinTupleToSelectTuple = joinTupleToSelectTuple;
//# sourceMappingURL=select.js.map