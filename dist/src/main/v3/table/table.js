"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const sqlstring_1 = require("sqlstring");
const aliased_table_1 = require("../aliased-table");
const column_map_1 = require("../column-map");
const candidate_key_array_1 = require("../candidate-key-array");
const column_1 = require("../column");
const type_map_1 = require("../type-map");
const string_array_1 = require("../string-array");
class Table {
    constructor(data, { unaliasedQuery, }) {
        this.usedRef = data.usedRef;
        this.alias = data.alias;
        this.columns = data.columns;
        this.unaliasedQuery = unaliasedQuery;
        this.autoIncrement = data.autoIncrement;
        this.id = data.id;
        this.candidateKeys = data.candidateKeys;
        this.generated = data.generated;
        this.isNullable = data.isNullable;
        this.hasExplicitDefaultValue = data.hasExplicitDefaultValue;
        this.mutable = data.mutable;
        this.parents = data.parents;
        this.insertAllowed = data.insertAllowed;
        this.deleteAllowed = data.deleteAllowed;
    }
    as(newAlias) {
        return Table.as(this, newAlias);
    }
    candidateKeyAssertDelegate() {
        if (this.cachedCandidateKeyAssertDelegate == undefined) {
            this.cachedCandidateKeyAssertDelegate = (Table.candidateKeyAssertDelegate(this));
        }
        return this.cachedCandidateKeyAssertDelegate;
    }
    superKeyAssertDelegate() {
        if (this.cachedSuperKeyAssertDelegate == undefined) {
            this.cachedSuperKeyAssertDelegate = (Table.superKeyAssertDelegate(this));
        }
        return this.cachedSuperKeyAssertDelegate;
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
    /*
        TODO-FEATURE Adding a candidate key that is a super-set of
        an existing candidate key should throw an error,
        both during compile-time and run-time.

        Candidate keys should be as small as possible.
    */
    addCandidateKey(delegate) {
        return Table.addCandidateKey(this, delegate);
    }
    setGenerated(delegate) {
        return Table.setGenerated(this, delegate);
    }
    setHasExplicitDefaultValue(delegate) {
        return Table.setHasExplicitDefaultValue(this, delegate);
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
    function as({ usedRef, columns, unaliasedQuery, }, newAlias) {
        //https://github.com/Microsoft/TypeScript/issues/28592
        const columns2 = columns;
        return new aliased_table_1.AliasedTable({
            usedRef: usedRef,
            alias: newAlias,
            columns: column_map_1.ColumnMapUtil.withTableAlias(columns2, newAlias),
        }, { unaliasedQuery });
    }
    Table.as = as;
})(Table = exports.Table || (exports.Table = {}));
(function (Table) {
    //TODO-FEATURE Change this to setAlias?
    function setName(table, newName) {
        //https://github.com/Microsoft/TypeScript/issues/28592
        const columns = table.columns;
        const { usedRef, autoIncrement, id, candidateKeys, generated, isNullable, hasExplicitDefaultValue, mutable, parents, insertAllowed, deleteAllowed, } = table;
        return new Table({
            usedRef,
            alias: newName,
            columns: column_map_1.ColumnMapUtil.withTableAlias(columns, newName),
            autoIncrement,
            id,
            candidateKeys,
            generated,
            isNullable,
            hasExplicitDefaultValue,
            mutable,
            parents,
            insertAllowed,
            deleteAllowed,
        }, {
            unaliasedQuery: sqlstring_1.escapeId(newName),
        });
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
        const isNullable = column_1.ColumnUtil.Name.Array.nullableFromColumnMap(columns);
        const { usedRef, alias, autoIncrement, id, candidateKeys, generated, hasExplicitDefaultValue, mutable, parents, insertAllowed, deleteAllowed, unaliasedQuery, } = table;
        const result = new Table({
            usedRef,
            alias,
            columns,
            autoIncrement,
            id,
            candidateKeys,
            generated,
            isNullable,
            hasExplicitDefaultValue,
            mutable,
            parents,
            insertAllowed,
            deleteAllowed,
        }, { unaliasedQuery });
        return result;
    }
    Table.addColumnsFromFieldTuple = addColumnsFromFieldTuple;
})(Table = exports.Table || (exports.Table = {}));
(function (Table) {
    function addColumnsFromAssertMap(table, assertMap) {
        //https://github.com/Microsoft/TypeScript/issues/28592
        const tableColumns = table.columns;
        const columns = column_map_1.ColumnMapUtil.intersect(tableColumns, column_map_1.ColumnMapUtil.fromAssertMap(table.alias, assertMap));
        const isNullable = column_1.ColumnUtil.Name.Array.nullableFromColumnMap(columns);
        const { usedRef, alias, autoIncrement, id, candidateKeys, generated, hasExplicitDefaultValue, mutable, parents, insertAllowed, deleteAllowed, unaliasedQuery, } = table;
        const result = new Table({
            usedRef,
            alias,
            columns,
            autoIncrement,
            id,
            candidateKeys,
            generated,
            isNullable,
            hasExplicitDefaultValue,
            mutable,
            parents,
            insertAllowed,
            deleteAllowed,
        }, { unaliasedQuery });
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
    function candidateKeyAssertDelegate(table) {
        //https://github.com/Microsoft/TypeScript/issues/28592
        const candidateKeys = table.candidateKeys;
        const columns = table.columns;
        return type_map_1.TypeMapUtil.assertDelegateFromCandidateKeyArray(candidateKeys, columns);
    }
    Table.candidateKeyAssertDelegate = candidateKeyAssertDelegate;
    function superKeyAssertDelegate(table) {
        //https://github.com/Microsoft/TypeScript/issues/28592
        const candidateKeys = table.candidateKeys;
        const columns = table.columns;
        return type_map_1.TypeMapUtil.superKeyAssertDelegateFromCandidateKeyArray(candidateKeys, columns);
    }
    Table.superKeyAssertDelegate = superKeyAssertDelegate;
})(Table = exports.Table || (exports.Table = {}));
(function (Table) {
    function setAutoIncrement(table, delegate) {
        //https://github.com/Microsoft/TypeScript/issues/28592
        const columns = table.columns;
        //https://github.com/Microsoft/TypeScript/issues/24277
        const autoIncrement = delegate(columns);
        column_map_1.ColumnMapUtil.assertHasColumnIdentifier(table.columns, autoIncrement);
        const candidateKeys = string_array_1.StringArrayUtil.uniqueStringArray(table.candidateKeys.concat([
            [autoIncrement.name]
        ]));
        const generated = (table.generated.indexOf(autoIncrement.name) >= 0) ?
            table.generated :
            [
                ...table.generated,
                autoIncrement.name
            ];
        const hasExplicitDefaultValue = (table.hasExplicitDefaultValue.indexOf(autoIncrement.name) >= 0) ?
            table.hasExplicitDefaultValue :
            [
                ...table.hasExplicitDefaultValue,
                autoIncrement.name,
            ];
        const mutable = table.mutable.filter((columnName) => {
            return (columnName != autoIncrement.name);
        });
        const { usedRef, alias, isNullable, parents, insertAllowed, deleteAllowed, unaliasedQuery, } = table;
        const result = new Table({
            usedRef,
            alias,
            columns,
            autoIncrement: autoIncrement.name,
            id: autoIncrement.name,
            candidateKeys,
            generated,
            isNullable,
            hasExplicitDefaultValue,
            mutable,
            parents,
            insertAllowed,
            deleteAllowed,
        }, { unaliasedQuery });
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
        const { usedRef, alias, autoIncrement, generated, isNullable, hasExplicitDefaultValue, mutable, parents, insertAllowed, deleteAllowed, unaliasedQuery, } = table;
        const result = new Table({
            usedRef,
            alias,
            columns,
            autoIncrement,
            id: id.name,
            candidateKeys,
            generated,
            isNullable,
            hasExplicitDefaultValue,
            mutable,
            parents,
            insertAllowed,
            deleteAllowed,
        }, { unaliasedQuery });
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
        const candidateKeys = string_array_1.StringArrayUtil.uniqueStringArray(table.candidateKeys.concat([
            candidateKeyColumns.map(candidateKeyColumn => candidateKeyColumn.name)
        ]));
        const { usedRef, alias, autoIncrement, id, generated, isNullable, hasExplicitDefaultValue, mutable, parents, insertAllowed, deleteAllowed, unaliasedQuery, } = table;
        const result = new Table({
            usedRef,
            alias,
            columns,
            autoIncrement,
            id,
            candidateKeys,
            generated,
            isNullable,
            hasExplicitDefaultValue,
            mutable,
            parents,
            insertAllowed,
            deleteAllowed,
        }, { unaliasedQuery });
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
                throw new Error(`Column ${table.alias}.${generatedColumn.name} already declared generated`);
            }
            column_map_1.ColumnMapUtil.assertHasColumnIdentifier(table.columns, generatedColumn);
        }
        const generated = string_array_1.StringArrayUtil.uniqueString([
            ...table.generated,
            ...generatedColumns.map(column => column.name),
        ]);
        const hasExplicitDefaultValue = string_array_1.StringArrayUtil.uniqueString([
            ...table.hasExplicitDefaultValue,
            ...generatedColumns.map(column => column.name),
        ]);
        const mutable = string_array_1.StringArrayUtil.uniqueString(table.mutable.filter((columnName) => {
            return generatedColumns.every(column => column.name != columnName);
        }));
        const { usedRef, alias, autoIncrement, id, candidateKeys, isNullable, parents, insertAllowed, deleteAllowed, unaliasedQuery, } = table;
        const result = new Table({
            usedRef,
            alias,
            columns,
            autoIncrement,
            id,
            candidateKeys,
            generated,
            isNullable,
            hasExplicitDefaultValue,
            mutable,
            parents,
            insertAllowed,
            deleteAllowed,
        }, { unaliasedQuery });
        return result;
    }
    Table.setGenerated = setGenerated;
})(Table = exports.Table || (exports.Table = {}));
(function (Table) {
    function setHasExplicitDefaultValue(table, delegate) {
        //https://github.com/Microsoft/TypeScript/issues/28592
        const columns = table.columns;
        //https://github.com/Microsoft/TypeScript/issues/24277
        const hasExplicitDefaultValueColumns = delegate(columns);
        for (let hasExplicitDefaultValueColumn of hasExplicitDefaultValueColumns) {
            if (table.hasExplicitDefaultValue.indexOf(hasExplicitDefaultValueColumn.name) >= 0) {
                throw new Error(`Column ${table.alias}.${hasExplicitDefaultValueColumn.name} already declared as having a default value`);
            }
            column_map_1.ColumnMapUtil.assertHasColumnIdentifier(table.columns, hasExplicitDefaultValueColumn);
        }
        const hasExplicitDefaultValue = string_array_1.StringArrayUtil.uniqueString([
            ...table.hasExplicitDefaultValue,
            ...hasExplicitDefaultValueColumns.map(column => column.name),
        ]);
        const { usedRef, alias, autoIncrement, id, candidateKeys, generated, isNullable, mutable, parents, insertAllowed, deleteAllowed, unaliasedQuery, } = table;
        const result = new Table({
            usedRef,
            alias,
            columns,
            autoIncrement,
            id,
            candidateKeys,
            generated,
            isNullable,
            hasExplicitDefaultValue,
            mutable,
            parents,
            insertAllowed,
            deleteAllowed,
        }, { unaliasedQuery });
        return result;
    }
    Table.setHasExplicitDefaultValue = setHasExplicitDefaultValue;
})(Table = exports.Table || (exports.Table = {}));
(function (Table) {
    function setImmutable(table) {
        const { usedRef, alias, columns, autoIncrement, id, candidateKeys, generated, isNullable, hasExplicitDefaultValue, parents, insertAllowed, deleteAllowed, unaliasedQuery, } = table;
        return new Table({
            usedRef,
            alias,
            columns,
            autoIncrement,
            id,
            candidateKeys,
            generated,
            isNullable,
            hasExplicitDefaultValue,
            mutable: [],
            parents,
            insertAllowed,
            deleteAllowed,
        }, { unaliasedQuery });
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
                throw new Error(`Column ${table.alias}.${mutableColumn.name} is generated and cannot be mutable`);
            }
            column_map_1.ColumnMapUtil.assertHasColumnIdentifier(table.columns, mutableColumn);
        }
        //TODO-FEATURE Make other arrays of strings always
        //have unique elements?
        const mutable = (string_array_1.StringArrayUtil.uniqueString(mutableColumns.map(column => column.name)));
        const { usedRef, alias, autoIncrement, id, candidateKeys, generated, isNullable, hasExplicitDefaultValue, parents, insertAllowed, deleteAllowed, unaliasedQuery, } = table;
        const result = new Table({
            usedRef,
            alias,
            columns,
            autoIncrement,
            id,
            candidateKeys,
            generated,
            isNullable,
            hasExplicitDefaultValue,
            mutable,
            parents,
            insertAllowed,
            deleteAllowed,
        }, { unaliasedQuery });
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
            throw new Error(`No common candidate keys found between table ${table.alias} and parent ${parent.alias}`);
        }
        ;
        if (table.alias == parent.alias) {
            throw new Error(`Parent ${table.alias} cannot have same alias as table`);
        }
        for (let otherParent of table.parents) {
            if (otherParent.alias == parent.alias) {
                throw new Error(`Parent ${parent.alias} already added to table`);
            }
        }
        //TODO-FEATURE Recursively find incompatible types
        for (let columnName in table.columns) {
            const parentColumn = parent.columns[columnName];
            if (parentColumn == undefined) {
                continue;
            }
            if (sd.isNullable(table.columns[columnName].assertDelegate) !=
                sd.isNullable(parentColumn.assertDelegate)) {
                throw new Error(`Parent ${parent.alias}.${columnName} and ${table.alias}.${columnName} have incompatible types; one is nullable, the other is not`);
            }
        }
        const parents = [
            ...table.parents,
            ...parent.parents,
            parent
        ];
        const { usedRef, alias, columns, autoIncrement, id, candidateKeys, generated, isNullable, hasExplicitDefaultValue, mutable, insertAllowed, deleteAllowed, unaliasedQuery, } = table;
        return new Table({
            usedRef,
            alias,
            columns,
            autoIncrement,
            id,
            candidateKeys,
            generated,
            isNullable,
            hasExplicitDefaultValue,
            mutable,
            parents,
            insertAllowed,
            deleteAllowed,
        }, { unaliasedQuery });
    }
    Table.addParent = addParent;
})(Table = exports.Table || (exports.Table = {}));
(function (Table) {
    function disallowInsert(table) {
        const { usedRef, alias, columns, autoIncrement, id, candidateKeys, generated, isNullable, hasExplicitDefaultValue, mutable, parents, deleteAllowed, unaliasedQuery, } = table;
        return new Table({
            usedRef,
            alias,
            columns,
            autoIncrement,
            id,
            candidateKeys,
            generated,
            isNullable,
            hasExplicitDefaultValue,
            mutable,
            parents,
            insertAllowed: false,
            deleteAllowed,
        }, { unaliasedQuery });
    }
    Table.disallowInsert = disallowInsert;
    function disallowDelete(table) {
        const { usedRef, alias, columns, autoIncrement, id, candidateKeys, generated, isNullable, hasExplicitDefaultValue, mutable, parents, insertAllowed, unaliasedQuery, } = table;
        return new Table({
            usedRef,
            alias,
            columns,
            autoIncrement,
            id,
            candidateKeys,
            generated,
            isNullable,
            hasExplicitDefaultValue,
            mutable,
            parents,
            insertAllowed,
            deleteAllowed: false,
        }, { unaliasedQuery });
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
    .setHasExplicitDefaultValue(c => [
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
t.hasExplicitDefaultValue
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
omg2.hasExplicitDefaultValue

const omg3 = omg.addColumns([
    sd.field("g", sd.nullable(sd.boolean()))
]);
omg3.columns.g
omg3.hasExplicitDefaultValue
//*/ 
//# sourceMappingURL=table.js.map