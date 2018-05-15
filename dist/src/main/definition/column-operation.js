"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function columnToReference(column) {
    const result = {
        [column.table]: {
            [column.name]: column
        }
    };
    return result;
}
exports.columnToReference = columnToReference;
function nullableColumnNames(columns) {
    const result = [];
    for (let name in columns) {
        if (columns.hasOwnProperty(name)) {
            try {
                columns[name].assertDelegate("test-null", null);
                result.push(name);
            }
            catch (_err) {
                //Do nothing
            }
        }
    }
    return result;
}
exports.nullableColumnNames = nullableColumnNames;
//# sourceMappingURL=column-operation.js.map