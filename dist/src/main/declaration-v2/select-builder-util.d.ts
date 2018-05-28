import { SelectBuilderData, SelectBuilder, AnySelectBuilder, __DUMMY_FROM_TABLE } from "./select-builder";
import { AnyAliasedTable } from "./aliased-table";
import { Join } from "./join";
import { SelectCollectionUtil } from "./select-collection";
import { JoinCollectionUtil } from "./join-collection";
import * as invalid from "./invalid";
import { JoinFromDelegate } from "./join-from-delegate";
import { JoinToDelegate } from "./join-to-delegate";
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
    type CleanToFromData<ToTableT extends AnyAliasedTable> = ({
        readonly [key in keyof CleanData]: (key extends "hasFrom" ? true : key extends "joins" ? [Join<ToTableT, ToTableT["columns"], false>] : CleanData[key]);
    });
    type CleanToFrom<ToTableT extends AnyAliasedTable> = (SelectBuilder<CleanToFromData<ToTableT>>);
    type SelectAllData<DataT extends SelectBuilderData> = ({
        readonly [key in keyof DataT]: (key extends "selects" ? SelectCollectionUtil.FromJoinCollection<DataT["joins"]> : key extends "hasSelect" ? true : DataT[key]);
    });
    type CleanToSelectAll<ToTableT extends AnyAliasedTable> = (SelectBuilder<SelectAllData<CleanToFromData<ToTableT>>>);
    type From<SelectBuilderT extends AnySelectBuilder, ToTableT extends AnyAliasedTable> = (SelectBuilderT extends SelectBuilder<infer DataT> ? JoinCollectionUtil.FindWithTableAlias<DataT["parentJoins"], ToTableT["alias"]> extends never ? SelectBuilder<{
        readonly [key in keyof DataT]: (key extends "hasFrom" ? true : key extends "joins" ? [Join<ToTableT, ToTableT["columns"], false>] : DataT[key]);
    }> : invalid.E4<"Alias", ToTableT["alias"], "was already used as join in parent scope", JoinCollectionUtil.FindWithTableAlias<DataT["parentJoins"], ToTableT["alias"]>> : never);
    function from<SelectBuilderT extends AnySelectBuilder, ToTableT extends AnyAliasedTable>(s: SelectBuilderT, toTable: ToTableT): (From<SelectBuilderT, ToTableT>);
    type DoJoin<SelectBuilderT extends AnySelectBuilder, ToTableT extends AnyAliasedTable> = (SelectBuilderT extends SelectBuilder<infer DataT> ? (Error extends JoinCollectionUtil.InnerJoin<SelectBuilder<DataT>, ToTableT> ? JoinCollectionUtil.InnerJoin<SelectBuilder<DataT>, ToTableT> : SelectBuilder<{
        readonly [key in keyof DataT]: (key extends "joins" ? JoinCollectionUtil.InnerJoinUnsafe<DataT["joins"], ToTableT> : DataT[key]);
    }>) : never);
    function doJoin<SelectBuilderT extends AnySelectBuilder, ToTableT extends AnyAliasedTable, FromDelegateT extends JoinFromDelegate<SelectBuilderT["data"]["joins"]>>(s: SelectBuilderT, toTable: ToTableT, fromDelegate: FromDelegateT, toDelegate: JoinToDelegate<ToTableT, ReturnType<FromDelegateT>>): (DoJoin<SelectBuilderT, ToTableT>);
    type SelectAll<SelectBuilderT extends AnySelectBuilder> = (SelectBuilderT extends SelectBuilder<infer DataT> ? SelectBuilder<{
        readonly [key in keyof DataT]: (key extends "selects" ? SelectCollectionUtil.FromJoinCollection<DataT["joins"]> : key extends "hasSelect" ? true : DataT[key]);
    }> : never);
    function selectAll<SelectBuilderT extends AnySelectBuilder>(s: SelectBuilderT): (SelectAll<SelectBuilderT>);
}
