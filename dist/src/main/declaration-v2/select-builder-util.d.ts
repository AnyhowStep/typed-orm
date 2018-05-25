import { SelectBuilderData, SelectBuilder, __DUMMY_FROM_TABLE } from "./select-builder";
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
    type FromData<ToTableT extends AnyAliasedTable> = (ReplaceValue2<CleanData, "hasFrom", true, "joins", [Join<ToTableT, ToTableT["columns"], false>]>);
    type From<ToTableT extends AnyAliasedTable> = (SelectBuilder<FromData<ToTableT>>);
    type SelectAllData<DataT extends SelectBuilderData> = (ReplaceValue2<DataT, "selects", SelectCollectionUtil.FromJoinCollection<DataT["joins"]>, "hasSelect", true>);
    type SelectAll<ToTableT extends AnyAliasedTable> = (SelectBuilder<SelectAllData<FromData<ToTableT>>>);
}
