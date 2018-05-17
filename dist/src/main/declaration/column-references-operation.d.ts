import { ColumnReferences } from "./column-references";
import { IColumn } from "./column";
import { ColumnType } from "./column-operation";
import { Tuple } from "./tuple";
import { AnyJoin, NullableJoinTableNames, ColumnOfJoinTuple } from "./join";
export declare type Union<T> = (T[keyof T]);
export declare type ColumnOfReferencesInner<ColumnReferencesT extends ColumnReferences> = ({
    data: {
        [k in keyof ColumnReferencesT]: (Union<ColumnReferencesT[k]>);
    };
});
export declare type ColumnOfReferences<ColumnReferencesT extends ColumnReferences> = ({
    data: {
        [k in keyof ColumnOfReferencesInner<ColumnReferencesT>]: (Union<ColumnOfReferencesInner<ColumnReferencesT>[k]>);
    };
}["data"]["data"]);
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
export declare type ColumnReferencesToSchemaWithJoins<ColumnReferencesT extends ColumnReferences, JoinTupleT extends Tuple<AnyJoin>> = ({
    [table in Exclude<Extract<keyof ColumnReferencesT, string>, NullableJoinTableNames<JoinTupleT>>]: {
        [name in Extract<keyof ColumnReferencesT[table], string>]: ColumnType<ColumnOfJoinTuple<JoinTupleT, table, name>>;
    };
} & {
    [table in Extract<Extract<keyof ColumnReferencesT, string>, NullableJoinTableNames<JoinTupleT>>]?: {
        [name in Extract<keyof ColumnReferencesT[table], string>]: ColumnType<ColumnOfJoinTuple<JoinTupleT, table, name>>;
    };
});
