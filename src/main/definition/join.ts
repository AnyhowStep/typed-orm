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

export function toNullableJoinTuple<
    TupleT extends d.Tuple<d.AnyJoin>
> (tuple : TupleT) : d.ToNullableJoinTuple<TupleT> {
    return tuple.map((e) => {
        return {
            alias : e.alias,
            nullable : true,
        };
    }) as any;
}
