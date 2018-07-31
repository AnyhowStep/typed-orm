"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JoinType;
(function (JoinType) {
    JoinType["FROM"] = "FROM";
    JoinType["INNER"] = "INNER";
    JoinType["LEFT"] = "LEFT";
    JoinType["RIGHT"] = "RIGHT";
    JoinType["CROSS"] = "CROSS";
})(JoinType = exports.JoinType || (exports.JoinType = {}));
;
class Join {
    constructor(joinType, table, 
    //We keep our own copy of the column collection because
    //we may decide to make some fields nullable or change their
    //type entirely
    columns, nullable, from, to) {
        this.joinType = joinType;
        this.table = table;
        this.columns = columns;
        this.nullable = nullable;
        this.from = from;
        this.to = to;
    }
}
exports.Join = Join;
/*export type AnyJoin = {
    readonly joinType : JoinType,
    readonly table : AnyAliasedTable,
    readonly columns : ColumnCollection,
    readonly nullable : boolean,
    readonly from : AnyColumn[],
    readonly to : AnyColumn[],
};
*/
//# sourceMappingURL=join.js.map