"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const column_collection_1 = require("../column-collection");
const sd = require("schema-decorator");
var FetchRowUtil;
(function (FetchRowUtil) {
    function assertDelegate(joins, selectReferences) {
        const tableAliases = Object.keys(selectReferences);
        if (tableAliases.length == 1) {
            const tableAlias = tableAliases[0];
            if (tableAlias == "__expr") {
                return column_collection_1.ColumnCollectionUtil.assertDelegate(selectReferences[tableAlias], Object.keys(selectReferences[tableAlias]));
            }
            else {
                const join = joins.find((join) => {
                    return join.table.alias == tableAlias;
                });
                if (join == undefined) {
                    throw new Error(`Could not find JOIN with alias ${tableAlias}`);
                }
                return column_collection_1.ColumnCollectionUtil.assertDelegate(join.columns, Object.keys(selectReferences[tableAlias]));
            }
        }
        else {
            return sd.schema(...tableAliases.map((tableAlias) => {
                if (tableAlias == "__expr") {
                    return sd.field(tableAlias, column_collection_1.ColumnCollectionUtil.assertDelegate(selectReferences[tableAlias], Object.keys(selectReferences[tableAlias])));
                }
                const join = joins.find((join) => {
                    return join.table.alias == tableAlias;
                });
                if (join == undefined) {
                    throw new Error(`Could not find JOIN with alias ${tableAlias}`);
                }
                if (join.nullable) {
                    const allNullAssertDelegate = column_collection_1.ColumnCollectionUtil.allNullAssertDelegate(join.columns, Object.keys(selectReferences[tableAlias]));
                    return sd.field(tableAlias, sd.or(column_collection_1.ColumnCollectionUtil.assertDelegate(join.columns, Object.keys(selectReferences[tableAlias])), (name, mixed) => {
                        allNullAssertDelegate(name, mixed);
                        return undefined;
                    }));
                }
                else {
                    return sd.field(tableAlias, column_collection_1.ColumnCollectionUtil.assertDelegate(join.columns, Object.keys(selectReferences[tableAlias])));
                }
            }));
        }
    }
    FetchRowUtil.assertDelegate = assertDelegate;
})(FetchRowUtil = exports.FetchRowUtil || (exports.FetchRowUtil = {}));
//# sourceMappingURL=util.js.map