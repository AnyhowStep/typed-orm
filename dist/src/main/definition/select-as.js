"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expr_1 = require("./expr");
const column_1 = require("./column");
const column_references_operation_1 = require("./column-references-operation");
function isJoinableSelectTupleElement(columnReferences, mixed) {
    if (mixed instanceof expr_1.ColumnExpr) {
        return column_references_operation_1.isPartialColumnReferences(columnReferences, mixed.usedReferences);
    }
    if (mixed instanceof column_1.Column) {
        if (columnReferences[mixed.table] == undefined) {
            return false;
        }
        if (columnReferences[mixed.table][mixed.name] == undefined) {
            return false;
        }
        return true;
    }
    return false;
}
exports.isJoinableSelectTupleElement = isJoinableSelectTupleElement;
function isJoinableSelectTuple(columnReferences, mixed) {
    if (!(mixed instanceof Array)) {
        return false;
    }
    for (let element of mixed) {
        if (!isJoinableSelectTupleElement(columnReferences, element)) {
            return false;
        }
    }
    return true;
}
exports.isJoinableSelectTuple = isJoinableSelectTuple;
function joinableSelectTupleElementToColumnName(element) {
    if (element instanceof expr_1.ColumnExpr) {
        return element.name;
    }
    else if (element instanceof column_1.Column) {
        return element.name;
    }
    else {
        throw new Error(`Unknown joinable select tuple element, (${typeof element})${element}`);
    }
}
exports.joinableSelectTupleElementToColumnName = joinableSelectTupleElementToColumnName;
function joinableSelectTupleHasDuplicateColumnName(tuple) {
    const names = tuple.map(joinableSelectTupleElementToColumnName);
    //TODO Not use nested for-loop?
    for (let i = 0; i < names.length; ++i) {
        for (let j = i + 1; j < names.length; ++j) {
            if (names[i] == names[j]) {
                return true;
            }
        }
    }
    return false;
}
exports.joinableSelectTupleHasDuplicateColumnName = joinableSelectTupleHasDuplicateColumnName;
function joinableSelectTupleToRawColumnCollection(tuple) {
    return tuple.reduce((memo, element) => {
        if (element instanceof expr_1.ColumnExpr) {
            memo[element.name] = element.assertDelegate;
        }
        else if (element instanceof column_1.Column) {
            memo[element.name] = element.assertDelegate;
        }
        else {
            throw new Error(`Unknown joinable select tuple element, (${typeof element})${element}`);
        }
        return memo;
    }, {});
}
exports.joinableSelectTupleToRawColumnCollection = joinableSelectTupleToRawColumnCollection;
function joinableSelectTupleToColumnCollection(alias, tuple) {
    return tuple.reduce((memo, element) => {
        if (element instanceof expr_1.ColumnExpr) {
            memo[element.name] = new column_1.Column(alias, element.name, element.assertDelegate, element.table);
        }
        else if (element instanceof column_1.Column) {
            memo[element.name] = new column_1.Column(alias, element.name, element.assertDelegate, element.table);
        }
        else {
            throw new Error(`Unknown joinable select tuple element, (${typeof element})${element}`);
        }
        return memo;
    }, {});
}
exports.joinableSelectTupleToColumnCollection = joinableSelectTupleToColumnCollection;
//# sourceMappingURL=select-as.js.map