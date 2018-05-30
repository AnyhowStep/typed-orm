"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const column_collection_1 = require("../column-collection");
const column_1 = require("../column");
var TableDataUtil;
(function (TableDataUtil) {
    function autoIncrement(data, columnCollection, delegate) {
        //Technically, columns shouldn't have any non-`number` types
        //but I can't check for that during run-time
        const column = delegate(columnCollection);
        column_collection_1.ColumnCollectionUtil.assertHasColumn(columnCollection, column);
        const isMutable = Object.assign({}, data.isMutable);
        delete isMutable[column.name];
        const uniqueKeys = (data.uniqueKeys == undefined) ?
            [] :
            data.uniqueKeys;
        return Object.assign({}, data, { autoIncrement: column, isGenerated: Object.assign({}, data.isGenerated, { [column.name]: true }), hasDefaultValue: Object.assign({}, data.hasDefaultValue, { [column.name]: true }), isMutable: isMutable, id: column, uniqueKeys: uniqueKeys.concat({
                [column.name]: true
            }) });
    }
    TableDataUtil.autoIncrement = autoIncrement;
    function unsetAutoIncrement(data) {
        if (data.autoIncrement == undefined) {
            return data;
        }
        const autoIncrement = data.autoIncrement;
        const isGenerated = Object.assign({}, data.isGenerated);
        const hasDefaultValue = Object.assign({}, data.hasDefaultValue);
        delete isGenerated[autoIncrement.name];
        delete hasDefaultValue[autoIncrement.name];
        return Object.assign({}, data, { isGenerated: isGenerated, hasDefaultValue: hasDefaultValue });
    }
    TableDataUtil.unsetAutoIncrement = unsetAutoIncrement;
    function isGenerated(data, columnCollection, delegate) {
        let columns = columnCollection;
        if (data.autoIncrement != undefined) {
            columns = Object.assign({}, columns);
            delete columns[data.autoIncrement.name];
        }
        const columnTuple = delegate(columns);
        column_collection_1.ColumnCollectionUtil.assertHasColumns(columns, columnTuple);
        const isGenerated = Object.assign({}, data.isGenerated);
        const hasDefaultValue = Object.assign({}, data.hasDefaultValue);
        const isMutable = Object.assign({}, data.isMutable);
        for (let column of columnTuple) {
            isGenerated[column.name] = true;
            hasDefaultValue[column.name] = true;
            delete isMutable[column.name];
        }
        return Object.assign({}, data, { isGenerated: isGenerated, hasDefaultValue: hasDefaultValue, isMutable: isMutable });
    }
    TableDataUtil.isGenerated = isGenerated;
    function hasDefaultValue(data, columnCollection, delegate) {
        const columns = Object.assign({}, columnCollection);
        for (let k of Object.keys(data.isGenerated)) {
            delete columns[k];
        }
        const columnTuple = delegate(columns);
        column_collection_1.ColumnCollectionUtil.assertHasColumns(columns, columnTuple);
        const hasDefaultValue = Object.assign({}, data.hasDefaultValue);
        for (let column of columnTuple) {
            hasDefaultValue[column.name] = true;
        }
        return Object.assign({}, data, { hasDefaultValue: hasDefaultValue });
    }
    TableDataUtil.hasDefaultValue = hasDefaultValue;
    function isMutable(data, columnCollection, delegate) {
        const columns = Object.assign({}, columnCollection);
        for (let k of Object.keys(data.isGenerated)) {
            delete columns[k];
        }
        const columnTuple = delegate(columns);
        column_collection_1.ColumnCollectionUtil.assertHasColumns(columns, columnTuple);
        const isMutable = Object.assign({}, data.isMutable);
        for (let column of columnTuple) {
            isMutable[column.name] = true;
        }
        return Object.assign({}, data, { isMutable: isMutable });
    }
    TableDataUtil.isMutable = isMutable;
    function immutable(data) {
        return Object.assign({}, data, { isMutable: {} });
    }
    TableDataUtil.immutable = immutable;
    function id(data, columnCollection, delegate) {
        //Technically, columns shouldn't have any non-`number` types
        //but I can't check for that during run-time
        const column = delegate(columnCollection);
        column_collection_1.ColumnCollectionUtil.assertHasColumn(columnCollection, column);
        const uniqueKeys = (data.uniqueKeys == undefined) ?
            [] :
            data.uniqueKeys;
        return Object.assign({}, data, { id: column, uniqueKeys: uniqueKeys.concat({
                [column.name]: true
            }) });
    }
    TableDataUtil.id = id;
    function toUniqueKey(tuple) {
        const result = {};
        for (let i of tuple) {
            result[i.name] = true;
        }
        return result;
    }
    TableDataUtil.toUniqueKey = toUniqueKey;
    function addUniqueKey(data, columnCollection, delegate) {
        const uniqueKeyTuple = delegate(columnCollection);
        column_collection_1.ColumnCollectionUtil.assertHasColumns(columnCollection, uniqueKeyTuple);
        return Object.assign({}, data, { uniqueKeys: (data.uniqueKeys == undefined) ?
                [toUniqueKey(uniqueKeyTuple)] :
                data.uniqueKeys.concat(toUniqueKey(uniqueKeyTuple)) });
    }
    TableDataUtil.addUniqueKey = addUniqueKey;
    function withTableAlias(data, tableAlias) {
        return Object.assign({}, data, { autoIncrement: (data.autoIncrement == undefined) ?
                undefined :
                column_1.ColumnUtil.withTableAlias(data.autoIncrement, tableAlias), id: (data.id == undefined) ?
                undefined :
                column_1.ColumnUtil.withTableAlias(data.id, tableAlias) });
    }
    TableDataUtil.withTableAlias = withTableAlias;
    function addParentTable(data, parent) {
        if (data.parentTables == undefined) {
            if (parent.data.parentTables == undefined) {
                return Object.assign({}, data, { parentTables: [parent] });
            }
            else {
                return Object.assign({}, data, { parentTables: parent.data.parentTables.concat(parent) });
            }
        }
        else {
            if (parent.data.parentTables == undefined) {
                return Object.assign({}, data, { parentTables: data.parentTables.concat(parent) });
            }
            else {
                return Object.assign({}, data, { parentTables: data.parentTables.concat([parent.data.parentTables], parent) });
            }
        }
    }
    TableDataUtil.addParentTable = addParentTable;
})(TableDataUtil = exports.TableDataUtil || (exports.TableDataUtil = {}));
//# sourceMappingURL=util.js.map