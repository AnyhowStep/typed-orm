import * as sd from "schema-decorator";
import {AnySelect} from "./select";
//import {ColumnReferences, ColumnReferencesUtil} from "../column-references";
import {AliasedExpr, AnyAliasedExpr, AliasedExprUtil} from "../aliased-expr";
import {ColumnCollection, ColumnCollectionUtil} from "../column-collection";
import {Column, AnyColumn, ColumnUtil} from "../column";
import {AnyJoin} from "../join";

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
    );
    //HACK, Should be `extends AnySelect`
    export type Types<SelectT extends any> = (
        SelectT extends AnyAliasedExpr ?
        ReturnType<SelectT["assertDelegate"]> :

        SelectT extends ColumnCollection ?
        ColumnCollectionUtil.Types<SelectT> :

        SelectT extends AnyColumn ?
        ReturnType<SelectT["assertDelegate"]> :

        never
    );
    export type HasOneType<SelectT extends any> = (
        SelectT extends AnyAliasedExpr ?
        true :

        SelectT extends ColumnCollection ?
        ColumnCollectionUtil.HasOneType<SelectT> :

        SelectT extends AnyColumn ?
        true :

        false
    );
    //HACK, Should be `extends AnySelect`
    //"Compatible types" does not mean "Same types".
    //SelectA's type just has to extend SelectB's type
    export type HasCompatibleTypes<
        SelectA extends any,
        SelectB extends any,
    > = (
        HasOneType<SelectA> extends true ?
            (
                HasOneType<SelectB> extends true ?
                    (
                        //Both are one-type
                        Types<SelectA> extends Types<SelectB> ?
                            true :
                            false
                    ) :
                    //A one-type select is incompatible with
                    //a multi-type select
                    false
            ) :
            (
                HasOneType<SelectB> extends true ?
                    //A one-type select is incompatible with
                    //a multi-type select
                    false :
                    (
                        //Both are multi-type
                        //We need special logic for multi-type because,
                        //{a:number, b:number} extends {a:number} is `true`.
                        //Multi-type selects must have the same keys
                        keyof SelectA extends keyof SelectB ?
                            (
                                keyof SelectB extends keyof SelectA ?
                                    (
                                        Types<SelectA> extends Types<SelectB> ?
                                            true :
                                            false
                                    ) :
                                    false
                            ) :
                            false
                    )
            )
    )
    export function hasOneType (select : AnySelect) {
        if (select instanceof AliasedExpr) {
            return true;
        } else if (select instanceof Column) {
            return true;
        } else {
            return ColumnCollectionUtil.hasOneType(select);
        }
    }
    //We can't perform type compatibility checks during run-time.
    export function assertHasCompatibleTypes (
        actual : AnySelect,
        expected : AnySelect
    ) {
        if (hasOneType(actual)) {
            if (!hasOneType(expected)) {
                throw new Error(`Expected multi-type; received single-type`);
            }
        } else {
            if (hasOneType(expected)) {
                throw new Error(`Expected single-type; received multi-type`);
            } else {
                const actualKeys = Object.keys(actual).sort();
                const expectedKeys = Object.keys(expected).sort();
                if (actualKeys.length != expectedKeys.length) {
                    throw new Error(`Expected ${expectedKeys.length}; received ${actualKeys.length}`);
                }
                for (let i=0; i<actualKeys.length; ++i) {
                    if (actualKeys[i] != expectedKeys[i]) {
                        throw new Error(`Expected key ${expectedKeys[i]}; received ${actualKeys[i]}`);
                    }
                }
            }
        }
    }
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
                        select.assertDelegate,
                        undefined,
                        true
                    )
                }
            } as any;
        } else if (select instanceof Column) {
            return {
                [select.tableAlias] : {
                    [select.name] : new Column(
                        select.tableAlias,
                        select.name,
                        select.assertDelegate,
                        undefined,
                        true
                    )
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
                [firstColumn.tableAlias] : Object.keys(select).reduce((memo, columnName) => {
                    const column = (select as any)[columnName];
                    memo[columnName] = new Column(
                        column.tableAlias,
                        column.name,
                        column.assertDelegate,
                        undefined,
                        true
                    );
                    return memo;
                }, {} as any)
            } as any;
        } else {
            throw new Error(`Unknown select; ${typeof select}`);
        }
    }

    export type ReplaceType<
        //HACK, should be `AnySelect`
        SelectT extends any,
        TableAliasT extends string,
        ColumnNameT extends string,
        NewTypeT
    > = (
        SelectT extends AliasedExpr<any, TableAliasT, ColumnNameT, any> ?
        AliasedExprUtil.WithType<SelectT, NewTypeT> :
        SelectT extends Column<TableAliasT, ColumnNameT, any> ?
        ColumnUtil.WithType<SelectT, NewTypeT> :
        SelectT extends ColumnCollection ?
        ColumnCollectionUtil.ReplaceColumnType<
            SelectT,
            TableAliasT,
            ColumnNameT,
            NewTypeT
        > :
        //Now, we check if it's a valid Select at all
        SelectT extends AnyAliasedExpr ?
        SelectT :
        SelectT extends AnyColumn ?
        SelectT :
        //Not even a select
        never
    );
    export function replaceType<
        SelectT extends AnySelect,
        TableAliasT extends string,
        ColumnNameT extends string,
        NewTypeT
    > (
        select : SelectT,
        tableAlias : TableAliasT,
        columnName : ColumnNameT,
        newAssertDelegate : sd.AssertDelegate<NewTypeT>
    ) : (
        ReplaceType<
            SelectT,
            TableAliasT,
            ColumnNameT,
            NewTypeT
        >
    ) {
        if (select instanceof AliasedExpr) {
            if (select.tableAlias == tableAlias && select.alias == columnName) {
                return AliasedExprUtil.withType(
                    select,
                    newAssertDelegate
                ) as any;
            } else {
                return select as any;
            }
        } else if (select instanceof Column) {
            if (select.tableAlias == tableAlias && select.name == columnName) {
                return ColumnUtil.withType(
                    select,
                    newAssertDelegate
                ) as any;
            } else {
                return select as any;
            }
        } else if (select instanceof Object) {
            return ColumnCollectionUtil.replaceColumnType(
                //We're taking a risk, here...
                //It could be any kind of object type
                //A better way would be to have a ColumnCollection validation method
                //TODO, such a method
                select as any,
                tableAlias,
                columnName,
                newAssertDelegate
            ) as any;
        } else {
            throw new Error(`Unknown select; ${typeof select}`);
        }
    }

    export type ToColumnWithNameOnly<SelectT extends AnySelect> = (
        Column<
            any,
            Columns<SelectT>["name"],
            any
        >
    );
    export function toColumnNames<SelectT extends AnySelect> (
        select : SelectT
    ) : string[] {
        if (select instanceof AliasedExpr) {
            return [select.alias];
        } else if (select instanceof Column) {
            return [select.name];
        } else if (select instanceof Object) {
            const keys = Object.keys(select);
            if (keys.length == 0) {
                //TODO add this check in appendSelect()
                throw new Error(`Empty select found`);
            }
            return keys;
        } else {
            throw new Error(`Unknown select; ${typeof select}`);
        }
    }
    export type ToColumnCollection<TableAliasT extends string, SelectT extends any> = (
        SelectT extends AnyAliasedExpr ?
        {
            readonly [columnName in SelectT["alias"]] : (
                ColumnUtil.WithTableAlias<
                    AliasedExprUtil.ToColumn<SelectT>,
                    TableAliasT
                >
            )
        } :

        SelectT extends ColumnCollection ?
        ColumnCollectionUtil.WithTableAlias<
            SelectT,
            TableAliasT
        > :

        SelectT extends AnyColumn ?
        {
            readonly [columnName in SelectT["name"]] : (
                ColumnUtil.WithTableAlias<
                    SelectT,
                    TableAliasT
                >
            )
        } :

        never
    );
}
