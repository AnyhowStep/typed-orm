import {ToUnknownIfAllFieldsNever} from "../../../type";
import {Query} from "../../query";
import {BeforeUnionClause} from "../predicate";
import {ColumnRefUtil} from "../../../column-ref";
import {ColumnMap} from "../../../column-map";
import {NonEmptyTuple, TupleUtil} from "../../../tuple";
import {SelectItem} from "../../../select-item";
import {IExprSelectItem} from "../../../expr-select-item";
import {IColumn, ColumnUtil} from "../../../column";
import {ColumnIdentifierUtil} from "../../../column-identifier";

export type SelectDelegate<
    QueryT extends BeforeUnionClause
> = (
    //TODO Proper return type
    //If Column, must be columns in args given
    //If expression, must have proper usedRef
    //If columnMap, must be columnMaps in args given
    (
        columns : ColumnRefUtil.ToConvenient<
            ColumnRefUtil.FromQuery<QueryT>
        >
    ) => NonEmptyTuple<SelectItem>
);

//Must be called before UNION because it will change the number of
//columns expected.
//Can be called before FROM clause; e.g. SELECT NOW()
export type Select<
    QueryT extends BeforeUnionClause,
    SelectDelegateT extends SelectDelegate<QueryT>
> = (
    Query<{
        readonly joins : QueryT["joins"],
        readonly parentJoins : QueryT["parentJoins"],
        readonly unions : QueryT["unions"],
        readonly selects : (
            QueryT["selects"] extends SelectItem[] ?
            TupleUtil.Concat<
                QueryT["selects"],
                ReturnType<SelectDelegateT>
            > :
            ReturnType<SelectDelegateT>
        ),
        readonly limit : QueryT["limit"],
        readonly unionLimit : QueryT["unionLimit"],
    }>
);
export function select<
    QueryT extends BeforeUnionClause,
    SelectDelegateT extends SelectDelegate<QueryT>
> (
    query : QueryT,
    delegate : (
        SelectDelegateT &
        //If SelectItem is IExprSelectItem,
        //the usedRef must be a subset of the queryRef
        ToUnknownIfAllFieldsNever<{
            [index in Extract<keyof ReturnType<SelectDelegateT>, string>] : (
                ReturnType<SelectDelegateT>[index] extends IExprSelectItem ?
                (
                    ColumnRefUtil.FromQuery<QueryT> extends ReturnType<SelectDelegateT>[index]["usedRef"] ?
                    never :
                    [
                        "Invalid IExprSelectItem",
                        Exclude<
                            ColumnRefUtil.ToUnion<
                                ReturnType<SelectDelegateT>[index]["usedRef"]
                            >,
                            ColumnRefUtil.ToUnion<
                                ColumnRefUtil.FromQuery<QueryT>
                            >
                        >
                    ]|void
                ) :
                never
            )
        }> &
        //Columns selected must exist
        ToUnknownIfAllFieldsNever<{
            [index in Extract<keyof ReturnType<SelectDelegateT>, string>] : (
                ReturnType<SelectDelegateT>[index] extends IColumn ?
                (
                    ReturnType<SelectDelegateT>[index] extends ColumnRefUtil.ToUnion<ColumnRefUtil.FromQuery<QueryT>> ?
                    never :
                    [
                        "Invalid IColumn",
                        ReturnType<SelectDelegateT>[index]
                    ]|void
                ) :
                never
            )
        }> &
        //Columns selected must exist
        ToUnknownIfAllFieldsNever<{
            [index in Extract<keyof ReturnType<SelectDelegateT>, string>] : (
                ReturnType<SelectDelegateT>[index] extends ColumnMap ?
                (
                    ColumnUtil.FromColumnMap<ReturnType<SelectDelegateT>[index]> extends ColumnRefUtil.ToUnion<ColumnRefUtil.FromQuery<QueryT>> ?
                    never :
                    [
                        "Invalid ColumnMap",
                        Exclude<
                            ColumnUtil.FromColumnMap<ReturnType<SelectDelegateT>[index]>,
                            ColumnRefUtil.ToUnion<ColumnRefUtil.FromQuery<QueryT>>
                        >
                    ]|void
                ) :
                never
            )
        }> &
        (
            QueryT["selects"] extends SelectItem[] ?
            (
                //Duplicates not allowed with existing selects
                ToUnknownIfAllFieldsNever<{
                    [index in Extract<keyof ReturnType<SelectDelegateT>, string>] : (
                        ReturnType<SelectDelegateT>[index] extends SelectItem ?
                        (
                            Extract<
                                ColumnIdentifierUtil.FromSelectItem<
                                    ReturnType<SelectDelegateT>[index]
                                >,
                                ColumnIdentifierUtil.FromSelectItem<
                                    QueryT["selects"][number]
                                >
                            > extends never ?
                            never :
                            [
                                "Duplicate columns in SELECT clause; consider aliasing",
                                Extract<
                                    ColumnIdentifierUtil.FromSelectItem<
                                        ReturnType<SelectDelegateT>[index]
                                    >,
                                    ColumnIdentifierUtil.FromSelectItem<
                                        QueryT["selects"][number]
                                    >
                                >
                            ]|void
                        ) :
                        never
                    )
                }> &
                //Duplicates not allowed with new selects
                ToUnknownIfAllFieldsNever<{
                    [index in Extract<keyof ReturnType<SelectDelegateT>, string>] : (
                        ReturnType<SelectDelegateT>[index] extends SelectItem ?
                        (
                            Extract<
                                ColumnIdentifierUtil.FromSelectItem<
                                    ReturnType<SelectDelegateT>[index]
                                >,
                                ColumnIdentifierUtil.FromSelectItemArrayIgnoreIndex<
                                    ReturnType<SelectDelegateT>,
                                    index
                                >
                            > extends never ?
                            never :
                            [
                                "Duplicate columns in SELECT clause",
                                Extract<
                                    ColumnIdentifierUtil.FromSelectItem<
                                        ReturnType<SelectDelegateT>[index]
                                    >,
                                    ColumnIdentifierUtil.FromSelectItemArrayIgnoreIndex<
                                        ReturnType<SelectDelegateT>,
                                        index
                                    >
                                >
                            ]|void
                        ) :
                        never
                    )
                }>
            ) :
            unknown
        )
    )
) : Select<QueryT, SelectDelegateT> {
    const queryRef = ColumnRefUtil.fromQuery(query);
    const selects = delegate(
        ColumnRefUtil.toConvenient(queryRef)
    );

    //TODO
    //+ If SelectItem is IExprSelectItem,
    //  the usedRef must be a subset of the queryRef.
    //+ Selected columns/columnMaps must exist.
    //+ Duplicates not allowed with existing selects
    //+ Duplicates not allowed with new selects


    const newSelects : (
        QueryT["selects"] extends SelectItem[] ?
        TupleUtil.Concat<
            QueryT["selects"],
            ReturnType<SelectDelegateT>
        > :
        ReturnType<SelectDelegateT>
    ) = (
        (query.selects == undefined) ?
            selects :
            [...query.selects, ...selects]
    ) as any;

    const {
        joins,
        parentJoins,
        unions,
        limit,
        unionLimit,
        extraData,
    } = query;

    return new Query(
        {
            joins,
            parentJoins,
            unions,
            selects : newSelects,
            limit,
            unionLimit,
        },
        extraData
    );
}