import * as d from "../declaration";
export declare function getJoinFrom<ColumnReferencesT extends d.ColumnReferences, JoinFromTupleCallbackT extends d.JoinFromTupleCallback<ColumnReferencesT, d.Tuple<d.AnyColumn>>>(columnReferences: ColumnReferencesT, callback: JoinFromTupleCallbackT): d.JoinFromTupleOfCallback<JoinFromTupleCallbackT>;
export declare function getJoinTo<ToTableT extends d.AnyAliasedTable, JoinToTupleCallbackT extends d.JoinToTupleCallback<ToTableT, d.Tuple<d.AnyColumn>>>(table: ToTableT, callback: JoinToTupleCallbackT): any;
export declare function getJoinToUsingFrom<ToTableT extends d.AnyAliasedTable, TupleT extends d.Tuple<d.AnyColumn>>(table: ToTableT, fromTuple: TupleT): d.RenameTableOfColumns<TupleT, ToTableT["alias"]>;
export declare function toNullableJoinTuple<TupleT extends d.Tuple<d.AnyJoin>>(tuple: TupleT): d.ToNullableJoinTuple<TupleT>;
