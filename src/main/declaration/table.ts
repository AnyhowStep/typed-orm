import {IColumn, AnyColumn} from "./column";
import {AliasedTable} from "./aliased-table";
import {RawColumnCollection, ColumnCollection, AnyColumnCollection, ColumnCollectionElement} from "./column-collection";
import {Tuple, TupleKeys} from "./tuple";
import {NullableColumnNames} from "./column-operation";

export interface RawTableData {
    //TODO, Maybe allow string? I *think* BIGINT can have values too large for `number`
    autoIncrement : undefined|IColumn<any, any, number>;
    hasServerDefaultValue : {
        [name : string] : true;
    };
}

export type AutoIncrementDelegate<ColumnCollectionT extends AnyColumnCollection> = (
    (columns : ColumnCollectionT) => ColumnCollectionElement<ColumnCollectionT>
);

export type HasServerDefaultValueDelegate<ColumnCollectionT extends AnyColumnCollection> = (
    (columns : ColumnCollectionT) => Tuple<ColumnCollectionElement<ColumnCollectionT>>
);

export interface ITable<
    AliasT extends string,
    NameT extends string,
    RawColumnCollectionT extends RawColumnCollection,
    DataT extends RawTableData
> extends AliasedTable<AliasT, NameT, RawColumnCollectionT> {
    readonly data : DataT;

    as<NewAliasT extends string> (alias : NewAliasT) : AliasedTable<NewAliasT, NameT, RawColumnCollectionT>;

    autoIncrement<
        AutoIncrementDelegateT extends AutoIncrementDelegate<ColumnCollection<AliasT, RawColumnCollectionT>>
    > (
        autoIncrementDelegate : AutoIncrementDelegateT
    ) : (
        ReturnType<AutoIncrementDelegateT> extends IColumn<any, infer AutoIncrementNameT, any> ?
            ITable<
                AliasT,
                NameT,
                RawColumnCollectionT,
                {
                    autoIncrement : ReturnType<AutoIncrementDelegateT>,
                    hasServerDefaultValue : (
                        DataT["hasServerDefaultValue"] &
                        {
                            [name in AutoIncrementNameT] : true
                        }
                    )
                }
            > :
            ("Invalid return type or could not infer AutoIncrementNameT"|void|never)
    );
    setHasServerDefaultValue<
        HasServerDefaultValueDelegateT extends HasServerDefaultValueDelegate<ColumnCollection<AliasT, RawColumnCollectionT>>
    > (
        hasServerDefaultValueDelegate : HasServerDefaultValueDelegateT
    ) : (
        ReturnType<HasServerDefaultValueDelegateT>[
            TupleKeys<ReturnType<HasServerDefaultValueDelegateT>>
        ] extends AnyColumn ?
            ITable<
                AliasT,
                NameT,
                RawColumnCollectionT,
                {
                    autoIncrement : DataT["autoIncrement"],
                    hasServerDefaultValue : (
                            (
                                {
                                    [k in ReturnType<HasServerDefaultValueDelegateT>[
                                        TupleKeys<ReturnType<HasServerDefaultValueDelegateT>>
                                    ]["name"]] : true
                                } &
                                (
                                    DataT["autoIncrement"] extends AnyColumn ?
                                        { [name in DataT["autoIncrement"]["name"]] : true } :
                                        {}
                                ) &
                                {
                                    [name in NullableColumnNames<ColumnCollection<
                                        NameT,
                                        RawColumnCollectionT
                                    >>] : true
                                }
                            )
                    ),
                }
            > :
            never
    );
}

export type CreateTableDelegate = (
    <
        NameT extends string,
        RawColumnCollectionT extends RawColumnCollection
    > (
        name : NameT,
        rawColumns : RawColumnCollectionT,
    ) => (
        ITable<
            NameT,
            NameT,
            RawColumnCollectionT,
            {
                autoIncrement : undefined,
                hasServerDefaultValue : {
                    [name in NullableColumnNames<ColumnCollection<NameT, RawColumnCollectionT>>] : true
                },
            }
        >
    )
);
