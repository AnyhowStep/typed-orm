"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const column_references_1 = require("../column-references");
const select_delegate_1 = require("../select-delegate");
const select_1 = require("../select");
const column_1 = require("../column");
const tuple_1 = require("../tuple");
const aliased_expr_1 = require("../aliased-expr");
var SelectCollectionUtil;
(function (SelectCollectionUtil) {
    function assertHasCompatibleTypes(actual, expected) {
        if (actual.length != expected.length) {
            throw new Error(`Expected ${expected.length} selects; received ${actual.length}`);
        }
        for (let i = 0; i < actual.length; ++i) {
            select_1.SelectUtil.assertHasCompatibleTypes(actual[i], expected[i]);
        }
    }
    SelectCollectionUtil.assertHasCompatibleTypes = assertHasCompatibleTypes;
    function assertNonDuplicateColumn(selects) {
        const columns = selects.reduce((memo, element) => {
            if (element instanceof aliased_expr_1.AliasedExpr) {
                memo.push([element.tableAlias, element.alias]);
            }
            else if (element instanceof column_1.Column) {
                memo.push([element.tableAlias, element.name]);
            }
            else if (element instanceof Object) {
                for (let name in element) {
                    if (element.hasOwnProperty(name)) {
                        const sub = element[name];
                        memo.push([sub.tableAlias, sub.name]);
                    }
                }
            }
            else {
                throw new Error(`Unknown select; (${typeof element})${element}`);
            }
            return memo;
        }, []);
        //TODO Not use nested for-loop?
        for (let i = 0; i < columns.length; ++i) {
            for (let j = i + 1; j < columns.length; ++j) {
                if (columns[i][0] == columns[j][0] &&
                    columns[i][1] == columns[j][1]) {
                    throw new Error(`Duplicate column ${columns[i][0]}.${columns[i][1]}; consider aliasing`);
                }
            }
        }
    }
    SelectCollectionUtil.assertNonDuplicateColumn = assertNonDuplicateColumn;
    ;
    SelectCollectionUtil.concat = tuple_1.tupleWConcat();
    function appendSelect(selects, selectBuilder, selectDelegate) {
        if (selects == undefined) {
            const result = select_delegate_1.SelectDelegateUtil.execute(selectBuilder, selectDelegate);
            assertNonDuplicateColumn(result);
            return result;
        }
        else {
            const result = SelectCollectionUtil.concat(
            //This shouldn't be undefined anymore...
            //Yet another TS bug?
            selects, select_delegate_1.SelectDelegateUtil.execute(selectBuilder, selectDelegate));
            assertNonDuplicateColumn(result);
            return result;
        }
    }
    SelectCollectionUtil.appendSelect = appendSelect;
    function fromJoinCollection(joins) {
        return joins.map(select_1.SelectUtil.fromJoin);
    }
    SelectCollectionUtil.fromJoinCollection = fromJoinCollection;
    function toColumnReferences(selects) {
        if (selects == undefined) {
            return {};
        }
        let result = {};
        for (let s of selects) {
            result = column_references_1.ColumnReferencesUtil.merge(result, select_1.SelectUtil.toColumnReferences(s));
        }
        return result;
    }
    SelectCollectionUtil.toColumnReferences = toColumnReferences;
    function replaceSelectType(selects, tableAlias, columnName, newAssertDelegate) {
        if (selects == undefined) {
            return undefined;
        }
        else {
            return selects.map((select) => {
                return select_1.SelectUtil.replaceType(select, tableAlias, columnName, newAssertDelegate);
            });
        }
    }
    SelectCollectionUtil.replaceSelectType = replaceSelectType;
    ;
    function toColumnNames(selects) {
        const result = [];
        for (let select of selects) {
            result.push(...select_1.SelectUtil.toColumnNames(select));
        }
        return result;
    }
    SelectCollectionUtil.toColumnNames = toColumnNames;
    function assertNoDuplicateColumnNames(selects) {
        const names = toColumnNames(selects);
        for (let i = 0; i < names.length; ++i) {
            for (let n = i + 1; n < names.length; ++n) {
                if (names[i] == names[n]) {
                    throw new Error(`Found duplicate column name ${names[i]} in SELECT`);
                }
            }
        }
    }
    SelectCollectionUtil.assertNoDuplicateColumnNames = assertNoDuplicateColumnNames;
    function toColumnCollection(tableAlias, selects) {
        return selects.reduce((memo, element) => {
            if (element instanceof aliased_expr_1.AliasedExpr) {
                memo[element.alias] = new column_1.Column(tableAlias, element.alias, element.assertDelegate, element.tableAlias);
            }
            else if (element instanceof column_1.Column) {
                memo[element.name] = new column_1.Column(tableAlias, element.name, element.assertDelegate, element.tableAlias, element.isSelectReference);
            }
            else if (element instanceof Object) {
                Object.keys(element).reduce((memo, columnName) => {
                    const column = element[columnName];
                    memo[column.name] = new column_1.Column(tableAlias, column.name, column.assertDelegate, column.tableAlias, column.isSelectReference);
                    return memo;
                }, memo);
            }
            else {
                throw new Error(`Unknown SELECT, (${typeof element})${element}`);
            }
            return memo;
        }, {});
    }
    SelectCollectionUtil.toColumnCollection = toColumnCollection;
})(SelectCollectionUtil = exports.SelectCollectionUtil || (exports.SelectCollectionUtil = {}));
//# sourceMappingURL=util.js.map