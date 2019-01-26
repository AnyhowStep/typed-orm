import {booleanExpr} from "./boolean-expr";
import {Expr} from "../expr";
import {JoinCollectionUtil} from "../join-collection";
import {SelectBuilder, AnySelectBuilder} from "../select-builder";
import {Column} from "../column";
SelectBuilder;
Column;

//The `parentJoins` of the SelectBuilder
//are in the `usedReferences` of the result.
//This way, we don't accidentally use subqueries
//that reference tables/columns that don't exist.
export function exists<
    SubQueryT extends AnySelectBuilder
> (subQuery : SubQueryT) : (
    true extends SubQueryT["data"]["hasParentJoins"] ?
        Expr<
            JoinCollectionUtil.ToColumnReferences<
                SubQueryT["data"]["parentJoins"]
            >,
            boolean
        > :
        Expr<{}, boolean>
) {
    const usedReferences = subQuery.data.hasParentJoins ?
        JoinCollectionUtil.toColumnReferences(subQuery.data.parentJoins) :
        {};
    if (subQuery.data.selects == undefined) {
        return booleanExpr(
            usedReferences,
            `
                EXISTS (
                    SELECT
                        *
                    ${subQuery.getQuery()}
                )
            `
        ) as any;
    } else {
        return booleanExpr(
            usedReferences,
            `
                EXISTS (
                    ${subQuery.getQuery()}
                )
            `
        ) as any;
    }
}