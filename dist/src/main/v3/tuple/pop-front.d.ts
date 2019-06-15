export declare type PopFront<A extends any[]> = (((...arr: A) => void) extends ((first: any, ...arr: infer B) => void) ? B : never);
export declare function popFront<TupleT extends any[]>(tuple: TupleT): ([TupleT[0], PopFront<TupleT>]);
