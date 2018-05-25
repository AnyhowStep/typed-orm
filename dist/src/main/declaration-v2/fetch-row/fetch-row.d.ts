import { JoinCollection, JoinCollectionUtil } from "../join-collection";
import { ColumnReferences } from "../column-references";
import { IsOneStringLiteral } from "../string-util";
export declare type __ExprFetchRow<SelectReferencesT extends ColumnReferences> = ("__expr" extends keyof SelectReferencesT ? {
    __expr: {
        [columnName in Extract<keyof SelectReferencesT["__expr"], string>]: (ReturnType<SelectReferencesT["__expr"][columnName]["assertDelegate"]>);
    };
} : {});
export declare type SingleTableAliasFetchRow<JoinsT extends JoinCollection, SelectReferencesT extends ColumnReferences> = (Extract<keyof SelectReferencesT, string> extends "__expr" ? (__ExprFetchRow<SelectReferencesT>[keyof __ExprFetchRow<SelectReferencesT>]) : {
    [columnName in keyof SelectReferencesT[Extract<keyof SelectReferencesT, string>]]: (ReturnType<JoinCollectionUtil.FindWithTableAlias<JoinsT, Extract<keyof SelectReferencesT, string>>["columns"][columnName]["assertDelegate"]>);
});
export declare type MultiTableAliasFetchRow<JoinsT extends JoinCollection, SelectReferencesT extends ColumnReferences> = ({
    [tableAlias in Exclude<Extract<keyof SelectReferencesT, string>, JoinCollectionUtil.NullableTableAlias<JoinsT> | "__expr">]: {
        [columnName in Extract<keyof SelectReferencesT[tableAlias], string>]: (ReturnType<JoinCollectionUtil.FindWithTableAlias<JoinsT, tableAlias>["columns"][columnName]["assertDelegate"]>);
    };
} & {
    [tableAlias in Exclude<Extract<Extract<keyof SelectReferencesT, string>, JoinCollectionUtil.NullableTableAlias<JoinsT>>, "__expr">]?: {
        [columnName in Extract<keyof SelectReferencesT[tableAlias], string>]: (ReturnType<JoinCollectionUtil.FindWithTableAlias<JoinsT, tableAlias>["columns"][columnName]["assertDelegate"]>);
    };
} & __ExprFetchRow<SelectReferencesT>);
export declare type FetchRow<JoinsT extends JoinCollection, SelectReferencesT extends ColumnReferences> = (IsOneStringLiteral<Extract<keyof SelectReferencesT, string>> extends true ? SingleTableAliasFetchRow<JoinsT, SelectReferencesT> : MultiTableAliasFetchRow<JoinsT, SelectReferencesT>);
export declare type AnyFetchRow = (SingleTableAliasFetchRow<any, any> | MultiTableAliasFetchRow<any, any>);
