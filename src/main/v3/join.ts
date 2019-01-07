import {IAliasedTable, AliasedTableUtil} from "./aliased-table";
import {ColumnMap, ColumnMapUtil} from "./column-map";
import {IColumn, ColumnUtil} from "./column";
import * as e from "enum-util";
import {ColumnIdentifierMapUtil} from "./column-identifier-map";
import {Writable} from "./type";
import {IJoinDeclaration} from "./join-declaration";

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
            AliasedTableUtil.isAliasedTable(raw.aliasedTable) &&
            ColumnMapUtil.isColumnMap(raw.columns) &&
            (typeof raw.nullable == "boolean") &&
            JoinTypeUtil.isValue(raw.joinType) &&
            ColumnUtil.Array.isColumnArray(raw.from) &&
            ColumnUtil.Array.isColumnArray(raw.to)
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

    export type ReplaceColumn<
        JoinT extends IJoin,
        ColumnT extends IColumn
    > = (
        JoinT extends IJoin ?
        (
            ColumnT["tableAlias"] extends JoinT["aliasedTable"]["alias"] ?
            (
                ColumnT["name"] extends keyof JoinT["columns"] ?
                (
                    IJoin<{
                        readonly aliasedTable : JoinT["aliasedTable"],
                        readonly columns : {
                            readonly [columnName in keyof JoinT["columns"]] : (
                                columnName extends ColumnT["name"] ?
                                ColumnT :
                                JoinT["columns"][columnName]
                            )
                        },
                        readonly nullable : JoinT["nullable"]
                    }>
                ) :
                //No replacement
                JoinT
            ) :
            //No replacement
            JoinT
        ) :
        never
    );
    export function replaceColumn<
        JoinT extends IJoin,
        ColumnT extends IColumn
    > (
        join : JoinT,
        column : ColumnT
    ) : ReplaceColumn<JoinT, ColumnT> {
        if (!ColumnIdentifierMapUtil.hasColumnIdentifier(join.columns, column)) {
            return join as ReplaceColumn<JoinT, ColumnT>;
        }
        const columns : Writable<ColumnMap> = {};
        for (let columnName in join.columns) {
            if (columnName == column.name) {
                columns[columnName] = column;
            } else {
                columns[columnName] = join.columns[columnName];
            }
        }
        return new Join(
            {
                aliasedTable : join.aliasedTable,
                columns : columns as any,
                nullable : join.nullable,
            },
            join.joinType,
            join.from,
            join.to
        ) as ReplaceColumn<JoinT, ColumnT>;
    }

    export type FromJoinDeclaration<
        JoinDeclT extends IJoinDeclaration
    > = (
        JoinDeclT extends IJoinDeclaration ?
        Join<{
            aliasedTable : JoinDeclT["toTable"],
            columns : JoinDeclT["toTable"]["columns"],
            nullable : JoinDeclT["nullable"],
        }> :
        never
    );
}