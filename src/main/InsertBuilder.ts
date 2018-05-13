import * as s from "./SelectBuilderV2";
/*

insertInto(table)
    .ignore()
    .values(() => {
        return {
            field0 : e.default(),
            field1 : 100
        }
    })
    .values(() => {
        return [
            {
                field0 : e.default(),
                field1 : 100
            },
            {
                field0 : 37,
                field1 : e.add(34, from(app).select(c => [c.app.appId]).limit(1))
            }
        ]
    })
    .onDuplicateKeyUpdate((t, s) => {
        return {
            field0 : e.values(t.field0),
        };
    })

insertInto(
    table,
    from(otherTable)
        .select(c => [c.otherTable.field2, c.otherTable.field3])
)
    .ignore()
    .columns((s) => {
        return {
            field0 : s.otherTable.field2,
            field1 : s.otherTable.field3,
        };
    })
    .onDuplicateKeyUpdate((t, s) => {
        return {
            field0 : e.values(t.field0),
        };
    })
*/
export interface AnyInsertBuilderData {
    table : s.Table<any, any, any>;
    selectBuilder : undefined|s.SelectBuilder<any>;

    ignore : boolean;

    values : undefined|({
        [name : string] : s.Expr<any, any>
    }[]);
    columns : undefined|{
        [name : string] : s.AnyColumn
    };

    onDuplicateKeyUpdate : undefined|{
        [name : string] : s.Expr<any, any>
    };
}

type RawInsertRow<TableT extends s.Table<any, any, any>> = (
    TableT extends s.Table<infer NameT, infer RawColumnCollectionT, infer DataT> ?
        (
            {
                [name in Exclude<
                    keyof RawColumnCollectionT,
                    keyof DataT["hasServerDefaultValue"]
                >] : s.RawExprNoUsedRef<s.TypeOf<RawColumnCollectionT[name]>>
            } &
            {
                [name in keyof DataT["hasServerDefaultValue"]]? : (
                    s.RawExprNoUsedRef<s.TypeOf<RawColumnCollectionT[name]>>|undefined
                )
            }
        ) :
        (never)
);
type InsertRow<TableT extends s.Table<any, any, any>> = (
    TableT extends s.Table<infer NameT, infer RawColumnCollectionT, infer DataT> ?
        (
            {
                [name in Exclude<
                    keyof RawColumnCollectionT,
                    keyof DataT["hasServerDefaultValue"]
                >] : s.Expr<{}, s.TypeOf<RawColumnCollectionT[name]>>
            } &
            {
                [name in keyof DataT["hasServerDefaultValue"]]? : (
                    s.Expr<{}, s.TypeOf<RawColumnCollectionT[name]>>|undefined
                )
            }
        ) :
        (never)
);
declare const ir : RawInsertRow<typeof s.app>;
export declare class InsertBuilder<DataT extends AnyInsertBuilderData> {
    data : DataT;

    ignore () : InsertBuilder<{
        table : DataT["table"];
        selectBuilder : DataT["selectBuilder"];

        ignore : true;

        values : DataT["values"];
        columns : DataT["columns"];

        onDuplicateKeyUpdate : DataT["onDuplicateKeyUpdate"];
    }>;
    ignore<IgnoreT extends boolean> (ignore : IgnoreT) : InsertBuilder<{
        table : DataT["table"];
        selectBuilder : DataT["selectBuilder"];

        ignore : IgnoreT;

        values : DataT["values"];
        columns : DataT["columns"];

        onDuplicateKeyUpdate : DataT["onDuplicateKeyUpdate"];
    }>;

    value (
        this : InsertBuilder<{
            table : any;
            selectBuilder : undefined;

            ignore : any;

            values : any[];
            columns : undefined;

            onDuplicateKeyUpdate : any;
        }>,
        row : RawInsertRow<DataT["table"]>
    ) : InsertBuilder<DataT>;
    values (
        this : InsertBuilder<{
            table : any;
            selectBuilder : undefined;

            ignore : any;

            values : any[];
            columns : undefined;

            onDuplicateKeyUpdate : any;
        }>,
        rows : RawInsertRow<DataT["table"]>[]
    ) : InsertBuilder<DataT>;

    columns (
        this : InsertBuilder<{
            table : any;
            selectBuilder : DataT["selectBuilder"] extends s.SelectBuilder<any> ?
                DataT["selectBuilder"] : never;
            ignore : any;

            values : any;
            columns : any;

            onDuplicateKeyUpdate : any;
        }>,
        columnsCallback : (
            DataT["table"] extends s.Table<any, infer RawColumnCollectionT, infer TableDataT> ?
                (
                    DataT["selectBuilder"] extends s.SelectBuilder<infer SelectDataT> ?
                        (s : SelectDataT["selectReferences"]) => (
                            {
                                [name in Exclude<
                                    keyof RawColumnCollectionT,
                                    keyof TableDataT["hasServerDefaultValue"]
                                >] : (
                                    s.ColumnReferenceElement<SelectDataT["selectReferences"]> &
                                    s.Column<any, any, s.TypeOf<RawColumnCollectionT[name]>>
                                )
                            } &
                            {
                                [name in keyof TableDataT["hasServerDefaultValue"]]? : (
                                    s.ColumnReferenceElement<SelectDataT["selectReferences"]> &
                                    s.Column<any, any, s.TypeOf<RawColumnCollectionT[name]>>|undefined
                                )
                            }
                        ) :
                        (never)
                ) :
                (never)
        )
    ) : InsertBuilder<DataT>;

    onDuplicateKeyUpdate<
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
    }>;
}

export declare function insertInto<TableT extends s.Table<any, any, any>> (table : TableT) : (
    InsertBuilder<{
        table : TableT;
        selectBuilder : undefined;

        ignore : boolean;

        values : InsertRow<TableT>[];
        columns : undefined;

        onDuplicateKeyUpdate : undefined|{
            [name : string] : s.Expr<any, any>
        };
    }>
);

export declare function insertInto<
    TableT extends s.Table<any, any, any>,
    SelectBuilderT extends s.SelectBuilder<{
        columnReferences : any,
        joinReferences : any,
        typeNarrowedColumns : any,
        selectReferences : any,
        selectTuple : any,
        distinct : any,
        groupByReferences : any,
        orderBy : any,
        limit : any,
        typeWidenedColumns : any,
        union : any,
        unionOrderBy : any,
        unionLimit : any,

        allowed : {
            join : false,
            where : false,
            select : false,
            distinct : any,
            //Only allow the below clauses after the SELECT clause
            groupBy : any,
            having : any,
            orderBy : any,
            limit : any,
            //OFFSET only allowed after LIMIT
            offset : any,
            widen : any,

            union : any
        }
    }>
> (
    table : TableT,
    selectBuilder : SelectBuilderT
) : (
    InsertBuilder<{
        table : TableT;
        selectBuilder : SelectBuilderT;

        ignore : boolean;

        values : undefined;
        columns : undefined;

        onDuplicateKeyUpdate : undefined|{
            [name : string] : s.Expr<any, any>
        };
    }>
);
const x = insertInto(s.app)
    .ignore()
    .value({
        appId : s.from(s.app).select(c => [c.app.appId]).limit(1),
        ssoClientId : 1,
        name : "test"
    })
    .onDuplicateKeyUpdate({
        ssoClientId : 32
    });
x.data.onDuplicateKeyUpdate

const y = insertInto(s.app, s.from(s.app).select(c => [c.app.name, c.app.ssoClientId])).ignore().columns(
    (c) => {
        return {
            ssoClientId : c.app.ssoClientId,
            //name : s.appKey.columns.key,
            name : c.app.name,
            ssoApiKey : s.app.columns.name,
        };
    }
).onDuplicateKeyUpdate({
    ssoClientId : 32
});
