import {ITable} from "../table";
import {ISelectBuilder, AnySelectBuilder} from "../select-builder";
import {IColumn, AnyColumn} from "../column";
import {TypeOf} from "../column-collection";
import {ColumnOfReferences} from "../column-references-operation";
import * as mysql from "typed-mysql";
import {Querify} from "../querify";

export interface AnyInsertBuilderData {
    readonly table : ITable<any, any, any, any>;
    readonly selectBuilder : AnySelectBuilder;
    readonly ignore : boolean;
    readonly columns : undefined|{
        [name : string] : AnyColumn
    };

    //TODO Not implementing until I understand it well enough
    /*onDuplicateKeyUpdate : undefined|{
        [name : string] : IExpr<any, any>
    };*/
}

export type InsertColumnsCallback<DataT extends AnyInsertBuilderData> = (
    DataT["table"] extends ITable<any, any, infer RawColumnCollectionT, infer TableDataT> ?
        (
            DataT["selectBuilder"] extends ISelectBuilder<infer SelectDataT> ?
                (s : SelectDataT["selectReferences"]) => (
                    {
                        [name in Exclude<
                            keyof RawColumnCollectionT,
                            keyof TableDataT["hasServerDefaultValue"]
                            >] : (
                            ColumnOfReferences<SelectDataT["selectReferences"]> &
                            IColumn<any, any, TypeOf<RawColumnCollectionT[name]>>
                        )
                    } &
                    {
                        [name in keyof TableDataT["hasServerDefaultValue"]]? : (
                            ColumnOfReferences<SelectDataT["selectReferences"]> &
                            IColumn<any, any, TypeOf<RawColumnCollectionT[name]>>|undefined
                        )
                    }
                ) :
                (never)
        ) :
        (never)
)

export interface IInsertSelectBuilder<DataT extends AnyInsertBuilderData> extends Querify {
    readonly data : DataT;

    ignore () : IInsertSelectBuilder<{
        table : DataT["table"];
        selectBuilder : DataT["selectBuilder"];
        ignore : true;
        columns : DataT["columns"];
    }>;
    ignore<IgnoreT extends boolean> (ignore : IgnoreT) : IInsertSelectBuilder<{
        table : DataT["table"];
        selectBuilder : DataT["selectBuilder"];
        ignore : IgnoreT;
        columns : DataT["columns"];
    }>;

    columns<InsertColumnsCallbackT extends InsertColumnsCallback<DataT>> (
        columnsCallback : InsertColumnsCallbackT
    ) : IInsertSelectBuilder<{
        table : DataT["table"];
        selectBuilder : DataT["selectBuilder"];
        ignore : DataT["ignore"];
        columns : ReturnType<InsertColumnsCallbackT>;
    }>;

    execute (
        this : IInsertSelectBuilder<{
            table : any,
            selectBuilder : any,
            ignore : any,
            columns : {
                [name : string] : AnyColumn
            },
        }>
    ) : (
        DataT["table"] extends ITable<any, any, any, infer TableDataT> ?
            (
                mysql.MysqlInsertResult &
                (
                    TableDataT["autoIncrement"] extends AnyColumn ?
                        //No auto increment
                        {
                            [name in TableDataT["autoIncrement"]["name"]] : (
                                DataT["ignore"] extends true ?
                                    number|undefined :
                                    number
                            )
                        } :
                        //The auto-incremented id
                        {}
                )
            ) :
            ("Could not infer TableDataT of table"|void|never)
    );

    //TODO When I am smarter
    /*onDuplicateKeyUpdate<
        OnDuplicateKeyUpdateT extends {
            [name in keyof DataT["table"]["columns"]]? : s.RawExprNoUsedRef<
                s.TypeOf<DataT["table"]["columns"][name]>
            >
        }
    > (
        this : InsertBuilder<{
            table : any;
            selectBuilder : any;

            ignore : any;

            values : any;
            columns : any;

            onDuplicateKeyUpdate : any;
        }>,
        onDuplicateKeyUpdate : OnDuplicateKeyUpdateT
    ) : InsertBuilder<{
        table : DataT["table"];
        selectBuilder : DataT["selectBuilder"];

        ignore : DataT["ignore"];

        values : DataT["values"];
        columns : DataT["columns"];

        onDuplicateKeyUpdate : {
            [name in keyof OnDuplicateKeyUpdateT] : s.Expr<
                {}, s.TypeOf<DataT["table"]["columns"][name]>
            >
        };
    }>;*/
}

export type CreateInsertSelectBuilderDelegate = (
    <
        TableT extends ITable<any, any, any, any>,
        SelectBuilderT extends AnySelectBuilder
    > (
        table : TableT,
        selectBuilder : SelectBuilderT
    ) => (
        IInsertSelectBuilder<{
            table : TableT;
            selectBuilder : SelectBuilderT;
            ignore : false;
            columns : undefined;
        }>
    )
);
