import {ISelectBuilder, AnySelectBuilder} from "../select-builder";
import {IColumn} from "../column";
import {TypeOf} from "../column-collection";
import {ColumnOfReferences, ToPartialColumnReferences} from "../column-references-operation";
import * as mysql from "typed-mysql";
import {Querify} from "../querify";
import {RawExpr, IExpr, SelectBuilderValueQuery} from "../expr";

export interface AnyUpdateBuilderData {
    readonly selectBuilder : AnySelectBuilder;
    //Ignores errors, you really should not call this
    readonly ignoreErrors : boolean;
    readonly assignments : undefined|{
        [table : string] : {
            [name : string] : RawExpr<any>
        }
    };
}

export type AssignmentsCallback<DataT extends AnyUpdateBuilderData> = (
    DataT["selectBuilder"] extends ISelectBuilder<infer SelectDataT> ?
        (c : SelectDataT["columnReferences"], s : DataT["selectBuilder"]) => (
            {
                [table in keyof SelectDataT["columnReferences"]]? : {
                    [column in keyof SelectDataT["columnReferences"][table]]? : (
                        (
                            Extract<
                                ColumnOfReferences<SelectDataT["columnReferences"]>,
                                IColumn<any, any, TypeOf<SelectDataT["columnReferences"][table][column]>>
                            >
                        ) |
                        (
                            TypeOf<SelectDataT["columnReferences"][table][column]>
                        ) |
                        (
                            IExpr<
                                ToPartialColumnReferences<SelectDataT["columnReferences"]>,
                                TypeOf<SelectDataT["columnReferences"][table][column]>
                            >
                        ) |
                        (
                            SelectBuilderValueQuery<TypeOf<SelectDataT["columnReferences"][table][column]>>
                        )
                    )
                }
            }
        ) :
        (never)
)

export interface IUpdateBuilder<DataT extends AnyUpdateBuilderData> extends Querify {
    readonly data : DataT;

    ignoreErrors () : IUpdateBuilder<{
        selectBuilder : DataT["selectBuilder"];
        ignoreErrors : true;
        assignments : DataT["assignments"];
    }>;
    ignoreErrors<IgnoreT extends boolean> (ignore : IgnoreT) : IUpdateBuilder<{
        selectBuilder : DataT["selectBuilder"];
        ignoreErrors : IgnoreT;
        assignments : DataT["assignments"];
    }>;

    set<AssignmentsCallbackT extends AssignmentsCallback<DataT>> (
        assignmentsCallback : AssignmentsCallbackT
    ) : IUpdateBuilder<{
        selectBuilder : DataT["selectBuilder"];
        ignoreErrors : DataT["ignoreErrors"];
        assignments : ReturnType<AssignmentsCallbackT>;
    }>;

    execute (
        this : IUpdateBuilder<{
            selectBuilder : any,
            ignoreErrors : any,
            assignments : {
                [table : string] : {
                    [name : string] : RawExpr<any>
                }
            },
        }>
    ) : mysql.MysqlUpdateResult;
}

export type CreateUpdateBuilderDelegate = (
    <
        SelectBuilderT extends AnySelectBuilder
    > (
        selectBuilder : SelectBuilderT
    ) => (
        IUpdateBuilder<{
            selectBuilder : SelectBuilderT;
            ignoreErrors : false;
            assignments : undefined;
        }>
    )
);
