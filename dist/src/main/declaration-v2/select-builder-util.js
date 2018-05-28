"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const select_builder_1 = require("./select-builder");
const select_collection_1 = require("./select-collection");
const type_util_1 = require("@anyhowstep/type-util");
var SelectBuilderUtil;
(function (SelectBuilderUtil) {
    function selectAll(s) {
        s.assertBeforeSelect();
        s.assertAfterFrom();
        s.assertBeforeUnion();
        return new select_builder_1.SelectBuilder(type_util_1.spread(s.data, {
            hasSelect: true,
            selects: select_collection_1.SelectCollectionUtil.fromJoinCollection(s.data.joins)
        }), s.extraData);
    }
    SelectBuilderUtil.selectAll = selectAll;
})(SelectBuilderUtil = exports.SelectBuilderUtil || (exports.SelectBuilderUtil = {}));
//# sourceMappingURL=select-builder-util.js.map