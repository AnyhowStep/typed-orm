import {SelectBuilder} from "./select-builder";
import {AliasedTable} from "./aliased-table";
import {SelectCollectionUtil} from "./select-collection";
import {StringBuilder} from "./StringBuilder";
import * as mysql from "typed-mysql";

export class SubqueryTable<
    AliasT extends string,
    DataT extends {
        hasSelect : true,
        hasFrom : any,
        hasUnion : any,

        joins : any,
        selects : any,
        aggregateDelegate : any,

        hasParentJoins : any,
        parentJoins : any,
    }
> extends AliasedTable<
    AliasT,
    AliasT,
    SelectCollectionUtil.ToColumnCollection<AliasT, DataT["selects"]>
> {
    public constructor (
        alias : AliasT,
        readonly selectBuilder : SelectBuilder<DataT>
    ) {
        super(
            alias,
            alias,
            SelectCollectionUtil.toColumnCollection(alias, selectBuilder.data.selects) as any
        );
        if (selectBuilder.data.selects == undefined) {
            throw new Error(`SELECT clause expected`);
        }
        SelectCollectionUtil.assertNoDuplicateColumnNames(selectBuilder.data.selects);
    }

    public querify (sb : StringBuilder) {
        sb.appendLine("(");
        sb.scope((sb) => {
            this.selectBuilder.querify(sb);
        });
        sb.append(") AS ");
        sb.appendLine(mysql.escapeId(this.alias));
    }
}