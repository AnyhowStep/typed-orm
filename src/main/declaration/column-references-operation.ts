import {ColumnReferences} from "./column-references";
import {IColumn, AnyColumn} from "./column";
import {ColumnType} from "./column-operation";
//import {Tuple} from "./tuple";
import {NullableJoinTableNames, JoinReferences} from "./join";
//import { Column } from "../definition";

export type Union<T> = (T[keyof T]);
/*export type ColumnOfReferencesImpl<ColumnReferencesT extends ColumnReferences> = ({
    [table in Extract<keyof ColumnReferencesT, string>] : {
        [column in Extract<keyof ColumnReferencesT[table], string>] : ColumnReferencesT[table][column]
    }[Extract<keyof ColumnReferencesT[table], string>]
}[Extract<keyof ColumnReferencesT, string>]);*/
export type ColumnOfReferencesImpl<ColumnReferencesT extends ColumnReferences> = ({
    [table in keyof ColumnReferencesT] : {
        [column in keyof ColumnReferencesT[table]] : ColumnReferencesT[table][column]
    }[keyof ColumnReferencesT[table]]
}[keyof ColumnReferencesT]);
export type ColumnOfReferences<ColumnReferencesT extends ColumnReferences> = (
    //HACK-y
    ColumnOfReferencesImpl<ColumnReferencesT> extends AnyColumn ?
    (
        ColumnOfReferencesImpl<ColumnReferencesT>
        /*AnyColumn extends ColumnOfReferencesImpl<ColumnReferencesT> ?
            ColumnOfReferencesImpl<ColumnReferencesT> :
            never*/
    ) :
    never
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
    SelectReferencesT extends ColumnReferences,
    JoinsT extends JoinReferences
> = (
    IsUnionString<Extract<keyof SelectReferencesT, string>> extends never ?
        //Only one table
        (
            Extract<keyof SelectReferencesT, string> extends "__expr" ?
                //Expressions only
                (
                    {
                        __expr : {
                            [name in Extract<keyof SelectReferencesT["__expr"], string>] : ColumnType<
                                SelectReferencesT["__expr"][name]
                            >
                        }
                    }
                ) :
                //FROM clause
                (
                    {
                        //Get the columnReferences of JoinTupleT[table]
                        [name in Extract<
                            keyof SelectReferencesT[Extract<
                                keyof SelectReferencesT,
                                string
                            >],
                            string>
                        ] : ColumnType<
                            JoinsT[Extract<
                                keyof SelectReferencesT,
                                string
                            >]["columnReferences"][name]
                        >
                    }
                )
        ) :
        //Multiple tables
        (
            //Required tables
            {
                [table in Exclude<
                    Extract<keyof SelectReferencesT, string>,
                    NullableJoinTableNames<JoinsT>|"__expr"
                >] : {
                    //Get the columnReferences of JoinTupleT[table]
                    [name in Extract<
                        keyof SelectReferencesT[table],
                        string
                    >] : ColumnType<
                        JoinsT[Extract<
                            keyof SelectReferencesT,
                            string
                        >]["columnReferences"][name]
                    >
                }
            } &
            //Optional tables
            {
                [table in Exclude<
                    Extract<Extract<keyof SelectReferencesT, string>,
                    NullableJoinTableNames<JoinsT>>, "__expr"
                >]? : {
                    //Get the columnReferences of JoinTupleT[table]
                    [name in Extract<
                        keyof SelectReferencesT[table],
                        string
                    >] : ColumnType<
                        JoinsT[Extract<
                            keyof SelectReferencesT,
                            string
                        >]["columnReferences"][name]
                    >
                }
            } &
            //Special case
            (
                "__expr" extends keyof SelectReferencesT ?
                    {
                        __expr : {
                            [name in Extract<
                                keyof SelectReferencesT["__expr"],
                                string
                            >] : ColumnType<
                                SelectReferencesT["__expr"][name]
                            >
                        }
                    } :
                    {}
            )
        )
)
