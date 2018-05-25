import {SelectBuilder, __DUMMY_FROM_TABLE} from "./select-builder";
import {AnyAliasedTable} from "./aliased-table";
import {Join} from "./join";
import {ReplaceValue2} from "./obj-util";

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
    export type From<ToTableT extends AnyAliasedTable> = (
        SelectBuilder<ReplaceValue2<
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
        >>
    );
}