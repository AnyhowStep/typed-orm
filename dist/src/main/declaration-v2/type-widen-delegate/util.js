"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const select_collection_1 = require("../select-collection");
const column_references_1 = require("../column-references");
const column_1 = require("../column");
const sd = require("schema-decorator");
var TypeWidenDelegateUtil;
(function (TypeWidenDelegateUtil) {
    function execute(selects, delegate, assertWidened) {
        if (selects == undefined) {
            throw new Error(`SELECT clause expected`);
        }
        const ref = select_collection_1.SelectCollectionUtil.toColumnReferences(selects);
        const column = delegate(column_references_1.ColumnReferencesUtil.toConvenient(ref));
        column_references_1.ColumnReferencesUtil.assertHasColumn(ref, column);
        return new column_1.Column(column.tableAlias, column.name, sd.or(column.assertDelegate, assertWidened));
    }
    TypeWidenDelegateUtil.execute = execute;
})(TypeWidenDelegateUtil = exports.TypeWidenDelegateUtil || (exports.TypeWidenDelegateUtil = {}));
//# sourceMappingURL=util.js.map