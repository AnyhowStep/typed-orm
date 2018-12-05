"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function joinUsingColumns(columns, aliasedTable) {
    //During run-time, we cannot actually check if the assertDelegate
    //of a column matches...
    return columns.filter(column => {
        return aliasedTable.columns[column.name] != undefined;
    });
}
exports.joinUsingColumns = joinUsingColumns;
//# sourceMappingURL=join-using-delegate.js.map