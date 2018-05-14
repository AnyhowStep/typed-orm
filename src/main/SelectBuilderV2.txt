import * as sd from "schema-decorator";
import {Tuple, TupleKeys, TupleLength, TuplePush} from "./Tuple";
import {spread} from "@anyhowstep/type-util";
import * as d from "./declaration";
import * as def from "./definition";

export interface RawPaginationArgs {
    page? : number|null|undefined;
    itemsPerPage? : number|null|undefined;
}
export interface PaginateInfo {
    itemsFound : number,
    pagesFound : number,
    page : number,
    itemsPerPage : number,
}
export interface PaginateResult<T> {
    info : PaginateInfo,
    rows : T[],
}



export interface AnySelectBuilderData {
    //Used by WHERE clause
    columnReferences : d.ColumnReferences,
    //Modified by JOIN clauses
    joinReferences : JoinReferences,

    //Modified by WHERE clause
    typeNarrowedColumns : d.ColumnReferences,

    //Set by SELECT clause
    selectReferences : d.ColumnReferences,

    //Set by SELECT clause
    selectTuple : undefined|Tuple<SelectTupleElement</*this["columnReferences"]*/any>>,

    //Set by DISTINCT
    distinct : boolean,

    //Set by GROUP BY clause
    groupByReferences : d.ColumnReferences,

    //Set by ORDER BY clause
    orderBy : undefined|Tuple<
        OrderByTupleElement</*this["columnReferences"] & this["selectReferences"]*/any>
    >,

    //Set by LIMIT and OFFSET clause
    limit : undefined|{
        rowCount : number,
        offset : number,
    },

    //Widening is done after SELECT, before UNION, to allow other data types
    //Doesn't perform any SQL queries, just relaxes the type constraints
    typeWidenedColumns : d.ColumnReferences,

    //Modified by UNION clause
    union : undefined|Tuple<SelectBuilder<any>>,

    //Set by ORDER BY clause
    unionOrderBy : undefined|Tuple<
        OrderByTupleElement</*this["columnReferences"] & this["selectReferences"]*/any>
    >,

    //Set by LIMIT and OFFSET clause
    unionLimit : undefined|{
        rowCount : number,
        offset : number,
    },

    allowed : {
        join : boolean,
        where : boolean,
        select : boolean,
        distinct : boolean,
        groupBy : boolean,
        having : boolean,
        orderBy : boolean,
        limit : boolean,
        offset : boolean,
        widen : boolean,

        union : {
            union : boolean,
            orderBy : boolean,
            limit : boolean,
            offset : boolean,
        },
    }
}





export declare class SelectBuilder<T extends AnySelectBuilderData> {
    data : T;
    fetchAll (
        this : SelectBuilder<{
            columnReferences : any,
            joinReferences : any,
            typeNarrowedColumns : any,
            typeWidenedColumns : any,
            selectReferences : any,
            selectTuple : any,
            distinct : any,
            groupByReferences : any,
            orderBy : any,
            limit : any,
            union : any,
            unionOrderBy : any,
            unionLimit : any,

            allowed : {
                join : false,
                where : false,
                select : false,
                distinct : any,
                groupBy : any,
                having : any,
                orderBy : any,
                limit : any,
                offset : any,
                widen : any,
                union : any,
            }
        }>
    ) : Promise<T["selectReferences"][]>;
    fetchOne (
        this : SelectBuilder<{
            columnReferences : any,
            joinReferences : any,
            typeNarrowedColumns : any,
            typeWidenedColumns : any,
            selectReferences : any,
            selectTuple : any,
            distinct : any,
            groupByReferences : any,
            orderBy : any,
            limit : any,
            union : any,
            unionOrderBy : any,
            unionLimit : any,

            allowed : {
                join : false,
                where : false,
                select : false,
                distinct : any,
                groupBy : any,
                having : any,
                orderBy : any,
                limit : any,
                offset : any,
                widen : any,
                union : any,
            }
        }>
    ) : Promise<T["selectReferences"]>;
    fetchZeroOrOne (
        this : SelectBuilder<{
            columnReferences : any,
            joinReferences : any,
            typeNarrowedColumns : any,
            typeWidenedColumns : any,
            selectReferences : any,
            selectTuple : any,
            distinct : any,
            groupByReferences : any,
            orderBy : any,
            limit : any,
            union : any,
            unionOrderBy : any,
            unionLimit : any,

            allowed : {
                join : false,
                where : false,
                select : false,
                distinct : any,
                groupBy : any,
                having : any,
                orderBy : any,
                limit : any,
                offset : any,
                widen : any,
                union : any,
            }
        }>
    ) : Promise<T["selectReferences"]|undefined>;
    fetchValue (
        this : AnySelectBuilderValueQuery
    ) : (
        T["selectTuple"] extends (
            Tuple<JoinableSelectTupleElement<any>> &
            { length : 1 }
        ) ?
            Promise<SelectTupleElementType<T["selectTuple"][0]>> :
            never
    );
    fetchValueOrUndefined (
        this : AnySelectBuilderValueQuery
    ) : (
        T["selectTuple"] extends (
            Tuple<JoinableSelectTupleElement<any>> &
            { length : 1 }
        ) ?
            Promise<SelectTupleElementType<T["selectTuple"][0]>|undefined> :
            never
    );
    fetchValueArray (
        this : AnySelectBuilderValueQuery
    ) : (
        T["selectTuple"] extends (
            Tuple<JoinableSelectTupleElement<any>> &
            { length : 1 }
        ) ?
            Promise<SelectTupleElementType<T["selectTuple"][0]>[]> :
            never
    );
    //May not always work if GROUP BY, HAVING clauses use a select-expression,
    //May not work as intended with UNION selects
    count () : Promise<number>;

    //Uses count() internally, same restrictions apply
    paginate (paginationArgs? : RawPaginationArgs) : Promise<PaginateResult<T["selectReferences"]>>;

}

export declare function from<
    TableT extends AnyAliasedTable
> (
    table : TableT
) : (
    SelectBuilder<{
        columnReferences : TableReference<TableT>,
        joinReferences : [JoinReference<TableReference<TableT>, false>],
        typeNarrowedColumns : {},
        selectReferences : {},
        selectTuple : undefined,
        distinct : false,
        groupByReferences : {},
        orderBy : undefined,
        limit : undefined,
        typeWidenedColumns : {},
        union : undefined,
        unionOrderBy : undefined,
        unionLimit : undefined,

        allowed : {
            join : true,
            where : true,
            select : true,
            //Only allow the below clauses after the SELECT clause
            distinct : false,
            groupBy : false,
            having : false,
            orderBy : false,
            limit : false,
            //OFFSET only allowed after LIMIT
            offset : false,
            widen : false,

            union : {
                union : false,
                orderBy : false,
                limit : false,
                offset : false,
            }
        }
    }>
);

let preF = from(app)
    .join(appKey, [app.columns.appId, app.columns.appId, app.columns.appId, app.columns.appId, app.columns.appId], [appKey.columns.appId, appKey.columns.appId, appKey.columns.appId, appKey.columns.appId, appKey.columns.appId])
    .leftJoin(ssoClient, [app.columns.ssoClientId], [ssoClient.columns.ssoClientId])

let f = preF

    .rightJoin(user, [app.columns.appId], [user.columns.appId]);

f.data.columnReferences.app.appId
f.data.joinReferences[0].columnReferences.app.appId
f.data.joinReferences[0].nullable
f.data.columnReferences.appKey.appId
f.data.joinReferences[1].columnReferences.appKey.appId
f.data.joinReferences[1].nullable
f.data.columnReferences.ssoClient.ssoClientId
f.data.joinReferences[2].columnReferences.ssoClient.ssoClientId
f.data.joinReferences[2].nullable
f.data.columnReferences.user.appId
f.data.joinReferences[3].columnReferences.user.appId
f.data.joinReferences[3].nullable

/*
    Expressions can be,

    + Constants (e.g. 1, 2, true, false, null, "hello, world!", new Date())
    + Columns
    + Other Expr<> instances
*/
type SelectBuilderValueQuery<TypeT> = SelectBuilder<{
    columnReferences : any,
    joinReferences : any,
    typeNarrowedColumns : any,
    selectReferences : any,
    selectTuple : Tuple<JoinableSelectTupleElement<any>> & {
        length : 1
    } & { "0": (SelectColumnExpr<
        any,
        TypeT,
        "__expr",
        any
    >)|
    Column<any, any, TypeT>},
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
        //Only allow the below clauses after the SELECT clause
        distinct : any,
        groupBy : any,
        having : any,
        orderBy : any,
        limit : any,
        //OFFSET only allowed after LIMIT
        offset : any,
        widen : any,

        union : any,
    }
}>;
type AnySelectBuilderValueQuery = SelectBuilder<{
    columnReferences : any,
    joinReferences : any,
    typeNarrowedColumns : any,
    selectReferences : any,
    selectTuple : Tuple<JoinableSelectTupleElement<any>> & {
        length : 1
    },
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
        //Only allow the below clauses after the SELECT clause
        distinct : any,
        groupBy : any,
        having : any,
        orderBy : any,
        limit : any,
        //OFFSET only allowed after LIMIT
        offset : any,
        widen : any,

        union : any,
    }
}>;



const w = f
    .whereIsNotNull(c => c.app.appId)
    .whereIsEqual(3, c => c.app.appId)
    //.whereIsNull(c => c.app.columns.appId)
    .where((c) => {
        return e.eq(1,c.app.appId);
        //return e.eq(1, c.app.columns.appId);
        //const x : typeof test2;
        //return test2;
        //return e.true();
    })
w.data.columnReferences
/*
WHERE clause can modify type of columnReferences,
Examples

    column IS NULL : T -> null
    column IS NOT NULL : T|null -> T
    column = 5 : number -> 5
    //TODO Figure out how to handle '1' = 1, 1 = '1' because it evaluates to true on MySQL
    //TODO Maybe avoid allowing such comparisons on the client side?
    //FOR NOW, non-goal
*/

//declare function tuple<TupleT extends Tuple<any>>(t : TupleT) : TupleT;

declare const dup : [typeof app.columns.appId, typeof app.columns.appId];
declare const dup2 : [typeof app.columns.appId, typeof app.columns.ssoApiKey, typeof app.columns.appId];
declare const dup3 : [typeof app.columns.appId|typeof app.columns.ssoApiKey, typeof app.columns.appId|typeof app.columns.webhookKey];
declare const dup4 : [typeof app.columns.appId|typeof app.columns.ssoApiKey, typeof app.columns.appId];
declare const noDup : [typeof app.columns.appId];

declare const mustFindDup : HasDuplicateColumn<typeof dup>;
declare const mustFindDup2 : HasDuplicateColumn<typeof dup2>;
declare const mustFindDup3 : HasDuplicateColumn<typeof dup3>;
declare const mustFindDup4 : HasDuplicateColumn<typeof dup4>;
declare const mustNotFindDup : HasDuplicateColumn<typeof noDup>;
