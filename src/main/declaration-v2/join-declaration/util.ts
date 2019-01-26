import {JoinType} from "../join";
import {Tuple, TupleKeys} from "../tuple";
import {JoinDeclaration, JoinDeclarationUsage, InnerOrLeftJoinDeclarationUsage, CrossJoinDeclarationUsage, ImplicitJoinDeclarationUsage} from "./join-declaration";

export namespace JoinDeclarationUtil {
    export type ToTableOf<T extends JoinDeclarationUsage> = (
        T extends ImplicitJoinDeclarationUsage ?
        T["toTable"] :
        T extends InnerOrLeftJoinDeclarationUsage ?
        T[1]["toTable"] :
        T extends CrossJoinDeclarationUsage ?
        T[1] :
        never
    );
    function isImplicitJoinDeclarationUsage (t : JoinDeclarationUsage) : t is ImplicitJoinDeclarationUsage {
        return (t instanceof JoinDeclaration);
    }
    function isInnerOrLeftJoinDeclarationUsage (t : JoinDeclarationUsage) : t is InnerOrLeftJoinDeclarationUsage {
        return (!isImplicitJoinDeclarationUsage(t) && t[1] instanceof JoinDeclaration);
    }
    function isCrossJoinDeclarationUsage (t : JoinDeclarationUsage) : t is CrossJoinDeclarationUsage {
        return (!isImplicitJoinDeclarationUsage(t) && !isInnerOrLeftJoinDeclarationUsage(t));
    }
    export function toTableOf<T extends JoinDeclarationUsage> (t : T) : (
        ToTableOf<T>
    ) {
        if (isImplicitJoinDeclarationUsage(t)) {
            return t.toTable as any;
        } else if (isInnerOrLeftJoinDeclarationUsage(t)) {
            return t[1].toTable as any;
        } else if (isCrossJoinDeclarationUsage(t)) {
            return t[1] as any;
        } else {
            throw new Error(`Unknown JoinDeclarationUsage`);
        }
    }
    export type FromColumnsOf<T extends JoinDeclarationUsage> = (
        T extends ImplicitJoinDeclarationUsage ?
        T["fromColumns"] :
        T extends InnerOrLeftJoinDeclarationUsage ?
        T[1]["fromColumns"] :
        T extends CrossJoinDeclarationUsage ?
        {
            [n : number] : never
        } :
        never
    );
    export function fromColumnsOf<T extends JoinDeclarationUsage> (t : T) : (
        FromColumnsOf<T>
    ) {
        if (isImplicitJoinDeclarationUsage(t)) {
            return t.fromColumns as any;
        } else if (isInnerOrLeftJoinDeclarationUsage(t)) {
            return t[1].fromColumns as any;
        } else {
            return [] as any;
        }
    }
    export type ToColumnsOf<T extends JoinDeclarationUsage> = (
        T extends ImplicitJoinDeclarationUsage ?
        T["toColumns"] :
        T extends InnerOrLeftJoinDeclarationUsage ?
        T[1]["toColumns"] :
        T extends CrossJoinDeclarationUsage ?
        {
            [n : number] : never
        } :
        never
    );
    export function toColumnsOf<T extends JoinDeclarationUsage> (t : T) : (
        ToColumnsOf<T>
    ) {
        if (isImplicitJoinDeclarationUsage(t)) {
            return t.toColumns as any;
        } else if (isInnerOrLeftJoinDeclarationUsage(t)) {
            return t[1].toColumns as any;
        } else {
            return [] as any;
        }
    }
    export type ToAliasOf<T extends JoinDeclarationUsage> = (
        T extends ImplicitJoinDeclarationUsage ?
        T["toTable"]["alias"] :
        T extends InnerOrLeftJoinDeclarationUsage ?
        T[1]["toTable"]["alias"] :
        T extends CrossJoinDeclarationUsage ?
        T[1]["alias"] :
        never
    );
    export type JoinTypeOf<T extends JoinDeclarationUsage> = (
        T extends ImplicitJoinDeclarationUsage ?
        T["defaultJoinType"] :
        T extends InnerOrLeftJoinDeclarationUsage ?
        T[0] :
        T extends CrossJoinDeclarationUsage ?
        T[0] :
        never
    );
    export function joinTypeOf<T extends JoinDeclarationUsage> (t : T) : (
        JoinTypeOf<T>
    ) {
        if (isImplicitJoinDeclarationUsage(t)) {
            return t.defaultJoinType as any;
        } else if (isInnerOrLeftJoinDeclarationUsage(t)) {
            return t[0] as any;
        } else {
            return JoinType.CROSS as any;
        }
    }

    export type HasDuplicateTableAlias<TupleT extends Tuple<JoinDeclarationUsage>> = (
        TupleT["length"] extends 1 ?
            //If there's only one column, it's not a duplicate
            false :
            (
                {
                    [index in TupleKeys<TupleT>]: (
                        {
                            [other in Exclude<TupleKeys<TupleT>, index>] : (
                                Extract<
                                    ToAliasOf<Extract<TupleT[index], JoinDeclarationUsage>>,
                                    ToAliasOf<Extract<TupleT[other], JoinDeclarationUsage>>
                                > extends never ?
                                    false :
                                    true
                            )
                        }[Exclude<TupleKeys<TupleT>, index>]
                    )
                }[TupleKeys<TupleT>]
            )
    );
    export type DuplicateTableAlias<TupleT extends Tuple<JoinDeclarationUsage>> = (
        TupleT["length"] extends 1 ?
            //If there's only one column, it's not a duplicate
            never :
            (
                {
                    [index in TupleKeys<TupleT>]: (
                        {
                            [other in Exclude<TupleKeys<TupleT>, index>] : (
                                Extract<
                                    ToAliasOf<Extract<TupleT[index], JoinDeclarationUsage>>,
                                    ToAliasOf<Extract<TupleT[other], JoinDeclarationUsage>>
                                > extends never ?
                                    never :
                                    //This is a duplicate
                                    ToAliasOf<Extract<TupleT[index], JoinDeclarationUsage>>
                            )
                        }[Exclude<TupleKeys<TupleT>, index>]
                    )
                }[TupleKeys<TupleT>]
            )
    );
}