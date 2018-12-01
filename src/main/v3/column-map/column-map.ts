/*
    TODO Debate data type conversion utils naming convention.
    + ToXxx vs. FromXxx

    Using ToXxx seems to apply to more cases.
    Example,

    ColumnMapUtil.ToColumnIdentifierUnion<>
    vs.
    ColumnIdentifierUtil.UnionFromColumnMap<>

    ColumnMapUtil.ToColumnIdentifierArray<>
    vs.
    ColumnIdentifierArrayUtil.FromColumnMap<>
*/
import * as sd from "schema-decorator";
import {IColumn, Column} from "../column";
import {IJoin} from "../join";
import {SelectItem, SingleValueSelectItem} from "../select-item";
import {ColumnIdentifier} from "../column-identifier";
import {SelectItemArrayUtil} from "../select-item-array";
import {IExprSelectItem, ExprSelectItemUtil} from "../expr-select-item";

export interface ColumnMap {
    readonly [columnName : string] : IColumn
};

export namespace ColumnMapUtil {
    export function isColumnMap (raw : any) : raw is ColumnMap {
        if (!(raw instanceof Object)) {
            return false;
        }
        for (let columnName in raw) {
            const column = raw[columnName];
            if (!Column.isColumn(column)) {
                return false;
            }
        }
        return true;
    }
    //HasOneColumn<ColumnMapT> extends true ?
    //    true :
    //    false
    export type HasOneColumn<ColumnMapT extends ColumnMap> = (
        Extract<keyof ColumnMapT, string> extends never ?
        //Has zero columns
        false :
        string extends Extract<keyof ColumnMapT, string> ?
        //May have zero, one, or more columns
        boolean :
        (
            {
                [columnName in Extract<keyof ColumnMapT, string>] : (
                    Exclude<
                        Extract<keyof ColumnMapT, string>,
                        columnName
                    >
                )
            }[Extract<keyof ColumnMapT, string>]
        ) extends never ?
        //Has one column
        true :
        //Has more than one column
        false
    );
    export function hasOneColumn<ColumnMapT extends ColumnMap> (
        columnMap : ColumnMapT
    ) : HasOneColumn<ColumnMapT> {
        return (Object.keys(columnMap).length == 1) as HasOneColumn<ColumnMapT>;
    }

    export type WithTableAlias<
        ColumnMapT extends ColumnMap,
        NewTableAliasT extends string
    > = (
        {
            readonly [columnName in keyof ColumnMapT] : (
                Column.WithTableAlias<
                    ColumnMapT[columnName],
                    NewTableAliasT
                >
            )
        }
    );
    export function withTableAlias<
        ColumnMapT extends ColumnMap,
        NewTableAliasT extends string
    > (
        columnMap : ColumnMapT,
        newTableAlias : NewTableAliasT
    ) : (
        WithTableAlias<ColumnMapT, NewTableAliasT>
    ) {
        return Object.keys(columnMap)
            .reduce<{
                [columnName in keyof ColumnMapT] : (
                    Column.WithTableAlias<
                        ColumnMapT[columnName],
                        NewTableAliasT
                    >
                )
            }>(
                (memo, columnName) => {
                    memo[columnName] = Column.withTableAlias(
                        columnMap[columnName],
                        newTableAlias
                    );
                    return memo;
                },
                {} as any
            );
    }

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
                ReturnType<ColumnT["assertDelegate"]> extends ReturnType<Column.UnionFromColumnMap<ColumnMapT>["assertDelegate"]> ?
                boolean :
                false
            ) :
            ColumnT["tableAlias"] extends Column.UnionFromColumnMap<ColumnMapT>["tableAlias"] ?
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
    export type HasColumnIdentifier<
        ColumnMapT extends ColumnMap,
        ColumnIdentifierT extends ColumnIdentifier
    > = (
        keyof ColumnMapT extends never ?
        false :
        ColumnMap extends ColumnMapT ?
        boolean :
        string extends ColumnIdentifierT["name"] ?
        (
            string extends ColumnIdentifierT["tableAlias"] ?
            boolean :
            ColumnIdentifierT["tableAlias"] extends Column.UnionFromColumnMap<ColumnMapT>["tableAlias"] ?
            boolean :
            false
        ) :
        ColumnIdentifierT["name"] extends keyof ColumnMapT ?
        (
            string extends ColumnIdentifierT["tableAlias"] ?
            boolean :
            ColumnIdentifierT["tableAlias"] extends ColumnMapT[ColumnIdentifierT["name"]]["tableAlias"] ?
            (
                ColumnIdentifierT["name"] extends ColumnMapT[ColumnIdentifierT["name"]]["name"] ?
                true :
                false
            ) :
            false
        ) :
        false
    );
    export function hasColumnIdentifier<
        ColumnMapT extends ColumnMap,
        ColumnIdentifierT extends ColumnIdentifier
    > (columnMap : ColumnMapT, columnIdentifier : ColumnIdentifierT) : (
        HasColumnIdentifier<ColumnMapT, ColumnIdentifierT>
    ) {
        if (!columnMap.hasOwnProperty(columnIdentifier.name)) {
            return false as any;
        }
        const column = columnMap[columnIdentifier.name];
        return (
            column.tableAlias == columnIdentifier.tableAlias &&
            column.name == columnIdentifier.name
        ) as any;
    }
    export function assertHasColumnIdentifier (columnMap : ColumnMap, columnIdentifier : ColumnIdentifier) {
        if (!hasColumnIdentifier(columnMap, columnIdentifier)) {
            throw new Error(`Column ${columnIdentifier.tableAlias}.${columnIdentifier.name} does not exist in column map`);
        }
    }

    export type FromFieldArray<
        TableAliasT extends string,
        FieldsT extends sd.AnyField[]
    > = (
        FieldsT[number] extends never ?
        {} :
        {
            readonly [columnName in FieldsT[number]["name"]] : (
                Column<{
                    tableAlias : TableAliasT,
                    name : columnName,
                    assertDelegate : Extract<FieldsT[number], { name : columnName }>["assertDelegate"]
                }>
            )
        }
    );
    export function fromFieldArray<
        TableAliasT extends string,
        FieldsT extends sd.AnyField[]
    > (
        tableAlias : TableAliasT,
        fields : FieldsT
    ) : (
        FromFieldArray<TableAliasT, FieldsT>
    ) {
        return fields.reduce<
            FieldsT[number] extends never ?
            {} :
            {
                readonly [columnName in FieldsT[number]["name"]] : (
                    Column<{
                        tableAlias : TableAliasT,
                        name : columnName,
                        assertDelegate : Extract<FieldsT[number], { name : columnName }>["assertDelegate"]
                    }>
                )
            }
        >((memo, field) => {
            const columnName : FieldsT[number]["name"] = field.name;
            const column : Column<{
                tableAlias : TableAliasT,
                name : FieldsT[number]["name"],
                assertDelegate : FieldsT[number]["assertDelegate"]
            }> = new Column({
                tableAlias : tableAlias,
                name : columnName,
                assertDelegate : field.assertDelegate,
            });
            memo[columnName] = column as any;
            return memo;
        }, {} as any);
    }
    export type FromAssertMap<
        TableAliasT extends string,
        AssertMapT extends {
            readonly [columnName : string] : sd.AnyAssertFunc
        }
    > = (
        {
            readonly [columnName in Extract<keyof AssertMapT, string>] : (
                Column<{
                    tableAlias : TableAliasT,
                    name : columnName,
                    assertDelegate : sd.ToAssertDelegate<AssertMapT[columnName]>
                }>
            )
        }
    );
    export function fromAssertMap<
        TableAliasT extends string,
        AssertMapT extends {
            readonly [columnName : string] : sd.AnyAssertFunc
        }
    > (
        tableAlias : TableAliasT,
        assertMap : AssertMapT
    ) : (
        FromAssertMap<TableAliasT, AssertMapT>
    ) {
        const columnNames = Object.keys(assertMap) as Extract<keyof AssertMapT, string>[];
        return columnNames.reduce<{
            [columnName in Extract<keyof AssertMapT, string>] : (
                Column<{
                    tableAlias : TableAliasT,
                    name : columnName,
                    assertDelegate : sd.ToAssertDelegate<AssertMapT[columnName]>
                }>
            )
        }>((memo, columnName) => {
            memo[columnName] = new Column({
                tableAlias : tableAlias,
                name : columnName,
                assertDelegate : sd.toAssertDelegate(assertMap[columnName]),
            });
            return memo;
        }, {} as any);
    }

    //Take the intersection and the "left" columnMap
    export type LeftIntersect<
        ColumnMapA extends ColumnMap,
        ColumnMapB extends ColumnMap,
    > = (
        {
            readonly [columnName in Extract<keyof ColumnMapA, string>] : (
                columnName extends keyof ColumnMapB ?
                IColumn<{
                    readonly tableAlias : ColumnMapA[columnName]["tableAlias"],
                    readonly name : ColumnMapA[columnName]["name"],
                    readonly assertDelegate : sd.AssertDelegate<
                        ReturnType<ColumnMapA[columnName]["assertDelegate"]> &
                        ReturnType<ColumnMapB[columnName]["assertDelegate"]>
                    >
                }> :
                ColumnMapA[columnName]
            )
        }
    );
    export function leftIntersect<
        ColumnMapA extends ColumnMap,
        ColumnMapB extends ColumnMap,
    > (
        columnMapA : ColumnMapA,
        columnMapB : ColumnMapB
    ) : (
        LeftIntersect<ColumnMapA, ColumnMapB>
    ) {
        const columnMapANames : Extract<keyof ColumnMapA, string>[] = Object.keys(columnMapA) as any;
        return columnMapANames.reduce<{
            [columnName in Extract<keyof ColumnMapA, string>] : (
                columnName extends keyof ColumnMapB ?
                Column<{
                    readonly tableAlias : ColumnMapA[columnName]["tableAlias"],
                    readonly name : ColumnMapA[columnName]["name"],
                    readonly assertDelegate : sd.AssertDelegate<
                        ReturnType<ColumnMapA[columnName]["assertDelegate"]> &
                        ReturnType<ColumnMapB[columnName]["assertDelegate"]>
                    >
                }> :
                ColumnMapA[columnName]
            )
        }>((memo, columnName) => {
            const columnA = columnMapA[columnName];
            if (columnMapB.hasOwnProperty(columnName)) {
                memo[columnName] = new Column(
                    {
                        tableAlias : columnA.tableAlias,
                        name : columnA.name,
                        assertDelegate : sd.and(
                            columnA.assertDelegate,
                            columnMapB[columnName].assertDelegate
                        ),
                    },
                    columnA.__subTableName,
                    columnA.__isInSelectClause
                ) as any;
            } else {
                memo[columnName] = columnA as any;
            }
            return memo;
        }, {} as any);
    };
    export type Intersect<
        ColumnMapA extends ColumnMap,
        ColumnMapB extends ColumnMap,
    > = (
        LeftIntersect<ColumnMapA, ColumnMapB> &
        {
            readonly [columnName in Exclude<
                Extract<keyof ColumnMapB, string>,
                keyof ColumnMapA
            >] : (
                ColumnMapB[columnName]
            )
        }
    );
    export function intersect<
        ColumnMapA extends ColumnMap,
        ColumnMapB extends ColumnMap,
    > (
        columnMapA : ColumnMapA,
        columnMapB : ColumnMapB
    ) : (
        Intersect<ColumnMapA, ColumnMapB>
    ) {
        const left : LeftIntersect<
            ColumnMapA, ColumnMapB
        > = leftIntersect(columnMapA, columnMapB);

        const columnNames : Exclude<
            Extract<keyof ColumnMapB, string>,
            keyof ColumnMapA
        >[] = Object.keys(columnMapB)
            .filter(columnName =>
                !columnMapA.hasOwnProperty(columnName)
            ) as any;
        const right = columnNames.reduce<{
            [columnName in Exclude<
                Extract<keyof ColumnMapB, string>,
                keyof ColumnMapA
            >] : (
                ColumnMapB[columnName]
            )
        }>((memo, columnName) => {
            memo[columnName] = columnMapB[columnName];
            return memo;
        }, {} as any);

        return Object.assign(
            {},
            left,
            right,
        );
    }

    export type ToNullable<ColumnMapT extends ColumnMap> = (
        {
            readonly [columnName in keyof ColumnMapT] : (
                Column.ToNullable<ColumnMapT[columnName]>
            )
        }
    );
    export function toNullable<ColumnMapT extends ColumnMap> (
        columnMap : ColumnMapT
    ) : ToNullable<ColumnMapT> {
        return Object.keys(columnMap).reduce<{
            [columnName in keyof ColumnMapT] : (
                Column.ToNullable<ColumnMapT[columnName]>
            )
        }>((memo, columnName) => {
            memo[columnName] = Column.toNullable(columnMap[columnName]);
            return memo;
        }, {} as any);
    }

    export type FromJoin<JoinT extends IJoin> = (
        true extends JoinT["nullable"] ?
        //We use nullable columns because when using LEFT/RIGHT JOINs,
        //the columns can become `null`, and we still want to allow joining
        //`null` with `int` columns
        ColumnMapUtil.ToNullable<JoinT["columns"]> :
        JoinT["columns"]
    );
    export function fromJoin<JoinT extends IJoin> (join : JoinT) : FromJoin<JoinT> {
        //https://github.com/Microsoft/TypeScript/issues/28592
        const columns : JoinT["columns"] = join.columns;
        if (join.nullable) {
            const result : ColumnMapUtil.ToNullable<JoinT["columns"]> = toNullable(columns);
            return result as any;
        } else {
            return columns as any;
        }
    }

    export type FromColumn<ColumnT extends IColumn> = (
        {
            readonly [columnName in ColumnT["name"]] : ColumnT
        }
    );
    export function fromColumn<ColumnT extends IColumn> (
        column : ColumnT
    ) : FromColumn<ColumnT> {
        return {
            [column.name] : column
        } as any;
    }

    export type FromSingleValueSelectItem<SelectItemT extends SingleValueSelectItem> = (
        FromColumn<Column.FromSingleValueSelectItem<SelectItemT>>
    );
    export function fromSingleValueSelectItem<
        SelectItemT extends SingleValueSelectItem
    > (selectItem : SelectItemT) : (
        FromSingleValueSelectItem<SelectItemT>
    ) {
        return fromColumn(Column.fromSingleValueSelectItem(selectItem));
    }

    export type FromSelectItem<SelectItemT extends SelectItem> = (
        SelectItemT extends SingleValueSelectItem ?
        FromSingleValueSelectItem<SelectItemT> :
        SelectItemT extends ColumnMap ?
        SelectItemT :
        never
    );
    export function fromSelectItem<SelectItemT extends SelectItem> (
        selectItem : SelectItemT
    ) : FromSelectItem<SelectItemT> {
        if (Column.isColumn(selectItem)) {
            return fromColumn(selectItem) as any;
        } else if (ExprSelectItemUtil.isExprSelectItem(selectItem)) {
            return fromSingleValueSelectItem(selectItem) as any;
        } else if (isColumnMap(selectItem)) {
            return selectItem as any;
        } else {
            throw new Error(`Unknown select item`);
        }
    }


    //Assumes no duplicate columnName in SelectsT
    export type FromSelectItemArray<SelectsT extends SelectItem[]> = (
        SelectsT[number] extends never ?
        {} :
        {
            readonly [columnName in SelectItemArrayUtil.ToColumnNameUnion<SelectsT>] : (
                columnName extends Extract<SelectsT[number], IColumn>["name"] ?
                Column.FromSingleValueSelectItem<Extract<SelectsT[number], { name : columnName }>> :

                columnName extends Extract<SelectsT[number], IExprSelectItem>["alias"] ?
                Column.FromSingleValueSelectItem<Extract<SelectsT[number], { alias : columnName }>> :

                columnName extends Column.NameUnionFromColumnMap<Extract<SelectsT[number], ColumnMap>> ?
                ColumnMapUtil.FindWithColumnName<
                    Extract<SelectsT[number], ColumnMap>,
                    columnName
                > :

                never
            )
        }
    );
    //Assumes no duplicate columnName in SelectsT
    export function fromSelectItemArray<SelectsT extends SelectItem[]> (
        selects : SelectsT
    ) : FromSelectItemArray<SelectsT> {
        const columnMaps = selects.map((selectItem) : ColumnMap => {
            return fromSelectItem(selectItem);
        });
        return Object.assign(
            {},
            ...columnMaps
        );
    }

    /*
        Checks if all of A's columns are assignable to
        the corresponding columns in B
    */
    export type IsAssignableSubset<A extends ColumnMap, B extends ColumnMap> = (
        Extract<keyof A, string> extends never ?
        true :
        string extends Extract<keyof A, string> ?
        boolean :
        string extends Extract<keyof B, string> ?
        boolean :
        Extract<keyof A, string> extends Extract<keyof B, string> ?
        (
            {
                [columnName in Extract<keyof A, string>] : (
                    Column.IsAssignableTo<
                        A[columnName],
                        B[columnName]
                    >
                )
            }[Extract<keyof A, string>]
        ) :
        false
    );


    /*
        Used for unions of ColumnMap

        (A|B)[columnName] will likely give you unknown or similar
    */
    export type FindWithColumnName<
        ColumnMapT extends ColumnMap,
        ColumnNameT extends string
    > = (
        ColumnMapT extends ColumnMap ?
        (
            ColumnNameT extends keyof ColumnMapT ?
            ColumnMapT[ColumnNameT] :
            never
        ) :
        never
    );
}