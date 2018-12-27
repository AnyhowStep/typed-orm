import { AfterSelectClause, MainQuery } from "../predicate";
import { IConnection } from "../../../execution";
import { MappedType } from "../operation";
export declare class CursorImpl<QueryT extends AfterSelectClause & MainQuery> {
    private readonly query;
    private readonly connection;
    private rowIndex;
    private paginated;
    private rowsPerPage;
    constructor(query: QueryT, connection: IConnection);
    private getOrFetchPage;
    private tryFetchNextPage;
    private tryGetNextRow;
    next(): Promise<IteratorResult<MappedType<QueryT>>>;
    [Symbol.asyncIterator](): this;
}
export declare type Cursor<QueryT extends AfterSelectClause & MainQuery> = (AsyncIterableIterator<MappedType<QueryT>>);
export declare function cursor<QueryT extends AfterSelectClause & MainQuery>(query: QueryT, connection: IConnection): Cursor<QueryT>;
//# sourceMappingURL=cursor.d.ts.map