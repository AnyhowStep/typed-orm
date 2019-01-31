import * as sd from "schema-decorator";
import {AfterSelectClause, MainQuery} from "../predicate";
import {IConnection} from "../../../execution";
import {MappedType, limit, offset, sqlCalcFoundRows, selectExpr, unionOffset, unionLimit} from "../operation";
import {fetchAll} from "./fetch-all";
import {fetchValue} from "./fetch-value";
import {newInstance} from "../constructor";
import * as exprLib from "../../../expr-library";

export interface RawPaginateArgs {
    page? : number,
    rowsPerPage? : number,
}
export interface PaginateArgs {
    page : number,
    rowsPerPage : number,
}
export interface PaginateInfo {
    rowsFound : number,
    pagesFound : number,
    page : number,
    rowsPerPage : number,
}
export interface PaginateResult<T> {
    info : PaginateInfo,
    rows : T[],
}

export function toPaginateArgs (rawArgs : RawPaginateArgs) : PaginateArgs {
    const page = sd.optional(sd.finiteNumber())("page", rawArgs.page);
    const rowsPerPage = sd.optional(sd.finiteNumber())("rowsPerPage", rawArgs.rowsPerPage);

    return {
        page : (page == undefined || page < 0) ?
            //Default
            0 :
            Math.floor(page),
        rowsPerPage : (rowsPerPage == undefined || rowsPerPage < 1) ?
            //Default
            20 :
            Math.floor(rowsPerPage),
    };
}

export function getPaginationStart (args : PaginateArgs) : number {
    return args.page * args.rowsPerPage;
}

export function calculatePagesFound (args : PaginateArgs, rowsFound : number) {
    if (rowsFound < 0) {
        return 0;
    }
    if (args.rowsPerPage <= 0) {
        return 0;
    }
    return (
        Math.floor(rowsFound/args.rowsPerPage) +
        (
            (rowsFound%args.rowsPerPage == 0) ?
                0 : 1
        )
    )
}

export type Paginate<
    QueryT extends AfterSelectClause & MainQuery
> = (
    PaginateResult<MappedType<QueryT>>
);
export async function paginate<
    QueryT extends AfterSelectClause & MainQuery
>(
    query : QueryT,
    connection : IConnection,
    rawArgs : RawPaginateArgs
) : Promise<Paginate<QueryT>> {
    const args = toPaginateArgs(rawArgs);

    const rows = (query._unions == undefined) ?
        await fetchAll(
            sqlCalcFoundRows(
                offset(
                    limit(query, args.rowsPerPage),
                    getPaginationStart(args)
                )
            ),
            connection
        ) :
        await fetchAll(
            sqlCalcFoundRows(
                unionOffset(
                    unionLimit(query, args.rowsPerPage),
                    getPaginationStart(args)
                )
            ),
            connection
        );
    const rowsFound = await fetchValue(
        selectExpr(
            newInstance(),
            () => exprLib.foundRows()
        ),
        connection
    ).then(
        (result) => Number(result)
    );
    const pagesFound = calculatePagesFound(args, rowsFound);
    return {
        info : {
            rowsFound,
            pagesFound,
            page : args.page,
            rowsPerPage : args.rowsPerPage,
        },
        rows,
    }
}
