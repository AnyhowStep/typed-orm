"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_collection_1 = require("../join-collection");
const column_references_1 = require("../column-references");
var SelectDelegateUtil;
(function (SelectDelegateUtil) {
    function execute(selectBuilder, selectDelegate) {
        const columnReferences = join_collection_1.JoinCollectionUtil.toColumnReferences(selectBuilder.data.joins);
        const result = selectDelegate(column_references_1.ColumnReferencesUtil.toConvenient(columnReferences), selectBuilder);
        return result;
    }
    SelectDelegateUtil.execute = execute;
})(SelectDelegateUtil = exports.SelectDelegateUtil || (exports.SelectDelegateUtil = {}));
//# sourceMappingURL=util.js.map