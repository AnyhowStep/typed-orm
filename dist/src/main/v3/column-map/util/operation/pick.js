"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function pick(map, arr) {
    const result = {};
    for (let columnName in map) {
        if (arr.indexOf(columnName) >= 0) {
            result[columnName] = map[columnName];
        }
    }
    return result;
}
exports.pick = pick;
//# sourceMappingURL=pick.js.map