"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const column_collection_1 = require("../column-collection");
const util_1 = require("./util");
class LogBuilder {
    constructor(data) {
        this.data = data;
    }
    setEntityIdentifier(delegate) {
        const columnCollection = column_collection_1.ColumnCollectionUtil.excludeColumnNames(this.data.table.columns, Object.keys(this.data.isTrackable)
            .concat(Object.keys(this.data.table.data.isGenerated)));
        const result = delegate(columnCollection);
        column_collection_1.ColumnCollectionUtil.assertHasColumns(columnCollection, result);
        const entityIdentifier = result.reduce((memo, column) => {
            memo[column.name] = true;
            return memo;
        }, {});
        return new LogBuilder(Object.assign({}, this.data, { entityIdentifier: entityIdentifier, defaultRowDelegate: undefined }));
    }
    setIsTrackable(delegate) {
        const columnCollection = column_collection_1.ColumnCollectionUtil.excludeColumnNames(this.data.table.columns, Object.keys(this.data.entityIdentifier)
            .concat(Object.keys(this.data.table.data.isGenerated)));
        const result = delegate(columnCollection);
        column_collection_1.ColumnCollectionUtil.assertHasColumns(columnCollection, result);
        const isTrackable = result.reduce((memo, column) => {
            memo[column.name] = true;
            return memo;
        }, {});
        return new LogBuilder(Object.assign({}, this.data, { isTrackable: isTrackable }));
    }
    setOrderByLatest(delegate) {
        const columnCollection = this.data.table.columns;
        const result = delegate(columnCollection);
        column_collection_1.ColumnCollectionUtil.assertHasColumns(columnCollection, result.map(i => i[0]));
        const orderByLatest = result.map(i => [i[0].name, i[1]]);
        return new LogBuilder(Object.assign({}, this.data, { orderByLatest: orderByLatest }));
    }
    setDefaultRow(delegate) {
        return new LogBuilder(Object.assign({}, this.data, { defaultRowDelegate: (entityIdentifier, db) => {
                entityIdentifier = util_1.LogDataUtil.entityIdentifierAssertDelegate(this.data)(`${this.data.table.alias} entity identifier`, entityIdentifier);
                return delegate(entityIdentifier, db);
            } }));
    }
    build() {
        return this.data;
    }
}
exports.LogBuilder = LogBuilder;
function log(table) {
    return new LogBuilder({
        table: table,
        entityIdentifier: {},
        isTrackable: {},
        orderByLatest: undefined,
        defaultRowDelegate: undefined,
    });
}
exports.log = log;
//# sourceMappingURL=log-builder.js.map