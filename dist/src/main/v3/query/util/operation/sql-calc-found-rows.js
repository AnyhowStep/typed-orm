"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../query");
function sqlCalcFoundRows(query) {
    if (query._selects == undefined) {
        throw new Error(`Cannot use SQL_CALC_FOUND_ROWS before SELECT clause`);
    }
    return new query_1.Query({
        ...query,
        _sqlCalcFoundRows: true,
    });
}
exports.sqlCalcFoundRows = sqlCalcFoundRows;
//# sourceMappingURL=sql-calc-found-rows.js.map