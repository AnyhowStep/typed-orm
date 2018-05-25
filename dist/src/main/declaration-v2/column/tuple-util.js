"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
var ColumnTupleUtil;
(function (ColumnTupleUtil) {
    function withTableAlias(tuple, newTableAlias) {
        return tuple.map((column) => {
            return util_1.ColumnUtil.withTableAlias(column, newTableAlias);
        });
    }
    ColumnTupleUtil.withTableAlias = withTableAlias;
})(ColumnTupleUtil = exports.ColumnTupleUtil || (exports.ColumnTupleUtil = {}));
//# sourceMappingURL=tuple-util.js.map