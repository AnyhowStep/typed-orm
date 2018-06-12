import {RawExpr, AnyRawExpr, AllowedExprConstant} from "./raw-expr";
import * as mysql from "typed-mysql";
import {Column, AnyColumn} from "../column";
import {StringBuilder} from "../StringBuilder";
import {Expr, AnyExpr} from "../expr";
import {SelectBuilder, AnySelectBuilder} from "../select-builder";
import {AnySelectValue} from "../select-value";
import {Tuple} from "../tuple";
import * as sd from "schema-decorator";
import {AnyAliasedTable} from "../aliased-table";
import {ColumnCollectionUtil} from "../column-collection";
import { ColumnReferencesUtil } from "../column-references";
import * as e from "../expression";
import {AnyTable, UniqueKeys, MinimalUniqueKeys} from "../table";
import {JoinCollection, JoinCollectionUtil} from "../join-collection";

export namespace RawExprUtil {
    export function isAllowedExprConstant (raw : AnyRawExpr) : raw is AllowedExprConstant {
        if (raw == undefined) {
            return true;
        }
        if (raw instanceof Date) {
            return true;
        }
        switch (typeof raw) {
            case "number":
            case "string":
            case "boolean": {
                return true;
            }
        }
        return false;
    }
    export function querify (raw : RawExpr<any>) : string {
        if (isAllowedExprConstant(raw)) {
            if (raw == undefined) {
                return mysql.escape(null);
            }
            if (raw instanceof Date) {
                //TODO Make this toggleable
                return mysql.escape(raw, true);
            }
            switch (typeof raw) {
                case "number": {
                    return mysql.escape(raw);
                }
                case "string": {
                    return mysql.escape(raw);
                }
                case "boolean": {
                    return mysql.escape(raw);
                }
            }
        }
        if (raw instanceof Column) {
            const sb = new StringBuilder();
            raw.querify(sb);
            return sb.toString();
        }
        if (raw instanceof Expr) {
            const sb = new StringBuilder();
            raw.querify(sb);
            return sb.toString();
        }
        if (raw instanceof SelectBuilder) {
            const sb = new StringBuilder();
            raw.querify(sb);
            return "(" + sb.toString() + ")";
        }
        throw new Error(`Unknown raw expression (${typeof raw})${raw}`);
    }

    //Hack to make emitted type not confuse `tsc`
    export type WithParentJoins = {
        data : {
            hasParentJoins : boolean,
            parentJoins : JoinCollection,
        }
    };
    export type UsedReferences<RawExprT extends AnyRawExpr> = (
        RawExprT extends WithParentJoins ?
        (
            true extends RawExprT["data"]["hasParentJoins"] ?
                JoinCollectionUtil.ToColumnReferences<
                    RawExprT["data"]["parentJoins"]
                > :
                {}
        ) :
        RawExprT extends AllowedExprConstant ?
        {} :
        RawExprT extends AnyColumn ?
        {
            readonly [tableAlias in RawExprT["tableAlias"]] : {
                readonly [name in RawExprT["name"]] : RawExprT
            }
        } :
        RawExprT extends AnyExpr ?
        RawExprT["usedReferences"] :
        never
    );
    export function usedReferences<RawExprT extends AnyRawExpr> (raw : RawExprT) : (
        UsedReferences<RawExprT>
    ) {
        if (isAllowedExprConstant(raw)) {
            return {} as any;
        }
        if (raw instanceof Column) {
            return {
                [raw.tableAlias] : {
                    [raw.name] : raw
                }
            } as any;
        }
        if (raw instanceof Expr) {
            return raw.usedReferences as any;
        }
        if (raw instanceof SelectBuilder) {
            if (raw.data.hasParentJoins) {
                return JoinCollectionUtil.toColumnReferences(
                    raw.data.parentJoins
                ) as any;
            } else {
                return {} as any;
            }
        }
        throw new Error(`Unknown raw expression (${typeof raw})${raw}`);
    }
    export type Type<RawExprT extends AnyRawExpr> = (
        RawExprT extends AllowedExprConstant ?
        (
            RawExprT extends undefined ?
                null :
                RawExprT
        ) :
        RawExprT extends AnyColumn ?
        ReturnType<RawExprT["assertDelegate"]> :
        RawExprT extends AnyExpr ?
        ReturnType<RawExprT["assertDelegate"]> :
        RawExprT extends AnySelectBuilder ?
        (
            RawExprT["data"]["selects"] extends (
                Tuple<AnySelectValue> &
                { length : 1 }
            ) ?
                //If it's from a subquery. it's possible it may be null
                //because subqueries can return zero rows
                ReturnType<RawExprT["data"]["selects"][0]["assertDelegate"]>|null :
                never//("Invalid selectTuple; must have 1 element, and not be a table"|void|never)
        ) :
        never
        //("Invalid RawExprT or could not infer TypeT/DataT"|void|never)
    );
    export function assertDelegate<RawExprT extends AnyRawExpr> (raw : RawExprT) : (
        sd.AssertDelegate<Type<RawExprT>>
    ) {
        if (isAllowedExprConstant(raw)) {
            if (raw == undefined) {
                return sd.nil() as any;
            }
            if (raw instanceof Date) {
                return sd.date() as any;
            }
            switch (typeof raw) {
                case "number": {
                    return sd.number() as any;
                }
                case "string": {
                    return sd.string() as any;
                }
                case "boolean": {
                    //MySQL returns `number` instead of `boolean`
                    return sd.numberToBoolean() as any;
                }
            }
        }
        if (raw instanceof Column) {
            return raw.assertDelegate;
        }
        if (raw instanceof Expr) {
            return raw.assertDelegate;
        }
        if (raw instanceof SelectBuilder) {
            //If it's from a subquery. it's possible it may be null
            //because subqueries can return zero rows
            return sd.nullable(
                raw.data.selects[0].assertDelegate
            ) as any;
        }
        throw new Error(`Unknown raw expression (${typeof raw})${raw}`);
    }

    export type ToExpr<RawExprT extends AnyRawExpr> = (
        Expr<
            UsedReferences<RawExprT>,
            Type<RawExprT>
        >
    );
    export function toExpr<RawExprT extends AnyRawExpr> (raw : RawExprT) : (
        ToExpr<RawExprT>
    ) {
        return new Expr(
            usedReferences(raw),
            assertDelegate(raw),
            querify(raw)
        );
    }

    export function isNullable (raw : AnyRawExpr) {
        try {
            assertDelegate(raw)("", null);
        } catch (_err) {
            //If we encounter an error, we know this raw expression
            //is non-nullable
            return false;
        }

        return true;
    }
    export function assertNonNullable (raw : AnyRawExpr) {
        try {
            assertDelegate(raw)("", null);
        } catch (_err) {
            //If we encounter an error, we know this raw expression
            //is non-nullable
            return;
        }

        throw new Error(`Expected expression to be non-nullable, but it is`);
    }

    export function toEqualityCondition<
        TableT extends AnyAliasedTable
    > (
        table : TableT,
        //TODO Force proper typing?
        //For now, ignores invalid columns
        condition : /*Partial<ColumnCollectionUtil.Type<TableT["columns"]>> & */{
            [otherColumnName : string]  : any
        }
    ) : (
        Expr<
            ColumnReferencesUtil.Partial<
                ColumnCollectionUtil.ToColumnReferences<TableT["columns"]>
            >,
            boolean
        >
    ) {
        const assertDelegate = ColumnCollectionUtil.partialAssertDelegate(table.columns);
        condition = assertDelegate(`${table.alias} condition`, condition) as any;
        const comparisonArr = Object.keys(condition)
            .filter((columnName) => {
                //Strict equality because we support checking against `null`
                return (
                    (condition as any)[columnName] !== undefined &&
                    table.columns[columnName] !== undefined
                );
            })
            .map((columnName) => {
                const column = table.columns[columnName];
                const value = (condition as any)[columnName];
                if (value == null) {
                    return e.isNull(column);
                } else {
                    if (RawExprUtil.isNullable(column)) {
                        return e.isNotNullAndEq(column, value) as any;
                    } else {
                        return e.eq(column, value) as any;
                    }
                }
            });
        if (comparisonArr.length == 0) {
            return e.TRUE;
        } else {
            return e.and(
                comparisonArr[0],
                ...comparisonArr.slice(1)
            );
        }
    }
    export function toUniqueKeyEqualityCondition<
        TableT extends AnyTable,
        ConditionT extends UniqueKeys<TableT>
    > (
        table : TableT,
        rawCondition : ConditionT
    ) : (
        Expr<
            ColumnReferencesUtil.Partial<
                ColumnCollectionUtil.ToColumnReferences<TableT["columns"]>
            >,
            boolean
        >
    ) {
        const condition = table.getUniqueKeyAssertDelegate()(
            `${table.alias} condition`,
            rawCondition
        );
        return toEqualityCondition(
            table,
            condition
        ) as any;
    }
    export function toMinimalUniqueKeyEqualityCondition<
        TableT extends AnyTable,
        ConditionT extends MinimalUniqueKeys<TableT>
    > (
        table : TableT,
        rawCondition : ConditionT
    ) : (
        Expr<
            ColumnReferencesUtil.Partial<
                ColumnCollectionUtil.ToColumnReferences<TableT["columns"]>
            >,
            boolean
        >
    ) {
        const condition = table.getMinimalUniqueKeyAssertDelegate()(
            `${table.alias} condition`,
            rawCondition
        );
        return toEqualityCondition(
            table,
            condition
        ) as any;
    }
}

//Convenience exports
export const toEqualityCondition = RawExprUtil.toEqualityCondition;
export const toUniqueKeyEqualityCondition = RawExprUtil.toUniqueKeyEqualityCondition;
export const toMinimalUniqueKeyEqualityCondition = RawExprUtil.toMinimalUniqueKeyEqualityCondition;