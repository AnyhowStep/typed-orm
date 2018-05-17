"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typed_mysql_1 = require("typed-mysql");
const type_util_1 = require("@anyhowstep/type-util");
const column_collection_1 = require("./column-collection");
const column_operation_1 = require("./column-operation");
function nullableToHasServerDefaultValue(columns) {
    return column_operation_1.nullableColumnNames(columns)
        .reduce((memo, name) => {
        memo[name] = true;
        return memo;
    }, {});
}
function toMutable(columns) {
    return Object.keys(columns)
        .reduce((memo, name) => {
        memo[name] = true;
        return memo;
    }, {});
}
class Table {
    constructor(alias, name, columns, data) {
        this.alias = alias;
        this.name = name;
        this.columns = column_collection_1.toColumnCollection(alias, columns);
        this.data = data;
        if (name == alias) {
            this.query = typed_mysql_1.Database.EscapeId(name);
        }
        else {
            this.query = `${typed_mysql_1.Database.EscapeId(name)} AS ${typed_mysql_1.Database.EscapeId(alias)}`;
        }
    }
    querify(sb) {
        sb.append(this.query);
    }
    as(alias) {
        return new Table(alias, this.name, this.columns, this.data);
    }
    assertIsOwnColumn(name, other) {
        if (other.table != this.alias) {
            throw new Error(`Expected ${name}.table to be ${this.alias}, received ${other.table}`);
        }
        const column = this.columns[other.name];
        if (column == undefined) {
            throw new Error(`Table ${this.alias} has no such column ${other.name} of ${name}`);
        }
        if (column != other) {
            throw new Error(`The column ${other.table}.${other.name} exists but is different from the instance received of ${name}`);
        }
    }
    autoIncrement(autoIncrementDelegate) {
        const autoIncrement = autoIncrementDelegate(this.columns);
        this.assertIsOwnColumn("autoIncrement", autoIncrement);
        return new Table(this.alias, this.name, this.columns, type_util_1.spread(this.data, {
            autoIncrement: autoIncrement,
            hasServerDefaultValue: Object.assign({}, this.data.hasServerDefaultValue, { [autoIncrement.name]: true })
        }));
    }
    setHasServerDefaultValue(hasServerDefaultValueDelegate) {
        const columns = hasServerDefaultValueDelegate(this.columns);
        for (let i = 0; i < columns.length; ++i) {
            this.assertIsOwnColumn(`serverDefaultValue[${i}]`, columns[i]);
        }
        const hasServerDefaultValue = nullableToHasServerDefaultValue(this.columns);
        for (let c of columns) {
            hasServerDefaultValue[c.name] = true;
        }
        if (this.data.autoIncrement != undefined) {
            hasServerDefaultValue[this.data.autoIncrement.name] = true;
        }
        return new Table(this.alias, this.name, this.columns, type_util_1.spread(this.data, {
            hasServerDefaultValue: hasServerDefaultValue,
        }));
    }
    setIsMutable(isMutableDelegate) {
        const columns = isMutableDelegate(this.columns);
        for (let i = 0; i < columns.length; ++i) {
            this.assertIsOwnColumn(`isMutable[${i}]`, columns[i]);
        }
        return new Table(this.alias, this.name, this.columns, type_util_1.spread(this.data, {
            isMutable: columns.reduce((memo, column) => {
                memo[column.name] = true;
                return memo;
            }, {}),
        }));
    }
    setImmutable() {
        return new Table(this.alias, this.name, this.columns, type_util_1.spread(this.data, {
            isMutable: {},
        }));
    }
}
exports.Table = Table;
exports.table = (name, rawColumns) => {
    const columns = column_collection_1.toColumnCollection(name, rawColumns);
    return new Table(name, name, columns, {
        autoIncrement: undefined,
        hasServerDefaultValue: nullableToHasServerDefaultValue(columns),
        isMutable: toMutable(columns),
    });
};
//# sourceMappingURL=table.js.map