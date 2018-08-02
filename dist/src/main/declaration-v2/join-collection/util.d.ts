import * as sd from "schema-decorator";
import { JoinCollection } from "./join-collection";
import { TupleKeys, TupleLength, TupleWPush } from "../tuple";
import { ColumnCollectionUtil } from "../column-collection";
import { Join, AnyJoin, JoinUtil } from "../join";
import { AnyColumn, ColumnTupleUtil } from "../column";
import { AnyAliasedTable, AliasedTableUtil } from "../aliased-table";
import { JoinFromDelegate } from "../join-from-delegate";
import { JoinToDelegate, JoinToDelegateUtil } from "../join-to-delegate";
import * as invalid from "../invalid";
import { AnySelectBuilder } from "../select-builder";
import { AliasedTable } from "../aliased-table";
import { ColumnCollection } from "../column-collection";
export declare namespace JoinCollectionUtil {
    type FindWithTableAlias<JoinsT extends JoinCollection, TableAliasT extends string> = ({
        [index in TupleKeys<JoinsT>]: (JoinsT[index] extends AnyJoin ? (JoinsT[index]["table"]["alias"] extends TableAliasT ? JoinsT[index] : never) : never);
    }[TupleKeys<JoinsT>]);
    type IndexWithTableAlias<JoinsT extends JoinCollection, TableAliasT extends string> = ({
        [index in TupleKeys<JoinsT>]: (JoinsT[index] extends AnyJoin ? (JoinsT[index]["table"]["alias"] extends TableAliasT ? index : never) : never);
    }[TupleKeys<JoinsT>]);
    type TableAliases<JoinsT extends JoinCollection> = (JoinsT[TupleKeys<JoinsT>] extends AnyJoin ? JoinsT[TupleKeys<JoinsT>]["table"]["alias"] : never);
    type Tables<JoinsT extends JoinCollection> = (JoinsT[TupleKeys<JoinsT>] extends AnyJoin ? JoinsT[TupleKeys<JoinsT>]["table"] : never);
    type ToTableCollectionImpl<JoinsT extends JoinCollection, K extends string> = (K extends Extract<keyof JoinsT, string> ? (JoinsT[K] extends Join<infer TableT, any, any> ? {
        readonly [tableAlias in TableT["alias"]]: (TableT);
    } : {}) : {});
    type ToTableCollection<JoinsT extends JoinCollection> = (ToTableCollectionImpl<JoinsT, "0"> & ToTableCollectionImpl<JoinsT, "1"> & ToTableCollectionImpl<JoinsT, "2"> & ToTableCollectionImpl<JoinsT, "3"> & ToTableCollectionImpl<JoinsT, "4"> & ToTableCollectionImpl<JoinsT, "5"> & ToTableCollectionImpl<JoinsT, "6"> & ToTableCollectionImpl<JoinsT, "7"> & ToTableCollectionImpl<JoinsT, "8"> & ToTableCollectionImpl<JoinsT, "9"> & ToTableCollectionImpl<JoinsT, "10"> & ToTableCollectionImpl<JoinsT, "11"> & ToTableCollectionImpl<JoinsT, "12"> & ToTableCollectionImpl<JoinsT, "13"> & ToTableCollectionImpl<JoinsT, "14"> & ToTableCollectionImpl<JoinsT, "15"> & ToTableCollectionImpl<JoinsT, "16"> & ToTableCollectionImpl<JoinsT, "17"> & ToTableCollectionImpl<JoinsT, "18"> & ToTableCollectionImpl<JoinsT, "19"> & ToTableCollectionImpl<JoinsT, "20">);
    function toTableCollection<JoinsT extends JoinCollection>(joins: JoinsT): ToTableCollection<JoinsT>;
    type Columns<JoinsT extends JoinCollection> = ({
        [index in TupleKeys<JoinsT>]: (JoinsT[index] extends AnyJoin ? (ColumnCollectionUtil.Columns<JoinsT[index]["columns"]>) : never);
    }[TupleKeys<JoinsT>]);
    type NullableColumns<JoinsT extends JoinCollection> = ({
        [index in TupleKeys<JoinsT>]: (JoinsT[index] extends AnyJoin ? ColumnCollectionUtil.Columns<ColumnCollectionUtil.ToNullable<JoinsT[index]["columns"]>> : never);
    }[TupleKeys<JoinsT>]);
    const push: <TupleT extends import("../tuple").Tuple<Join<AliasedTable<string, string, ColumnCollection>, ColumnCollection, boolean>>, NextT extends Join<AliasedTable<string, string, ColumnCollection>, ColumnCollection, boolean>>(tuple: TupleT, next: NextT) => { [index in Extract<keyof TupleT, "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30">]: TupleT[index] extends Join<AliasedTable<string, string, ColumnCollection>, ColumnCollection, boolean> ? TupleT[index] : never; } & { [index in TupleT extends {
        "19": any;
    } ? "20" : TupleT extends {
        "18": any;
    } ? "19" : TupleT extends {
        "17": any;
    } ? "18" : TupleT extends {
        "16": any;
    } ? "17" : TupleT extends {
        "15": any;
    } ? "16" : TupleT extends {
        "14": any;
    } ? "15" : TupleT extends {
        "13": any;
    } ? "14" : TupleT extends {
        "12": any;
    } ? "13" : TupleT extends {
        "11": any;
    } ? "12" : TupleT extends {
        "10": any;
    } ? "11" : TupleT extends {
        "9": any;
    } ? "10" : TupleT extends {
        "8": any;
    } ? "9" : TupleT extends {
        "7": any;
    } ? "8" : TupleT extends {
        "6": any;
    } ? "7" : TupleT extends {
        "5": any;
    } ? "6" : TupleT extends {
        "4": any;
    } ? "5" : TupleT extends {
        "3": any;
    } ? "4" : TupleT extends {
        "2": any;
    } ? "3" : TupleT extends {
        "1": any;
    } ? "2" : TupleT extends {
        "0": any;
    } ? "1" : never]: NextT extends Join<AliasedTable<string, string, ColumnCollection>, ColumnCollection, boolean> ? NextT : never; } & {
        "0": TupleT[0] extends Join<AliasedTable<string, string, ColumnCollection>, ColumnCollection, boolean> ? TupleT[0] : never;
    } & {
        length: TupleT extends {
            "20": any;
        } ? 22 : TupleT extends {
            "19": any;
        } ? 21 : TupleT extends {
            "18": any;
        } ? 20 : TupleT extends {
            "17": any;
        } ? 19 : TupleT extends {
            "16": any;
        } ? 18 : TupleT extends {
            "15": any;
        } ? 17 : TupleT extends {
            "14": any;
        } ? 16 : TupleT extends {
            "13": any;
        } ? 15 : TupleT extends {
            "12": any;
        } ? 14 : TupleT extends {
            "11": any;
        } ? 13 : TupleT extends {
            "10": any;
        } ? 12 : TupleT extends {
            "9": any;
        } ? 11 : TupleT extends {
            "8": any;
        } ? 10 : TupleT extends {
            "7": any;
        } ? 9 : TupleT extends {
            "6": any;
        } ? 8 : TupleT extends {
            "5": any;
        } ? 7 : TupleT extends {
            "4": any;
        } ? 6 : TupleT extends {
            "3": any;
        } ? 5 : TupleT extends {
            "2": any;
        } ? 4 : TupleT extends {
            "1": any;
        } ? 3 : TupleT extends {
            "0": any;
        } ? 2 : never;
    } & Join<AliasedTable<string, string, ColumnCollection>, ColumnCollection, boolean>[];
    type NullableTableAlias<JoinsT extends JoinCollection> = ({
        [index in TupleKeys<JoinsT>]: (JoinsT[index] extends AnyJoin ? (true extends JoinsT[index]["nullable"] ? JoinsT[index]["table"]["alias"] : never) : never);
    }[TupleKeys<JoinsT>]);
    type ToColumnReferences<JoinsT extends JoinCollection> = (JoinsT[TupleKeys<JoinsT>] extends AnyJoin ? (JoinsT[TupleKeys<JoinsT>]["table"] extends AnyAliasedTable ? {
        readonly [tableAlias in JoinsT[TupleKeys<JoinsT>]["table"]["alias"]]: (FindWithTableAlias<JoinsT, tableAlias> extends AnyJoin ? (true extends FindWithTableAlias<JoinsT, tableAlias>["nullable"] ? ColumnCollectionUtil.ToNullable<FindWithTableAlias<JoinsT, tableAlias>["columns"]> : FindWithTableAlias<JoinsT, tableAlias>["columns"]) : never);
    } : {}) : {});
    function toColumnReferences<JoinsT extends JoinCollection>(joins: JoinsT): (ToColumnReferences<JoinsT>);
    type ToConvenientColumnReferences<JoinsT extends JoinCollection> = (JoinsT["length"] extends 1 ? (ToColumnReferences<JoinsT>[keyof ToColumnReferences<JoinsT>]) : ToColumnReferences<JoinsT>);
    function toConvenientColumnReferences<JoinsT extends JoinCollection>(joins: JoinsT): (ToConvenientColumnReferences<JoinsT>);
    type ToNullable<JoinsT extends JoinCollection> = (JoinsT[TupleKeys<JoinsT>] extends AnyJoin ? ({
        [index in TupleKeys<JoinsT>]: (JoinsT[index] extends AnyJoin ? JoinUtil.ToNullable<JoinsT[index]> : never);
    } & {
        length: JoinsT["length"];
        "0": JoinUtil.ToNullable<JoinsT[0]>;
    } & AnyJoin[]) : never);
    function toNullable<JoinsT extends JoinCollection>(joins: JoinsT): (ToNullable<JoinsT>);
    type Duplicates<A extends JoinCollection, B extends JoinCollection> = (FindWithTableAlias<A, Extract<TableAliases<B>, string>>);
    function assertNonDuplicateTableAlias(joins: JoinCollection, tableAlias: string): void;
    function assertNoDuplicates(a: JoinCollection, b: JoinCollection): void;
    function assertHasColumn(joins: JoinCollection, column: AnyColumn): void;
    function assertHasColumns(joins: JoinCollection, arr: AnyColumn[]): void;
    type InnerJoinUnsafe<JoinsT extends JoinCollection, ToTableT extends AnyAliasedTable> = (TupleWPush<AnyJoin, JoinsT, Join<ToTableT, ToTableT["columns"], false>>);
    type RightJoinUnsafe<JoinsT extends JoinCollection, ToTableT extends AnyAliasedTable> = (TupleWPush<AnyJoin, JoinCollectionUtil.ToNullable<JoinsT>, Join<ToTableT, ToTableT["columns"], false>>);
    type LeftJoinUnsafe<JoinsT extends JoinCollection, ToTableT extends AnyAliasedTable> = (TupleWPush<AnyJoin, JoinsT, Join<ToTableT, ToTableT["columns"], true>>);
    type CrossJoinUnsafe<JoinsT extends JoinCollection, ToTableT extends AnyAliasedTable> = (TupleWPush<AnyJoin, JoinsT, Join<ToTableT, ToTableT["columns"], false>>);
    type CheckedJoin<SelectBuilderT extends AnySelectBuilder, ToTableT extends AnyAliasedTable, ResultT extends JoinCollection> = (FindWithTableAlias<SelectBuilderT["data"]["parentJoins"], ToTableT["alias"]> extends never ? (FindWithTableAlias<SelectBuilderT["data"]["joins"], ToTableT["alias"]> extends never ? ResultT : invalid.E4<"Alias", ToTableT["alias"], "was already used as join", FindWithTableAlias<SelectBuilderT["data"]["joins"], ToTableT["alias"]>>) : invalid.E4<"Alias", ToTableT["alias"], "was already used as join in parent scope", FindWithTableAlias<SelectBuilderT["data"]["parentJoins"], ToTableT["alias"]>>);
    type CheckedJoinUsing<SelectBuilderT extends AnySelectBuilder, ToTableT extends AnyAliasedTable, FromDelegateT extends JoinFromDelegate<SelectBuilderT["data"]["joins"]>, ResultT extends JoinCollection> = (JoinToDelegateUtil.CreateUsing<ToTableT, ReturnType<FromDelegateT>> extends never ? invalid.E4<"Table", ToTableT["alias"], "does not have some columns", Exclude<ColumnTupleUtil.WithTableAlias<ReturnType<FromDelegateT>, ToTableT["alias"]>[TupleKeys<ReturnType<FromDelegateT>>], ColumnCollectionUtil.Columns<ToTableT["columns"]>>> : CheckedJoin<SelectBuilderT, ToTableT, ResultT>);
    type InnerJoin<SelectBuilderT extends AnySelectBuilder, ToTableT extends AnyAliasedTable> = (CheckedJoin<SelectBuilderT, ToTableT, InnerJoinUnsafe<SelectBuilderT["data"]["joins"], ToTableT>>);
    type InnerJoinUsing<SelectBuilderT extends AnySelectBuilder, ToTableT extends AnyAliasedTable, FromDelegateT extends JoinFromDelegate<SelectBuilderT["data"]["joins"]>> = (CheckedJoinUsing<SelectBuilderT, ToTableT, FromDelegateT, InnerJoinUnsafe<SelectBuilderT["data"]["joins"], ToTableT>>);
    type RightJoin<SelectBuilderT extends AnySelectBuilder, ToTableT extends AnyAliasedTable> = (CheckedJoin<SelectBuilderT, ToTableT, RightJoinUnsafe<SelectBuilderT["data"]["joins"], ToTableT>>);
    type RightJoinUsing<SelectBuilderT extends AnySelectBuilder, ToTableT extends AnyAliasedTable, FromDelegateT extends JoinFromDelegate<SelectBuilderT["data"]["joins"]>> = (CheckedJoinUsing<SelectBuilderT, ToTableT, FromDelegateT, RightJoinUnsafe<SelectBuilderT["data"]["joins"], ToTableT>>);
    type LeftJoin<SelectBuilderT extends AnySelectBuilder, ToTableT extends AnyAliasedTable> = (CheckedJoin<SelectBuilderT, ToTableT, LeftJoinUnsafe<SelectBuilderT["data"]["joins"], ToTableT>>);
    type LeftJoinUsing<SelectBuilderT extends AnySelectBuilder, ToTableT extends AnyAliasedTable, FromDelegateT extends JoinFromDelegate<SelectBuilderT["data"]["joins"]>> = (CheckedJoinUsing<SelectBuilderT, ToTableT, FromDelegateT, LeftJoinUnsafe<SelectBuilderT["data"]["joins"], ToTableT>>);
    type CrossJoin<SelectBuilderT extends AnySelectBuilder, ToTableT extends AnyAliasedTable> = (CheckedJoin<SelectBuilderT, ToTableT, CrossJoinUnsafe<SelectBuilderT["data"]["joins"], ToTableT>>);
    function innerJoin<SelectBuilderT extends AnySelectBuilder, ToTableT extends AnyAliasedTable, FromDelegateT extends JoinFromDelegate<SelectBuilderT["data"]["joins"]>>(selectBuilder: SelectBuilderT, toTable: ToTableT, fromDelegate: FromDelegateT, toDelegate: JoinToDelegate<ToTableT, ReturnType<FromDelegateT>>): (InnerJoin<SelectBuilderT, ToTableT>);
    function innerJoinUsing<SelectBuilderT extends AnySelectBuilder, ToTableT extends AnyAliasedTable, FromDelegateT extends JoinFromDelegate<SelectBuilderT["data"]["joins"]>>(selectBuilder: SelectBuilderT, toTable: ToTableT, fromDelegate: FromDelegateT): (InnerJoinUsing<SelectBuilderT, ToTableT, FromDelegateT>);
    function rightJoin<SelectBuilderT extends AnySelectBuilder, ToTableT extends AnyAliasedTable, FromDelegateT extends JoinFromDelegate<SelectBuilderT["data"]["joins"]>>(selectBuilder: SelectBuilderT, toTable: ToTableT, fromDelegate: FromDelegateT, toDelegate: JoinToDelegate<ToTableT, ReturnType<FromDelegateT>>): (RightJoin<SelectBuilderT, ToTableT>);
    function rightJoinUsing<SelectBuilderT extends AnySelectBuilder, ToTableT extends AnyAliasedTable, FromDelegateT extends JoinFromDelegate<SelectBuilderT["data"]["joins"]>>(selectBuilder: SelectBuilderT, toTable: ToTableT, fromDelegate: FromDelegateT): (RightJoinUsing<SelectBuilderT, ToTableT, FromDelegateT>);
    function leftJoin<SelectBuilderT extends AnySelectBuilder, ToTableT extends AnyAliasedTable, FromDelegateT extends JoinFromDelegate<SelectBuilderT["data"]["joins"]>>(selectBuilder: SelectBuilderT, toTable: ToTableT, fromDelegate: FromDelegateT, toDelegate: JoinToDelegate<ToTableT, ReturnType<FromDelegateT>>): (LeftJoin<SelectBuilderT, ToTableT>);
    function leftJoinUsing<SelectBuilderT extends AnySelectBuilder, ToTableT extends AnyAliasedTable, FromDelegateT extends JoinFromDelegate<SelectBuilderT["data"]["joins"]>>(selectBuilder: SelectBuilderT, toTable: ToTableT, fromDelegate: FromDelegateT): (LeftJoinUsing<SelectBuilderT, ToTableT, FromDelegateT>);
    function crossJoin<SelectBuilderT extends AnySelectBuilder, ToTableT extends AnyAliasedTable>(selectBuilder: SelectBuilderT, toTable: ToTableT): (CrossJoin<SelectBuilderT, ToTableT>);
    type IsReplaceableBy<JoinsT extends JoinCollection, TableA extends AnyAliasedTable, TableB extends AnyAliasedTable> = (FindWithTableAlias<JoinsT, TableA["alias"]> extends never ? false : (true extends AliasedTableUtil.IsReplaceableBy<TableA, TableB> ? (true extends ColumnCollectionUtil.IsReplaceableBy<FindWithTableAlias<JoinsT, TableA["alias"]>["columns"], TableB["columns"]> ? (true) : (false)) : false));
    function isReplaceableBy<JoinsT extends JoinCollection, TableA extends AnyAliasedTable, TableB extends AnyAliasedTable>(joins: JoinsT, tableA: TableA, tableB: TableB): (IsReplaceableBy<JoinsT, TableA, TableB>);
    type ReplaceJoinUnsafe<JoinT extends AnyJoin, TableA extends AnyAliasedTable, TableB extends AnyAliasedTable> = (JoinT["table"] extends TableA ? Join<AliasedTableUtil.As<TableB, JoinT["table"]["alias"]>, ColumnCollectionUtil.AndType<AliasedTableUtil.As<TableB, JoinT["table"]["alias"]>["columns"], JoinT["columns"]>, JoinT["nullable"]> : JoinT);
    type ReplaceTableUnsafe<JoinsT extends JoinCollection, TableA extends AnyAliasedTable, TableB extends AnyAliasedTable> = ({
        [index in TupleKeys<JoinsT>]: (JoinsT[index] extends AnyJoin ? ReplaceJoinUnsafe<JoinsT[index], TableA, TableB> : never);
    } & {
        "0": (ReplaceJoinUnsafe<JoinsT[0], TableA, TableB>);
        length: TupleLength<JoinsT>;
    } & AnyJoin[]);
    type ReplaceTable<JoinsT extends JoinCollection, TableA extends AnyAliasedTable, TableB extends AnyAliasedTable> = (true extends IsReplaceableBy<JoinsT, TableA, TableB> ? (ReplaceTableUnsafe<JoinsT, TableA, TableB>) : invalid.E4<"Table", TableA, "is not replaceable by table", TableB>);
    function replaceTable<JoinsT extends JoinCollection, TableA extends AnyAliasedTable, TableB extends AnyAliasedTable>(joins: JoinsT, tableA: TableA, tableB: TableB): (ReplaceTable<JoinsT, TableA, TableB>);
    type ReplaceColumnType<JoinsT extends JoinCollection, TableAliasT extends string, ColumnNameT extends string, NewTypeT> = ({
        [index in TupleKeys<JoinsT>]: (JoinsT[index] extends AnyJoin ? JoinUtil.ReplaceColumnType<JoinsT[index], TableAliasT, ColumnNameT, NewTypeT> : never);
    } & {
        "0": (JoinUtil.ReplaceColumnType<JoinsT[0], TableAliasT, ColumnNameT, NewTypeT>);
        length: TupleLength<JoinsT>;
    } & AnyJoin[]);
    function replaceColumnType<JoinsT extends JoinCollection, TableAliasT extends string, ColumnNameT extends string, NewTypeT>(joins: JoinsT, tableAlias: TableAliasT, columnName: ColumnNameT, newAssertDelegate: sd.AssertDelegate<NewTypeT>): (ReplaceColumnType<JoinsT, TableAliasT, ColumnNameT, NewTypeT>);
}
//# sourceMappingURL=util.d.ts.map