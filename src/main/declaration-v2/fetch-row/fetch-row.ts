//import {AnyJoin} from "../join";
import {JoinCollection, JoinCollectionUtil} from "../join-collection";
//import {SelectCollection} from "../select-collection";
import {ColumnReferences} from "../column-references";
import {IsOneStringLiteral} from "../string-util";
import {AnyColumn} from "../column";

//TODO Find a better name
export type __ExprFetchRow<SelectReferencesT extends ColumnReferences> = (
    "__expr" extends keyof SelectReferencesT ?
        {
            __expr : {
                [columnName in Extract<
                    keyof SelectReferencesT["__expr"],
                    string
                >] : (
                    ReturnType<
                        Extract<
                            SelectReferencesT["__expr"][columnName],
                            AnyColumn
                        >["assertDelegate"]
                    >
                )
            }
        } :
        {}
);

export type SingleTableAliasFetchRow<
    JoinsT extends JoinCollection,
    SelectReferencesT extends ColumnReferences
> = (
    Extract<keyof SelectReferencesT, string> extends "__expr" ?
        //All aliased expressions
        (__ExprFetchRow<SelectReferencesT>[keyof __ExprFetchRow<SelectReferencesT>]) :
        //FROM clause
        {
            [columnName in keyof SelectReferencesT[Extract<keyof SelectReferencesT, string>]] : (
                ReturnType<
                    Extract<
                        JoinCollectionUtil.FindWithTableAlias<
                            JoinsT,
                            Extract<keyof SelectReferencesT, string>
                        >["columns"][columnName],
                        AnyColumn
                    >["assertDelegate"]
                >
            )
        }
);

/*
Our select references maybe entirely nullable because of left/right joins.
However, with left/right joins, when the table's column values are present,
not all of them are nullable.
JoinsT has the "real" data type of the select references
*/
export type MultiTableAliasFetchRow<
    JoinsT extends JoinCollection,
    SelectReferencesT extends ColumnReferences
> = (
    //Required tables
    {
        [tableAlias in Exclude<
            Extract<keyof SelectReferencesT, string>,
            //We exclude __expr because JoinsT should never have it
            JoinCollectionUtil.NullableTableAlias<JoinsT>|"__expr"
        >] : {
            [columnName in Extract<
                keyof SelectReferencesT[tableAlias],
                string
            >] : (
                //Get the "real" data type
                ReturnType<
                    Extract<
                        JoinCollectionUtil.FindWithTableAlias<
                            JoinsT,
                            tableAlias
                        >["columns"][columnName],
                        AnyColumn
                    >["assertDelegate"]
                >
            )
        }
    } &
    //Optional tables
    {
        [tableAlias in Exclude<
            Extract<
                Extract<keyof SelectReferencesT, string>,
                JoinCollectionUtil.NullableTableAlias<JoinsT>
            >,
            //We exclude __expr because JoinsT should never have it
            "__expr"
        >]? : {
            [columnName in Extract<
                keyof SelectReferencesT[tableAlias],
                string
            >] : (
                //Get the "real" data type
                ReturnType<
                    Extract<
                        JoinCollectionUtil.FindWithTableAlias<
                            JoinsT,
                            tableAlias
                        >["columns"][columnName],
                        AnyColumn
                    >["assertDelegate"]
                >
            )
        }
    } &
    //Special case
    __ExprFetchRow<SelectReferencesT>
);

export type FetchRow<
    JoinsT extends JoinCollection,
    SelectReferencesT extends ColumnReferences
> = (
    IsOneStringLiteral<Extract<keyof SelectReferencesT, string>> extends true ?
        SingleTableAliasFetchRow<JoinsT, SelectReferencesT> :
        MultiTableAliasFetchRow<JoinsT, SelectReferencesT>
);
export type AnyFetchRow = (
    SingleTableAliasFetchRow<any, any> |
    MultiTableAliasFetchRow<any, any>
);