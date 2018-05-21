import {AnySelect} from "./select";
//import {ColumnReferences, ColumnReferencesUtil} from "../column-references";
import {AliasedExpr, AnyAliasedExpr, AliasedExprUtil} from "../aliased-expr";
import {ColumnCollection, ColumnCollectionUtil} from "../column-collection";
import {Column, AnyColumn} from "../column";
import {AnyJoin, JoinUtil} from "../join";

export namespace SelectUtil {
    //HACK, Should be `extends AnySelect`
    export type Columns<SelectT extends any> = (
        SelectT extends AnyAliasedExpr ?
        AliasedExprUtil.ToColumn<SelectT> :

        SelectT extends ColumnCollection ?
        ColumnCollectionUtil.Columns<SelectT> :

        SelectT extends AnyColumn ?
        SelectT :

        never
    )
    //HACK, Should be `extends AnySelect`
    export type TableAlias<SelectT extends any> = (
        SelectT extends AnyAliasedExpr ?
        SelectT["tableAlias"] :

        SelectT extends ColumnCollection ?
        SelectT[keyof SelectT]["tableAlias"] :

        SelectT extends AnyColumn ?
        SelectT["tableAlias"] :
        
        never
    );

    export type FromJoin<JoinT extends AnyJoin> = (
        true extends JoinT["nullable"] ?
            ColumnCollectionUtil.ToNullable<JoinT["columns"]> :
            JoinT["columns"]
    );
    export function fromJoin<JoinT extends AnyJoin> (join : JoinT) : (
        FromJoin<JoinT>
    ) {
        if (join.nullable) {
            return ColumnCollectionUtil.toNullable(join.columns) as any;
        } else {
            return join.columns as any;
        }
    }

    export type ToColumnReferences<
        //HACK, should be `AnySelect`
        SelectT extends any
    > = (
        SelectT extends AnyAliasedExpr ?
        {
            readonly [tableAlias in SelectT["tableAlias"]] : {
                readonly [columnAlias in SelectT["alias"]] : (
                    Column<
                        tableAlias,
                        columnAlias,
                        ReturnType<SelectT["assertDelegate"]>
                    >
                )
            }
        } :
        SelectT extends AnyColumn ?
        {
            readonly [tableAlias in SelectT["tableAlias"]] : {
                readonly [columnName in SelectT["name"]] : (
                    Column<
                        tableAlias,
                        columnName,
                        ReturnType<SelectT["assertDelegate"]>
                    >
                )
            }
        } :
        SelectT extends ColumnCollection ?
        {
            readonly [tableAlias in SelectT[keyof SelectT]["tableAlias"]] : SelectT
        } :
        {}
    );
    export function toColumnReferences<SelectT extends AnySelect> (
        select : SelectT
    ) : (
        ToColumnReferences<SelectT>
    ) {
        if (select instanceof AliasedExpr) {
            return {
                [select.tableAlias] : {
                    [select.alias] : new Column(
                        select.tableAlias,
                        select.alias,
                        select.assertDelegate
                    )
                }
            } as any;
        } else if (select instanceof Column) {
            return {
                [select.tableAlias] : {
                    [select.name] : select
                }
            } as any;
        } else if (select instanceof Object) {
            const keys = Object.keys(select);
            if (keys.length == 0) {
                //TODO add this check in appendSelect()
                throw new Error(`Empty select found`);
            }
            const firstColumn = (select as any)[keys[0]];
            return {
                [firstColumn.tableAlias] : select
            } as any;
        } else {
            throw new Error(`Unknown select; ${typeof select}`);
        }
    }
}
