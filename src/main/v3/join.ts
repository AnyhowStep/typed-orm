import {IAliasedTable, AliasedTable} from "./aliased-table";
import {ColumnMap, ColumnMapUtil} from "./column-map";
import {IColumn} from "./column";
import {ColumnArrayUtil} from "./column-array";
import * as e from "enum-util";

export enum JoinType {
    FROM  = "FROM",
    INNER = "INNER",
    LEFT  = "LEFT",
    RIGHT = "RIGHT",
    CROSS = "CROSS",
};
export const JoinTypeUtil = new e.WrappedEnum(JoinType);

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
    export function isJoin (raw : any) : raw is IJoin {
        return (
            raw != undefined &&
            (raw instanceof Object) &&
            ("aliasedTable" in raw) &&
            ("columns" in raw) &&
            ("nullable" in raw) &&
            ("joinType" in raw) &&
            ("from" in raw) &&
            ("to" in raw) &&
            AliasedTable.isAliasedTable(raw.aliasedTable) &&
            ColumnMapUtil.isColumnMap(raw.columns) &&
            (typeof raw.nullable == "boolean") &&
            JoinTypeUtil.isValue(raw.joinType) &&
            ColumnArrayUtil.isColumnArray(raw.from) &&
            ColumnArrayUtil.isColumnArray(raw.to)
        );
    }
    export type ToNullable<JoinT extends IJoin> = (
        JoinT extends IJoin ?
        Join<{
            aliasedTable : JoinT["aliasedTable"],
            columns : JoinT["columns"],
            nullable : true,
        }> :
        never
    );
    export function toNullable<JoinT extends IJoin> (
        join : JoinT
    ) : ToNullable<JoinT> {
        const {
            aliasedTable,
            columns,
        } = join;
        const result : Join<{
            aliasedTable : JoinT["aliasedTable"],
            columns : JoinT["columns"],
            nullable : true,
        }> = new Join(
            {
                aliasedTable,
                columns,
                nullable : true as true,
            },
            join.joinType,
            join.from,
            join.to
        );
        return result as any;
    }
}