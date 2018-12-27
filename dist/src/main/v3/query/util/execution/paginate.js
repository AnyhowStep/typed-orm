"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const operation_1 = require("../operation");
const fetch_all_1 = require("./fetch-all");
const fetch_value_1 = require("./fetch-value");
const constructor_1 = require("../constructor");
const exprLib = require("../../../expr-library");
function toPaginateArgs(rawArgs) {
    const page = sd.finiteNumber()("page", rawArgs.page);
    const rowsPerPage = sd.finiteNumber()("rowsPerPage", rawArgs.rowsPerPage);
    return {
        page: (page == undefined || page < 0) ?
            //Default
            0 :
            Math.floor(page),
        rowsPerPage: (rowsPerPage == undefined || rowsPerPage <= 0) ?
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
    const rows = (query._unions == undefined) ?
        await fetch_all_1.fetchAll(operation_1.sqlCalcFoundRows(operation_1.offset(operation_1.limit(query, args.rowsPerPage), getPaginationStart(args))), connection) :
        await fetch_all_1.fetchAll(operation_1.sqlCalcFoundRows(operation_1.unionOffset(operation_1.unionLimit(query, args.rowsPerPage), getPaginationStart(args))), connection);
    const rowsFound = await fetch_value_1.fetchValue(operation_1.selectExpr(constructor_1.newInstance(), () => exprLib.foundRows()), connection).then((result) => Number(result));
    const pagesFound = calculatePagesFound(args, rowsFound);
    return {
        info: {
            rowsFound,
            pagesFound,
            page: args.page,
            rowsPerPage: args.rowsPerPage,
        },
        rows,
    };
}
exports.paginate = paginate;
//# sourceMappingURL=paginate.js.map