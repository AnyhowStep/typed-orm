import {
    TableData,
    AutoIncrementDelegate,
    IsGeneratedDelegate,
    HasDefaultValueDelegate,
    IsMutableDelegate,
    AddUniqueKeyDelegate
} from "./table-data";
import {RemoveKey, ReplaceValue, ReplaceValue3} from "../obj-util";
import {ColumnCollection, ColumnCollectionUtil} from "../column-collection";
import {Tuple, TupleKeys, TupleWPush, TupleWiden} from "../tuple";
import {Column, AnyColumn, ColumnUtil} from "../column";
import {UniqueKey} from "../unique-key";

export namespace TableDataUtil {
    export type AutoIncrement<
        DataT extends TableData,
        ColumnCollectionT extends ColumnCollection,
        AutoIncrementDelegateT extends AutoIncrementDelegate<ColumnCollectionT>
    > = (
        {
            [key in keyof DataT] : (
                key extends "autoIncrement" ?
                ReturnType<AutoIncrementDelegateT> :
                key extends "isGenerated" ?
                {
                    [columnName in (
                        ReturnType<AutoIncrementDelegateT>["name"]|
                        Extract<keyof DataT["isGenerated"], string>
                    )] : true
                } :
                key extends "hasDefaultValue" ?
                {
                    [columnName in (
                        ReturnType<AutoIncrementDelegateT>["name"]|
                        Extract<keyof DataT["hasDefaultValue"], string>
                    )] : true
                } :
                key extends "uniqueKeys" ?
                (
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
        /*ReplaceValue4<
            DataT,
            "autoIncrement",
            ReturnType<AutoIncrementDelegateT>,
            "isGenerated",
            {
                [columnName in (
                    ReturnType<AutoIncrementDelegateT>["name"]|
                    Extract<keyof DataT["isGenerated"], string>
                )] : true
            }
            /*DataT["isGenerated"] &
            {
                [columnName in ReturnType<AutoIncrementDelegateT>["name"]] : true
            }* /,
            "hasDefaultValue",
            {
                [columnName in (
                    ReturnType<AutoIncrementDelegateT>["name"]|
                    Extract<keyof DataT["hasDefaultValue"], string>
                )] : true
            }
            /*DataT["hasDefaultValue"] &
            {
                [columnName in ReturnType<AutoIncrementDelegateT>["name"]] : true
            }* /,
            "isMutable",
            {
                [columnName in Exclude<
                    Extract<keyof DataT["isMutable"], string>,
                    ReturnType<AutoIncrementDelegateT>["name"]
                >] : true
            }
        >*/
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
            uniqueKeys : uniqueKeys.concat({
                [column.name] : true
            })
        } as any;
    }
    export type UnsetAutoIncrement<
        DataT extends TableData
    > = (
        DataT["autoIncrement"] extends AnyColumn ?
            ReplaceValue3<
                DataT,
                "autoIncrement",
                undefined,
                "isGenerated",
                RemoveKey<DataT["isGenerated"], DataT["autoIncrement"]["name"]>,
                "hasDefaultValue",
                RemoveKey<DataT["hasDefaultValue"], DataT["autoIncrement"]["name"]>
            > :
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
            ReplaceValue3<
                DataT,
                "isGenerated",
                DataT["isGenerated"] &
                {
                    [columnName in ReturnType<IsGeneratedDelegateT>[
                        TupleKeys<ReturnType<IsGeneratedDelegateT>>
                    ]["name"]] : true
                },
                "hasDefaultValue",
                DataT["hasDefaultValue"] &
                {
                    [columnName in ReturnType<IsGeneratedDelegateT>[
                        TupleKeys<ReturnType<IsGeneratedDelegateT>>
                    ]["name"]] : true
                },
                "isMutable",
                {
                    [columnName in Exclude<
                        Extract<keyof DataT["isMutable"], string>,
                        ReturnType<IsGeneratedDelegateT>[
                            TupleKeys<ReturnType<IsGeneratedDelegateT>>
                        ]["name"]
                    >] : true
                }
            > :
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
            ReplaceValue<
                DataT,
                "hasDefaultValue",
                DataT["hasDefaultValue"] &
                {
                    [columnName in ReturnType<HasDefaultValueDelegateT>[
                        TupleKeys<ReturnType<HasDefaultValueDelegateT>>
                    ]["name"]] : true
                }
            > :
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
            ReplaceValue<
                DataT,
                "isMutable",
                DataT["isMutable"] &
                {
                    [columnName in ReturnType<IsMutableDelegateT>[
                        TupleKeys<ReturnType<IsMutableDelegateT>>
                    ]["name"]] : true
                }
            > :
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
            [key in keyof DataT] : (
                key extends "isMutable" ?
                {} :
                DataT[key]
            )
        }
        /*ReplaceValue<
            DataT,
            "isMutable",
            {}
        >*/
    );
    export function immutable<DataT extends TableData> (data : DataT) : (
        Immutable<DataT>
    ) {
        return {
            ...(data as any),
            isMutable : {},
        } as any;
    }
    export type ToUniqueKeyImpl<
        TupleT extends Tuple<AnyColumn>,
        K extends string
    > = (
        K extends keyof TupleT ?
            (
                TupleT[K] extends Column<any, infer NameT, any> ?
                    {
                        [name in NameT] : true
                    } :
                    {}
            ) :
            {}
    );
    export type ToUniqueKey<
        TupleT extends Tuple<AnyColumn>
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
            [key in keyof DataT] : (
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
    export function toUniqueKey<
        TupleT extends Tuple<AnyColumn>
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

    export type WithTableAlias<DataT extends TableData, TableAliasT extends string> = (
        ReplaceValue<
            DataT,
            "autoIncrement",
            (
                DataT["autoIncrement"] extends AnyColumn ?
                    ColumnUtil.WithTableAlias<DataT["autoIncrement"], TableAliasT> :
                    undefined
            )
        >
        /*{
            autoIncrement : (
                DataT["autoIncrement"] extends AnyColumn ?
                    ColumnUtil.WithTableAlias<DataT["autoIncrement"], TableAliasT> :
                    undefined
            ),
            isGenerated : DataT["isGenerated"],
            hasDefaultValue : DataT["hasDefaultValue"],
            isMutable : DataT["isMutable"],
            uniqueKeys : (
                DataT["uniqueKeys"] extends Tuple<Tuple<AnyColumn>> ?
                    UniqueKeysWithTableAlias<DataT["uniqueKeys"], TableAliasT> :
                    undefined|Tuple<Tuple<AnyColumn>>
            ),
        }*/
        /*
        {
            isGenerated : DataT["isGenerated"],
            hasDefaultValue : DataT["hasDefaultValue"],
            isMutable : DataT["isMutable"],
        } &
        (
            DataT["autoIncrement"] extends AnyColumn ?
                {
                    autoIncrement : ColumnUtil.WithTableAlias<DataT["autoIncrement"], TableAliasT>,
                } :
                {
                    autoIncrement : undefined,
                }
        ) &
        (
            DataT["uniqueKeys"] extends Tuple<Tuple<AnyColumn>> ?
                {
                    uniqueKeys : UniqueKeysWithTableAlias<DataT["uniqueKeys"], TableAliasT>,
                } :
                {
                    uniqueKeys : undefined,
                }
        )
        */
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
        } as any;
    }
}
