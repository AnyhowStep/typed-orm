"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_collection_1 = require("../join-collection");
var JoinFromDelegateUtil;
(function (JoinFromDelegateUtil) {
    function execute(joins, fromDelegate) {
        const result = fromDelegate(join_collection_1.JoinCollectionUtil.toConvenientColumnReferences(joins));
        join_collection_1.JoinCollectionUtil.assertHasColumns(joins, result);
        //TODO Follow up on potential bug https://github.com/Microsoft/TypeScript/issues/24277
        return result;
    }
    JoinFromDelegateUtil.execute = execute;
    ;
})(JoinFromDelegateUtil = exports.JoinFromDelegateUtil || (exports.JoinFromDelegateUtil = {}));
//# sourceMappingURL=util.js.map