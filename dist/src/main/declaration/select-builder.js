"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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