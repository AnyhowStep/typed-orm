import {ColumnReferences} from "./column-references";
import {IColumn} from "./column";
import {ColumnType} from "./column-operation";
import {Tuple} from "./tuple";
import {AnyJoin, NullableJoinTableNames, ColumnOfJoinTuple} from "./join";

export type Union<T> = (T[keyof T]);
export type ColumnOfReferencesInner<ColumnReferencesT extends ColumnReferences> = ({
    data: {
        [k in keyof ColumnReferencesT] : (
            Union<ColumnReferencesT[k]>
        )
    }
});
export type ColumnOfReferences<ColumnReferencesT extends ColumnReferences> = (
    {
        data : {
            [k in keyof ColumnOfReferencesInner<ColumnReferencesT>] : (
                Union<ColumnOfReferencesInner<ColumnReferencesT>[k]>
            )
        }
    }["data"]["data"]
);
export type ToNullableColumnReferences<ColumnReferencesT extends ColumnReferences> = (
    {
        [table in Extract<keyof ColumnReferencesT, string>] : {
            [column in Extract<keyof ColumnReferencesT[table], string>] : (
                ColumnReferencesT[table][column] extends IColumn<any, any, infer TypeT> ?
                    (
                        IColumn<table, column, TypeT|null>
                    ) :
                    (("Invalid ColumnT or could not infer TypeT of ColumnT"&table&column)&never&void)
            )
        }
    }
)

//TODO Rename to References
export type ReplaceColumnOfReference<
    ColumnReferencesT extends ColumnReferences,
    TableNameT extends string,
    NameT extends string,
    NewTypeT
> = (
    {
        [table in keyof ColumnReferencesT] : {
            [column in keyof ColumnReferencesT[table]] : (
                ColumnReferencesT[table][column] extends IColumn<TableNameT, NameT, any> ?
                    IColumn<TableNameT, NameT, NewTypeT> :
                    (ColumnReferencesT[table][column])
                /*table extends TableNameT ?
                    (
                        column extends NameT ?
                            (
                                IColumn<TableNameT, NameT, NewTypeT>
                            ) :
                            (ColumnReferencesT[table][column])
                    ) :
                    (ColumnReferencesT[table][column])*/
            )
        }
    }
);

export type ToPartialColumnReferences<ColumnReferencesT extends ColumnReferences> = {
    [table in keyof ColumnReferencesT]+? : {
        [column in keyof ColumnReferencesT[table]]+? : ColumnReferencesT[table][column]
    }
};

export type PartialToColumnReferences<PartialT extends ColumnReferences> = {
    [table in keyof PartialT] : {
        [column in keyof PartialT[table]] : Exclude<PartialT[table][column], undefined>
    }
}
/*
//TODO Remove?
export type ColumnReferencesToSchema<ColumnReferencesT extends ColumnReferences> = {
    [table in keyof ColumnReferencesT] : {
        [column in keyof ColumnReferencesT[table]] : ColumnType<ColumnReferencesT[table][column]>
    }
}*/
export type ColumnReferencesToSchemaWithJoins<
    ColumnReferencesT extends ColumnReferences,
    JoinTupleT extends Tuple<AnyJoin>
> = (
    //Required tables
    {
        [table in Exclude<Extract<keyof ColumnReferencesT, string>, NullableJoinTableNames<JoinTupleT>>] : {
            //Get the columnReferences of JoinTupleT[table]
            [name in Extract<keyof ColumnReferencesT[table], string>] : ColumnType<
                ColumnOfJoinTuple<JoinTupleT, table, name>
            >
        }
    } &
    //Optional tables
    {
        [table in Extract<Extract<keyof ColumnReferencesT, string>, NullableJoinTableNames<JoinTupleT>>]? : {
            //Get the columnReferences of JoinTupleT[table]
            [name in Extract<keyof ColumnReferencesT[table], string>] : ColumnType<
                ColumnOfJoinTuple<JoinTupleT, table, name>
            >
        }
    }
)
