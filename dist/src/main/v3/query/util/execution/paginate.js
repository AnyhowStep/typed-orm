"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const operation_1 = require("../operation");
const fetch_all_unmapped_1 = require("./fetch-all-unmapped");
const fetch_value_1 = require("./fetch-value");
const constructor_1 = require("../constructor");
const exprLib = require("../../../expr-library");
function toPaginateArgs(rawArgs) {
    const page = sd.optional(sd.finiteNumber())("page", rawArgs.page);
    const rowsPerPage = sd.optional(sd.finiteNumber())("rowsPerPage", rawArgs.rowsPerPage);
    return {
        page: (page == undefined || page < 0) ?
            //Default
            0 :
            Math.floor(page),
        rowsPerPage: (rowsPerPage == undefined || rowsPerPage < 1) ?
            //Default
            20 :
            Math.floor(rowsPerPage),
    };
}
exports.toPaginateArgs = toPaginateArgs;
function getPaginationStart(args) {
    return args.page * args.rowsPerPage;
}
exports.getPaginationStart = getPaginationStart;
function calculatePagesFound(args, rowsFound) {
    if (rowsFound < 0) {
        return 0;
    }
    if (args.rowsPerPage <= 0) {
        return 0;
    }
    return (Math.floor(rowsFound / args.rowsPerPage) +
        ((rowsFound % args.rowsPerPage == 0) ?
            0 : 1));
}
exports.calculatePagesFound = calculatePagesFound;
async function paginate(query, connection, rawArgs) {
    const args = toPaginateArgs(rawArgs);
    //We do not call fetchAll() because we do not want to run map() functions
    //automatically. They mess with SQL_CALC_FOUND_ROWS if the mapping
    //function runs its own queries.
    const unmappedRows = (query._unions == undefined) ?
        await fetch_all_unmapped_1.fetchAllUnmapped(operation_1.sqlCalcFoundRows(operation_1.offset(operation_1.limit(query, args.rowsPerPage), getPaginationStart(args))), connection) :
        await fetch_all_unmapped_1.fetchAllUnmapped(operation_1.sqlCalcFoundRows(operation_1.unionOffset(operation_1.unionLimit(query, args.rowsPerPage), getPaginationStart(args))), connection);
    const rowsFound = await fetch_value_1.fetchValue(operation_1.selectExpr(constructor_1.newInstance(), () => exprLib.foundRows()), connection).then((result) => Number(result));
    const pagesFound = calculatePagesFound(args, rowsFound);
    const info = {
        rowsFound,
        pagesFound,
        page: args.page,
        rowsPerPage: args.rowsPerPage,
    };
    if (query._mapDelegate == undefined || unmappedRows.length == 0) {
        return {
            info,
            rows: unmappedRows,
        };
    }
    else {
        const rows = [];
        for (let unmapped of unmappedRows) {
            rows.push(await query._mapDelegate(unmapped, connection, unmapped));
        }
        return {
            info,
            rows,
        };
    }
}
exports.paginate = paginate;
//# sourceMappingURL=paginate.js.map