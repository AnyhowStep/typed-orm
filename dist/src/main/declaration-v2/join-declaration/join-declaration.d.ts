import { AnyAliasedTable } from "../aliased-table";
import { ColumnCollectionUtil } from "../column-collection";
import { Tuple } from "../tuple";
import { JoinToDelegate, JoinTo } from "../join-to-delegate";
import { ColumnTupleUtil } from "../column";
import { JoinType } from "../join";
import { Expr } from "../expr";
export declare type JoinDeclarationFromDelegate<FromTableT extends AnyAliasedTable> = ((columns: FromTableT["columns"]) => (Tuple<ColumnCollectionUtil.Columns<FromTableT["columns"]>>));
export declare class JoinDeclaration<FromTableT extends AnyAliasedTable, ToTableT extends AnyAliasedTable, JoinFromT extends Tuple<ColumnCollectionUtil.Columns<FromTableT["columns"]>>, JoinToT extends Tuple<ColumnCollectionUtil.Columns<ToTableT["columns"]>>, DefaultJoinTypeT extends JoinType.INNER | JoinType.LEFT> {
    readonly fromTable: FromTableT;
    readonly toTable: ToTableT;
    readonly fromColumns: JoinFromT;
    readonly toColumns: JoinToT;
    readonly defaultJoinType: DefaultJoinTypeT;
    constructor(fromTable: FromTableT, toTable: ToTableT, fromColumns: JoinFromT, toColumns: JoinToT, defaultJoinType: DefaultJoinTypeT);
    setDefaultJoinType<NewDefaultJoinTypeT extends JoinType.INNER | JoinType.LEFT>(newDefaultJoinType: NewDefaultJoinTypeT): (JoinDeclaration<FromTableT, ToTableT, JoinFromT, JoinToT, NewDefaultJoinTypeT>);
    reverse(): (JoinDeclaration<ToTableT, FromTableT, JoinToT, JoinFromT, DefaultJoinTypeT>);
    toEqualityExpression(): Expr<(ColumnTupleUtil.ToColumnReferences<JoinFromT> & ColumnTupleUtil.ToColumnReferences<JoinToT>), boolean>;
}
export declare type AnyJoinDeclaration = JoinDeclaration<AnyAliasedTable, AnyAliasedTable, any, any, JoinType.INNER | JoinType.LEFT>;
export declare type ImplicitJoinDeclarationUsage = AnyJoinDeclaration;
export declare type InnerOrLeftJoinDeclarationUsage = [JoinType.INNER | JoinType.LEFT, AnyJoinDeclaration];
export declare type CrossJoinDeclarationUsage = [JoinType.CROSS, AnyAliasedTable];
export declare type JoinDeclarationUsage = (ImplicitJoinDeclarationUsage | InnerOrLeftJoinDeclarationUsage | CrossJoinDeclarationUsage);
export declare function joinFrom<FromTableT extends AnyAliasedTable, JoinFromD extends JoinDeclarationFromDelegate<FromTableT>>(fromTable: FromTableT, fromDelegate: JoinFromD): ({
    to: <ToTableT extends AnyAliasedTable, JoinToD extends JoinToDelegate<ToTableT, ReturnType<JoinFromD>>>(toTable: ToTableT, toDelegate: JoinToD) => JoinDeclaration<FromTableT, ToTableT, ReturnType<JoinFromD>, Extract<ReturnType<JoinToD>, JoinTo<ToTableT, ReturnType<JoinFromD>>>, JoinType.INNER>;
});
export declare function joinUsing<FromTableT extends AnyAliasedTable, ToTableT extends AnyAliasedTable, JoinFromD extends JoinDeclarationFromDelegate<FromTableT>>(fromTable: FromTableT, toTable: ToTableT, fromDelegate: JoinFromD): (ColumnCollectionUtil.HasColumns<ColumnCollectionUtil.ToNullable<ToTableT["columns"]>, ColumnTupleUtil.WithTableAlias<ReturnType<JoinFromD>, ToTableT["alias"]>> extends true ? JoinDeclaration<FromTableT, ToTableT, ReturnType<JoinFromD>, ColumnTupleUtil.WithTableAlias<ReturnType<JoinFromD>, ToTableT["alias"]>, JoinType.INNER> : never);
export declare function leftJoinUsing<FromTableT extends AnyAliasedTable, ToTableT extends AnyAliasedTable, JoinFromD extends JoinDeclarationFromDelegate<FromTableT>>(fromTable: FromTableT, toTable: ToTableT, fromDelegate: JoinFromD): (ColumnCollectionUtil.HasColumns<ColumnCollectionUtil.ToNullable<ToTableT["columns"]>, ColumnTupleUtil.WithTableAlias<ReturnType<JoinFromD>, ToTableT["alias"]>> extends true ? JoinDeclaration<FromTableT, ToTableT, ReturnType<JoinFromD>, ColumnTupleUtil.WithTableAlias<ReturnType<JoinFromD>, ToTableT["alias"]>, JoinType.LEFT> : never);
//# sourceMappingURL=join-declaration.d.ts.map