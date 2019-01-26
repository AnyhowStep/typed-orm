"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const boolean_expr_1 = require("./boolean-expr");
const join_collection_1 = require("../join-collection");
const select_builder_1 = require("../select-builder");
const column_1 = require("../column");
select_builder_1.SelectBuilder;
column_1.Column;
//The `parentJoins` of the SelectBuilder
//are in the `usedReferences` of the result.
//This way, we don't accidentally use subqueries
//that reference tables/columns that don't exist.
function exists(subQuery) {
    const usedReferences = subQuery.data.hasParentJoins ?
        join_collection_1.JoinCollectionUtil.toColumnReferences(subQuery.data.parentJoins) :
        {};
    if (subQuery.data.selects == undefined) {
        return boolean_expr_1.booleanExpr(usedReferences, `
                EXISTS (
                    SELECT
                        *
                    ${subQuery.getQuery()}
                )
            `);
    }
    else {
        return boolean_expr_1.booleanExpr(usedReferences, `
                EXISTS (
                    ${subQuery.getQuery()}
                )
            `);
    }
}
exports.exists = exists;
//# sourceMappingURL=exists.js.map