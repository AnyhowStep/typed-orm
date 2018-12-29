import {IQuery} from "../../../query";
import {IJoin} from "../../../join";
import {IAnonymousTypedExpr} from "../../../expr";
import {MapDelegate} from "../../../map-delegate";
import { ColumnRefUtil } from "../../../column-ref";
import { PrimitiveExpr } from "../../../primitive-expr";
import { ColumnUtil } from "../../../column";
import { RawExpr, RawExprUtil } from "../../../raw-expr";
import { JoinArrayUtil } from "../../../join-array";
import {ITable, TableUtil} from "../../../table";
import { Update, UpdateModifier, Assignment } from "../../update";
import { ColumnIdentifier } from "../../../column-identifier";

//`Updatable` is used because it's used by MySQL docs.
//`Updateable` doesn't see as much use.
export type UpdatableQuery = IQuery<{
    readonly _distinct : false;
    readonly _sqlCalcFoundRows : false;

    readonly _joins : IJoin[];
    readonly _parentJoins : undefined;
    readonly _selects : undefined;
    readonly _where : IAnonymousTypedExpr<boolean>|undefined;

    readonly _grouped : undefined;
    readonly _having : undefined;

    //Technically allowed for single-table updates
    //but they're too much of a hassle to support...
    //For now?
    //TODO-FEATURE Support ORDER BY, LIMIT for single-table updates
    readonly _orders : undefined;
    readonly _limit : undefined;

    readonly _unions : undefined;
    readonly _unionOrders : undefined;
    readonly _unionLimit : undefined;

    //You can set it but it'll be ignored
    readonly _mapDelegate : MapDelegate|undefined;
}>;

export type AssignmentRef<QueryT extends UpdatableQuery> = (
    {
        readonly [tableAlias in JoinArrayUtil.ToTableAliasUnion<QueryT["_joins"]>]? : (
            {
                readonly [columnName in Extract<
                    keyof JoinArrayUtil.FindWithTableAlias<
                        QueryT["_joins"],
                        tableAlias
                    >["columns"],
                    string
                >]? : (
                    RawExpr<
                        ReturnType<
                            JoinArrayUtil.FindWithTableAlias<
                                QueryT["_joins"],
                                tableAlias
                            >["columns"][columnName]["assertDelegate"]
                        >
                    >
                )
            }
        )
    }
);
export type ExtractMap<RefT extends AssignmentRef<UpdatableQuery>> = (
    RefT[keyof RefT]
);
export type ExtractRawExpr<RefT extends AssignmentRef<UpdatableQuery>> = (
    Extract<
        ExtractMap<RefT>[keyof ExtractMap<RefT>],
        //Gets rid of `undefined`
        RawExpr<PrimitiveExpr>
    >
);
export type ToColumnIdentifier<RefT extends AssignmentRef<UpdatableQuery>> = (
    {
        [tableAlias in Extract<keyof RefT, string>] : (
            {
                [columnName in Extract<keyof RefT[tableAlias], string>] : (
                    {
                        readonly tableAlias : tableAlias,
                        readonly name : columnName
                    }
                )
            }[Extract<keyof RefT[tableAlias], string>]
        )
    }[Extract<keyof RefT, string>]
);
export type ToMutableColumnIdentifier<QueryT extends UpdatableQuery> = (
    {
        [tableAlias in Extract<QueryT["_joins"][number]["aliasedTable"], ITable>["alias"]] : (
            {
                [columnName in Extract<
                    JoinArrayUtil.FindWithTableAlias<QueryT["_joins"], tableAlias>["aliasedTable"],
                    ITable
                >["mutable"][number]] : (
                    {
                        readonly tableAlias : tableAlias,
                        readonly name : columnName,
                    }
                )
            }[Extract<
                JoinArrayUtil.FindWithTableAlias<QueryT["_joins"], tableAlias>["aliasedTable"],
                ITable
            >["mutable"][number]]
        )
    }[Extract<QueryT["_joins"][number]["aliasedTable"], ITable>["alias"]]
);
export function mutableColumnIdentifiers (query : UpdatableQuery) : ColumnIdentifier[] {
    const result : ColumnIdentifier[] = [];
    for (let join of query._joins) {
        const table = join.aliasedTable;
        if (TableUtil.isTable(table)) {
            for (let columnName of table.mutable) {
                result.push({
                    tableAlias : table.alias,
                    name : columnName,
                });
            }
        }
    }
    return result;
}

export function toAssignments (ref : AssignmentRef<UpdatableQuery>) : Assignment[] {
    const result : Assignment[] = [];
    for (let tableAlias in ref) {
        const map = ref[tableAlias];
        if (map == undefined) {
            continue;
        }
        for (let columnName in map) {
            const rawExpr = map[columnName];
            //`null` is a valid rawExpr
            if (rawExpr === undefined) {
                continue;
            }
            result.push({
                tableAlias,
                columnName,
                value : rawExpr,
            });
        }
    }
    return result;
}

export type SetDelegate<QueryT extends UpdatableQuery> = (
    (
        columns : ColumnRefUtil.ToConvenient<
            ColumnRefUtil.FromJoinArray<QueryT["_joins"]>
        >
    ) => AssignmentRef<QueryT>
);


//https://github.com/Microsoft/TypeScript/issues/29133
export type AssertValidSetDelegate_Hack<
    QueryT extends UpdatableQuery,
    DelegateT extends SetDelegate<QueryT>
> = (
    (
        Exclude<
            ColumnUtil.FromColumnRef<RawExprUtil.UsedRef<ExtractRawExpr<ReturnType<DelegateT>>>>,
            ColumnUtil.FromColumnRef<ColumnRefUtil.FromJoinArray<QueryT["_joins"]>>
        > extends never ?
        unknown :
        [
            "The following referenced columns are not allowed",
            Exclude<
                ColumnUtil.FromColumnRef<RawExprUtil.UsedRef<ExtractRawExpr<ReturnType<DelegateT>>>>,
                ColumnUtil.FromColumnRef<ColumnRefUtil.FromJoinArray<QueryT["_joins"]>>
            >
        ]
    ) &
    (
        Exclude<
            ToColumnIdentifier<ReturnType<DelegateT>>,
            ToMutableColumnIdentifier<QueryT>
        > extends never ?
        unknown :
        [
            "The following columns cannot be updated",
            Exclude<
                ToColumnIdentifier<ReturnType<DelegateT>>,
                ToMutableColumnIdentifier<QueryT>
            >
        ]
    )
);

export function update<
    QueryT extends UpdatableQuery,
    DelegateT extends SetDelegate<QueryT>,
    ModifierT extends UpdateModifier|undefined
> (
    query : QueryT & AssertValidSetDelegate_Hack<QueryT, DelegateT>,
    modifier : ModifierT,
    delegate : DelegateT
) : (
    Update<{
        _query : QueryT,
        _assignments : Assignment[],
        _modifier : ModifierT,
    }>
) {
    const ref = ColumnRefUtil.fromJoinArray(query._joins);
    const assignmentRef = delegate(ColumnRefUtil.toConvenient(ref) as any);

    const mutableIdentifiers = mutableColumnIdentifiers(query);

    //usedRefs must be valid,
    //columns in assignment must be mutable
    for (let tableAlias in assignmentRef) {
        const assignmentMap = (assignmentRef as AssignmentRef<UpdatableQuery>)[tableAlias];
        if (assignmentMap == undefined) {
            continue;
        }
        for (let columnName in assignmentMap) {
            const isMutable = mutableIdentifiers.findIndex(
                i => (
                    i.tableAlias == tableAlias &&
                    i.name == columnName
                )
            ) >= 0;
            if (!isMutable) {
                throw new Error(`${tableAlias}.${columnName} is not mutable`);
            }
            const rawExpr = assignmentMap[columnName];
            //`null` is a valid RawExpr
            if (rawExpr === undefined) {
                continue;
            }
            const usedRef = RawExprUtil.usedRef(rawExpr);
            ColumnRefUtil.assertIsSubset(
                usedRef,
                ref
            );
        }
    }

    return new Update({
        _query : query,
        _assignments : toAssignments(assignmentRef),
        _modifier : modifier,
    });
}

/*TODO Move to compile-time tests
import * as o from "../../../index";
import { ColumnIdentifierRefUtil } from "../../../column-identifier-ref";
import { ColumnIdentifierUtil } from "../../../column-identifier";

const table = o.table(
    "table",
    { x : o.bigint(), y : o.boolean() }
).setAutoIncrement(c => c.x);
const table2 = o.table("table2", { x : o.bigint(), y : o.boolean() });
const q = o.from(table);
declare const m : ToMutableColumnIdentifier<typeof q>;
const u = update(
    q,
    c => {
        return {
            table : {
                x : c.x,//table2.columns.x,
                y : true,
                z : c.x,
            },
            doesNotExist : {
                t : true
            }
        }
    }
)
*/