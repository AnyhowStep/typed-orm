import {
    TableData,
    AutoIncrementDelegate,
    IsGeneratedDelegate,
    HasDefaultValueDelegate,
    IsMutableDelegate,
    AddUniqueKeyDelegate,
    IdDelegate,
} from "./table-data";
import {ReadonlyRemoveKey} from "../obj-util";
import {ColumnCollection, ColumnCollectionUtil} from "../column-collection";
import {Tuple, TupleKeys, TupleWPush, TupleWiden, TupleWConcat} from "../tuple";
import {Column, AnyColumn, ColumnUtil} from "../column";
import {UniqueKey} from "../unique-key";
import {AnyTable} from "../table";
import {UniqueKeyCollection, UniqueKeyCollectionUtil} from "../unique-key-collection";
import {TableParentCollection} from "../table-parent-collection";
import * as fieldUtil from "../field-util";
import * as sd from "schema-decorator";

export namespace TableDataUtil {
    export type AutoIncrement<
        DataT extends TableData,
        ColumnCollectionT extends ColumnCollection,
        AutoIncrementDelegateT extends AutoIncrementDelegate<ColumnCollectionT>
    > = (
        {
            readonly [key in keyof DataT] : (
                key extends "autoIncrement" ?
                ReturnType<AutoIncrementDelegateT> :
                key extends "isGenerated" ?
                {
                    readonly [columnName in (
                        ReturnType<AutoIncrementDelegateT>["name"]|
                        Extract<keyof DataT["isGenerated"], string>
                    )] : true
                } :
                key extends "hasDefaultValue" ?
                {
                    readonly [columnName in (
                        ReturnType<AutoIncrementDelegateT>["name"]|
                        Extract<keyof DataT["hasDefaultValue"], string>
                    )] : true
                } :
                key extends "id" ?
                ReturnType<AutoIncrementDelegateT> :
                key extends "uniqueKeys" ?
                (
                    DataT["uniqueKeys"] extends never ?
                        any :
                        DataT["uniqueKeys"] extends Tuple<UniqueKey> ?
                            (
                                TupleWPush<
                                    UniqueKey,
                                    DataT["uniqueKeys"],
                                    {
                                        [columnName in ReturnType<AutoIncrementDelegateT>["name"]] : true
                                    }
                                >
                            ) :
                            TupleWiden<
                                [{
                                    [columnName in ReturnType<AutoIncrementDelegateT>["name"]] : true
                                }],
                                UniqueKey
                            >
                ) :
                DataT[key]
            )
        }
    );
    export function autoIncrement<
        DataT extends TableData,
        ColumnCollectionT extends ColumnCollection,
        AutoIncrementDelegateT extends AutoIncrementDelegate<ColumnCollectionT>
    > (
        data : DataT,
        columnCollection : ColumnCollectionT,
        delegate : AutoIncrementDelegateT
    ) : (
        AutoIncrement<DataT, ColumnCollectionT, AutoIncrementDelegateT>
    ) {
        //Technically, columns shouldn't have any non-`number` types
        //but I can't check for that during run-time
        const column = delegate(columnCollection as any);
        ColumnCollectionUtil.assertHasColumn(columnCollection, column);

        const isMutable  = {...data.isMutable};
        delete isMutable[column.name];

        const uniqueKeys : UniqueKey[] = (data.uniqueKeys == undefined) ?
            [] :
            data.uniqueKeys

        return {
            ...(data as any),
            autoIncrement : column,
            isGenerated : {
                ...data.isGenerated,
                [column.name] : true,
            },
            hasDefaultValue : {
                ...data.hasDefaultValue,
                [column.name] : true,
            },
            isMutable : isMutable,
            id : column,
            uniqueKeys : uniqueKeys.concat({
                [column.name] : true
            })
        } as any;
    }
    export type UnsetAutoIncrement<
        DataT extends TableData
    > = (
        DataT["autoIncrement"] extends AnyColumn ?
            {
                readonly [key in keyof DataT] : (
                    key extends "autoIncrement" ?
                    undefined :
                    key extends "isGenerated" ?
                    ReadonlyRemoveKey<DataT["isGenerated"], DataT["autoIncrement"]["name"]> :
                    key extends "hasDefaultValue" ?
                    ReadonlyRemoveKey<DataT["hasDefaultValue"], DataT["autoIncrement"]["name"]> :
                    DataT[key]
                )
            } :
            DataT
    );
    export function unsetAutoIncrement<DataT extends TableData> (data : DataT) : (
        UnsetAutoIncrement<DataT>
    ) {
        if (data.autoIncrement == undefined) {
            return data as any;
        }
        const autoIncrement = data.autoIncrement;
        const isGenerated = {...data.isGenerated};
        const hasDefaultValue = {...data.hasDefaultValue};
        delete isGenerated[autoIncrement.name];
        delete hasDefaultValue[autoIncrement.name];
        return {
            ...(data as any),
            isGenerated : isGenerated,
            hasDefaultValue : hasDefaultValue,
        } as any;
    }
    export type IsGenerated<
        DataT extends TableData,
        ColumnCollectionT extends ColumnCollection,
        IsGeneratedDelegateT extends IsGeneratedDelegate<
            DataT,
            ColumnCollectionT
        >
    > = (
        ReturnType<IsGeneratedDelegateT>[TupleKeys<ReturnType<IsGeneratedDelegateT>>] extends AnyColumn ?
            {
                readonly autoIncrement : DataT["autoIncrement"],
                readonly isGenerated : {
                    readonly [columnName in (
                        ReturnType<IsGeneratedDelegateT>[
                            TupleKeys<ReturnType<IsGeneratedDelegateT>>
                        ]["name"] |
                        keyof DataT["isGenerated"]
                    )] : true
                },
                readonly hasDefaultValue : {
                    readonly [columnName in (
                        ReturnType<IsGeneratedDelegateT>[
                            TupleKeys<ReturnType<IsGeneratedDelegateT>>
                        ]["name"] |
                        keyof DataT["hasDefaultValue"]
                    )] : true
                },
                readonly isMutable : {
                    readonly  [columnName in Exclude<
                        Extract<keyof DataT["isMutable"], string>,
                        ReturnType<IsGeneratedDelegateT>[
                            TupleKeys<ReturnType<IsGeneratedDelegateT>>
                        ]["name"]
                    >] : true
                },
                readonly id : DataT["id"],
                readonly uniqueKeys : DataT["uniqueKeys"],
                readonly parentTables : DataT["parentTables"],
                readonly noInsert : DataT["noInsert"],
            } :
            never
    );
    export function isGenerated<
        DataT extends TableData,
        ColumnCollectionT extends ColumnCollection,
        IsGeneratedDelegateT extends IsGeneratedDelegate<
            DataT,
            ColumnCollectionT
        >
    > (
        data : DataT,
        columnCollection : ColumnCollectionT,
        delegate : IsGeneratedDelegateT
    ) : (
        IsGenerated<DataT, ColumnCollectionT, IsGeneratedDelegateT>
    ) {
        let columns = columnCollection as any;
        if (data.autoIncrement != undefined) {
            columns = {...(columns as any)};
            delete columns[data.autoIncrement.name];
        }
        const columnTuple = delegate(columns as any);
        ColumnCollectionUtil.assertHasColumns(columns, columnTuple as any);

        const isGenerated = {...data.isGenerated};
        const hasDefaultValue = {...data.hasDefaultValue};
        const isMutable  = {...data.isMutable};

        for (let column of columnTuple) {
            isGenerated[column.name] = true;
            hasDefaultValue[column.name] = true;
            delete isMutable[column.name];
        }

        return {
            ...(data as any),
            isGenerated : isGenerated,
            hasDefaultValue : hasDefaultValue,
            isMutable : isMutable
        } as any;
    }
    export type HasDefaultValue<
        DataT extends TableData,
        ColumnCollectionT extends ColumnCollection,
        HasDefaultValueDelegateT extends HasDefaultValueDelegate<
            DataT,
            ColumnCollectionT
        >
    > = (
        ReturnType<HasDefaultValueDelegateT>[TupleKeys<ReturnType<HasDefaultValueDelegateT>>] extends AnyColumn ?
            {
                readonly [key in keyof DataT] : (
                    key extends "hasDefaultValue" ?
                    DataT["hasDefaultValue"] &
                    {
                        readonly [columnName in ReturnType<HasDefaultValueDelegateT>[
                            TupleKeys<ReturnType<HasDefaultValueDelegateT>>
                        ]["name"]] : true
                    } :
                    DataT[key]
                )
            } :
            never
    );
    export function hasDefaultValue<
        DataT extends TableData,
        ColumnCollectionT extends ColumnCollection,
        HasDefaultValueDelegateT extends HasDefaultValueDelegate<
            DataT,
            ColumnCollectionT
        >
    > (
        data : DataT,
        columnCollection : ColumnCollectionT,
        delegate : HasDefaultValueDelegateT
    ) : (
        HasDefaultValue<DataT, ColumnCollectionT, HasDefaultValueDelegateT>
    ) {
        const columns = {...(columnCollection as any)};
        for (let k of Object.keys(data.isGenerated)) {
            delete columns[k];
        }
        const columnTuple = delegate(columns as any);
        ColumnCollectionUtil.assertHasColumns(columns, columnTuple as any);

        const hasDefaultValue = {...data.hasDefaultValue};

        for (let column of columnTuple) {
            hasDefaultValue[column.name] = true;
        }

        return {
            ...(data as any),
            hasDefaultValue : hasDefaultValue,
        } as any;
    }
    export type IsMutable<
        DataT extends TableData,
        ColumnCollectionT extends ColumnCollection,
        IsMutableDelegateT extends IsMutableDelegate<
            DataT,
            ColumnCollectionT
        >
    > = (
        ReturnType<IsMutableDelegateT>[TupleKeys<ReturnType<IsMutableDelegateT>>] extends AnyColumn ?
            {
                readonly [key in keyof DataT] : (
                    key extends "isMutable" ?
                    DataT["isMutable"] &
                    {
                        readonly [columnName in ReturnType<IsMutableDelegateT>[
                            TupleKeys<ReturnType<IsMutableDelegateT>>
                        ]["name"]] : true
                    } :
                    DataT[key]
                )
            } :
            never
    );
    export function isMutable<
        DataT extends TableData,
        ColumnCollectionT extends ColumnCollection,
        IsMutableDelegateT extends IsMutableDelegate<
            DataT,
            ColumnCollectionT
        >
    > (
        data : DataT,
        columnCollection : ColumnCollectionT,
        delegate : IsMutableDelegateT
    ) : (
        IsMutable<DataT, ColumnCollectionT, IsMutableDelegateT>
    ) {
        const columns = {...(columnCollection as any)};
        for (let k of Object.keys(data.isGenerated)) {
            delete columns[k];
        }
        const columnTuple = delegate(columns as any);
        ColumnCollectionUtil.assertHasColumns(columns, columnTuple as any);

        const isMutable = {...data.isMutable};

        for (let column of columnTuple) {
            isMutable[column.name] = true;
        }

        return {
            ...(data as any),
            isMutable : isMutable,
        } as any;
    }
    export type Immutable<
        DataT extends TableData
    > = (
        {
            readonly [key in keyof DataT] : (
                key extends "isMutable" ?
                {} :
                DataT[key]
            )
        }
    );
    export function immutable<DataT extends TableData> (data : DataT) : (
        Immutable<DataT>
    ) {
        return {
            ...(data as any),
            isMutable : {},
        } as any;
    }

    export type Id<
        DataT extends TableData,
        ColumnCollectionT extends ColumnCollection,
        IdDelegateT extends IdDelegate<DataT, ColumnCollectionT>
    > = (
        {
            readonly [key in keyof DataT] : (
                key extends "id" ?
                ReturnType<IdDelegateT> :
                key extends "uniqueKeys" ?
                (
                    DataT["uniqueKeys"] extends Tuple<UniqueKey> ?
                        (
                            TupleWPush<
                                UniqueKey,
                                DataT["uniqueKeys"],
                                {
                                    [columnName in ReturnType<IdDelegateT>["name"]] : true
                                }
                            >
                        ) :
                        TupleWiden<
                            [{
                                [columnName in ReturnType<IdDelegateT>["name"]] : true
                            }],
                            UniqueKey
                        >
                ) :
                DataT[key]
            )
        }
    );
    export function id<
        DataT extends TableData,
        ColumnCollectionT extends ColumnCollection,
        IdDelegateT extends IdDelegate<DataT, ColumnCollectionT>
    > (
        data : DataT,
        columnCollection : ColumnCollectionT,
        delegate : IdDelegateT
    ) : (
        Id<DataT, ColumnCollectionT, IdDelegateT>
    ) {
        //Technically, columns shouldn't have any non-`number` types
        //but I can't check for that during run-time
        const column = delegate(columnCollection as any);
        ColumnCollectionUtil.assertHasColumn(columnCollection, column);

        const uniqueKeys : UniqueKey[] = (data.uniqueKeys == undefined) ?
            [] :
            data.uniqueKeys

        return {
            ...(data as any),
            id : column,
            uniqueKeys : uniqueKeys.concat({
                [column.name] : true
            })
        } as any;
    }

    export type ToUniqueKeyImpl<
        TupleT extends fieldUtil.AnyFieldTuple,
        K extends string
    > = (
        K extends keyof TupleT ?
            (
                TupleT[K] extends Column<any, infer NameT, any> ?
                {
                    readonly [name in NameT] : true
                } :
                TupleT[K] extends sd.Field<infer NameT, any> ?
                {
                    readonly [name in NameT] : true
                } :
                {}
            ) :
            {}
    );
    export type ToUniqueKey<
        TupleT extends fieldUtil.AnyFieldTuple
    > = (
        ToUniqueKeyImpl<TupleT, "0"> &
        ToUniqueKeyImpl<TupleT, "1"> &
        ToUniqueKeyImpl<TupleT, "1"> &
        ToUniqueKeyImpl<TupleT, "3"> &
        ToUniqueKeyImpl<TupleT, "4"> &
        ToUniqueKeyImpl<TupleT, "5"> &
        ToUniqueKeyImpl<TupleT, "6"> &
        ToUniqueKeyImpl<TupleT, "7"> &
        ToUniqueKeyImpl<TupleT, "8"> &
        ToUniqueKeyImpl<TupleT, "9">
    );
    export type AddUniqueKey<
        DataT extends TableData,
        ColumnCollectionT extends ColumnCollection,
        AddUniqueKeyDelegateT extends AddUniqueKeyDelegate<ColumnCollectionT>
    > = (
        {
            readonly [key in keyof DataT] : (
                key extends "uniqueKeys" ?
                (
                    DataT["uniqueKeys"] extends Tuple<UniqueKey> ?
                        (
                            //DataT["uniqueKeys"]
                            TupleWPush<
                                UniqueKey,
                                DataT["uniqueKeys"],
                                //UniqueKey
                                ToUniqueKey<
                                    //Tuple<AnyColumn>
                                    ReturnType<AddUniqueKeyDelegateT>
                                >
                            >
                        ) :
                        TupleWiden<
                            [ToUniqueKey<
                                //Tuple<AnyColumn>
                                ReturnType<AddUniqueKeyDelegateT>
                            >],
                            UniqueKey
                        >
                ) :
                DataT[key]
            )
        }
    );
    export type AddUniqueKeyFromFieldsUnsafe<
        DataT extends TableData,
        FieldsT extends fieldUtil.AnyFieldTuple
    > = (
        {
            readonly [key in keyof DataT] : (
                key extends "uniqueKeys" ?
                (
                    DataT["uniqueKeys"] extends Tuple<UniqueKey> ?
                        (
                            TupleWPush<
                                UniqueKey,
                                DataT["uniqueKeys"],
                                ToUniqueKey<
                                    FieldsT
                                >
                            >
                        ) :
                        TupleWiden<
                            [ToUniqueKey<
                                    FieldsT
                            >],
                            UniqueKey
                        >
                ) :
                DataT[key]
            )
        }
    );
    export function toUniqueKey<
        TupleT extends fieldUtil.AnyFieldTuple
    > (tuple : TupleT) : ToUniqueKey<TupleT> {
        const result = {} as any;
        for (let i of tuple) {
            result[i.name] = true;
        }
        return result;
    }
    export function addUniqueKey<
        DataT extends TableData,
        ColumnCollectionT extends ColumnCollection,
        AddUniqueKeyDelegateT extends AddUniqueKeyDelegate<ColumnCollectionT>
    > (
        data : DataT,
        columnCollection : ColumnCollectionT,
        delegate : AddUniqueKeyDelegateT
    ) : (
        AddUniqueKey<
            DataT,
            ColumnCollectionT,
            AddUniqueKeyDelegateT
        >
    ) {
        const uniqueKeyTuple = delegate(columnCollection);
        ColumnCollectionUtil.assertHasColumns(columnCollection, uniqueKeyTuple);
        return {
            ...(data as any),
            uniqueKeys : (data.uniqueKeys == undefined) ?
                [toUniqueKey(uniqueKeyTuple)] :
                data.uniqueKeys.concat(toUniqueKey(uniqueKeyTuple))
        } as any;
    }
    export function addUniqueKeyFromFieldsUnsafe<
        DataT extends TableData,
        FieldsT extends fieldUtil.AnyFieldTuple
    > (
        data : DataT,
        fields : FieldsT
    ) : (
        AddUniqueKeyFromFieldsUnsafe<
            DataT,
            FieldsT
        >
    ) {
        return {
            ...(data as any),
            uniqueKeys : (data.uniqueKeys == undefined) ?
                [toUniqueKey(fields)] :
                data.uniqueKeys.concat(toUniqueKey(fields))
        } as any;
    }

    export type WithTableAliasGeneric<DataT extends TableData, TableAliasT extends string> = (
        {
            readonly autoIncrement : (
                DataT["autoIncrement"] extends AnyColumn ?
                ColumnUtil.WithTableAlias<DataT["autoIncrement"], TableAliasT> :
                DataT["autoIncrement"] extends undefined ?
                undefined :
                DataT["autoIncrement"] extends AnyColumn|undefined ?
                ColumnUtil.WithTableAlias<Extract<DataT["autoIncrement"], AnyColumn>, TableAliasT>|undefined :
                undefined
            );
            readonly isGenerated : DataT["isGenerated"];
            readonly hasDefaultValue : DataT["hasDefaultValue"];
            readonly isMutable : DataT["isMutable"];
            readonly id : (
                DataT["id"] extends AnyColumn ?
                ColumnUtil.WithTableAlias<DataT["id"], TableAliasT> :
                DataT["id"] extends undefined ?
                undefined :
                DataT["id"] extends AnyColumn|undefined ?
                ColumnUtil.WithTableAlias<Extract<DataT["id"], AnyColumn>, TableAliasT>|undefined :
                undefined
            );
            readonly uniqueKeys : DataT["uniqueKeys"];
            readonly parentTables : DataT["parentTables"];
            readonly noInsert : DataT["noInsert"];
        }
    );
    export type WithTableAlias<DataT extends TableData, TableAliasT extends string> = (
        {
            readonly autoIncrement : (
                DataT["autoIncrement"] extends AnyColumn ?
                ColumnUtil.WithTableAlias<DataT["autoIncrement"], TableAliasT> :
                undefined
            );
            readonly isGenerated : DataT["isGenerated"];
            readonly hasDefaultValue : DataT["hasDefaultValue"];
            readonly isMutable : DataT["isMutable"];
            readonly id : (
                DataT["id"] extends AnyColumn ?
                ColumnUtil.WithTableAlias<DataT["id"], TableAliasT> :
                undefined
            );
            readonly uniqueKeys : DataT["uniqueKeys"];
            readonly parentTables : DataT["parentTables"];
            readonly noInsert : DataT["noInsert"];
        }
    );
    export function withTableAlias<
        DataT extends TableData,
        TableAliasT extends string
    > (data : DataT, tableAlias : TableAliasT) : (
        WithTableAlias<DataT, TableAliasT>
    ) {
        return {
            ...(data as any),
            autoIncrement : (data.autoIncrement == undefined) ?
                undefined :
                ColumnUtil.withTableAlias(data.autoIncrement, tableAlias),
            id : (data.id == undefined) ?
                undefined :
                ColumnUtil.withTableAlias(data.id, tableAlias),
        } as any;
    }

    //TODO Move to TableUtil?
    //TODO Add checks for the following,
    //+ Must share at least one unique key
    //+ Duplicate columns must be assignable from child to parent
    export type AddParentTable<
        DataT extends TableData,
        ParentT extends AnyTable
    > = (
        DataT["uniqueKeys"] extends UniqueKeyCollection ?
            (
                ParentT["data"]["uniqueKeys"] extends UniqueKeyCollection ?
                    (
                        UniqueKeyCollectionUtil.CommonUniqueKeys<
                            DataT["uniqueKeys"],
                            ParentT["data"]["uniqueKeys"]
                        > extends never ?
                            never :
                            (
                                DataT["parentTables"] extends TableParentCollection ?
                                    (
                                        ParentT["data"]["parentTables"] extends TableParentCollection ?
                                            (
                                                {
                                                    [key in keyof DataT] : (
                                                        key extends "parentTables" ?
                                                            TupleWPush<
                                                                AnyTable,
                                                                TupleWConcat<
                                                                    AnyTable,
                                                                    DataT["parentTables"],
                                                                    ParentT["data"]["parentTables"]
                                                                >,
                                                                ParentT
                                                            > :
                                                            DataT[key]
                                                    )
                                                }
                                            ) :
                                            (
                                                {
                                                    [key in keyof DataT] : (
                                                        key extends "parentTables" ?
                                                            TupleWPush<
                                                                AnyTable,
                                                                DataT["parentTables"],
                                                                ParentT
                                                            > :
                                                            DataT[key]
                                                    )
                                                }
                                            )
                                    ) :
                                    (
                                        ParentT["data"]["parentTables"] extends TableParentCollection ?
                                            (
                                                {
                                                    [key in keyof DataT] : (
                                                        key extends "parentTables" ?
                                                            TupleWPush<
                                                                AnyTable,
                                                                ParentT["data"]["parentTables"],
                                                                ParentT
                                                            > :
                                                            DataT[key]
                                                    )
                                                }
                                            ) :
                                            (
                                                {
                                                    [key in keyof DataT] : (
                                                        key extends "parentTables" ?
                                                        TupleWiden<
                                                            [ParentT],
                                                            AnyTable
                                                        > :
                                                        DataT[key]
                                                    )
                                                }
                                            )
                                    )
                            )
                    ) :
                    never
            ) :
            never
    );
    export function addParentTable<
        DataT extends TableData,
        ParentT extends AnyTable
    > (
        data : DataT,
        parent : ParentT
    ) {
        if (data.parentTables == undefined) {
            if (parent.data.parentTables == undefined) {
                return {
                    ...(data as any),
                    parentTables : [parent],
                };
            } else {
                return {
                    ...(data as any),
                    parentTables : parent.data.parentTables.concat(parent),
                };
            }
        } else {
            if (parent.data.parentTables == undefined) {
                return {
                    ...(data as any),
                    parentTables : data.parentTables.concat(
                        parent
                    ),
                };
            } else {
                return {
                    ...(data as any),
                    parentTables : data.parentTables.concat(
                        [parent.data.parentTables],
                        parent
                    ),
                };
            }
        }
    }

    export type NoInsert<
        DataT extends TableData
    > = (
        {
            readonly [key in keyof DataT] : (
                key extends "noInsert" ?
                true :
                DataT[key]
            )
        }
    );
    export function noInsert<DataT extends TableData> (data : DataT) : (
        NoInsert<DataT>
    ) {
        return {
            ...(data as any),
            noInsert : true,
        };
    }
}
