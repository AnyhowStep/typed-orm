import {AfterSelectClause, MainQuery} from "../predicate";
import {IConnection} from "../../../execution";
import {MappedType} from "../operation";
import {Paginate, paginate} from "./paginate";

//In case Symbol.asyncIterator is not defined
if (Symbol.asyncIterator == undefined) {
    Object.defineProperty(Symbol, "asyncIterator", {
        value : Symbol.for("Symbol.asyncIterator")
    });
}

export class CursorImpl<
    QueryT extends AfterSelectClause & MainQuery
>  {
    private rowIndex = 0;
    private paginated : Paginate<QueryT>|undefined = undefined;
    //Arbitrary
    private rowsPerPage = 50;
    constructor (
        private readonly query : QueryT,
        private readonly connection : IConnection
    ) {
    }
    private async getOrFetchPage () : Promise<Paginate<QueryT>> {
        if (this.paginated == undefined) {
            this.rowIndex = 0;
            this.paginated = await paginate(
                this.query,
                this.connection,
                {
                    page : 0,
                    rowsPerPage : this.rowsPerPage,
                }
            );
        }
        return this.paginated;
    }
    private async tryFetchNextPage () : Promise<Paginate<QueryT>|undefined> {
        const paginated = await this.getOrFetchPage();
        const nextPage = paginated.info.page+1;
        if (nextPage < paginated.info.pagesFound) {
            this.rowIndex = 0;
            this.paginated = await paginate(
                this.query,
                this.connection,
                {
                    page : nextPage,
                    rowsPerPage : this.rowsPerPage,
                }
            );
            return paginated;
        } else {
            return undefined;
        }
    }
    private async tryGetNextRow () : Promise<MappedType<QueryT>|undefined> {
        const paginated = await this.getOrFetchPage();
        if (this.rowIndex < paginated.rows.length) {
            const row = paginated.rows[this.rowIndex];
            ++this.rowIndex;
            return row;
        } else {
            return undefined;
        }
    }
    async next () : Promise<IteratorResult<MappedType<QueryT>>> {
        //Try and get the next item of the current page
        const row = await this.tryGetNextRow();
        if (row !== undefined) {
            return {
                done : false,
                value : row,
            };
        }

        //If we're here, we passed the end of the current page
        {
            await this.tryFetchNextPage();
            const row = await this.tryGetNextRow();
            if (row !== undefined) {
                return {
                    done : false,
                    value : row,
                };
            } else {
                //We passed the end of the last page
                return {
                    done : true,
                    value : undefined as any,
                };
            }
        }
    }
    [Symbol.asyncIterator]() {
        return this;
    }
}
export type Cursor<
    QueryT extends AfterSelectClause & MainQuery
> = (
    AsyncIterableIterator<MappedType<QueryT>>
);

export function cursor<
    QueryT extends AfterSelectClause & MainQuery
>(
    query : QueryT,
    connection : IConnection
) : Cursor<QueryT> {
    return new CursorImpl<QueryT>(query, connection);
}