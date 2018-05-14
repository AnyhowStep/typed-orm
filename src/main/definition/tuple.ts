import * as d from "../declaration";

export function push<TupleT extends d.Tuple<any>, NextT> (
    tuple : TupleT,
    element : NextT
) : d.TuplePush<TupleT, NextT> {
    const result = tuple.slice();
    result.push(element);
    return result as any;
}

export function concat<
    T extends d.Tuple<any>,
    U extends d.Tuple<any>
> (
    t : T, u : U
) : d.TupleConcat<T, U> {
    return t.concat(u) as any;
}
