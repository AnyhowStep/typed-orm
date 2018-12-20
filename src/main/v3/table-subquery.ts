import * as sd from "schema-decorator";
import {QueryUtil} from "./query";
import {IAliasedTable, AliasedTable} from "./aliased-table";
import {ColumnMapUtil} from "./column-map";
import {IColumn, ColumnUtil} from "./column";
import {IExprSelectItem, ExprSelectItemUtil} from "./expr-select-item";
import {QueryTree} from "./query-tree";

/*
    TODO Find a way to make single value subqueries extend
    IExprSelectItem

    TODO Find a way to make single value queries extend
    IExpr
*/
/*
    TODO Table sub queries also have a usedExpr part!

    From V2 code:

    createSubQuery(t.tentativeContributorNegotiation)
        .from(t.tentativeContribution)
        .groupBy(c => [
            c.appId,
            c.tentativeContributorNegotiationId,
            c.invoiceId,
            c.externalUserId
        ])
        .select(c => [
            c.tentativeContribution.appId,
            c.tentativeContribution.tentativeContributorNegotiationId,
            c.tentativeContribution.invoiceId,
            c.tentativeContribution.externalUserId,
            o.max(c.tentativeContribution.updatedAt).as("updatedAt"),
        ])
        .where(c => o.eq(
            c.tentativeContribution.tentativeContributorNegotiationId,
            c.tentativeContributorNegotiation.tentativeContributorNegotiationId
        ))
*/
export interface TableSubqueryData {
    readonly query : QueryUtil.AfterSelectClause;
    readonly alias : string;
}
export interface ITableSubquery<
    DataT extends TableSubqueryData=TableSubqueryData
> extends IAliasedTable<{
    readonly alias : DataT["alias"];
    readonly name  : DataT["alias"];
    /*
        TODO ITableSubquery should only be allowed if
        there are no duplicate column names in selects.

        So, selecting both tableA.x and tableB.x is not allowed.
        You would have to alias one of the columns.
    */
    readonly columns : ColumnMapUtil.FromSelectItemArray<DataT["query"]["_selects"]>;
}> {
    readonly query : DataT["query"];
    readonly alias : DataT["alias"];
}

export namespace TableSubquery {
    export type ToColumn<ItemT extends TableSubquery.SingleValueOrEmpty<any>> = (
        IColumn<{
            readonly tableAlias : ItemT["alias"],
            readonly name : TableSubquery.ColumnName<ItemT>,
            readonly assertDelegate : TableSubquery.AssertDelegate<ItemT>,
        }>
    );
    export function isTableSubquery (raw : any) : raw is ITableSubquery {
        return (
            AliasedTable.isAliasedTable(raw) &&
            ("query" in raw) &&
            (typeof (raw as any).query == "string")
        );
    }
    /*
        e.g. (SELECT appId FROM app LIMIT 1) AS `baz`

        + Must have only one SelectExpr that is not a ColumnMap
        + If they have a UNION clause,
        then they must have a UNION LIMIT 1
        + If they have a FROM clause and *not* a UNION clause,
        then they must have a LIMIT 1

        When zero rows are returned, the return type is NULL.
        When one row is returned, the return type is whatever was selected.
    */
    export type SingleValueOrEmpty<TypeT> = (
        ITableSubquery<{
            readonly query : (
                QueryUtil.OneSelectItemQuery<TypeT> &
                QueryUtil.ZeroOrOneRowQuery
            ),
            readonly alias : string,
        }>
    );
    export function isSingleValueOrEmpty (raw : any) : raw is SingleValueOrEmpty<any> {
        return (
            isTableSubquery(raw) &&
            QueryUtil.isAfterSelectClause(raw.query) &&
            QueryUtil.isZeroOrOneRowQuery(raw.query) &&
            (
                raw.query._selects != undefined &&
                raw.query._selects.length == 1 &&
                (
                    ColumnUtil.isColumn(raw.query._selects[0]) ||
                    ExprSelectItemUtil.isExprSelectItem(raw.query._selects[0])
                )
            )
        );
    }
    /*
        Guaranteed to return one row.
        So, will never be NULL... Unless you want it to be
    */
    export type SingleValue<TypeT> = (
        ITableSubquery<{
            readonly query : (
                QueryUtil.OneSelectItemQuery<TypeT> &
                QueryUtil.OneRowQuery
            ),
            readonly alias : string,
        }>
    );
    export function isSingleValue (raw : any) : raw is SingleValue<any> {
        return (
            isTableSubquery(raw) &&
            QueryUtil.isAfterSelectClause(raw.query) &&
            QueryUtil.isOneRowQuery(raw.query) &&
            (
                raw.query._selects != undefined &&
                raw.query._selects.length == 1 &&
                (
                    ColumnUtil.isColumn(raw.query._selects[0]) ||
                    ExprSelectItemUtil.isExprSelectItem(raw.query._selects[0])
                )
            )
        );
    }

    export type ColumnName<T extends SingleValueOrEmpty<any>> = (
        T["query"]["_selects"]["0"] extends IColumn ?
        Extract<T["query"]["_selects"]["0"], IColumn>["name"] :
        T["query"]["_selects"]["0"] extends IExprSelectItem ?
        Extract<T["query"]["_selects"]["0"], IExprSelectItem>["alias"] :
        never
    );
    export function columnName<T extends SingleValueOrEmpty<any>> (
        t : T
    ) : ColumnName<T> {
        const selectItem = t.query._selects[0];
        if (ColumnUtil.isColumn(selectItem)) {
            return selectItem.name as any;
        }
        if (ExprSelectItemUtil.isExprSelectItem(selectItem)) {
            return selectItem.alias as any;
        }
        throw new Error(`Unknown select item ${sd.toTypeStr(selectItem)}`);
    }
    export type TypeOf<T extends SingleValueOrEmpty<any>> = (
        (
            T extends SingleValue<any> ?
            never :
            null
        ) |
        (
            T["query"]["_selects"]["0"] extends IColumn ?
            ReturnType<T["query"]["_selects"]["0"]["assertDelegate"]> :
            T["query"]["_selects"]["0"] extends IExprSelectItem ?
            ReturnType<T["query"]["_selects"]["0"]["assertDelegate"]> :
            never
        )
    );
    export type AssertDelegate<T extends SingleValueOrEmpty<any>> = (
        sd.AssertDelegate<TypeOf<T>>
    );
    export function assertDelegate<T extends SingleValueOrEmpty<any>> (
        t : T
    ) : (
        AssertDelegate<T>
    ) {
        if (isSingleValue(t)) {
            return t.query._selects[0].assertDelegate;
        } else {
            return sd.nullable(t.query._selects[0].assertDelegate);
        }
    }

    export function queryTree (_tableSubquery : ITableSubquery|SingleValueOrEmpty<any>) : QueryTree {
        throw new Error(`Unimplemented`);
    }

}