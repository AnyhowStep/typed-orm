import { SelectBuilderData, SelectBuilder, AnySelectBuilder, __DUMMY_FROM_TABLE } from "./select-builder";
import { AnyAliasedTable } from "./aliased-table";
import { Join } from "./join";
import { ReplaceValue2 } from "./obj-util";
import { SelectCollectionUtil } from "./select-collection";
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
    type CleanToFromData<ToTableT extends AnyAliasedTable> = (ReplaceValue2<CleanData, "hasFrom", true, "joins", [Join<ToTableT, ToTableT["columns"], false>]>);
    type CleanToFrom<ToTableT extends AnyAliasedTable> = (SelectBuilder<CleanToFromData<ToTableT>>);
    type SelectAllData<DataT extends SelectBuilderData> = (ReplaceValue2<DataT, "selects", SelectCollectionUtil.FromJoinCollection<DataT["joins"]>, "hasSelect", true>);
    type CleanToSelectAll<ToTableT extends AnyAliasedTable> = (SelectBuilder<SelectAllData<CleanToFromData<ToTableT>>>);
    function selectAll<SelectBuilderT extends AnySelectBuilder>(s: SelectBuilderT): (SelectBuilderT extends SelectBuilder<infer DataT> ? SelectBuilder<{
        readonly [key in keyof DataT]: (key extends "selects" ? SelectCollectionUtil.FromJoinCollection<DataT["joins"]> : key extends "hasSelect" ? true : DataT[key]);
    }> : never);
}
