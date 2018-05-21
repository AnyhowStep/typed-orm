import * as d from "../declaration";
import * as sd from "schema-decorator";
import {spread} from "@anyhowstep/type-util";
import {replaceColumnOfReference} from "./column-references-operation";
import {Column} from "./column";

export class Join<
    JoinTypeT extends "FROM"|"INNER"|"LEFT"|"RIGHT",
    IndexT extends number,
    //Needed for update-builder to work, relies on `isMutable` type
    TableT extends d.AnyAliasedTable,
    ColumnReferencesT extends d.ColumnReferences,
    NullableT extends boolean
> implements d.IJoin<
    JoinTypeT, IndexT, TableT, ColumnReferencesT, NullableT
> {
    readonly joinType : JoinTypeT;
    readonly index : IndexT;
    readonly table : TableT;
    readonly columnReferences : ColumnReferencesT;
    readonly nullable : NullableT;

    readonly from : d.AnyColumn[];
    readonly to : d.AnyColumn[];

    constructor (
        joinType : JoinTypeT,
        index : IndexT,
        table : TableT,
        columnReferences : ColumnReferencesT,
        nullable : NullableT,
        from : d.AnyColumn[],
        to : d.AnyColumn[]
    ) {
        this.joinType = joinType;
        this.index = index;
        this.table = table;
        this.columnReferences = columnReferences;
        this.nullable = nullable;

        this.from = from;
        this.to = to;
    }
}

export function getJoinFrom<
    ColumnReferencesT extends d.ColumnReferences,
    JoinFromTupleCallbackT extends d.JoinFromTupleCallback<ColumnReferencesT>
> (columnReferences : ColumnReferencesT, callback : JoinFromTupleCallbackT) : d.JoinFromTupleOfCallback<JoinFromTupleCallbackT> {
    if (callback instanceof Array) {
        return callback as any;
    } else {
        return (callback as any)(columnReferences);
    }
}

export function getJoinTo<
    ToTableT extends d.AnyAliasedTable,
    JoinToTupleCallbackT extends d.JoinToTupleCallback<ToTableT, d.Tuple<d.AnyColumn>>
> (table : ToTableT, callback : JoinToTupleCallbackT) : any {//HACK d.JoinToTupleOfCallback<JoinToTupleCallbackT> {
    if (callback instanceof Array) {
        return callback as any;
    } else {
        return (callback as any)(table.columns);
    }
}

export function getJoinToUsingFrom<
    ToTableT extends d.AnyAliasedTable,
    TupleT extends d.Tuple<d.AnyColumn>
> (table : ToTableT, fromTuple : TupleT) : d.RenameTableOfColumns<TupleT, ToTableT["alias"]> {
    return fromTuple.map((f) => {
        const column = (table.columns as any)[f.name];
        if (column == undefined) {
            throw new Error(`Table ${table.alias} does not have column ${f.name}`);
        }
        return column;
    }) as any;
}

export function toNullableJoinTuple<
    TupleT extends d.Tuple<d.AnyJoin>
> (tuple : TupleT) : d.ToNullableJoins<TupleT> {
    return tuple.map((e) => {
        return {
            joinType : e.joinType,
            table : e.table,
            columnReferences : e.columnReferences,
            nullable : true,
            from : e.from,
            to : e.to,
        };
    }) as any;
}

export function replaceColumnOfJoin<
    JoinT extends d.AnyJoin,
    TableNameT extends string,
    NameT extends string,
    NewTypeT
> (
    join : JoinT,
    newColumn : Column<TableNameT, NameT, NewTypeT>
) : d.ReplaceColumnOfJoin<
    JoinT,
    TableNameT,
    NameT,
    NewTypeT
> {
    return spread(
        join,
        {
            columnReferences : replaceColumnOfReference(
                join.columnReferences,
                newColumn
            )
        }
    ) as any;
}

export function replaceColumnOfJoinTuple<
    JoinTupleT extends d.Tuple<d.AnyJoin>,
    TableNameT extends string,
    NameT extends string,
    NewTypeT
> (
    joinTuple : JoinTupleT,
    newColumn : Column<TableNameT, NameT, NewTypeT>
) : d.ReplaceColumnOfJoins<
    JoinTupleT,
    TableNameT,
    NameT,
    NewTypeT
> {
    const result : any[] = [];
    for (let join of joinTuple) {
        result.push(replaceColumnOfJoin(join, newColumn));
    }
    return result as any;
}

export function nullableJoinTableNames<
    JoinTupleT extends d.Tuple<d.AnyJoin>
> (
    joins : JoinTupleT
) : d.NullableJoinTableNames<JoinTupleT>[] {
    return joins
        .filter(j => j.nullable)
        .map(j => j.table.alias);
}

export function assertDelegateOfJoinTuple<
    JoinTupleT extends d.Tuple<d.AnyJoin>,
    TableNameT extends string,
    NameT extends string
> (
    joins : JoinTupleT,
    table : TableNameT,
    name : NameT
) : sd.AssertDelegate<d.ColumnType<
    d.ColumnOfJoinTuple<JoinTupleT, TableNameT, NameT>
>> {
    const result = joins
        .filter((j) => {
            return (
                j.table.alias == table &&
                (j.columnReferences[table] instanceof Object) &&
                (j.columnReferences[table][name] instanceof Column)
            );
        });
    if (result.length == 0) {
        throw new Error(`No such column ${table}.${name} in joins`);
    }
    if (result.length != 1) {
        throw new Error(`Should not have multiple columns ${table}.${name} in joins`);
    }
    return result[0].columnReferences[table][name].assertDelegate;
}
