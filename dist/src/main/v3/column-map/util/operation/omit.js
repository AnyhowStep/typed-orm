"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function omit(map, arr) {
    const result = {};
    for (let columnName in map) {
        if (arr.indexOf(columnName) < 0) {
            result[columnName] = map[columnName];
        }
    }
    return result;
}
exports.omit = omit;
//# sourceMappingURL=omit.js.map