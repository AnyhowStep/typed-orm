"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const column_1 = require("../column");
const sd = require("schema-decorator");
var TableParentCollectionUtil;
(function (TableParentCollectionUtil) {
    function setInheritedColumnNames(parents, names) {
        for (let p of parents) {
            const columnNames = Object.keys(p.columns)
                .filter(name => p.columns.hasOwnProperty(name));
            for (let name of columnNames) {
                names.add(name);
            }
        }
    }
    TableParentCollectionUtil.setInheritedColumnNames = setInheritedColumnNames;
    function inheritedIsGenerated(parents, columnName) {
        for (let p of parents) {
            if (p.data.isGenerated[columnName] === true) {
                return true;
            }
        }
        return false;
    }
    TableParentCollectionUtil.inheritedIsGenerated = inheritedIsGenerated;
    function tryGetInheritedGeneratedNonAutoIncrementColumn(parents, columnName) {
        for (let p of parents) {
            if (p.data.isGenerated[columnName] === true &&
                (p.data.autoIncrement == undefined ||
                    p.data.autoIncrement.name != columnName)) {
                return p.columns[columnName];
            }
        }
        return undefined;
    }
    TableParentCollectionUtil.tryGetInheritedGeneratedNonAutoIncrementColumn = tryGetInheritedGeneratedNonAutoIncrementColumn;
    function inheritedHasDefaultValue(parents, columnName) {
        if (inheritedIsGenerated(parents, columnName)) {
            return true;
        }
        for (let p of parents) {
            if ((p.columns[columnName] instanceof column_1.Column) && p.data.hasDefaultValue[columnName] !== true) {
                return false;
            }
        }
        return true;
    }
    TableParentCollectionUtil.inheritedHasDefaultValue = inheritedHasDefaultValue;
    function setInheritedGeneratedColumnNames(parents, names) {
        for (let p of parents) {
            const columnNames = Object.keys(p.columns)
                .filter(name => p.columns.hasOwnProperty(name))
                .filter(name => inheritedIsGenerated(parents, name));
            for (let name of columnNames) {
                names.add(name);
            }
        }
    }
    TableParentCollectionUtil.setInheritedGeneratedColumnNames = setInheritedGeneratedColumnNames;
    function setInheritedHasDefaultValueColumnNames(parents, names) {
        for (let p of parents) {
            const columnNames = Object.keys(p.columns)
                .filter(name => p.columns.hasOwnProperty(name))
                .filter(name => inheritedHasDefaultValue(parents, name));
            for (let name of columnNames) {
                names.add(name);
            }
        }
    }
    TableParentCollectionUtil.setInheritedHasDefaultValueColumnNames = setInheritedHasDefaultValueColumnNames;
    function columnNames(table) {
        const result = new Set();
        for (let name of Object.keys(table.columns)) {
            result.add(name);
        }
        if (table.data.parentTables != undefined) {
            setInheritedColumnNames(table.data.parentTables, result);
        }
        return result;
    }
    TableParentCollectionUtil.columnNames = columnNames;
    function isGenerated(table, columnName) {
        if (table.data.isGenerated[columnName] === true) {
            return true;
        }
        else {
            if (table.data.parentTables == undefined) {
                return false;
            }
            else {
                return inheritedIsGenerated(table.data.parentTables, columnName);
            }
        }
    }
    TableParentCollectionUtil.isGenerated = isGenerated;
    function tryGetGeneratedNonAutoIncrementColumn(table, columnName) {
        if (table.data.isGenerated[columnName] === true &&
            (table.data.autoIncrement == undefined ||
                table.data.autoIncrement.name != columnName)) {
            return table.columns[columnName];
        }
        if (table.data.parentTables == undefined) {
            return undefined;
        }
        else {
            return tryGetInheritedGeneratedNonAutoIncrementColumn(table.data.parentTables, columnName);
        }
    }
    TableParentCollectionUtil.tryGetGeneratedNonAutoIncrementColumn = tryGetGeneratedNonAutoIncrementColumn;
    function hasDefaultValue(table, columnName) {
        if (isGenerated(table, columnName)) {
            return true;
        }
        if ((table.columns[columnName] instanceof column_1.Column) &&
            table.data.hasDefaultValue[columnName] !== true) {
            return false;
        }
        //The current table either doesn't have the column, or has a default value for it
        if (table.data.parentTables == undefined) {
            //No parents, so we have the final say
            return true;
        }
        else {
            //The parents must also have it as a default
            return inheritedHasDefaultValue(table.data.parentTables, columnName);
        }
    }
    TableParentCollectionUtil.hasDefaultValue = hasDefaultValue;
    function generatedColumnNames(table) {
        return [...columnNames(table)]
            .filter(name => isGenerated(table, name));
    }
    TableParentCollectionUtil.generatedColumnNames = generatedColumnNames;
    function hasDefaultValueColumnNames(table) {
        return [...columnNames(table)]
            .filter(name => hasDefaultValue(table, name));
    }
    TableParentCollectionUtil.hasDefaultValueColumnNames = hasDefaultValueColumnNames;
    function requiredColumnNames(table) {
        return [...columnNames(table)]
            .filter(name => !hasDefaultValue(table, name));
    }
    TableParentCollectionUtil.requiredColumnNames = requiredColumnNames;
    function optionalColumnNames(table) {
        return hasDefaultValueColumnNames(table)
            .filter(name => !isGenerated(table, name));
    }
    TableParentCollectionUtil.optionalColumnNames = optionalColumnNames;
    function columnAssertDelegate(table, columnName) {
        const assertDelegates = [];
        const column = table.columns[columnName];
        if (column instanceof column_1.Column) {
            assertDelegates.push(column.assertDelegate);
        }
        if (table.data.parentTables != undefined) {
            for (let p of table.data.parentTables) {
                const column = p.columns[columnName];
                if (column instanceof column_1.Column) {
                    assertDelegates.push(column.assertDelegate);
                }
            }
        }
        if (assertDelegates.length == 0) {
            throw new Error(`Table ${table.alias} does not have column ${columnName} and does not inherit it`);
        }
        return sd.and(...assertDelegates);
    }
    TableParentCollectionUtil.columnAssertDelegate = columnAssertDelegate;
    function assertDelegate(table) {
        const fields = [];
        columnNames(table).forEach((columnName) => {
            fields.push(sd.field(columnName, columnAssertDelegate(table, columnName)));
        });
        return sd.schema(...fields);
    }
    TableParentCollectionUtil.assertDelegate = assertDelegate;
})(TableParentCollectionUtil = exports.TableParentCollectionUtil || (exports.TableParentCollectionUtil = {}));
//# sourceMappingURL=util.js.map