"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const select_builder_1 = require("./select-builder");
const join_1 = require("./join");
const select_collection_1 = require("./select-collection");
const type_util_1 = require("@anyhowstep/type-util");
const join_collection_1 = require("./join-collection");
var SelectBuilderUtil;
(function (SelectBuilderUtil) {
    function from(s, toTable) {
        if (s.data.hasFrom) {
            throw new Error(`FROM clause already exists`);
        }
        if (s.data.hasParentJoins) {
            join_collection_1.JoinCollectionUtil.assertNonDuplicateTableAlias(s.data.parentJoins, toTable.alias);
        }
        return new select_builder_1.SelectBuilder(type_util_1.spread(s.data, {
            hasFrom: true,
            joins: [
                new join_1.Join(join_1.JoinType.FROM, toTable, toTable.columns, false, [], [])
            ]
        }), s.extraData);
    }
    SelectBuilderUtil.from = from;
    function doJoin(s, toTable, fromDelegate, toDelegate) {
        s.assertAfterFrom();
        return new select_builder_1.SelectBuilder(type_util_1.spread(s.data, {
            joins: join_collection_1.JoinCollectionUtil.innerJoin(s, toTable, fromDelegate, toDelegate)
        }), s.extraData);
    }
    SelectBuilderUtil.doJoin = doJoin;
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