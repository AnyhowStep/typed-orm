"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_collection_1 = require("../join-collection");
const column_references_1 = require("../column-references");
var TypeNarrowDelegateUtil;
(function (TypeNarrowDelegateUtil) {
    function getColumn(joins, typeNarrowDelegate) {
        const ref = join_collection_1.JoinCollectionUtil.toColumnReferences(joins);
        const column = typeNarrowDelegate(column_references_1.ColumnReferencesUtil.toConvenient(ref));
        column_references_1.ColumnReferencesUtil.assertHasColumn(ref, column);
        return column;
    }
    TypeNarrowDelegateUtil.getColumn = getColumn;
})(TypeNarrowDelegateUtil = exports.TypeNarrowDelegateUtil || (exports.TypeNarrowDelegateUtil = {}));
//# sourceMappingURL=util.js.map