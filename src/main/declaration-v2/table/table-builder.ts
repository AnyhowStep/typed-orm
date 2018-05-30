import {AliasedTable} from "../aliased-table";
import {ColumnCollection, ColumnCollectionUtil} from "../column-collection";
import {RawColumnCollection, RawColumnCollectionUtil} from "../raw-column-collection";
import {
    TableData,
    AutoIncrementDelegate,
    IsGeneratedDelegate,
    HasDefaultValueDelegate,
    IsMutableDelegate,
    TableDataUtil,
    AddUniqueKeyDelegate,
    IdDelegate,
} from "../table-data";
import {Table, AnyTable} from "./table";
import * as fieldUtil from "../field-util";
//import {Column} from "../column";
//import * as sd from "schema-decorator";
//import {TableUtil} from "./util";

export class TableBuilder<
    AliasT extends string,
    NameT extends string,
    ColumnCollectionT extends ColumnCollection,
    DataT extends TableData
> extends AliasedTable<AliasT, NameT, ColumnCollectionT> {
    constructor (
        alias : AliasT,
        name  : NameT,
        columns : ColumnCollectionT,
        readonly data : DataT
    ) {
        super(alias, name, columns);
    }

    setAutoIncrement<
        AutoIncrementDelegateT extends AutoIncrementDelegate<ColumnCollectionT>
    >(
        this : TableBuilder<
            any,
            any,
            any,
            {
                readonly [key in keyof DataT] : (
                    key extends "autoIncrement" ?
                    undefined :
                    key extends "id" ?
                    undefined :
                    any
                )
            }
        >,
        delegate : AutoIncrementDelegateT
    ) : (
        TableBuilder<
            AliasT,
            NameT,
            ColumnCollectionT,
            TableDataUtil.AutoIncrement<DataT, ColumnCollectionT, AutoIncrementDelegateT>
        >
    ) {
        return new TableBuilder(
            this.alias,
            this.name,
            this.columns,
            TableDataUtil.autoIncrement(this.data, this.columns, delegate as any)
        ) as any;
    }
    /*unsetAutoIncrement () : (
        Table<
            AliasT,
            NameT,
            ColumnCollectionT,
            TableDataUtil.UnsetAutoIncrement<DataT>
        >
    ) {
        return new Table(
            this.alias,
            this.name,
            this.columns,
            TableDataUtil.unsetAutoIncrement(this.data)
        );
    }*/
    setIsGenerated<
        IsGeneratedDelegateT extends IsGeneratedDelegate<
            DataT,
            ColumnCollectionT
        >
    >(delegate : IsGeneratedDelegateT) : (
        TableBuilder<
            AliasT,
            NameT,
            ColumnCollectionT,
            TableDataUtil.IsGenerated<DataT, ColumnCollectionT, IsGeneratedDelegateT>
        >
    ) {
        return new TableBuilder(
            this.alias,
            this.name,
            this.columns,
            TableDataUtil.isGenerated(this.data, this.columns, delegate)
        );
    }
    setHasDefaultValue<
        HasDefaultValueDelegateT extends HasDefaultValueDelegate<
            DataT,
            ColumnCollectionT
        >
    >(delegate : HasDefaultValueDelegateT) : (
        TableBuilder<
            AliasT,
            NameT,
            ColumnCollectionT,
            TableDataUtil.HasDefaultValue<DataT, ColumnCollectionT, HasDefaultValueDelegateT>
        >
    ) {
        return new TableBuilder(
            this.alias,
            this.name,
            this.columns,
            TableDataUtil.hasDefaultValue(this.data, this.columns, delegate)
        );
    }
    setIsMutable<
        IsMutableDelegateT extends IsMutableDelegate<
            DataT,
            ColumnCollectionT
        >
    >(delegate : IsMutableDelegateT) : (
        TableBuilder<
            AliasT,
            NameT,
            ColumnCollectionT,
            TableDataUtil.IsMutable<DataT, ColumnCollectionT, IsMutableDelegateT>
        >
    ) {
        return new TableBuilder(
            this.alias,
            this.name,
            this.columns,
            TableDataUtil.isMutable(this.data, this.columns, delegate)
        );
    }
    setImmutable () : (
        TableBuilder<
            AliasT,
            NameT,
            ColumnCollectionT,
            TableDataUtil.Immutable<DataT>
        >
    ) {
        return new TableBuilder(
            this.alias,
            this.name,
            this.columns,
            TableDataUtil.immutable(this.data)
        );
    }

    withName<NewNameT extends string> (newName : NewNameT) : (
        TableBuilder<
            NewNameT,
            NewNameT,
            ColumnCollectionUtil.WithTableAlias<
                ColumnCollectionT,
                NewNameT
            >,
            TableDataUtil.WithTableAlias<DataT, NewNameT>
        >
    ) {
        return new TableBuilder(
            newName,
            newName,
            ColumnCollectionUtil.withTableAlias(this.columns, newName),
            TableDataUtil.withTableAlias(this.data, newName)
        );
    }
    addColumns<RawColumnCollectionT extends RawColumnCollection> (
        rawColumnCollection : RawColumnCollectionT
    ) : (
        TableBuilder<
            AliasT,
            NameT,
            ColumnCollectionUtil.Merge<
                ColumnCollectionT,
                RawColumnCollectionUtil.ToColumnCollection<
                    AliasT,
                    RawColumnCollectionT
                >
            >,
            DataT
        >
    );
    addColumns<TupleT extends fieldUtil.AnyFieldTuple> (
        fields : TupleT
    ) : (
        TableBuilder<
            AliasT,
            NameT,
            ColumnCollectionUtil.Merge<
                ColumnCollectionT,
                RawColumnCollectionUtil.ToColumnCollection<
                    AliasT,
                    fieldUtil.FieldsToObject<TupleT>
                >
            >,
            DataT
        >
    );
    addColumns (raw : RawColumnCollection|fieldUtil.AnyFieldTuple) : (
        TableBuilder<
            AliasT,
            NameT,
            any,
            any
        >
    ) {
        if (raw instanceof Array) {
            raw = fieldUtil.fieldsToObject(raw);
        }
        return new TableBuilder(
            this.alias,
            this.name,
            ColumnCollectionUtil.merge(
                this.columns,
                RawColumnCollectionUtil.toColumnCollection(this.alias, raw)
            ),
            this.data
        );
    }

    setId<
        IdDelegateT extends IdDelegate<DataT, ColumnCollectionT>
    >(
        this : TableBuilder<
            any,
            any,
            any,
            {
                readonly [key in keyof DataT] : (
                    key extends "autoIncrement" ?
                    undefined :
                    key extends "id" ?
                    undefined :
                    any
                )
            }
        >,
        delegate : IdDelegateT
    ) : (
        TableBuilder<
            AliasT,
            NameT,
            ColumnCollectionT,
            TableDataUtil.Id<DataT, ColumnCollectionT, IdDelegateT>
        >
    ) {
        return new TableBuilder(
            this.alias,
            this.name,
            this.columns,
            TableDataUtil.id(this.data, this.columns, delegate as any)
        ) as any;
    }
    //This method causes `tsc` to not terminate if uncommented
    addUniqueKey<
        AddUniqueKeyDelegateT extends AddUniqueKeyDelegate<ColumnCollectionT>
    > (delegate : AddUniqueKeyDelegateT) : (
        TableBuilder<
            AliasT,
            NameT,
            ColumnCollectionT,
            TableDataUtil.AddUniqueKey<
                DataT,
                ColumnCollectionT,
                AddUniqueKeyDelegateT
            >
        >
    ) {
        return new TableBuilder(
            this.alias,
            this.name,
            this.columns,
            TableDataUtil.addUniqueKey(
                this.data,
                this.columns,
                delegate
            ) as any
        ) as any;
    }

    addParent<ParentT extends AnyTable> (parent : ParentT) : TableBuilder<
        AliasT,
        NameT,
        ColumnCollectionT,
        TableDataUtil.AddParentTable<
            DataT,
            ParentT
        >
    > {
        return new TableBuilder(
            this.alias,
            this.name,
            this.columns,
            TableDataUtil.addParentTable(
                this.data,
                parent
            ) as any
        ) as any;
    }

    build () : Table<AliasT, NameT, ColumnCollectionT, DataT> {
        return new Table(
            this.alias,
            this.name,
            this.columns,
            this.data
        );
    }
}

export function table<
    NameT extends string,
    RawColumnCollectionT extends RawColumnCollection
> (
    name : NameT,
    rawColumnCollection : RawColumnCollectionT,
) : (
    TableBuilder<
        NameT,
        NameT,
        RawColumnCollectionUtil.ToColumnCollection<NameT, RawColumnCollectionT>,
        {
            autoIncrement : undefined,
            isGenerated : {},
            hasDefaultValue : {
                [name in RawColumnCollectionUtil.NullableColumnNames<
                    RawColumnCollectionT
                >] : true
            },
            isMutable : {
                [name in Extract<keyof RawColumnCollectionT, string>] : true
            },
            id : undefined,
            uniqueKeys : undefined,
            parentTables : undefined,
        }
    >
);
export function table<
    NameT extends string,
    TupleT extends fieldUtil.AnyFieldTuple
> (
    name : NameT,
    tuple : TupleT,
) : (
    TableBuilder<
        NameT,
        NameT,
        RawColumnCollectionUtil.ToColumnCollection<NameT, fieldUtil.FieldsToObject<TupleT>>,
        {
            autoIncrement : undefined,
            isGenerated : {},
            hasDefaultValue : {
                [name in RawColumnCollectionUtil.NullableColumnNames<
                    fieldUtil.FieldsToObject<TupleT>
                >] : true
            },
            isMutable : {
                [name in Extract<keyof fieldUtil.FieldsToObject<TupleT>, string>] : true
            },
            id : undefined,
            uniqueKeys : undefined,
            parentTables : undefined,
        }
    >
);
export function table<
    TableT extends AnyTable
> (
    table : TableT
) : (
    TableBuilder<
        TableT["alias"],
        TableT["name"],
        TableT["columns"],
        TableT["data"]
    >
);
export function table (
    arg0 : any,
    arg1? : any,
) : any {
    if (arg0 instanceof Table) {
        return new TableBuilder(
            arg0.alias,
            arg0.name,
            arg0.columns,
            arg0.data
        );
    }

    const name = arg0;
    let raw : any = arg1;

    if (raw instanceof Array) {
        raw = fieldUtil.fieldsToObject(raw as any);
    }
    const columns = RawColumnCollectionUtil.toColumnCollection(name, raw);
    const hasDefaultValue = {} as any;
    const isMutable = {} as any;

    for (let columnName of ColumnCollectionUtil.nullableColumnNames(columns)) {
        hasDefaultValue[columnName] = true;
    }

    for (let columnName in columns) {
        isMutable[columnName] = true;
    }

    return new TableBuilder(
        name,
        name,
        columns,
        {
            autoIncrement : undefined,
            isGenerated : {},
            hasDefaultValue : hasDefaultValue,
            isMutable : isMutable,
            id : undefined,
            uniqueKeys : undefined,
            parentTables : undefined,
        }
    );
}