import * as d from "../declaration";
export declare function push<TupleT extends d.Tuple<any>, NextT>(tuple: TupleT, element: NextT): d.TuplePush<TupleT, NextT>;
export declare function concat<T extends d.Tuple<any>, U extends d.Tuple<any>>(t: T, u: U): d.TupleConcat<T, U>;
