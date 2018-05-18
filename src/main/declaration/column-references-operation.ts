import {ColumnReferences} from "./column-references";
import {IColumn} from "./column";
import {ColumnType} from "./column-operation";
import {Tuple} from "./tuple";
import {AnyJoin, NullableJoinTableNames, ColumnOfJoinTuple} from "./join";
//import { Column } from "../definition";

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
export type IsUnionString<S extends string> = {
    [str in S] : Exclude<S, str>
}[S];

export type ColumnReferencesToSchemaWithJoins<
    ColumnReferencesT extends ColumnReferences,
    JoinTupleT extends Tuple<AnyJoin>
> = (
    IsUnionString<Extract<keyof ColumnReferencesT, string>> extends never ?
        //Only one table
        (
            Extract<keyof ColumnReferencesT, string> extends "__expr" ?
                //Expressions only
                (
                    {
                        __expr : {
                            [name in Extract<keyof ColumnReferencesT["__expr"], string>] : ColumnType<
                                ColumnReferencesT["__expr"][name]
                            >
                        }
                    }
                ) :
                //FROM clause
                (
                    {
                        //Get the columnReferences of JoinTupleT[table]
                        [name in Extract<keyof ColumnReferencesT[Extract<keyof ColumnReferencesT, string>], string>] : ColumnType<
                            ColumnOfJoinTuple<JoinTupleT, Extract<keyof ColumnReferencesT, string>, name>
                        >
                    }
                )
        ) :
        //Multiple tables
        (
            //Required tables
            {
                [table in Exclude<Extract<keyof ColumnReferencesT, string>, NullableJoinTableNames<JoinTupleT>|"__expr">] : {
                    //Get the columnReferences of JoinTupleT[table]
                    [name in Extract<keyof ColumnReferencesT[table], string>] : ColumnType<
                        ColumnOfJoinTuple<JoinTupleT, table, name>
                    >
                }
            } &
            //Optional tables
            {
                [table in Exclude<Extract<Extract<keyof ColumnReferencesT, string>, NullableJoinTableNames<JoinTupleT>>, "__expr">]? : {
                    //Get the columnReferences of JoinTupleT[table]
                    [name in Extract<keyof ColumnReferencesT[table], string>] : ColumnType<
                        ColumnOfJoinTuple<JoinTupleT, table, name>
                    >
                }
            } &
            //Special case
            (
                "__expr" extends keyof ColumnReferencesT ?
                    {
                        __expr : {
                            [name in Extract<keyof ColumnReferencesT["__expr"], string>] : ColumnType<
                                ColumnReferencesT["__expr"][name]
                            >
                        }
                    } :
                    {}
            )
        )
)
