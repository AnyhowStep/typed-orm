import * as sd from "schema-decorator";
import { ColumnReferences } from "./column-references";
import { Tuple, TupleKeys, TupleLength } from "./tuple";
import { AnyAliasedTable } from "./aliased-table";
import { IColumn, AnyColumn } from "./column";
import { TableAlias, TableColumns } from "./table-operation";
import { ColumnType } from "./column-operation";
import { ColumnOfReferences, ReplaceColumnOfReference } from "./column-references-operation";
export interface Join<JoinTypeT extends "FROM" | "INNER" | "LEFT" | "RIGHT", TableT extends AnyAliasedTable, ColumnReferencesT extends ColumnReferences, NullableT extends boolean> {
    joinType: JoinTypeT;
    table: TableT;
    columnReferences: ColumnReferencesT;
    nullable: NullableT;
    from: JoinTypeT extends "FROM" ? undefined : Tuple<AnyColumn>;
    to: JoinTypeT extends "FROM" ? undefined : Tuple<AnyColumn>;
}
export declare type AnyJoin = Join<any, any, any, any>;
export declare type ToNullableJoinTuple<TupleT extends Tuple<AnyJoin>> = (TupleT[TupleKeys<TupleT>] extends AnyJoin ? ({
    [index in TupleKeys<TupleT>]: (TupleT[index] extends Join<infer JoinTypeT, infer TableT, infer ColumnReferencesT, boolean> ? Join<JoinTypeT, TableT, ColumnReferencesT, true> : never);
} & {
    length: TupleLength<TupleT>;
} & ({
    [index in TupleKeys<TupleT>]: (TupleT[index] extends Join<infer JoinTypeT, infer TableT, infer ColumnReferencesT, boolean> ? Join<JoinTypeT, TableT, ColumnReferencesT, true> : never);
}[TupleKeys<TupleT>])[] & {
    "0": (Join<TupleT[0]["joinType"], TupleT[0]["table"], TupleT[0]["columnReferences"], true>);
}) : (never));
export declare type JoinFromTupleCallback<ColumnReferencesT extends ColumnReferences> = (Tuple<ColumnOfReferences<ColumnReferencesT>> | ((columnReferences: ColumnReferencesT) => Tuple<ColumnOfReferences<ColumnReferencesT>>));
export declare type JoinFromTupleOfCallback<JoinFromTupleCallbackT extends JoinFromTupleCallback<any>> = (JoinFromTupleCallbackT extends JoinFromTupleCallback<infer ColumnReferencesT> ? (JoinFromTupleCallbackT extends Tuple<ColumnOfReferences<ColumnReferencesT>> ? JoinFromTupleCallbackT : JoinFromTupleCallbackT extends (...args: any[]) => infer TupleT ? (TupleT extends Tuple<ColumnOfReferences<ColumnReferencesT>> ? TupleT : never) : never) : never);
export declare type JoinToColumn<TableT extends AnyAliasedTable, FromColumnT extends AnyColumn> = ({
    [name in Extract<keyof TableColumns<TableT>, string>]: (IColumn<TableAlias<TableT>, name, ColumnType<FromColumnT> | null>);
}[Extract<keyof TableColumns<TableT>, string>]);
export declare type JoinToTuple<TableT extends AnyAliasedTable, FromColumnsT extends Tuple<AnyColumn>> = (FromColumnsT[TupleKeys<FromColumnsT>] extends AnyColumn ? ({
    [k in TupleKeys<FromColumnsT>]: (FromColumnsT[k] extends AnyColumn ? JoinToColumn<TableT, FromColumnsT[k]> : never);
} & {
    length: TupleLength<FromColumnsT>;
} & JoinToColumn<TableT, FromColumnsT[TupleKeys<FromColumnsT>]>[] & {
    "0": JoinToColumn<TableT, FromColumnsT[0]>;
}) : (never));
export declare type JoinToTupleCallback<TableT extends AnyAliasedTable, FromColumnsT extends Tuple<AnyColumn>> = (JoinToTuple<TableT, FromColumnsT> | ((t: TableT["columns"]) => JoinToTuple<TableT, FromColumnsT>));
export declare type JoinToTupleOfCallback<JoinToTupleCallbackT extends JoinToTupleCallback<AnyAliasedTable, Tuple<AnyColumn>>> = (JoinToTupleCallbackT extends Tuple<AnyColumn> ? JoinToTupleCallbackT : JoinToTupleCallbackT extends (...args: any[]) => infer TupleT ? TupleT : ("Invalid JoinToTupleCallbackT or could not infer TupleT" | void | never));
export declare type MatchesJoinFromColumn<ColumnReferencesT extends ColumnReferences, ColumnT extends AnyColumn> = (ColumnT extends IColumn<infer AliasT, infer NameT, infer TypeT> ? (AliasT extends keyof ColumnReferencesT ? (NameT extends keyof ColumnReferencesT[AliasT] ? (sd.TypeOf<ColumnReferencesT[AliasT][NameT]["assertDelegate"]> extends TypeT ? (ColumnT) : ("TypeT mismatch" | TypeT | void)) : ("NameT is not a column" | NameT | void)) : ("AliasT is not a table reference" | AliasT | void)) : ("Could not infer alias, name, or type from ColumnT" | ColumnT | void));
export declare type MatchesJoinFromTuple<ColumnReferencesT extends ColumnReferences, JoinFromTuple extends Tuple<AnyColumn>> = (JoinFromTuple[TupleKeys<JoinFromTuple>] extends AnyColumn ? ({
    [k in TupleKeys<JoinFromTuple>]: (JoinFromTuple[k] extends AnyColumn ? MatchesJoinFromColumn<ColumnReferencesT, JoinFromTuple[k]> : never);
} & {
    length: TupleLength<JoinFromTuple>;
} & MatchesJoinFromColumn<ColumnReferencesT, JoinFromTuple[TupleKeys<JoinFromTuple>]>[] & {
    "0": MatchesJoinFromColumn<ColumnReferencesT, JoinFromTuple[0]>;
}) : (never));
export declare type ReplaceColumnOfJoin<JoinT extends AnyJoin, TableNameT extends string, NameT extends string, NewTypeT> = (JoinT extends Join<infer JoinTypeT, infer TableT, infer ColumnReferencesT, infer NullableT> ? (Join<JoinTypeT, TableT, ReplaceColumnOfReference<ColumnReferencesT, TableNameT, NameT, NewTypeT>, NullableT>) : (JoinT));
export declare type ReplaceColumnOfJoinTuple<JoinTupleT extends Tuple<AnyJoin>, TableNameT extends string, NameT extends string, NewTypeT> = (JoinTupleT[TupleKeys<JoinTupleT>] extends AnyJoin ? ({
    [k in TupleKeys<JoinTupleT>]: (JoinTupleT[k] extends AnyJoin ? ReplaceColumnOfJoin<JoinTupleT[k], TableNameT, NameT, NewTypeT> : never);
} & {
    length: TupleLength<JoinTupleT>;
} & (AnyJoin[]) & {
    "0": ReplaceColumnOfJoin<JoinTupleT[0], TableNameT, NameT, NewTypeT>;
}) : (never));
export declare type NullableJoinTableNames<JoinTupleT extends Tuple<AnyJoin>> = ({
    [index in TupleKeys<JoinTupleT>]: (JoinTupleT[index] extends Join<any, infer TableT, any, true> ? TableT["alias"] : never);
}[TupleKeys<JoinTupleT>]);
export declare type ColumnOfJoin<JoinT extends AnyJoin, TableNameT extends string, NameT extends string> = (JoinT["table"]["alias"] extends TableNameT ? ((JoinT["columnReferences"][TableNameT][NameT] extends AnyColumn ? JoinT["columnReferences"][TableNameT][NameT] : never)) : never);
export declare type ColumnOfJoinTuple<JoinTupleT extends Tuple<AnyJoin>, TableNameT extends string, NameT extends string> = ({
    [index in TupleKeys<JoinTupleT>]: (JoinTupleT[index] extends AnyJoin ? ColumnOfJoin<JoinTupleT[index], TableNameT, NameT> : never);
}[TupleKeys<JoinTupleT>]);
export declare type TableOfJoinTuple<JoinTupleT extends Tuple<AnyJoin>, TableNameT extends string> = ({
    [index in TupleKeys<JoinTupleT>]: (JoinTupleT[index] extends AnyJoin ? (JoinTupleT[index]["table"]["alias"] extends TableNameT ? JoinTupleT[index]["table"] : never) : never);
}[TupleKeys<JoinTupleT>]);
