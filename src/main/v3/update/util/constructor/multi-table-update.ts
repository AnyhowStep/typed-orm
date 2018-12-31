import {IJoin} from "../../../join";
import { ColumnRefUtil } from "../../../column-ref";
import { PrimitiveExpr } from "../../../primitive-expr";
import { RawExpr, RawExprUtil } from "../../../raw-expr";
import { JoinArrayUtil } from "../../../join-array";
import {ITable, TableUtil} from "../../../table";
import { Update, UpdateModifier, Assignment, UpdatableQuery } from "../../update";
import { ColumnIdentifier, ColumnIdentifierUtil } from "../../../column-identifier";

export type AssignmentRefFromJoinArray<JoinArrT extends IJoin[]> = (
    {
        readonly [tableAlias in JoinArrayUtil.ToTableAliasUnion<JoinArrT>]? : (
            {
                readonly [columnName in Extract<
                    keyof JoinArrayUtil.FindWithTableAlias<
                        JoinArrT,
                        tableAlias
                    >["columns"],
                    string
                >]? : (
                    RawExpr<
                        ReturnType<
                            JoinArrayUtil.FindWithTableAlias<
                                JoinArrT,
                                tableAlias
                            >["aliasedTable"]["columns"][columnName]["assertDelegate"]
                        >
                    >
                )
            }
        )
    }
);
export type AssignmentRef<QueryT extends UpdatableQuery> = (
    AssignmentRefFromJoinArray<QueryT["_joins"]>
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
function mutableColumnIdentifiers (query : UpdatableQuery) : ColumnIdentifier[] {
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

export type SetDelegateFromJoinArray<JoinArrT extends IJoin[]> = (
    (
        columns : ColumnRefUtil.ToConvenient<
            ColumnRefUtil.FromJoinArray<JoinArrT>
        >
    ) => AssignmentRefFromJoinArray<JoinArrT>
);
export type SetDelegate<QueryT extends UpdatableQuery> = (
    SetDelegateFromJoinArray<QueryT["_joins"]>
);


//https://github.com/Microsoft/TypeScript/issues/29133
export type AssertValidSetDelegate_Hack<
    QueryT extends UpdatableQuery,
    DelegateT extends SetDelegate<QueryT>
> = (
    (
        Exclude<
            ColumnIdentifierUtil.FromColumnRef<RawExprUtil.UsedRef<ExtractRawExpr<ReturnType<DelegateT>>>>,
            ColumnIdentifierUtil.FromJoin<QueryT["_joins"][number]>
        > extends never ?
        unknown :
        [
            "The following referenced columns are not allowed",
            Exclude<
                ColumnIdentifierUtil.FromColumnRef<RawExprUtil.UsedRef<ExtractRawExpr<ReturnType<DelegateT>>>>,
                ColumnIdentifierUtil.FromJoin<QueryT["_joins"][number]>
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

export function multiTableUpdate<
    QueryT extends UpdatableQuery,
    ModifierT extends UpdateModifier|undefined,
    DelegateT extends SetDelegate<QueryT>
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

    const assignments : Assignment[] = [];
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
                //throw new Error(`${tableAlias}.${columnName} is not mutable`);
                //Ignore columns that cannot be modified.
                continue;
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
            assignments.push({
                tableAlias,
                columnName,
                value : rawExpr,
            });
        }
    }

    return new Update({
        _query : query,
        _assignments : assignments,
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