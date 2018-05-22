import {
    TableData,
    AutoIncrementDelegate,
    IsGeneratedDelegate,
    HasDefaultValueDelegate,
    IsMutableDelegate
} from "./table-data";
import {ReplaceValue, ReplaceValue3, ReplaceValue4} from "../obj-util";
import {ColumnCollection, ColumnCollectionUtil} from "../column-collection";
import {TupleKeys} from "../tuple";
import {Column, AnyColumn} from "../column";

export namespace TableDataUtil {
    export type AutoIncrement<
        DataT extends TableData,
        ColumnCollectionT extends ColumnCollection,
        AutoIncrementDelegateT extends AutoIncrementDelegate<ColumnCollectionT>
    > = (
        ReplaceValue4<
            DataT,
            "autoIncrement",
            ReturnType<AutoIncrementDelegateT>,
            "isGenerated",
            DataT["isGenerated"] &
            {
                [columnName in ReturnType<AutoIncrementDelegateT>["name"]] : true
            },
            "hasDefaultValue",
            DataT["hasDefaultValue"] &
            {
                [columnName in ReturnType<AutoIncrementDelegateT>["name"]] : true
            },
            "isMutable",
            {
                [columnName in Exclude<
                    Extract<keyof DataT["isMutable"], string>,
                    ReturnType<AutoIncrementDelegateT>["name"]
                >] : true
            }
        >
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
            isMutable : isMutable
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
        ReplaceValue<
            DataT,
            "isMutable",
            {}
        >
    );
    export function immutable<DataT extends TableData> (data : DataT) : (
        Immutable<DataT>
    ) {
        return {
            ...(data as any),
            isMutable : {},
        } as any;
    }
}