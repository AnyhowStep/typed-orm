import {ISelectBuilder, AnySelectBuilder, AnySelectBuilderData} from "../select-builder";
import {IColumn} from "../column";
import {TypeOf} from "../column-collection";
import {ColumnOfReferences, ToPartialColumnReferences} from "../column-references-operation";
import * as mysql from "typed-mysql";
import {Querify} from "../querify";
import {RawExpr, IExpr, SelectBuilderValueQuery} from "../expr";
import {JoinReferences} from "../join";

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

export type MutableKeys<
    JoinsT extends JoinReferences,
    TableNameT extends string
> = (
    TableNameT extends keyof JoinsT ?
        keyof JoinsT[TableNameT]["table"]["data"]["isMutable"] :
        never
);

export type AllAssignments<SelectDataT extends AnySelectBuilderData> = (
    {
        [table in Extract<keyof SelectDataT["columnReferences"], string>] : (
            Extract<
                keyof SelectDataT["columnReferences"][table],
                MutableKeys<
                    SelectDataT["joins"],
                    table
                >
            > extends never ?
                { [name : string] : never } :
                {
                    [column in Extract<
                        keyof SelectDataT["columnReferences"][table],
                        MutableKeys<
                            SelectDataT["joins"],
                            table
                        >
                    >] : any
                }
        )
    }
);
export type Assignments<SelectDataT extends AnySelectBuilderData> = (
    {
        [table in Extract<keyof SelectDataT["columnReferences"], string>]? : (
            Extract<
                keyof SelectDataT["columnReferences"][table],
                MutableKeys<
                    SelectDataT["joins"],
                    table
                >
            > extends never ?
                { [name : string] : never } :
                {
                    [column in Extract<
                        keyof SelectDataT["columnReferences"][table],
                        MutableKeys<
                            SelectDataT["joins"],
                            table
                        >
                    >]? : (
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
        )
    }
);

//TODO Take Mutability into account
export type AssignmentsCallback<DataT extends AnyUpdateBuilderData> = (
    DataT["selectBuilder"] extends ISelectBuilder<infer SelectDataT> ?
        (c : SelectDataT["columnReferences"], s : DataT["selectBuilder"]) => Assignments<SelectDataT> :
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

    set<
        AssignmentsCallbackT extends AssignmentsCallback<DataT>
    > (
        assignmentsCallback : AssignmentsCallbackT
    ) : (
        AllAssignments<DataT["selectBuilder"]["data"]> extends ReturnType<AssignmentsCallbackT> ?
            IUpdateBuilder<{
                selectBuilder : DataT["selectBuilder"];
                ignoreErrors : DataT["ignoreErrors"];
                assignments : ReturnType<AssignmentsCallbackT>;
            }> :
            ("Invalid assignments; some tables/columns cannot be updated"|void|never)
    );

    execute () : (
        DataT["assignments"] extends undefined ?
            ("Call set() first"|void|never) :
            Promise<mysql.MysqlUpdateResult>

    );
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
