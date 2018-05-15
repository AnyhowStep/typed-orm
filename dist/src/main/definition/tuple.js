"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function push(tuple, element) {
    const result = tuple.slice();
    result.push(element);
    return result;
}
exports.push = push;
function concat(t, u) {
    return t.concat(u);
}
exports.concat = concat;
//# sourceMappingURL=tuple.js.map