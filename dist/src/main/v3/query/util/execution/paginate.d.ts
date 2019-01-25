import { AfterSelectClause, MainQuery } from "../predicate";
import { IConnection } from "../../../execution";
import { MappedType } from "../operation";
export interface RawPaginateArgs {
    page?: number;
    rowsPerPage?: number;
}
export interface PaginateArgs {
    page: number;
    rowsPerPage: number;
}
export interface PaginateInfo {
    rowsFound: number;
    pagesFound: number;
    page: number;
    rowsPerPage: number;
}
export interface PaginateResult<T> {
    info: PaginateInfo;
    rows: T[];
}
export declare function toPaginateArgs(rawArgs: RawPaginateArgs): PaginateArgs;
export declare function getPaginationStart(args: PaginateArgs): number;
export declare function calculatePagesFound(args: PaginateArgs, rowsFound: number): number;
export declare type Paginate<QueryT extends AfterSelectClause & MainQuery> = (PaginateResult<MappedType<QueryT>>);
export declare function paginate<QueryT extends AfterSelectClause & MainQuery>(query: QueryT, connection: IConnection, rawArgs: RawPaginateArgs): Promise<Paginate<QueryT>>;
