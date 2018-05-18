import {ITable} from "../table";
import {IExpr, RawExprNoUsedRef} from "../expr";
import {TypeOf} from "../column-collection";
import {AnyColumn} from "../column";
import * as mysql from "typed-mysql";
import {Querify} from "../querify";

export type ValueInsertRow<TableT extends ITable<any, any, any, any>> = (
    TableT extends ITable<infer AliasT, infer NameT, infer RawColumnCollectionT, infer DataT> ?
        (
            {
                [name in Exclude<
                    keyof RawColumnCollectionT,
                    keyof DataT["hasServerDefaultValue"]
                >] : TypeOf<RawColumnCollectionT[name]>
            } &
            {
                [name in Extract<keyof DataT["hasServerDefaultValue"], string>]? : (
                    TypeOf<RawColumnCollectionT[name]>|undefined
                )
            }
        ) :
        (never)
);

export type RawInsertRow<TableT extends ITable<any, any, any, any>> = (
    TableT extends ITable<infer AliasT, infer NameT, infer RawColumnCollectionT, infer DataT> ?
        (
            {
                [name in Exclude<
                    keyof RawColumnCollectionT,
                    keyof DataT["hasServerDefaultValue"]
                >] : RawExprNoUsedRef<TypeOf<RawColumnCollectionT[name]>>
            } &
            {
                [name in Extract<keyof DataT["hasServerDefaultValue"], string>]? : (
                    RawExprNoUsedRef<TypeOf<RawColumnCollectionT[name]>>|undefined
                )
            }
        ) :
        (never)
);

export type InsertRow<TableT extends ITable<any, any, any, any>> = (
    TableT extends ITable<infer AliasT, infer NameT, infer RawColumnCollectionT, infer DataT> ?
        (
            {
                [name in Exclude<
                    keyof RawColumnCollectionT,
                    keyof DataT["hasServerDefaultValue"]
                >] : IExpr<{}, TypeOf<RawColumnCollectionT[name]>>
            } &
            {
                [name in Extract<keyof DataT["hasServerDefaultValue"], string>]? : (
                    IExpr<{}, TypeOf<RawColumnCollectionT[name]>>|undefined
                )
            }
        ) :
        (never)
);

export interface AnyInsertValueBuilderData {
    readonly table : ITable<any, any, any, any>;
    readonly ignore : boolean;
    readonly values : undefined|(RawInsertRow<any>[]);

    //TODO Not implementing until I understand it well enough
    /*onDuplicateKeyUpdate : undefined|{
        [name : string] : IExpr<any, any>
    };*/
}

export interface IInsertValueBuilder<DataT extends AnyInsertValueBuilderData> extends Querify {
    readonly data : DataT;

    ignore () : IInsertValueBuilder<{
        table : DataT["table"];
        ignore : true;
        values : DataT["values"];
    }>;
    ignore<IgnoreT extends boolean> (ignore : IgnoreT) : IInsertValueBuilder<{
        table : DataT["table"];
        ignore : IgnoreT;
        values : DataT["values"];
    }>;

    value (row : RawInsertRow<DataT["table"]>) : IInsertValueBuilder<{
        table : DataT["table"];
        ignore : DataT["ignore"];
        values : RawInsertRow<DataT["table"]>[];
    }>;
    values (rows : RawInsertRow<DataT["table"]>[]) : IInsertValueBuilder<{
        table : DataT["table"];
        ignore : DataT["ignore"];
        values : RawInsertRow<DataT["table"]>[];
    }>;

    execute (
        this : IInsertValueBuilder<{
            table : any,
            ignore : any,
            values : any[],
        }>
    ) : (
        DataT["table"] extends ITable<any, any, any, infer TableDataT> ?
            (
                mysql.MysqlInsertResult &
                (
                    TableDataT["autoIncrement"] extends AnyColumn ?
                        //The auto-incremented id
                        {
                            [name in TableDataT["autoIncrement"]["name"]] : (
                                DataT["ignore"] extends true ?
                                    number|undefined :
                                    number
                            )
                        } :
                        //No auto increment
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

export type CreateInsertValueBuilderDelegate = (
    <TableT extends ITable<any, any, any, any>> (
        table : TableT
    ) => (
        IInsertValueBuilder<{
            table : TableT;
            ignore : false;
            values : undefined;
        }>
    )
);
