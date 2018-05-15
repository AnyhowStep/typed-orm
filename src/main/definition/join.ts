import * as d from "../declaration";

export function getJoinFrom<
    ColumnReferencesT extends d.ColumnReferences,
    JoinFromTupleCallbackT extends d.JoinFromTupleCallback<ColumnReferencesT, d.Tuple<d.AnyColumn>>
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
> (table : ToTableT, callback : JoinToTupleCallbackT) : d.JoinToTupleOfCallback<JoinToTupleCallbackT> {
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
> (tuple : TupleT) : d.ToNullableJoinTuple<TupleT> {
    return tuple.map((e) => {
        return {
            joinType : e.joinType,
            table : e.table,
            nullable : true,
            from : e.from,
            to : e.to,
        };
    }) as any;
}
