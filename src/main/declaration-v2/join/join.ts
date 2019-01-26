import {AnyAliasedTable} from "../aliased-table";
import {AnyColumn} from "../column";
import {ColumnCollection} from "../column-collection";

export enum JoinType {
    FROM  = "FROM",
    INNER = "INNER",
    LEFT  = "LEFT",
    RIGHT = "RIGHT",
    CROSS = "CROSS",
};

export class Join<
    //Needed for update-builder to work, relies on `isMutable` type
    TableT extends AnyAliasedTable,
    ColumnCollectionT extends ColumnCollection,
    NullableT extends boolean
> {
    constructor (
        readonly joinType : JoinType,
        readonly table : TableT,
        //We keep our own copy of the column collection because
        //we may decide to make some fields nullable or change their
        //type entirely
        readonly columns : ColumnCollectionT,
        readonly nullable : NullableT,

        readonly from : AnyColumn[],
        readonly to : AnyColumn[],
    ) {
    }
}
export type AnyJoin = Join<AnyAliasedTable, ColumnCollection, boolean>;
/*export type AnyJoin = {
    readonly joinType : JoinType,
    readonly table : AnyAliasedTable,
    readonly columns : ColumnCollection,
    readonly nullable : boolean,
    readonly from : AnyColumn[],
    readonly to : AnyColumn[],
};
*/
