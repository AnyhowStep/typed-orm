"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aliased_table_1 = require("../aliased-table");
const column_map_1 = require("../column-map");
const candidate_key_array_1 = require("../candidate-key-array");
const super_key_array_1 = require("../super-key-array");
const assert_map_1 = require("../assert-map");
const field_array_1 = require("../field-array");
class Table {
    constructor(data, __databaseName) {
        this.alias = data.alias;
        this.name = data.name;
        this.columns = data.columns;
        this.__databaseName = __databaseName;
        this.autoIncrement = data.autoIncrement;
        this.id = data.id;
        this.candidateKeys = data.candidateKeys;
        this.generated = data.generated;
        this.hasDefaultValue = data.hasDefaultValue;
        this.mutable = data.mutable;
        this.parents = data.parents;
        this.insertAllowed = data.insertAllowed;
        this.deleteAllowed = data.deleteAllowed;
    }
    queryStringTree() {
        return aliased_table_1.AliasedTable.queryStringTree(this);
    }
    as(newAlias) {
        return Table.as(this, newAlias);
    }
    //TODO Maybe cache the assert delegate
    getCandidateKeyAssertDelegate() {
        return Table.getCandidateKeyAssertDelegate(this);
    }
    //TODO Maybe cache the assert delegate
    getSuperKeyAssertDelegate() {
        return Table.getSuperKeyAssertDelegate(this);
    }
    setName(newName) {
        return Table.setName(this, newName);
    }
    addColumns(rawColumns) {
        return Table.addColumns(this, rawColumns);
    }
    setAutoIncrement(delegate) {
        return Table.setAutoIncrement(this, delegate);
    }
    setId(delegate) {
        return Table.setId(this, delegate);
    }
    addCandidateKey(delegate) {
        return Table.addCandidateKey(this, delegate);
    }
    setGenerated(delegate) {
        return Table.setGenerated(this, delegate);
    }
    setHasDefaultValue(delegate) {
        return Table.setHasDefaultValue(this, delegate);
    }
    setImmutable() {
        return Table.setImmutable(this);
    }
    overwriteMutable(delegate) {
        return Table.overwriteMutable(this, delegate);
    }
    addParent(parent) {
        return Table.addParent(this, parent);
    }
    disallowInsert() {
        return Table.disallowInsert(this);
    }
    disallowDelete() {
        return Table.disallowDelete(this);
    }
}
exports.Table = Table;
(function (Table) {
    function as({ name, columns, __databaseName, }, newAlias) {
        //https://github.com/Microsoft/TypeScript/issues/28592
        const columns2 = columns;
        return new aliased_table_1.AliasedTable({
            alias: newAlias,
            name,
            columns: column_map_1.ColumnMapUtil.withTableAlias(columns2, newAlias),
        }, __databaseName);
    }
    Table.as = as;
})(Table = exports.Table || (exports.Table = {}));
(function (Table) {
    function setName(table, newName) {
        //https://github.com/Microsoft/TypeScript/issues/28592
        const columns = table.columns;
        const { autoIncrement, id, candidateKeys, generated, hasDefaultValue, mutable, parents, insertAllowed, deleteAllowed, } = table;
        return new Table({
            alias: newName,
            name: newName,
            columns: column_map_1.ColumnMapUtil.withTableAlias(columns, newName),
            autoIncrement,
            id,
            candidateKeys,
            generated,
            hasDefaultValue,
            mutable,
            parents,
            insertAllowed,
            deleteAllowed,
        }, table.__databaseName);
    }
    Table.setName = setName;
})(Table = exports.Table || (exports.Table = {}));
(function (Table) {
    function addColumnsFromFieldTuple(table, fields) {
        //https://github.com/Microsoft/TypeScript/issues/28592
        const tableColumns = table.columns;
        //https://github.com/Microsoft/TypeScript/issues/28592
        const columnMapFromFieldArray = column_map_1.ColumnMapUtil.fromFieldArray(table.alias, fields);
        const columns = column_map_1.ColumnMapUtil.intersect(tableColumns, columnMapFromFieldArray);
        const hasDefaultValue = [
            ...table.hasDefaultValue,
            ...field_array_1.FieldArrayUtil.nullableNames(fields),
        ];
        const { alias, name, autoIncrement, id, candidateKeys, generated, mutable, parents, insertAllowed, deleteAllowed, } = table;
        const result = new Table({
            alias,
            name,
            columns,
            autoIncrement,
            id,
            candidateKeys,
            generated,
            hasDefaultValue,
            mutable,
            parents,
            insertAllowed,
            deleteAllowed,
        }, table.__databaseName);
        return result;
    }
    Table.addColumnsFromFieldTuple = addColumnsFromFieldTuple;
})(Table = exports.Table || (exports.Table = {}));
(function (Table) {
    function addColumnsFromAssertMap(table, assertMap) {
        //https://github.com/Microsoft/TypeScript/issues/28592
        const tableColumns = table.columns;
        const columns = column_map_1.ColumnMapUtil.intersect(tableColumns, column_map_1.ColumnMapUtil.fromAssertMap(table.alias, assertMap));
        const hasDefaultValue = [
            ...table.hasDefaultValue,
            ...assert_map_1.AssertMapUtil.nullableNames(assertMap),
        ];
        const { alias, name, autoIncrement, id, candidateKeys, generated, mutable, parents, insertAllowed, deleteAllowed, } = table;
        const result = new Table({
            alias,
            name,
            columns,
            autoIncrement,
            id,
            candidateKeys,
            generated,
            hasDefaultValue,
            mutable,
            parents,
            insertAllowed,
            deleteAllowed,
        }, table.__databaseName);
        return result;
    }
    Table.addColumnsFromAssertMap = addColumnsFromAssertMap;
})(Table = exports.Table || (exports.Table = {}));
(function (Table) {
    function addColumns(table, rawColumns) {
        if (rawColumns instanceof Array) {
            return Table.addColumnsFromFieldTuple(table, rawColumns);
        }
        else {
            return Table.addColumnsFromAssertMap(table, rawColumns);
        }
    }
    Table.addColumns = addColumns;
})(Table = exports.Table || (exports.Table = {}));
(function (Table) {
    function getCandidateKeyAssertDelegate(table) {
        //https://github.com/Microsoft/TypeScript/issues/28592
        const candidateKeys = table.candidateKeys;
        const columns = table.columns;
        return candidate_key_array_1.CandidateKeyArrayUtil.toUnionAssertDelegate(candidateKeys, columns);
    }
    Table.getCandidateKeyAssertDelegate = getCandidateKeyAssertDelegate;
    function getSuperKeyAssertDelegate(table) {
        //https://github.com/Microsoft/TypeScript/issues/28592
        const candidateKeys = table.candidateKeys;
        const columns = table.columns;
        return super_key_array_1.SuperKeyArrayUtil.toUnionAssertDelegate(candidateKeys, columns);
    }
    Table.getSuperKeyAssertDelegate = getSuperKeyAssertDelegate;
})(Table = exports.Table || (exports.Table = {}));
(function (Table) {
    function setAutoIncrement(table, delegate) {
        //https://github.com/Microsoft/TypeScript/issues/28592
        const columns = table.columns;
        //https://github.com/Microsoft/TypeScript/issues/24277
        const autoIncrement = delegate(columns);
        column_map_1.ColumnMapUtil.assertHasColumnIdentifier(table.columns, autoIncrement);
        const candidateKeys = table.candidateKeys.concat([
            [autoIncrement.name]
        ]);
        const generated = (table.generated.indexOf(autoIncrement.name) >= 0) ?
            table.generated :
            [
                ...table.generated,
                autoIncrement.name
            ];
        const hasDefaultValue = (table.hasDefaultValue.indexOf(autoIncrement.name) >= 0) ?
            table.hasDefaultValue :
            [
                ...table.hasDefaultValue,
                autoIncrement.name,
            ];
        const mutable = table.mutable.filter((columnName) => {
            return (columnName != autoIncrement.name);
        });
        const { alias, name, parents, insertAllowed, deleteAllowed, } = table;
        const result = new Table({
            alias,
            name,
            columns,
            autoIncrement: autoIncrement.name,
            id: autoIncrement.name,
            candidateKeys,
            generated,
            hasDefaultValue,
            mutable,
            parents,
            insertAllowed,
            deleteAllowed,
        }, table.__databaseName);
        return result;
    }
    Table.setAutoIncrement = setAutoIncrement;
})(Table = exports.Table || (exports.Table = {}));
(function (Table) {
    function setId(table, delegate) {
        //https://github.com/Microsoft/TypeScript/issues/28592
        const columns = table.columns;
        //https://github.com/Microsoft/TypeScript/issues/24277
        const id = delegate(columns);
        column_map_1.ColumnMapUtil.assertHasColumnIdentifier(table.columns, id);
        const candidateKeys = table.candidateKeys.concat([
            [id.name]
        ]);
        const { alias, name, autoIncrement, generated, hasDefaultValue, mutable, parents, insertAllowed, deleteAllowed, } = table;
        const result = new Table({
            alias,
            name,
            columns,
            autoIncrement,
            id: id.name,
            candidateKeys,
            generated,
            hasDefaultValue,
            mutable,
            parents,
            insertAllowed,
            deleteAllowed,
        }, table.__databaseName);
        return result;
    }
    Table.setId = setId;
})(Table = exports.Table || (exports.Table = {}));
(function (Table) {
    function addCandidateKey(table, delegate) {
        //https://github.com/Microsoft/TypeScript/issues/28592
        const columns = table.columns;
        //https://github.com/Microsoft/TypeScript/issues/24277
        const candidateKeyColumns = delegate(columns);
        for (let candidateKeyColumn of candidateKeyColumns) {
            column_map_1.ColumnMapUtil.assertHasColumnIdentifier(table.columns, candidateKeyColumn);
        }
        const candidateKeys = table.candidateKeys.concat([
            candidateKeyColumns.map(candidateKeyColumn => candidateKeyColumn.name)
        ]);
        const { alias, name, autoIncrement, id, generated, hasDefaultValue, mutable, parents, insertAllowed, deleteAllowed, } = table;
        const result = new Table({
            alias,
            name,
            columns,
            autoIncrement,
            id,
            candidateKeys,
            generated,
            hasDefaultValue,
            mutable,
            parents,
            insertAllowed,
            deleteAllowed,
        }, table.__databaseName);
        return result;
    }
    Table.addCandidateKey = addCandidateKey;
})(Table = exports.Table || (exports.Table = {}));
(function (Table) {
    function setGenerated(table, delegate) {
        //https://github.com/Microsoft/TypeScript/issues/28592
        const columns = table.columns;
        //https://github.com/Microsoft/TypeScript/issues/24277
        const generatedColumns = delegate(columns);
        for (let generatedColumn of generatedColumns) {
            if (table.generated.indexOf(generatedColumn.name) >= 0) {
                throw new Error(`Column ${table.name}.${generatedColumn.name} already declared generated`);
            }
            column_map_1.ColumnMapUtil.assertHasColumnIdentifier(table.columns, generatedColumn);
        }
        const generated = {
            ...table.generated,
            ...generatedColumns.map(column => column.name),
        };
        const hasDefaultValue = {
            ...table.hasDefaultValue,
            ...generatedColumns.map(column => column.name),
        };
        const mutable = table.mutable.filter((columnName) => {
            return generatedColumns.every(column => column.name != columnName);
        });
        const { alias, name, autoIncrement, id, candidateKeys, parents, insertAllowed, deleteAllowed, } = table;
        const result = new Table({
            alias,
            name,
            columns,
            autoIncrement,
            id,
            candidateKeys,
            generated,
            hasDefaultValue,
            mutable,
            parents,
            insertAllowed,
            deleteAllowed,
        }, table.__databaseName);
        return result;
    }
    Table.setGenerated = setGenerated;
})(Table = exports.Table || (exports.Table = {}));
(function (Table) {
    function setHasDefaultValue(table, delegate) {
        //https://github.com/Microsoft/TypeScript/issues/28592
        const columns = table.columns;
        //https://github.com/Microsoft/TypeScript/issues/24277
        const hasDefaultValueColumns = delegate(columns);
        for (let hasDefaultValueColumn of hasDefaultValueColumns) {
            if (table.hasDefaultValue.indexOf(hasDefaultValueColumn.name) >= 0) {
                throw new Error(`Column ${table.name}.${hasDefaultValueColumn.name} already declared as having a default value`);
            }
            column_map_1.ColumnMapUtil.assertHasColumnIdentifier(table.columns, hasDefaultValueColumn);
        }
        const hasDefaultValue = {
            ...table.hasDefaultValue,
            ...hasDefaultValueColumns.map(column => column.name),
        };
        const { alias, name, autoIncrement, id, candidateKeys, generated, mutable, parents, insertAllowed, deleteAllowed, } = table;
        const result = new Table({
            alias,
            name,
            columns,
            autoIncrement,
            id,
            candidateKeys,
            generated,
            hasDefaultValue,
            mutable,
            parents,
            insertAllowed,
            deleteAllowed,
        }, table.__databaseName);
        return result;
    }
    Table.setHasDefaultValue = setHasDefaultValue;
})(Table = exports.Table || (exports.Table = {}));
(function (Table) {
    function setImmutable(table) {
        const { alias, name, columns, autoIncrement, id, candidateKeys, generated, hasDefaultValue, parents, insertAllowed, deleteAllowed, } = table;
        return new Table({
            alias,
            name,
            columns,
            autoIncrement,
            id,
            candidateKeys,
            generated,
            hasDefaultValue,
            mutable: [],
            parents,
            insertAllowed,
            deleteAllowed,
        }, table.__databaseName);
    }
    Table.setImmutable = setImmutable;
})(Table = exports.Table || (exports.Table = {}));
(function (Table) {
    function overwriteMutable(table, delegate) {
        //https://github.com/Microsoft/TypeScript/issues/28592
        const columns = table.columns;
        //https://github.com/Microsoft/TypeScript/issues/24277
        const mutableColumns = delegate(columns);
        for (let mutableColumn of mutableColumns) {
            if (table.generated.indexOf(mutableColumn.name) >= 0) {
                throw new Error(`Column ${table.name}.${mutableColumn.name} is generated and cannot be mutable`);
            }
            column_map_1.ColumnMapUtil.assertHasColumnIdentifier(table.columns, mutableColumn);
        }
        const mutable = mutableColumns
            .map(column => column.name);
        const { alias, name, autoIncrement, id, candidateKeys, generated, hasDefaultValue, parents, insertAllowed, deleteAllowed, } = table;
        const result = new Table({
            alias,
            name,
            columns,
            autoIncrement,
            id,
            candidateKeys,
            generated,
            hasDefaultValue,
            mutable,
            parents,
            insertAllowed,
            deleteAllowed,
        }, table.__databaseName);
        return result;
    }
    Table.overwriteMutable = overwriteMutable;
})(Table = exports.Table || (exports.Table = {}));
(function (Table) {
    //+ Must share at least one unique key
    //+ Duplicate columns must be assignable from child to parent
    //  Example: child.type = "red"|"blue", parent.type = "red"|"blue"|"green"
    //+ No duplicates
    function addParent(table, parent) {
        if (!candidate_key_array_1.CandidateKeyArrayUtil.hasCommonCandidateKeys(table.candidateKeys, parent.candidateKeys)) {
            throw new Error(`No common candidate keys found between table ${table.name} and parent ${parent.name}`);
        }
        ;
        if (table.name == parent.name) {
            throw new Error(`Parent ${table.name} cannot have same name as table`);
        }
        for (let otherParent of table.parents) {
            if (otherParent.name == parent.name) {
                throw new Error(`Parent ${table.name} already added to table`);
            }
        }
        const parents = [
            ...table.parents,
            ...parent.parents,
            parent
        ];
        const { alias, name, columns, autoIncrement, id, candidateKeys, generated, hasDefaultValue, mutable, insertAllowed, deleteAllowed, } = table;
        return new Table({
            alias,
            name,
            columns,
            autoIncrement,
            id,
            candidateKeys,
            generated,
            hasDefaultValue,
            mutable,
            parents,
            insertAllowed,
            deleteAllowed,
        });
    }
    Table.addParent = addParent;
})(Table = exports.Table || (exports.Table = {}));
(function (Table) {
    function disallowInsert(table) {
        const { alias, name, columns, autoIncrement, id, candidateKeys, generated, hasDefaultValue, mutable, parents, deleteAllowed, } = table;
        return new Table({ alias,
            name,
            columns,
            autoIncrement,
            id,
            candidateKeys,
            generated,
            hasDefaultValue,
            mutable,
            parents,
            insertAllowed: false,
            deleteAllowed,
        }, table.__databaseName);
    }
    Table.disallowInsert = disallowInsert;
    function disallowDelete(table) {
        const { alias, name, columns, autoIncrement, id, candidateKeys, generated, hasDefaultValue, mutable, parents, insertAllowed, } = table;
        return new Table({
            alias,
            name,
            columns,
            autoIncrement,
            id,
            candidateKeys,
            generated,
            hasDefaultValue,
            mutable,
            parents,
            insertAllowed,
            deleteAllowed: false,
        }, table.__databaseName);
    }
    Table.disallowDelete = disallowDelete;
})(Table = exports.Table || (exports.Table = {}));
/*
import {table} from "./instantiate";
import { FieldArrayUtil } from "../field-array";
const t = table(
    "test",
    {
        a : sd.number(),
        b : sd.string(),
        c : sd.boolean(),
        d : sd.date(),
        e : sd.buffer(),
        f : sd.nullable(sd.number())
    }
)
    .setId(c => c.c)
    .setAutoIncrement(c => c.a)
    .setGenerated(c => [
        //c.a,
        c.d
    ])
    .setHasDefaultValue(c => [
        c.e
    ])
    .addCandidateKey(c => [
        c.f,
        c.e
    ]);
t.autoIncrement
t.id
t.candidateKeys
t.generated
t.hasDefaultValue
t.mutable
const t2 = t.setImmutable();
t2.mutable
const t3 = t2.overwriteMutable(c => [
    c.c,
    c.e
]);
t3.mutable

const t4 = table(
    "test2",
    {
        a : sd.number(),
        b : sd.string(),
        e : sd.buffer(),
        f : sd.number(),
        n : sd.date(),
    }
)
.addCandidateKey(c => [
    c.f,
    c.e
])
.setGenerated(c => [c.n]);
const t5 = t4.addParent(t3);
//t4.addParent(t4);
//t5.addParent(t3)
t5.parents
const omg = t5.setName("omg");
omg;

declare const t5pcnu : Table.PolymorphicColumnNameUnion<typeof t5>;

const t6 = table(
    "test6",
    {
        a : sd.number(),
        b : sd.string(),
        e : sd.buffer(),
        f : sd.number(),
        x : sd.nullable(sd.date()),
        y : sd.nullable(sd.string()),
    }
)
.addCandidateKey(c => [
    c.f,
    c.e
])
.setAutoIncrement(c => c.f);

const t7 = t5.addParent(t6);
declare const errwe : Exclude<typeof t7["parents"][number], typeof t3>
declare const t7pcnu : Table.PolymorphicColumnNameUnion<typeof t7>;
declare const t7pgu : Table.PolymorphicGeneratedUnion<typeof t7>
const omg2 = omg.addColumns({
    g : sd.nullable(sd.boolean())
});
omg2.columns.g
omg2.hasDefaultValue

const omg3 = omg.addColumns([
    sd.field("g", sd.nullable(sd.boolean()))
]);
omg3.columns.g
omg3.hasDefaultValue
//*/ 
//# sourceMappingURL=table.js.map