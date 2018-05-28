import {SelectBuilderData, SelectBuilder, AnySelectBuilder, __DUMMY_FROM_TABLE} from "./select-builder";
import {AnyAliasedTable} from "./aliased-table";
import {Join} from "./join";
import {ReplaceValue2} from "./obj-util";
import {SelectCollectionUtil} from "./select-collection";
import {spread} from "@anyhowstep/type-util";

export namespace SelectBuilderUtil {
    export type CleanData = {
        hasSelect : false,
        hasFrom : false,
        hasUnion : false,

        //This is just a dummy JOIN
        //It will be replaced when the FROM clause is added
        joins : [
            Join<
                typeof __DUMMY_FROM_TABLE,
                typeof __DUMMY_FROM_TABLE["columns"],
                true
            >
        ],
        selects : undefined,
        aggregateDelegate : undefined,

        hasParentJoins : false,
        //This is just a dummy JOIN
        //It will be replaced when we have a subquery
        parentJoins : [
            Join<
                typeof __DUMMY_FROM_TABLE,
                typeof __DUMMY_FROM_TABLE["columns"],
                true
            >
        ],
    };
    export type CleanToFromData<ToTableT extends AnyAliasedTable> = (
        ReplaceValue2<
            CleanData,
            "hasFrom",
            true,
            "joins",
            [
                Join<
                    ToTableT,
                    ToTableT["columns"],
                    false
                >
            ]
        >
    );
    export type CleanToFrom<ToTableT extends AnyAliasedTable> = (
        SelectBuilder<CleanToFromData<ToTableT>>
    );
    export type SelectAllData<DataT extends SelectBuilderData> = (
        ReplaceValue2<
            DataT,
            "selects",
            SelectCollectionUtil.FromJoinCollection<DataT["joins"]>,
            "hasSelect",
            true
        >
    );
    export type CleanToSelectAll<ToTableT extends AnyAliasedTable> = (
        SelectBuilder<
            SelectAllData<
                CleanToFromData<ToTableT>
            >
        >
    );

    export function selectAll<
        SelectBuilderT extends AnySelectBuilder
    > (s : SelectBuilderT) : (
        SelectBuilderT extends SelectBuilder<infer DataT> ?
            SelectBuilder<{
                readonly [key in keyof DataT] : (
                    key extends "selects" ?
                    SelectCollectionUtil.FromJoinCollection<DataT["joins"]> :
                    key extends "hasSelect" ?
                    true :
                    DataT[key]
                )
            }> :
            never
    ) {
        s.assertBeforeSelect();
        s.assertAfterFrom();
        s.assertBeforeUnion();
        return new SelectBuilder(spread(
            s.data,
            {
                hasSelect : true,
                selects : SelectCollectionUtil.fromJoinCollection(s.data.joins)
            }
        ), s.extraData) as any;
    }
}