import {IAliasedTable} from "./aliased-table";
import {ColumnMap, ColumnMapUtil} from "./column-map";
import {IColumn, Column} from "./column";

export enum JoinType {
    FROM  = "FROM",
    INNER = "INNER",
    LEFT  = "LEFT",
    RIGHT = "RIGHT",
    CROSS = "CROSS",
};

export interface JoinData {
    //We may JOIN to a Table or an AliasedTable.
    //An AliasedTable is a SELECT expression with an alias.
    //JOIN (SELECT app.appId, app.name FROM app) AS tmp
    readonly aliasedTable : IAliasedTable,
    //We keep our own copy of the column collection because
    //we may decide to make some fields nullable or change their
    //type entirely
    readonly columns : ColumnMap,
    //If true, this table may be missing from a JOIN.
    //For example, as a result of a LEFT/RIGHT JOIN.
    readonly nullable : boolean,
}

export interface IJoin<DataT extends JoinData=JoinData> {
    readonly aliasedTable : DataT["aliasedTable"],
    readonly columns : DataT["columns"],
    readonly nullable : DataT["nullable"],

    readonly joinType : JoinType,
    //The from and to columns must have the same length
    readonly from : IColumn[],
    readonly to : IColumn[],
}

export class Join<DataT extends JoinData> implements IJoin<DataT> {
    readonly aliasedTable : DataT["aliasedTable"];
    readonly columns : DataT["columns"];
    readonly nullable : DataT["nullable"];

    readonly joinType : JoinType;
    //The from and to columns must have the same length
    readonly from : IColumn[];
    readonly to : IColumn[];

    constructor (
        data : DataT,
        joinType : JoinType,
        from : IColumn[],
        to : IColumn[],
    ) {
        this.aliasedTable = data.aliasedTable;
        this.columns = data.columns;
        this.nullable = data.nullable;

        this.joinType = joinType;
        this.from = from;
        this.to = to;
    }
}
export namespace Join {
    export type ToUnion<JoinT extends IJoin> = (
        Column.UnionFromColumnMap<
            ColumnMapUtil.FromJoin<JoinT>
        >
    );
}