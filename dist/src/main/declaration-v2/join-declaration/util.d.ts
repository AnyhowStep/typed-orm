import { Tuple, TupleKeys } from "../tuple";
import { JoinDeclarationUsage, InnerOrLeftJoinDeclarationUsage, CrossJoinDeclarationUsage, ImplicitJoinDeclarationUsage } from "./join-declaration";
export declare namespace JoinDeclarationUtil {
    type ToTableOf<T extends JoinDeclarationUsage> = (T extends ImplicitJoinDeclarationUsage ? T["toTable"] : T extends InnerOrLeftJoinDeclarationUsage ? T[1]["toTable"] : T extends CrossJoinDeclarationUsage ? T[1] : never);
    function toTableOf<T extends JoinDeclarationUsage>(t: T): (ToTableOf<T>);
    type FromColumnsOf<T extends JoinDeclarationUsage> = (T extends ImplicitJoinDeclarationUsage ? T["fromColumns"] : T extends InnerOrLeftJoinDeclarationUsage ? T[1]["fromColumns"] : T extends CrossJoinDeclarationUsage ? {
        [n: number]: never;
    } : never);
    function fromColumnsOf<T extends JoinDeclarationUsage>(t: T): (FromColumnsOf<T>);
    type ToColumnsOf<T extends JoinDeclarationUsage> = (T extends ImplicitJoinDeclarationUsage ? T["toColumns"] : T extends InnerOrLeftJoinDeclarationUsage ? T[1]["toColumns"] : T extends CrossJoinDeclarationUsage ? {
        [n: number]: never;
    } : never);
    function toColumnsOf<T extends JoinDeclarationUsage>(t: T): (ToColumnsOf<T>);
    type ToAliasOf<T extends JoinDeclarationUsage> = (T extends ImplicitJoinDeclarationUsage ? T["toTable"]["alias"] : T extends InnerOrLeftJoinDeclarationUsage ? T[1]["toTable"]["alias"] : T extends CrossJoinDeclarationUsage ? T[1]["alias"] : never);
    type JoinTypeOf<T extends JoinDeclarationUsage> = (T extends ImplicitJoinDeclarationUsage ? T["defaultJoinType"] : T extends InnerOrLeftJoinDeclarationUsage ? T[0] : T extends CrossJoinDeclarationUsage ? T[0] : never);
    function joinTypeOf<T extends JoinDeclarationUsage>(t: T): (JoinTypeOf<T>);
    type HasDuplicateTableAlias<TupleT extends Tuple<JoinDeclarationUsage>> = (TupleT["length"] extends 1 ? false : ({
        [index in TupleKeys<TupleT>]: ({
            [other in Exclude<TupleKeys<TupleT>, index>]: (Extract<ToAliasOf<Extract<TupleT[index], JoinDeclarationUsage>>, ToAliasOf<Extract<TupleT[other], JoinDeclarationUsage>>> extends never ? false : true);
        }[Exclude<TupleKeys<TupleT>, index>]);
    }[TupleKeys<TupleT>]));
    type DuplicateTableAlias<TupleT extends Tuple<JoinDeclarationUsage>> = (TupleT["length"] extends 1 ? never : ({
        [index in TupleKeys<TupleT>]: ({
            [other in Exclude<TupleKeys<TupleT>, index>]: (Extract<ToAliasOf<Extract<TupleT[index], JoinDeclarationUsage>>, ToAliasOf<Extract<TupleT[other], JoinDeclarationUsage>>> extends never ? never : ToAliasOf<Extract<TupleT[index], JoinDeclarationUsage>>);
        }[Exclude<TupleKeys<TupleT>, index>]);
    }[TupleKeys<TupleT>]));
}
//# sourceMappingURL=util.d.ts.map