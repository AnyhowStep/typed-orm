"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SelectBuilderOperation;
(function (SelectBuilderOperation) {
    SelectBuilderOperation["JOIN"] = "JOIN";
    SelectBuilderOperation["NARROW"] = "NARROW";
    SelectBuilderOperation["WHERE"] = "WHERE";
    SelectBuilderOperation["SELECT"] = "SELECT";
    SelectBuilderOperation["DISTINCT"] = "DISTINCT";
    SelectBuilderOperation["SQL_CALC_FOUND_ROWS"] = "SQL_CALC_FOUND_ROWS";
    SelectBuilderOperation["GROUP_BY"] = "GROUP_BY";
    SelectBuilderOperation["HAVING"] = "HAVING";
    SelectBuilderOperation["ORDER_BY"] = "ORDER_BY";
    SelectBuilderOperation["LIMIT"] = "LIMIT";
    SelectBuilderOperation["OFFSET"] = "OFFSET";
    SelectBuilderOperation["WIDEN"] = "WIDEN";
    SelectBuilderOperation["UNION"] = "UNION";
    SelectBuilderOperation["UNION_ORDER_BY"] = "UNION_ORDER_BY";
    SelectBuilderOperation["UNION_LIMIT"] = "UNION_LIMIT";
    SelectBuilderOperation["UNION_OFFSET"] = "UNION_OFFSET";
    SelectBuilderOperation["AS"] = "AS";
    //After SELECT
    SelectBuilderOperation["FETCH"] = "FETCH";
    //After SELECT, will change the return value of fetchAll(), fetchOne(), fetchZeroOrOne(), paginate()
    SelectBuilderOperation["AGGREGATE"] = "AGGREGATE";
})(SelectBuilderOperation = exports.SelectBuilderOperation || (exports.SelectBuilderOperation = {}));
exports.ArbitraryRowCount = 999999999;
/*
== Aggregation API ==
Desired usage:

const query = from(chargePreAuthorization)
    .leftJoinUsing(
        chargePreAuthorizationInformation,
        c => [c.chargePreAuthorization.chargePreAuthorizationId]
    )
    .selectAll()
    .aggregate(async (obj) => {
        return {
            ...obj,
            errors : await from(chargePreAuthorizationError)
                .whereIsEqual(
                    obj.chargePreAuthorization.chargePreAuthorizationId,
                    c => c.chargePreAuthorizationError.chargePreAuthorizationErrorId
                )
                .selectAll()
                .paginate(),
            methodType : e.toKey(s.MethodType, obj.chargePreAuthorization.methodTypeId),
        }
    })

Then,
query.where(<condition>).fetchAll()
query.where(<condition>).fetchOne()
query.where(<condition>).fetchZeroOrOne()
query.where(<condition>).paginate()

And the document will be the return value of `aggregate`

*/
//# sourceMappingURL=select-builder.js.map