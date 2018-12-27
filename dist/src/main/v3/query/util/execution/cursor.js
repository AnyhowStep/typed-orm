"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const paginate_1 = require("./paginate");
//In case Symbol.asyncIterator is not defined
if (Symbol.asyncIterator == undefined) {
    Object.defineProperty(Symbol, "asyncIterator", {
        value: Symbol.for("Symbol.asyncIterator")
    });
}
class CursorImpl {
    constructor(query, connection) {
        this.query = query;
        this.connection = connection;
        this.rowIndex = 0;
        this.paginated = undefined;
        //Arbitrary
        this.rowsPerPage = 50;
    }
    async getOrFetchPage() {
        if (this.paginated == undefined) {
            this.rowIndex = 0;
            this.paginated = await paginate_1.paginate(this.query, this.connection, {
                page: 0,
                rowsPerPage: this.rowsPerPage,
            });
        }
        return this.paginated;
    }
    async tryFetchNextPage() {
        const paginated = await this.getOrFetchPage();
        const nextPage = paginated.info.page + 1;
        if (nextPage < paginated.info.pagesFound) {
            this.rowIndex = 0;
            this.paginated = await paginate_1.paginate(this.query, this.connection, {
                page: nextPage,
                rowsPerPage: this.rowsPerPage,
            });
            return paginated;
        }
        else {
            return undefined;
        }
    }
    async tryGetNextRow() {
        const paginated = await this.getOrFetchPage();
        if (this.rowIndex < paginated.rows.length) {
            const row = paginated.rows[this.rowIndex];
            ++this.rowIndex;
            return row;
        }
        else {
            return undefined;
        }
    }
    async next() {
        //Try and get the next item of the current page
        const row = await this.tryGetNextRow();
        if (row !== undefined) {
            return {
                done: false,
                value: row,
            };
        }
        //If we're here, we passed the end of the current page
        {
            await this.tryFetchNextPage();
            const row = await this.tryGetNextRow();
            if (row !== undefined) {
                return {
                    done: false,
                    value: row,
                };
            }
            else {
                //We passed the end of the last page
                return {
                    done: true,
                    value: undefined,
                };
            }
        }
    }
    [Symbol.asyncIterator]() {
        return this;
    }
}
exports.CursorImpl = CursorImpl;
function cursor(query, connection) {
    return new CursorImpl(query, connection);
}
exports.cursor = cursor;
//# sourceMappingURL=cursor.js.map