"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Refactor to hasSelect, hasUnion
var SelectBuilderOperation;
(function (SelectBuilderOperation) {
    SelectBuilderOperation["NARROW"] = "NARROW";
    SelectBuilderOperation["SELECT"] = "SELECT";
    SelectBuilderOperation["WIDEN"] = "WIDEN";
    SelectBuilderOperation["UNION"] = "UNION";
    SelectBuilderOperation["AS"] = "AS";
    //After SELECT
    SelectBuilderOperation["FETCH"] = "FETCH";
    //After SELECT, will change the return value of fetchAll(), fetchOne(), fetchZeroOrOne(), paginate()
    SelectBuilderOperation["AGGREGATE"] = "AGGREGATE";
})(SelectBuilderOperation = exports.SelectBuilderOperation || (exports.SelectBuilderOperation = {}));
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