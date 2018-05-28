"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import {ColumnReferences, ColumnReferencesUtil} from "../column-references";
const aliased_expr_1 = require("../aliased-expr");
const column_collection_1 = require("../column-collection");
const column_1 = require("../column");
var SelectUtil;
(function (SelectUtil) {
    function hasOneType(select) {
        if (select instanceof aliased_expr_1.AliasedExpr) {
            return true;
        }
        else if (select instanceof column_1.Column) {
            return true;
        }
        else {
            return column_collection_1.ColumnCollectionUtil.hasOneType(select);
        }
    }
    SelectUtil.hasOneType = hasOneType;
    //We can't perform type compatibility checks during run-time.
    function assertHasCompatibleTypes(actual, expected) {
        if (hasOneType(actual)) {
            if (!hasOneType(expected)) {
                throw new Error(`Expected multi-type; received single-type`);
            }
        }
        else {
            if (hasOneType(expected)) {
                throw new Error(`Expected single-type; received multi-type`);
            }
            else {
                const actualKeys = Object.keys(actual).sort();
                const expectedKeys = Object.keys(expected).sort();
                if (actualKeys.length != expectedKeys.length) {
                    throw new Error(`Expected ${expectedKeys.length}; received ${actualKeys.length}`);
                }
                for (let i = 0; i < actualKeys.length; ++i) {
                    if (actualKeys[i] != expectedKeys[i]) {
                        throw new Error(`Expected key ${expectedKeys[i]}; received ${actualKeys[i]}`);
                    }
                }
            }
        }
    }
    SelectUtil.assertHasCompatibleTypes = assertHasCompatibleTypes;
    function fromJoin(join) {
        if (join.nullable) {
            return column_collection_1.ColumnCollectionUtil.toNullable(join.columns);
        }
        else {
            return join.columns;
        }
    }
    SelectUtil.fromJoin = fromJoin;
    function toColumnReferences(select) {
        if (select instanceof aliased_expr_1.AliasedExpr) {
            return {
                [select.tableAlias]: {
                    [select.alias]: new column_1.Column(select.tableAlias, select.alias, select.assertDelegate, undefined, true)
                }
            };
        }
        else if (select instanceof column_1.Column) {
            return {
                [select.tableAlias]: {
                    [select.name]: new column_1.Column(select.tableAlias, select.name, select.assertDelegate, undefined, true)
                }
            };
        }
        else if (select instanceof Object) {
            return column_collection_1.ColumnCollectionUtil.toColumnReferences(select);
        }
        else {
            throw new Error(`Unknown select; ${typeof select}`);
        }
    }
    SelectUtil.toColumnReferences = toColumnReferences;
    function replaceType(select, tableAlias, columnName, newAssertDelegate) {
        if (select instanceof aliased_expr_1.AliasedExpr) {
            if (select.tableAlias == tableAlias && select.alias == columnName) {
                return aliased_expr_1.AliasedExprUtil.withType(select, newAssertDelegate);
            }
            else {
                return select;
            }
        }
        else if (select instanceof column_1.Column) {
            if (select.tableAlias == tableAlias && select.name == columnName) {
                return column_1.ColumnUtil.withType(select, newAssertDelegate);
            }
            else {
                return select;
            }
        }
        else if (select instanceof Object) {
            return column_collection_1.ColumnCollectionUtil.replaceColumnType(
            //We're taking a risk, here...
            //It could be any kind of object type
            //A better way would be to have a ColumnCollection validation method
            //TODO, such a method
            select, tableAlias, columnName, newAssertDelegate);
        }
        else {
            throw new Error(`Unknown select; ${typeof select}`);
        }
    }
    SelectUtil.replaceType = replaceType;
    function toColumnNames(select) {
        if (select instanceof aliased_expr_1.AliasedExpr) {
            return [select.alias];
        }
        else if (select instanceof column_1.Column) {
            return [select.name];
        }
        else if (select instanceof Object) {
            const keys = Object.keys(select);
            if (keys.length == 0) {
                //TODO add this check in appendSelect()
                throw new Error(`Empty select found`);
            }
            return keys;
        }
        else {
            throw new Error(`Unknown select; ${typeof select}`);
        }
    }
    SelectUtil.toColumnNames = toColumnNames;
})(SelectUtil = exports.SelectUtil || (exports.SelectUtil = {}));
//# sourceMappingURL=util.js.map