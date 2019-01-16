import {IJoin, Join} from "../../join";
import {ColumnMap} from "../../../column-map";
import {IColumn} from "../../../column";
import {ColumnIdentifierMapUtil} from "../../../column-identifier-map";
import {Writable} from "../../../type";

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