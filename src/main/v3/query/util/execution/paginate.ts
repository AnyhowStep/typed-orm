import * as sd from "schema-decorator";
import {AfterSelectClause, MainQuery} from "../predicate";
import {IConnection} from "../../../execution";
import {MappedType, limit, offset, sqlCalcFoundRows, selectExpr, unionOffset, unionLimit} from "../operation";
import {fetchAllUnmapped} from "./fetch-all-unmapped";
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

    //We do not call fetchAll() because we do not want to run map() functions
    //automatically. They mess with SQL_CALC_FOUND_ROWS if the mapping
    //function runs its own queries.
    const unmappedRows = (query._unions == undefined) ?
        await fetchAllUnmapped(
            sqlCalcFoundRows(
                offset(
                    limit(query, args.rowsPerPage),
                    getPaginationStart(args)
                )
            ),
            connection
        ) :
        await fetchAllUnmapped(
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
    const info = {
        rowsFound,
        pagesFound,
        page : args.page,
        rowsPerPage : args.rowsPerPage,
    };
    if (query._mapDelegate == undefined || unmappedRows.length == 0) {
        return {
            info,
            rows : [],
        };
    } else {
        const rows : any[] = [];
        for (let unmapped of unmappedRows) {
            rows.push(
                await query._mapDelegate(unmapped, connection, unmapped)
            );
        }
        return {
            info,
            rows,
        };
    }
}
