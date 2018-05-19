import { ColumnReferences } from "./column-references";
import { IColumn, AnyColumn } from "./column";
import { ColumnType } from "./column-operation";
import { Tuple } from "./tuple";
import { AnyJoin, NullableJoinTableNames, ColumnOfJoinTuple } from "./join";
export declare type Union<T> = (T[keyof T]);
export declare type ColumnOfReferencesImpl<ColumnReferencesT extends ColumnReferences> = ({
    [table in Extract<keyof ColumnReferencesT, string>]: {
        [column in Extract<keyof ColumnReferencesT[table], string>]: ColumnReferencesT[table][column];
    }[Extract<keyof ColumnReferencesT[table], string>];
}[Extract<keyof ColumnReferencesT, string>]);
export declare type ColumnOfReferences<ColumnReferencesT extends ColumnReferences> = (ColumnOfReferencesImpl<ColumnReferencesT> extends AnyColumn ? (AnyColumn extends ColumnOfReferencesImpl<ColumnReferencesT> ? ColumnOfReferencesImpl<ColumnReferencesT> : never) : never);
export declare type ToNullableColumnReferences<ColumnReferencesT extends ColumnReferences> = ({
    [table in Extract<keyof ColumnReferencesT, string>]: {
        [column in Extract<keyof ColumnReferencesT[table], string>]: (ColumnReferencesT[table][column] extends IColumn<any, any, infer TypeT> ? (IColumn<table, column, TypeT | null>) : (("Invalid ColumnT or could not infer TypeT of ColumnT" & table & column) & never & void));
    };
});
export declare type ReplaceColumnOfReference<ColumnReferencesT extends ColumnReferences, TableNameT extends string, NameT extends string, NewTypeT> = ({
    [table in keyof ColumnReferencesT]: {
        [column in keyof ColumnReferencesT[table]]: (ColumnReferencesT[table][column] extends IColumn<TableNameT, NameT, any> ? IColumn<TableNameT, NameT, NewTypeT> : (ColumnReferencesT[table][column]));
    };
});
export declare type ToPartialColumnReferences<ColumnReferencesT extends ColumnReferences> = {
    [table in keyof ColumnReferencesT]+?: {
        [column in keyof ColumnReferencesT[table]]+?: ColumnReferencesT[table][column];
    };
};
export declare type PartialToColumnReferences<PartialT extends ColumnReferences> = {
    [table in keyof PartialT]: {
        [column in keyof PartialT[table]]: Exclude<PartialT[table][column], undefined>;
    };
};
export declare type IsUnionString<S extends string> = {
    [str in S]: Exclude<S, str>;
}[S];
export declare type ColumnReferencesToSchemaWithJoins<ColumnReferencesT extends ColumnReferences, JoinTupleT extends Tuple<AnyJoin>> = (IsUnionString<Extract<keyof ColumnReferencesT, string>> extends never ? (Extract<keyof ColumnReferencesT, string> extends "__expr" ? ({
    __expr: {
        [name in Extract<keyof ColumnReferencesT["__expr"], string>]: ColumnType<ColumnReferencesT["__expr"][name]>;
    };
}) : ({
    [name in Extract<keyof ColumnReferencesT[Extract<keyof ColumnReferencesT, string>], string>]: ColumnType<ColumnOfJoinTuple<JoinTupleT, Extract<keyof ColumnReferencesT, string>, name>>;
})) : ({
    [table in Exclude<Extract<keyof ColumnReferencesT, string>, NullableJoinTableNames<JoinTupleT> | "__expr">]: {
        [name in Extract<keyof ColumnReferencesT[table], string>]: ColumnType<ColumnOfJoinTuple<JoinTupleT, table, name>>;
    };
} & {
    [table in Exclude<Extract<Extract<keyof ColumnReferencesT, string>, NullableJoinTableNames<JoinTupleT>>, "__expr">]?: {
        [name in Extract<keyof ColumnReferencesT[table], string>]: ColumnType<ColumnOfJoinTuple<JoinTupleT, table, name>>;
    };
} & ("__expr" extends keyof ColumnReferencesT ? {
    __expr: {
        [name in Extract<keyof ColumnReferencesT["__expr"], string>]: ColumnType<ColumnReferencesT["__expr"][name]>;
    };
} : {})));
