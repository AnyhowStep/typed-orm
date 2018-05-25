"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function tuplePush(tuple, next) {
    return tuple.concat(next);
}
exports.tuplePush = tuplePush;
function tupleWPush() {
    return tuplePush;
}
exports.tupleWPush = tupleWPush;
function tupleConcat(t, u) {
    return t.concat(u);
}
exports.tupleConcat = tupleConcat;
function tupleWConcat() {
    return tupleConcat;
}
exports.tupleWConcat = tupleWConcat;
/*
declare const a: [1, 2, 3, 4];
declare const b: ["a", "b", "c"];
declare const c: TupleConcat<typeof a, typeof b>;
declare const d: TupleConcat<typeof b, typeof a>;
d.length
*/
//# sourceMappingURL=tuple.js.map