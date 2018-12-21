"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("./table");
const column_map_1 = require("../column-map");
const field_array_1 = require("../field-array");
const mysql_1 = require("mysql");
function tableFromFieldTuple(name, fields) {
    const columns = column_map_1.ColumnMapUtil.fromFieldArray(name, fields);
    const isNullable = field_array_1.FieldArrayUtil.nullableNames(fields);
    const mutable = fields.map(field => field.name);
    return new table_1.Table({
        usedRef: {},
        alias: name,
        columns,
        autoIncrement: undefined,
        id: undefined,
        candidateKeys: [],
        generated: [],
        isNullable,
        hasExplicitDefaultValue: [],
        mutable,
        parents: [],
        insertAllowed: true,
        deleteAllowed: true,
    }, {
        unaliasedQuery: mysql_1.escapeId(name),
    });
}
exports.tableFromFieldTuple = tableFromFieldTuple;
//# sourceMappingURL=from-field-tuple.js.map