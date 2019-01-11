import {ColumnMap} from "../../column-map";
import {IColumn, ColumnUtil} from "../../../column";

export type HasColumn<
    ColumnMapT extends ColumnMap,
    ColumnT extends IColumn
> = (
    keyof ColumnMapT extends never ?
    false :
    ColumnMap extends ColumnMapT ?
    boolean :
    string extends ColumnT["name"] ?
    (
        string extends ColumnT["tableAlias"] ?
        (
            //No run-time check for this
            ReturnType<ColumnT["assertDelegate"]> extends ReturnType<ColumnUtil.FromColumnMap<ColumnMapT>["assertDelegate"]> ?
            boolean :
            false
        ) :
        ColumnT["tableAlias"] extends ColumnUtil.FromColumnMap<ColumnMapT>["tableAlias"] ?
        (
            //No run-time check for this
            ReturnType<ColumnT["assertDelegate"]> extends ReturnType<{
                [columnName in Extract<keyof ColumnMapT, string>] : (
                    ColumnT["tableAlias"] extends ColumnMapT[columnName]["tableAlias"] ?
                    ColumnMapT[columnName]["assertDelegate"] :
                    never
                )
            }[Extract<keyof ColumnMapT, string>]> ?
            boolean :
            false
        ) :
        false
    ) :
    ColumnT["name"] extends keyof ColumnMapT ?
    (
        string extends ColumnT["tableAlias"] ?
        (
            //No run-time check for this
            ReturnType<ColumnT["assertDelegate"]> extends ReturnType<ColumnMapT[ColumnT["name"]]["assertDelegate"]> ?
            boolean :
            false
        ) :
        ColumnT["tableAlias"] extends ColumnMapT[ColumnT["name"]]["tableAlias"] ?
        (
            ColumnT["name"] extends ColumnMapT[ColumnT["name"]]["name"] ?
            (
                //No run-time check for this
                ReturnType<ColumnT["assertDelegate"]> extends ReturnType<ColumnMapT[ColumnT["name"]]["assertDelegate"]> ?
                true :
                false
            ) :
            false
        ) :
        false
    ) :
    false
);
