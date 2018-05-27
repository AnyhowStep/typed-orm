"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aliased_table_1 = require("../aliased-table");
const column_collection_1 = require("../column-collection");
const raw_column_collection_1 = require("../raw-column-collection");
const table_data_1 = require("../table-data");
const fieldUtil = require("../field-util");
const util_1 = require("./util");
class Table extends aliased_table_1.AliasedTable {
    constructor(alias, name, columns, data) {
        super(alias, name, columns);
        this.data = data;
    }
    setAutoIncrement(delegate) {
        return new Table(this.alias, this.name, this.columns, table_data_1.TableDataUtil.autoIncrement(this.data, this.columns, delegate));
    }
    /*unsetAutoIncrement () : (
        Table<
            AliasT,
            NameT,
            ColumnCollectionT,
            TableDataUtil.UnsetAutoIncrement<DataT>
        >
    ) {
        return new Table(
            this.alias,
            this.name,
            this.columns,
            TableDataUtil.unsetAutoIncrement(this.data)
        );
    }*/
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
        return new Table(newAlias, this.name, column_collection_1.ColumnCollectionUtil.withTableAlias(this.columns, newAlias), table_data_1.TableDataUtil.withTableAlias(this.data, newAlias)
        //this.data
        );
    }
    withName(newName) {
        return new Table(newName, newName, column_collection_1.ColumnCollectionUtil.withTableAlias(this.columns, newName), table_data_1.TableDataUtil.withTableAlias(this.data, newName));
    }
    addColumns(raw) {
        if (raw instanceof Array) {
            raw = fieldUtil.fieldsToObject(raw);
        }
        return new Table(this.alias, this.name, column_collection_1.ColumnCollectionUtil.merge(this.columns, raw_column_collection_1.RawColumnCollectionUtil.toColumnCollection(this.alias, raw)), this.data);
    }
    setId(delegate) {
        return new Table(this.alias, this.name, this.columns, table_data_1.TableDataUtil.id(this.data, this.columns, delegate));
    }
    //This method causes `tsc` to not terminate if uncommented
    addUniqueKey(delegate) {
        return new Table(this.alias, this.name, this.columns, table_data_1.TableDataUtil.addUniqueKey(this.data, this.columns, delegate));
    }
    getUniqueKeyAssertDelegate() {
        if (this.uniqueKeyAssertDelegate == undefined) {
            this.uniqueKeyAssertDelegate = util_1.TableUtil.uniqueKeyAssertDelegate(this);
        }
        return this.uniqueKeyAssertDelegate;
    }
}
exports.Table = Table;
function table(name, raw) {
    if (raw instanceof Array) {
        raw = fieldUtil.fieldsToObject(raw);
    }
    const columns = raw_column_collection_1.RawColumnCollectionUtil.toColumnCollection(name, raw);
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
        id: undefined,
        uniqueKeys: undefined,
    });
}
exports.table = table;
//# sourceMappingURL=table.js.map