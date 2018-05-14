import * as d from "../declaration";

export function push<TupleT extends d.Tuple<any>, NextT> (
    tuple : TupleT,
    element : NextT
) : d.TuplePush<TupleT, NextT> {
    const result = tuple.slice();
    result.push(element);
    return result as any;
}
