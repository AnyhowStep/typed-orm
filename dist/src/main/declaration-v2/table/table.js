"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aliased_table_1 = require("../aliased-table");
const column_collection_1 = require("../column-collection");
const raw_column_collection_1 = require("../raw-column-collection");
const table_data_1 = require("../table-data");
class Table extends aliased_table_1.AliasedTable {
    constructor(alias, name, columns, data) {
        super(alias, name, columns);
        this.data = data;
    }
    setAutoIncrement(delegate) {
        return new Table(this.alias, this.name, this.columns, table_data_1.TableDataUtil.autoIncrement(this.data, this.columns, delegate));
    }
    setIsGenerated(delegate) {
        return new Table(this.alias, this.name, this.columns, table_data_1.TableDataUtil.isGenerated(this.data, this.columns, delegate));
    }
    setHasDefaultValue(delegate) {
        return new Table(this.alias, this.name, this.columns, table_data_1.TableDataUtil.hasDefaultValue(this.data, this.columns, delegate));
    }
    setIsMutable(delegate) {
        return new Table(this.alias, this.name, this.columns, table_data_1.TableDataUtil.isMutable(this.data, this.columns, delegate));
    }
    setImmutable() {
        return new Table(this.alias, this.name, this.columns, table_data_1.TableDataUtil.immutable(this.data));
    }
    as(newAlias) {
        return new Table(newAlias, this.name, column_collection_1.ColumnCollectionUtil.withTableAlias(this.columns, newAlias), this.data);
    }
    withName(newName) {
        return new Table(newName, newName, column_collection_1.ColumnCollectionUtil.withTableAlias(this.columns, newName), this.data);
    }
    addColumns(rawColumnCollection) {
        return new Table(this.alias, this.name, column_collection_1.ColumnCollectionUtil.merge(this.columns, raw_column_collection_1.RawColumnCollectionUtil.toColumnCollection(this.alias, rawColumnCollection)), this.data);
    }
}
exports.Table = Table;
function table(name, rawColumnCollection) {
    const columns = raw_column_collection_1.RawColumnCollectionUtil.toColumnCollection(name, rawColumnCollection);
    const hasDefaultValue = {};
    const isMutable = {};
    for (let columnName of column_collection_1.ColumnCollectionUtil.nullableColumnNames(columns)) {
        hasDefaultValue[columnName] = true;
    }
    for (let columnName in columns) {
        isMutable[columnName] = true;
    }
    return new Table(name, name, columns, {
        autoIncrement: undefined,
        isGenerated: {},
        hasDefaultValue: hasDefaultValue,
        isMutable: isMutable,
    });
}
exports.table = table;
//# sourceMappingURL=table.js.map