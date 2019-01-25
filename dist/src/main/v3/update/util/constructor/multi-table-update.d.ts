import { IJoin, JoinUtil } from "../../../join";
import { ColumnRefUtil } from "../../../column-ref";
import { PrimitiveExpr } from "../../../primitive-expr";
import { RawExpr, RawExprUtil } from "../../../raw-expr";
import { ITable } from "../../../table";
import { Update, UpdateModifier, Assignment, UpdatableQuery } from "../../update";
import { ColumnIdentifierUtil } from "../../../column-identifier";
export declare type AssignmentRefFromJoinArray<JoinArrT extends IJoin[]> = ({
    readonly [tableAlias in JoinUtil.Array.TableAliases<JoinArrT>]?: ({
        readonly [columnName in Extract<keyof JoinUtil.Array.FindWithTableAlias<JoinArrT, tableAlias>["columns"], string>]?: (RawExpr<ReturnType<JoinUtil.Array.FindWithTableAlias<JoinArrT, tableAlias>["aliasedTable"]["columns"][columnName]["assertDelegate"]>>);
    });
});
export declare type AssignmentRef<QueryT extends UpdatableQuery> = (AssignmentRefFromJoinArray<QueryT["_joins"]>);
export declare type ExtractMap<RefT extends AssignmentRef<UpdatableQuery>> = (RefT[keyof RefT]);
export declare type ExtractRawExpr<RefT extends AssignmentRef<UpdatableQuery>> = (Extract<ExtractMap<RefT>[keyof ExtractMap<RefT>], RawExpr<PrimitiveExpr>>);
export declare type ToColumnIdentifier<RefT extends AssignmentRef<UpdatableQuery>> = ({
    [tableAlias in Extract<keyof RefT, string>]: ({
        [columnName in Extract<keyof RefT[tableAlias], string>]: ({
            readonly tableAlias: tableAlias;
            readonly name: columnName;
        });
    }[Extract<keyof RefT[tableAlias], string>]);
}[Extract<keyof RefT, string>]);
export declare type ToMutableColumnIdentifier<QueryT extends UpdatableQuery> = ({
    [tableAlias in Extract<QueryT["_joins"][number]["aliasedTable"], ITable>["alias"]]: ({
        [columnName in Extract<JoinUtil.Array.FindWithTableAlias<QueryT["_joins"], tableAlias>["aliasedTable"], ITable>["mutable"][number]]: ({
            readonly tableAlias: tableAlias;
            readonly name: columnName;
        });
    }[Extract<JoinUtil.Array.FindWithTableAlias<QueryT["_joins"], tableAlias>["aliasedTable"], ITable>["mutable"][number]]);
}[Extract<QueryT["_joins"][number]["aliasedTable"], ITable>["alias"]]);
export declare type SetDelegateFromJoinArray<JoinArrT extends IJoin[]> = ((columns: ColumnRefUtil.ToConvenient<ColumnRefUtil.FromJoinArray<JoinArrT>>) => AssignmentRefFromJoinArray<JoinArrT>);
export declare type SetDelegate<QueryT extends UpdatableQuery> = (SetDelegateFromJoinArray<QueryT["_joins"]>);
export declare type AssertValidSetDelegate_Hack<QueryT extends UpdatableQuery, DelegateT extends SetDelegate<QueryT>> = ((Exclude<ColumnIdentifierUtil.FromColumnRef<RawExprUtil.UsedRef<ExtractRawExpr<ReturnType<DelegateT>>>>, ColumnIdentifierUtil.FromJoin<QueryT["_joins"][number]>> extends never ? unknown : ["The following referenced columns are not allowed", Exclude<ColumnIdentifierUtil.FromColumnRef<RawExprUtil.UsedRef<ExtractRawExpr<ReturnType<DelegateT>>>>, ColumnIdentifierUtil.FromJoin<QueryT["_joins"][number]>>]) & (Exclude<ToColumnIdentifier<ReturnType<DelegateT>>, ToMutableColumnIdentifier<QueryT>> extends never ? unknown : ["The following columns cannot be updated", Exclude<ToColumnIdentifier<ReturnType<DelegateT>>, ToMutableColumnIdentifier<QueryT>>]));
export declare function multiTableUpdate<QueryT extends UpdatableQuery, ModifierT extends UpdateModifier | undefined, DelegateT extends SetDelegate<QueryT>>(query: QueryT & AssertValidSetDelegate_Hack<QueryT, DelegateT>, modifier: ModifierT, delegate: DelegateT): (Update<{
    _query: QueryT;
    _assignments: Assignment[];
    _modifier: ModifierT;
}>);
