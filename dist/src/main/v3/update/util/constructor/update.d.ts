import { IQuery } from "../../../query";
import { IJoin } from "../../../join";
import { IAnonymousTypedExpr } from "../../../expr";
import { MapDelegate } from "../../../map-delegate";
import { ColumnRefUtil } from "../../../column-ref";
import { PrimitiveExpr } from "../../../primitive-expr";
import { RawExpr, RawExprUtil } from "../../../raw-expr";
import { JoinArrayUtil } from "../../../join-array";
import { ITable } from "../../../table";
import { Update, UpdateModifier, Assignment } from "../../update";
import { ColumnIdentifier, ColumnIdentifierUtil } from "../../../column-identifier";
export declare type UpdatableQuery = IQuery<{
    readonly _distinct: false;
    readonly _sqlCalcFoundRows: false;
    readonly _joins: IJoin[];
    readonly _parentJoins: undefined;
    readonly _selects: undefined;
    readonly _where: IAnonymousTypedExpr<boolean> | undefined;
    readonly _grouped: undefined;
    readonly _having: undefined;
    readonly _orders: undefined;
    readonly _limit: undefined;
    readonly _unions: undefined;
    readonly _unionOrders: undefined;
    readonly _unionLimit: undefined;
    readonly _mapDelegate: MapDelegate | undefined;
}>;
export declare type AssignmentRefFromJoinArray<JoinArrT extends IJoin[]> = ({
    readonly [tableAlias in JoinArrayUtil.ToTableAliasUnion<JoinArrT>]?: ({
        readonly [columnName in Extract<keyof JoinArrayUtil.FindWithTableAlias<JoinArrT, tableAlias>["columns"], string>]?: (RawExpr<ReturnType<JoinArrayUtil.FindWithTableAlias<JoinArrT, tableAlias>["aliasedTable"]["columns"][columnName]["assertDelegate"]>>);
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
        [columnName in Extract<JoinArrayUtil.FindWithTableAlias<QueryT["_joins"], tableAlias>["aliasedTable"], ITable>["mutable"][number]]: ({
            readonly tableAlias: tableAlias;
            readonly name: columnName;
        });
    }[Extract<JoinArrayUtil.FindWithTableAlias<QueryT["_joins"], tableAlias>["aliasedTable"], ITable>["mutable"][number]]);
}[Extract<QueryT["_joins"][number]["aliasedTable"], ITable>["alias"]]);
export declare function mutableColumnIdentifiers(query: UpdatableQuery): ColumnIdentifier[];
export declare function toAssignments(ref: AssignmentRef<UpdatableQuery>): Assignment[];
export declare type SetDelegateFromJoinArray<JoinArrT extends IJoin[]> = ((columns: ColumnRefUtil.ToConvenient<ColumnRefUtil.FromJoinArray<JoinArrT>>) => AssignmentRefFromJoinArray<JoinArrT>);
export declare type SetDelegate<QueryT extends UpdatableQuery> = (SetDelegateFromJoinArray<QueryT["_joins"]>);
export declare type AssertValidSetDelegate_Hack<QueryT extends UpdatableQuery, DelegateT extends SetDelegate<QueryT>> = ((Exclude<ColumnIdentifierUtil.FromColumnRef<RawExprUtil.UsedRef<ExtractRawExpr<ReturnType<DelegateT>>>>, ColumnIdentifierUtil.FromJoin<QueryT["_joins"][number]>> extends never ? unknown : ["The following referenced columns are not allowed", Exclude<ColumnIdentifierUtil.FromColumnRef<RawExprUtil.UsedRef<ExtractRawExpr<ReturnType<DelegateT>>>>, ColumnIdentifierUtil.FromJoin<QueryT["_joins"][number]>>]) & (Exclude<ToColumnIdentifier<ReturnType<DelegateT>>, ToMutableColumnIdentifier<QueryT>> extends never ? unknown : ["The following columns cannot be updated", Exclude<ToColumnIdentifier<ReturnType<DelegateT>>, ToMutableColumnIdentifier<QueryT>>]));
export declare function update<QueryT extends UpdatableQuery, ModifierT extends UpdateModifier | undefined, DelegateT extends SetDelegate<QueryT>>(query: QueryT & AssertValidSetDelegate_Hack<QueryT, DelegateT>, modifier: ModifierT, delegate: DelegateT): (Update<{
    _query: QueryT;
    _assignments: Assignment[];
    _modifier: ModifierT;
}>);
//# sourceMappingURL=update.d.ts.map