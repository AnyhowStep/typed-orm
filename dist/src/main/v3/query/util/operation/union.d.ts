import * as sd from "schema-decorator";
import { Query, UnionQuery } from "../../query";
import { AfterSelectClause } from "../predicate";
import { DISTINCT, ALL } from "../../../constants";
import { SelectItem } from "../../../select-item";
import { IColumn } from "../../../column";
import { IExprSelectItem } from "../../../expr-select-item";
import { ColumnMap } from "../../../column-map";
import { ToUnknownIfAllFieldsNever } from "../../../type";
export declare type Union<QueryT extends AfterSelectClause> = (Query<{
    readonly _distinct: QueryT["_distinct"];
    readonly _sqlCalcFoundRows: QueryT["_sqlCalcFoundRows"];
    readonly _joins: QueryT["_joins"];
    readonly _parentJoins: QueryT["_parentJoins"];
    readonly _selects: QueryT["_selects"];
    readonly _where: QueryT["_where"];
    readonly _grouped: QueryT["_grouped"];
    readonly _having: QueryT["_having"];
    readonly _orders: QueryT["_orders"];
    readonly _limit: QueryT["_limit"];
    readonly _unions: UnionQuery[];
    readonly _unionOrders: QueryT["_unionOrders"];
    readonly _unionLimit: QueryT["_unionLimit"];
    readonly _mapDelegate: QueryT["_mapDelegate"];
}>);
export declare type UnionType = (typeof DISTINCT) | (typeof ALL);
export declare type AssertUnionCompatibleSelectArray<A extends SelectItem[], B extends SelectItem[]> = (number extends A["length"] ? ["Invalid SELECT clause length", A["length"]] : number extends B["length"] ? ["Invalid SELECT clause length", B["length"]] : A["length"] extends B["length"] ? (B["length"] extends A["length"] ? ToUnknownIfAllFieldsNever<{
    [index in {
        [k in Extract<keyof (A | B), string>]: ((A | B)[k] extends SelectItem ? k : never);
    }[Extract<keyof (A | B), string>]]: (A[index] extends IColumn ? (B[index] extends {
        assertDelegate: sd.AssertDelegate<ReturnType<A[index]["assertDelegate"]>>;
    } ? never : B[index] extends {
        assertDelegate: any;
    } ? ["Invalid SELECT item data-type", index, B[index]["assertDelegate"], "not assignable to", sd.AssertDelegate<ReturnType<A[index]["assertDelegate"]>>] : ["Invalid SELECT item", index, B[index], "does not have an assertDelegate"]) : A[index] extends IExprSelectItem ? (B[index] extends {
        assertDelegate: sd.AssertDelegate<ReturnType<A[index]["assertDelegate"]>>;
    } ? never : B[index] extends {
        assertDelegate: any;
    } ? ["Invalid SELECT item data-type", index, B[index]["assertDelegate"], "not assignable to", sd.AssertDelegate<ReturnType<A[index]["assertDelegate"]>>] : ["Invalid SELECT item", index, B[index], "does not have an assertDelegate"]) : A[index] extends ColumnMap ? (string extends Extract<keyof A[index], string> ? ["Invalid SELECT item columnMap", index, Extract<keyof A[index], string>] : string extends Extract<keyof B[index], string> ? ["Invalid SELECT item columnMap", index, Extract<keyof B[index], string>] : Extract<keyof A[index], string> extends Extract<keyof B[index], string> ? (Extract<keyof B[index], string> extends Extract<keyof A[index], string> ? (B[index] extends {
        [columnName in Extract<keyof A[index], string>]: ({
            assertDelegate: sd.AssertDelegate<ReturnType<A[index][columnName]["assertDelegate"]>>;
        });
    } ? never : ["Invalid SELECT item column-map", index, B[index], "not assignable to", A[index]]) : ["Invalid SELECT item columnMap", index, Extract<keyof B[index], string>, "not assignable to", Extract<keyof A[index], string>]) : ["Invalid SELECT item columnMap", index, Extract<keyof A[index], string>, "not assignable to", Extract<keyof B[index], string>]) : ["Unknown SELECT item", index, B[index], A[index]]);
}> : ["SELECT clause length mismatch", A["length"], "!=", B["length"]]) : ["SELECT clause length mismatch", A["length"], "!=", B["length"]]);
export declare type AssertUnionCompatibleQuery<QueryT extends AfterSelectClause, OtherT extends AfterSelectClause> = (OtherT & AssertUnionCompatibleSelectArray<QueryT["_selects"], OtherT["_selects"]>);
export declare function union<QueryT extends AfterSelectClause, OtherT extends AfterSelectClause>(query: QueryT, other: AssertUnionCompatibleQuery<QueryT, OtherT>, unionType?: UnionType): Union<QueryT>;
//# sourceMappingURL=union.d.ts.map