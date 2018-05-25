"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aliased_table_1 = require("../aliased-table");
const column_1 = require("../column");
var JoinToDelegateUtil;
(function (JoinToDelegateUtil) {
    function execute(toTable, from, toDelegate) {
        const to = toDelegate(toTable.columns);
        if (to.length != from.length) {
            throw new Error(`Expected JOIN to columns of length ${from.length}; received ${to.length}`);
        }
        aliased_table_1.AliasedTableUtil.assertHasColumns(toTable, to);
        return to;
    }
    JoinToDelegateUtil.execute = execute;
    ;
    function createUsingUnsafe(toTable, from) {
        const to = from.map((f) => {
            return new column_1.Column(toTable.alias, f.name, f.assertDelegate, toTable.columns[f.name].subTableName, toTable.columns[f.name].isSelectReference);
        });
        aliased_table_1.AliasedTableUtil.assertHasColumns(toTable, to);
        return to;
    }
    function createUsing(toTable, from) {
        return createUsingUnsafe(toTable, from);
    }
    JoinToDelegateUtil.createUsing = createUsing;
})(JoinToDelegateUtil = exports.JoinToDelegateUtil || (exports.JoinToDelegateUtil = {}));
//# sourceMappingURL=util.js.map