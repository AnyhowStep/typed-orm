import * as d from "../declaration";
import {
    isJoinableSelectTuple,
    joinableSelectTupleHasDuplicateColumnName,
    //joinableSelectTupleToRawColumnCollection,
    joinableSelectTupleToColumnCollection
} from "./select-as";
//import {toColumnCollection} from "./column-collection";
import {Database} from "typed-mysql";

type SelectBuilderToRawColumnReferences<SelectBuilderT extends d.AnySelectBuilder> = (
    SelectBuilderT extends d.ISelectBuilder<infer DataT> ?
        (
            DataT["selectTuple"] extends d.Tuple<d.JoinableSelectTupleElement<DataT["columnReferences"]>> ?
                (
                    true extends d.JoinableSelectTupleHasDuplicateColumnName<DataT["selectTuple"]> ?
                        never :
                        d.JoinableSelectTupleToRawColumnCollection<DataT["selectTuple"]>
                ) :
                never
        ) :
        never
);

export class SubSelectJoinTable<
    AliasT extends string,
    SelectBuilderT extends d.AnySelectBuilder
> implements d.AliasedTable<
    AliasT,
    AliasT,
    SelectBuilderToRawColumnReferences<SelectBuilderT>
> {
    readonly alias : AliasT;
    readonly name  : AliasT;
    readonly columns : d.ColumnCollection<AliasT, SelectBuilderToRawColumnReferences<SelectBuilderT>>;
    readonly selectBuilder : SelectBuilderT;

    public constructor (alias : AliasT, selectBuilder : SelectBuilderT) {
        const columnReferences = selectBuilder.data.columnReferences;
        const selectTuple = selectBuilder.data.selectTuple;
        if (!isJoinableSelectTuple(columnReferences, selectTuple)) {
            throw new Error(`Invalid select tuple`);
        }
        if (joinableSelectTupleHasDuplicateColumnName(selectTuple)) {
            throw new Error(`selectTuple has duplicate names`);
        }


        this.alias = alias;
        this.name  = alias;
        this.columns = joinableSelectTupleToColumnCollection(
            this.alias,
            selectTuple
        ) as any;
        /*this.columns = toColumnCollection(
            this.alias,
            joinableSelectTupleToRawColumnCollection(selectTuple) as any
        ) as any;*/
        this.selectBuilder = selectBuilder;
    }

    public querify (sb : d.IStringBuilder) {
        sb.appendLine("(");
        sb.scope((sb) => {
            this.selectBuilder.querify(sb);
        });
        sb.append(") AS ");
        sb.appendLine(Database.EscapeId(this.alias));
    }
}
