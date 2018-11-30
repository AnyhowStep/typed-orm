import {escapeId} from "sqlstring";
import * as sd from "schema-decorator";
import {ALIASED} from "../constants";
import {SingleValueSelectItem} from "../select-item";
import {IExprSelectItem, ExprSelectItemUtil} from "../expr-select-item";

export interface ColumnData {
    readonly tableAlias : string;
    readonly name : string;
    readonly assertDelegate : sd.AssertDelegate<any>;
}
export interface IColumn<DataT extends ColumnData=ColumnData> {
    readonly tableAlias : DataT["tableAlias"];
    readonly name : DataT["name"];
    readonly assertDelegate : DataT["assertDelegate"];

    //HACK for JOINING with nested queries
    readonly __subTableName : string|undefined;
    //HACK for referencing selected columns
    readonly __isInSelectClause : boolean;
}
export type IAnonymousTypedColumn<T> = IColumn<{
    readonly tableAlias : string,
    readonly name : string,
    readonly assertDelegate : sd.AssertDelegate<T>,
}>;

export class Column<DataT extends ColumnData> implements IColumn<DataT> {
    readonly tableAlias : DataT["tableAlias"];
    readonly name : DataT["name"];
    readonly assertDelegate : DataT["assertDelegate"];

    //HACK for JOINING with nested queries
    readonly __subTableName : string|undefined;
    //HACK for referencing selected columns
    readonly __isInSelectClause : boolean;

    constructor (
        data : DataT,
        __subTableName? : string,
        __isInSelectClause? : boolean
    ) {
        this.tableAlias = data.tableAlias;
        this.name = data.name;
        this.assertDelegate = data.assertDelegate;

        //HACK
        this.__subTableName = __subTableName;
        //HACK
        this.__isInSelectClause = (__isInSelectClause === true);
    }

    queryStringTree () {
        return Column.queryStringTree(this);
    }
    toNullable () : Column.ToNullable<this> {
        return Column.toNullable(this);
    }
    withTableAlias<NewTableAliasT extends string> (
        newTableAlias : NewTableAliasT
    ) : (
        Column.WithTableAlias<this, NewTableAliasT>
    ) {
        return Column.withTableAlias(this, newTableAlias);
    }
    withType<NewAssertFuncT extends sd.AnyAssertFunc> (
        newAssertFunc : NewAssertFuncT
    ) : (
        Column.WithType<this, NewAssertFuncT>
    ) {
        return Column.withType(this, newAssertFunc);
    }
    assertIsEqual (other : IColumn) {
        Column.assertIsEqual(this, other);
    }
    toColumnIdentifier () : Column.ToColumnIdentifier<this> {
        return Column.toColumnIdentifier(this);
    }


    /*as<AliasT extends string>(alias : AliasT) : AliasedExpr<
        {
            [tableAlias in TableAliasT] : {
                [columnName in NameT] : Column<
                    TableAliasT,
                    NameT,
                    TypeT
                >
            }
        },
        "__expr",
        AliasT,
        TypeT
    > {
        return new AliasedExpr(
            {
                [this.tableAlias] : {
                    [this.name] : this
                }
            },
            "__expr",
            alias,
            this.assertDelegate,
            this.fullName
        ) as any;
    }*/
}
export namespace Column {
    export function queryStringTree (
        {
            tableAlias,
            name,
            __subTableName,
            __isInSelectClause,
        } : IColumn
    ) : string {
        if (tableAlias == ALIASED) {
            /*
                When you want to write,
                (1 + 2) AS three

                You write,
                add(1, 2).as("three")

                This "three" is an IExprSelectItem but has no tableAlias
                associated with it.

                So, this library makes up a table alias that is very
                unlikely to be used naturally by others.
            */
            return escapeId(`${tableAlias}--${name}`);
        } else {
            if (__subTableName == undefined) {
                if (__isInSelectClause) {
                    return escapeId(`${tableAlias}--${name}`);
                } else {
                    /*
                        The most common case, I think.
                    */
                    return (
                        escapeId(tableAlias) +
                        "." +
                        escapeId(name)
                    );
                }
            } else {
                /*
                    {
                        "tableAlias":"otherUser",
                        "name":"externalUserId",
                        "subTableName":"user",
                        "isSelectReference":false,
                        "fullName":"`otherUser`.`user--externalUserId`"
                    }

                    SELECT
                        `otherUser`.`user--externalUserId` AS `otherUser--externalUserId`
                    FROM
                        `app`
                    INNER JOIN
                        (
                            SELECT
                                `user`.`appId` AS `user--appId`,
                                `user`.`externalUserId` AS `user--externalUserId`
                            FROM
                                `user`
                        ) AS `otherUser`
                    ON
                        `app`.`appId` = `otherUser`.`user--appId`
                */
                return (
                    escapeId(tableAlias) +
                    "." +
                    escapeId(`${__subTableName}--${name}`)
                );
            }
        }
    }

    /*
        Used to implement LEFT/RIGHT JOINs.

        When doing a LEFT/RIGHT JOIN,
        certain columns become nullable
        because the row may be missing.
    */
    export type ToNullable<ColumnT extends IColumn> = (
        Column<{
            readonly tableAlias : ColumnT["tableAlias"],
            readonly name : ColumnT["name"],
            readonly assertDelegate : sd.AssertDelegate<
                null|
                ReturnType<ColumnT["assertDelegate"]>
            >,
        }>
    );
    export function toNullable<ColumnT extends IColumn> (
        {
            tableAlias,
            name,
            assertDelegate,
            __subTableName,
            __isInSelectClause,
        } : ColumnT
    ) : (
        ToNullable<ColumnT>
    ) {
        return new Column(
            {
                tableAlias,
                name,
                assertDelegate : sd.nullable(assertDelegate),
            },
            __subTableName,
            __isInSelectClause
        );
    }

    /*
        Used to implement the AS clause as in,

        SELECT
            table AS aliased
        ...
    */
    export type WithTableAlias<
        ColumnT extends IColumn,
        NewTableAliasT extends string
    > = (
        Column<{
            readonly tableAlias : NewTableAliasT,
            readonly name : ColumnT["name"],
            readonly assertDelegate : ColumnT["assertDelegate"],
        }>
    );
    export function withTableAlias<
        ColumnT extends IColumn,
        NewTableAliasT extends string
    > (
        {
            name,
            assertDelegate,
            __subTableName,
            __isInSelectClause,
        } : ColumnT,
        newTableAlias : NewTableAliasT
    ) : (
        WithTableAlias<ColumnT, NewTableAliasT>
    ) {
        return new Column(
            {
                tableAlias : newTableAlias,
                name,
                assertDelegate,
            },
            __subTableName,
            __isInSelectClause
        );
    }

    /*
        Used to narrow/widen the type of a column.

        For example,

        WHERE
            column IS NULL

        will narrow the column's type to `null`
    */
    export type WithType<
        ColumnT extends IColumn,
        NewAssertDelegateT extends sd.AnyAssertFunc
    > = (
        Column<{
            readonly tableAlias : ColumnT["tableAlias"],
            readonly name : ColumnT["name"],
            readonly assertDelegate : sd.ToAssertDelegate<NewAssertDelegateT>,
        }>
    );
    export function withType<
        ColumnT extends IColumn,
        NewAssertFuncT extends sd.AnyAssertFunc
    > (
        {
            tableAlias,
            name,
            __subTableName,
            __isInSelectClause,
        } : ColumnT,
        newAssertFunc : NewAssertFuncT,
    ) : (
        WithType<ColumnT, NewAssertFuncT>
    ) {
        return new Column(
            {
                tableAlias,
                name,
                assertDelegate : sd.toAssertDelegate(newAssertFunc),
            },
            __subTableName,
            __isInSelectClause
        );
    }

    export function isColumn (raw : any) : raw is IColumn {
        return (
            raw != undefined &&
            (raw instanceof Object) &&
            ("tableAlias" in raw) &&
            ("name" in raw) &&
            ("assertDelegate" in raw) &&
            (typeof raw.tableAlias == "string") &&
            (typeof raw.name == "string") &&
            (typeof raw.assertDelegate == "function") &&
            (
                raw.__subTableName === undefined ||
                typeof raw.__subTableName == "string"
            ) &&
            ("__isInSelectClause" in raw) &&
            (typeof raw.__isInSelectClause == "boolean")
        );
    }
    export type FromExprSelectItem<ItemT extends IExprSelectItem> = (
        Column<{
            readonly tableAlias : ItemT["tableAlias"],
            readonly name : ItemT["alias"],
            readonly assertDelegate : ItemT["assertDelegate"],
        }>
    );
    export function fromExprSelectItem<ItemT extends IExprSelectItem> (
        item : ItemT
    ) : FromExprSelectItem<ItemT> {
        return new Column({
            tableAlias : item.tableAlias,
            name : item.alias,
            assertDelegate : item.assertDelegate,
        });
    }
    export type FromSingleValueSelectItem<ItemT extends SingleValueSelectItem> = (
        ItemT extends IColumn ?
        Column<{
            readonly tableAlias : ItemT["tableAlias"];
            readonly name : ItemT["name"];
            readonly assertDelegate : ItemT["assertDelegate"];
        }> :
        ItemT extends IExprSelectItem ?
        FromExprSelectItem<ItemT> :
        never
    );
    export function fromSingleValueSelectItem<ItemT extends SingleValueSelectItem> (
        item : ItemT
    ) : FromSingleValueSelectItem<ItemT> {
        if (isColumn(item)) {
            return new Column(item) as any;
        } else if (ExprSelectItemUtil.isExprSelectItem(item)) {
            return fromExprSelectItem(item) as any;
        } else {
            throw new Error(`Unknown SingleValueSelectItem`);
        }
    }

    /*
        Cannot actually check `assertDelegate` are equal.
    */
    export function assertIsEqual (a : IColumn, b : IColumn) {
        if (a.tableAlias != b.tableAlias) {
            throw new Error(`Table alias mismatch ${a.tableAlias} != ${b.tableAlias}`);
        }
        if (a.name != b.name) {
            throw new Error(`Name mismatch ${a.name} != ${b.name}`);
        }
    }

    export type ToColumnIdentifier<ColumnT extends IColumn> = (
        {
            readonly tableAlias : ColumnT["tableAlias"],
            readonly name : ColumnT["name"],
        }
    );
    export function toColumnIdentifier<ColumnT extends IColumn> (
        column : ColumnT
    ) : ToColumnIdentifier<ColumnT> {
        return {
            tableAlias : column.tableAlias,
            name : column.name,
        };
    }
}

export function column<
    TableAliasT extends string,
    NameT extends string,
    AssertFuncT extends sd.AnyAssertFunc
> (
    tableAlias : TableAliasT,
    name : NameT,
    assertFunc : AssertFuncT
) : Column<{
    readonly tableAlias : TableAliasT,
    readonly name : NameT,
    readonly assertDelegate : sd.ToAssertDelegate<AssertFuncT>,
}> {
    return new Column({
        tableAlias,
        name,
        assertDelegate : sd.toAssertDelegate(assertFunc),
    });
}
/*
    const column = new Column<{
        tableAlias : "hi",
        name : "bye",
        assertDelegate : sd.AssertDelegate<number>
    }>(
        {
            tableAlias : "hi",
            name : "bye",
            assertDelegate : sd.stringToNaturalNumber()
        }
    );
    const n = Column.toNullable(column);
    const n2 = column.toNullable();

    const wta = Column.withTableAlias(column, "newThing");
    const wta2 = column.withTableAlias("newThing");

    const wt = Column.withType(column, sd.boolean());
    const wt2 = column.withType(sd.boolean());

    const test = wta2.withTableAlias("2").withType(sd.date())
//*/