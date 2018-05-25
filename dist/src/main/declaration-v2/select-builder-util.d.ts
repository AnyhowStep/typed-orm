import { SelectBuilder, __DUMMY_FROM_TABLE } from "./select-builder";
import { AnyAliasedTable } from "./aliased-table";
import { Join } from "./join";
import { ReplaceValue2 } from "./obj-util";
export declare namespace SelectBuilderUtil {
    type CleanData = {
        hasSelect: false;
        hasFrom: false;
        hasUnion: false;
        joins: [Join<typeof __DUMMY_FROM_TABLE, typeof __DUMMY_FROM_TABLE["columns"], true>];
        selects: undefined;
        aggregateDelegate: undefined;
        hasParentJoins: false;
        parentJoins: [Join<typeof __DUMMY_FROM_TABLE, typeof __DUMMY_FROM_TABLE["columns"], true>];
    };
    type From<ToTableT extends AnyAliasedTable> = (SelectBuilder<ReplaceValue2<CleanData, "hasFrom", true, "joins", [Join<ToTableT, ToTableT["columns"], false>]>>);
}
