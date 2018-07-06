import { RawExpr, RawExprUtil } from "../../raw-expr";
import { ColumnReferencesUtil } from "../../column-references";
import { Expr } from "../../expr";
import { Column } from "../../column";
import { Join } from "../../join";
import { AliasedTable } from "../../aliased-table";
export declare const TRUE: Expr<{}, true>;
export declare const FALSE: Expr<{}, false>;
export declare const xor: <LeftT extends boolean | Expr<any, boolean> | Column<any, any, boolean>, RightT extends boolean | Expr<any, boolean> | Column<any, any, boolean>>(left: LeftT, right: RightT) => Expr<(LeftT extends RawExprUtil.WithParentJoins ? true extends LeftT["data"]["hasParentJoins"] ? LeftT["data"]["parentJoins"][Extract<keyof LeftT["data"]["parentJoins"], "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30">] extends Join<AliasedTable<string, string, import("../../column-collection/column-collection").ColumnCollection>, import("../../column-collection/column-collection").ColumnCollection, boolean> ? LeftT["data"]["parentJoins"][Extract<keyof LeftT["data"]["parentJoins"], "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30">]["table"] extends AliasedTable<string, string, import("../../column-collection/column-collection").ColumnCollection> ? { readonly [tableAlias in LeftT["data"]["parentJoins"][Extract<keyof LeftT["data"]["parentJoins"], "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30">]["table"]["alias"]]: { [index in Extract<keyof LeftT["data"]["parentJoins"], "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30">]: LeftT["data"]["parentJoins"][index] extends Join<AliasedTable<string, string, import("../../column-collection/column-collection").ColumnCollection>, import("../../column-collection/column-collection").ColumnCollection, boolean> ? LeftT["data"]["parentJoins"][index]["table"]["alias"] extends tableAlias ? LeftT["data"]["parentJoins"][index] : never : never; }[Extract<keyof LeftT["data"]["parentJoins"], "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30">] extends Join<AliasedTable<string, string, import("../../column-collection/column-collection").ColumnCollection>, import("../../column-collection/column-collection").ColumnCollection, boolean> ? true extends { [index in Extract<keyof LeftT["data"]["parentJoins"], "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30">]: LeftT["data"]["parentJoins"][index] extends Join<AliasedTable<string, string, import("../../column-collection/column-collection").ColumnCollection>, import("../../column-collection/column-collection").ColumnCollection, boolean> ? LeftT["data"]["parentJoins"][index]["table"]["alias"] extends tableAlias ? LeftT["data"]["parentJoins"][index] : never : never; }[Extract<keyof LeftT["data"]["parentJoins"], "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30">]["nullable"] ? { readonly [columnName in Extract<keyof { [index in Extract<keyof LeftT["data"]["parentJoins"], "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30">]: LeftT["data"]["parentJoins"][index] extends Join<AliasedTable<string, string, import("../../column-collection/column-collection").ColumnCollection>, import("../../column-collection/column-collection").ColumnCollection, boolean> ? LeftT["data"]["parentJoins"][index]["table"]["alias"] extends tableAlias ? LeftT["data"]["parentJoins"][index] : never : never; }[Extract<keyof LeftT["data"]["parentJoins"], "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30">]["columns"], string>]: Column<{ [index in Extract<keyof LeftT["data"]["parentJoins"], "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30">]: LeftT["data"]["parentJoins"][index] extends Join<AliasedTable<string, string, import("../../column-collection/column-collection").ColumnCollection>, import("../../column-collection/column-collection").ColumnCollection, boolean> ? LeftT["data"]["parentJoins"][index]["table"]["alias"] extends tableAlias ? LeftT["data"]["parentJoins"][index] : never : never; }[Extract<keyof LeftT["data"]["parentJoins"], "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30">]["columns"][columnName]["tableAlias"], { [index in Extract<keyof LeftT["data"]["parentJoins"], "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30">]: LeftT["data"]["parentJoins"][index] extends Join<AliasedTable<string, string, import("../../column-collection/column-collection").ColumnCollection>, import("../../column-collection/column-collection").ColumnCollection, boolean> ? LeftT["data"]["parentJoins"][index]["table"]["alias"] extends tableAlias ? LeftT["data"]["parentJoins"][index] : never : never; }[Extract<keyof LeftT["data"]["parentJoins"], "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30">]["columns"][columnName]["name"], ReturnType<{ [index in Extract<keyof LeftT["data"]["parentJoins"], "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30">]: LeftT["data"]["parentJoins"][index] extends Join<AliasedTable<string, string, import("../../column-collection/column-collection").ColumnCollection>, import("../../column-collection/column-collection").ColumnCollection, boolean> ? LeftT["data"]["parentJoins"][index]["table"]["alias"] extends tableAlias ? LeftT["data"]["parentJoins"][index] : never : never; }[Extract<keyof LeftT["data"]["parentJoins"], "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30">]["columns"][columnName]["assertDelegate"]> | null>; } : { [index in Extract<keyof LeftT["data"]["parentJoins"], "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30">]: LeftT["data"]["parentJoins"][index] extends Join<AliasedTable<string, string, import("../../column-collection/column-collection").ColumnCollection>, import("../../column-collection/column-collection").ColumnCollection, boolean> ? LeftT["data"]["parentJoins"][index]["table"]["alias"] extends tableAlias ? LeftT["data"]["parentJoins"][index] : never : never; }[Extract<keyof LeftT["data"]["parentJoins"], "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30">]["columns"] : never; } : {} : {} : {} : LeftT extends import("../../raw-expr/raw-expr").AllowedExprConstant ? {} : LeftT extends Column<string, string, any> ? { readonly [tableAlias in LeftT["tableAlias"]]: { readonly [name in LeftT["name"]]: LeftT; }; } : LeftT extends Expr<any, any> ? LeftT["usedReferences"] : never) & (RightT extends RawExprUtil.WithParentJoins ? true extends RightT["data"]["hasParentJoins"] ? RightT["data"]["parentJoins"][Extract<keyof RightT["data"]["parentJoins"], "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30">] extends Join<AliasedTable<string, string, import("../../column-collection/column-collection").ColumnCollection>, import("../../column-collection/column-collection").ColumnCollection, boolean> ? RightT["data"]["parentJoins"][Extract<keyof RightT["data"]["parentJoins"], "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30">]["table"] extends AliasedTable<string, string, import("../../column-collection/column-collection").ColumnCollection> ? { readonly [tableAlias in RightT["data"]["parentJoins"][Extract<keyof RightT["data"]["parentJoins"], "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30">]["table"]["alias"]]: { [index in Extract<keyof RightT["data"]["parentJoins"], "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30">]: RightT["data"]["parentJoins"][index] extends Join<AliasedTable<string, string, import("../../column-collection/column-collection").ColumnCollection>, import("../../column-collection/column-collection").ColumnCollection, boolean> ? RightT["data"]["parentJoins"][index]["table"]["alias"] extends tableAlias ? RightT["data"]["parentJoins"][index] : never : never; }[Extract<keyof RightT["data"]["parentJoins"], "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30">] extends Join<AliasedTable<string, string, import("../../column-collection/column-collection").ColumnCollection>, import("../../column-collection/column-collection").ColumnCollection, boolean> ? true extends { [index in Extract<keyof RightT["data"]["parentJoins"], "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30">]: RightT["data"]["parentJoins"][index] extends Join<AliasedTable<string, string, import("../../column-collection/column-collection").ColumnCollection>, import("../../column-collection/column-collection").ColumnCollection, boolean> ? RightT["data"]["parentJoins"][index]["table"]["alias"] extends tableAlias ? RightT["data"]["parentJoins"][index] : never : never; }[Extract<keyof RightT["data"]["parentJoins"], "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30">]["nullable"] ? { readonly [columnName in Extract<keyof { [index in Extract<keyof RightT["data"]["parentJoins"], "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30">]: RightT["data"]["parentJoins"][index] extends Join<AliasedTable<string, string, import("../../column-collection/column-collection").ColumnCollection>, import("../../column-collection/column-collection").ColumnCollection, boolean> ? RightT["data"]["parentJoins"][index]["table"]["alias"] extends tableAlias ? RightT["data"]["parentJoins"][index] : never : never; }[Extract<keyof RightT["data"]["parentJoins"], "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30">]["columns"], string>]: Column<{ [index in Extract<keyof RightT["data"]["parentJoins"], "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30">]: RightT["data"]["parentJoins"][index] extends Join<AliasedTable<string, string, import("../../column-collection/column-collection").ColumnCollection>, import("../../column-collection/column-collection").ColumnCollection, boolean> ? RightT["data"]["parentJoins"][index]["table"]["alias"] extends tableAlias ? RightT["data"]["parentJoins"][index] : never : never; }[Extract<keyof RightT["data"]["parentJoins"], "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30">]["columns"][columnName]["tableAlias"], { [index in Extract<keyof RightT["data"]["parentJoins"], "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30">]: RightT["data"]["parentJoins"][index] extends Join<AliasedTable<string, string, import("../../column-collection/column-collection").ColumnCollection>, import("../../column-collection/column-collection").ColumnCollection, boolean> ? RightT["data"]["parentJoins"][index]["table"]["alias"] extends tableAlias ? RightT["data"]["parentJoins"][index] : never : never; }[Extract<keyof RightT["data"]["parentJoins"], "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30">]["columns"][columnName]["name"], ReturnType<{ [index in Extract<keyof RightT["data"]["parentJoins"], "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30">]: RightT["data"]["parentJoins"][index] extends Join<AliasedTable<string, string, import("../../column-collection/column-collection").ColumnCollection>, import("../../column-collection/column-collection").ColumnCollection, boolean> ? RightT["data"]["parentJoins"][index]["table"]["alias"] extends tableAlias ? RightT["data"]["parentJoins"][index] : never : never; }[Extract<keyof RightT["data"]["parentJoins"], "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30">]["columns"][columnName]["assertDelegate"]> | null>; } : { [index in Extract<keyof RightT["data"]["parentJoins"], "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30">]: RightT["data"]["parentJoins"][index] extends Join<AliasedTable<string, string, import("../../column-collection/column-collection").ColumnCollection>, import("../../column-collection/column-collection").ColumnCollection, boolean> ? RightT["data"]["parentJoins"][index]["table"]["alias"] extends tableAlias ? RightT["data"]["parentJoins"][index] : never : never; }[Extract<keyof RightT["data"]["parentJoins"], "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30">]["columns"] : never; } : {} : {} : {} : RightT extends import("../../raw-expr/raw-expr").AllowedExprConstant ? {} : RightT extends Column<string, string, any> ? { readonly [tableAlias in RightT["tableAlias"]]: { readonly [name in RightT["name"]]: RightT; }; } : RightT extends Expr<any, any> ? RightT["usedReferences"] : never), boolean>;
export declare function not<RawT extends RawExpr<boolean>>(raw: RawT): Expr<RawExprUtil.UsedReferences<RawT>, boolean>;
export declare function implies<LeftT extends RawExpr<boolean>, RightT extends RawExpr<boolean>>(left: LeftT, right: RightT): (Expr<ColumnReferencesUtil.Merge<RawExprUtil.UsedReferences<LeftT>, RawExprUtil.UsedReferences<RightT>>, boolean>);
export declare function negateIfFalse<RawT extends RawExpr<boolean>>(condition: boolean, raw: RawT): Expr<RawExprUtil.UsedReferences<RawT>, boolean>;
