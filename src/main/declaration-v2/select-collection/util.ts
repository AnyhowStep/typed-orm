import {SelectCollection} from "./select-collection";
//import {ColumnReferences} from "../column-references";
import {AnySelectBuilder} from "../select-builder";
import {SelectDelegate, SelectDelegateUtil} from "../select-delegate";
import {JoinCollection} from "../join-collection";
import {AnySelect, SelectUtil} from "../select";
import {Column, AnyColumn, ColumnTupleUtil} from "../column";
import {TupleKeys, TupleLength, TupleWConcat, wConcat, TupleWiden} from "../tuple";
import {AliasedExpr} from "../aliased-expr";
//import {ColumnCollection} from "../column-collection";
import * as invalid from "../invalid";
import {AnyJoin} from "../join";

export namespace SelectCollectionUtil {
    export type MapToColumns<
        SelectsT extends SelectCollection
    > = (
        {
            [index in TupleKeys<SelectsT>] : (
                SelectsT[index] extends AnySelect ?
                    SelectUtil.Columns<SelectsT[index]> :
                    never
            )
        } &
        {
            "0" : SelectUtil.Columns<SelectsT[0]>,
            length : TupleLength<SelectsT>
        } &
        AnyColumn[]
    );
    export type HasDuplicate<
        SelectsT extends SelectCollection
    > = (
        ColumnTupleUtil.HasDuplicate<MapToColumns<SelectsT>>
    );

    export function assertNonDuplicateColumn (selects : SelectCollection) {
        const columns = selects.reduce<([string, string])[]>((memo, element) => {
            if (element instanceof AliasedExpr) {
                memo.push([element.tableAlias, element.alias]);
            } else if (element instanceof Column) {
                memo.push([element.tableAlias, element.name]);
            } else if (element instanceof Object) {
                for (let name in element) {
                    if (element.hasOwnProperty(name)) {
                        const sub = element[name];
                        memo.push([sub.tableAlias, sub.name]);
                    }
                }
            } else {
                throw new Error(`Unknown select; (${typeof element})${element}`);
            }
            return memo;
        }, []);

        //TODO Not use nested for-loop?
        for (let i=0; i<columns.length; ++i) {
            for (let j=i+1; j<columns.length; ++j) {
                if (
                    columns[i][0] == columns[j][0] &&
                    columns[i][1] == columns[j][1]
                ) {
                    throw new Error(`Duplicate column ${columns[i][0]}.${columns[i][1]}; consider aliasing`);
                }
            }
        }
    };

    export const concat = wConcat<AnySelect>();

    export type AppendSelectUnsafe<
        SelectsT extends SelectCollection|undefined,
        SelectBuilderT extends AnySelectBuilder,
        JoinsT extends JoinCollection,
        SelectDelegateT extends SelectDelegate<SelectBuilderT, JoinsT>
    > = (
        SelectsT extends SelectCollection ?
            (
                TupleWConcat<
                    AnySelect,
                    SelectsT,
                    ReturnType<SelectDelegateT>
                >
            ) :
            (
                ReturnType<SelectDelegateT>
            )
    )

    export type AppendSelect<
        SelectsT extends SelectCollection|undefined,
        SelectBuilderT extends AnySelectBuilder,
        JoinsT extends JoinCollection,
        SelectDelegateT extends SelectDelegate<SelectBuilderT, JoinsT>
    > = (
        SelectsT extends SelectCollection ?
            (
                true extends HasDuplicate<TupleWConcat<
                    AnySelect,
                    SelectsT,
                    ReturnType<SelectDelegateT>
                >> ?
                    invalid.E2<
                        "Duplicate columns found in SELECT; consider aliasing",
                        ReturnType<SelectDelegateT>
                    > :
                    TupleWConcat<
                        AnySelect,
                        SelectsT,
                        ReturnType<SelectDelegateT>
                    >
            ) :
            (
                true extends HasDuplicate<ReturnType<SelectDelegateT>> ?
                    invalid.E2<
                        "Duplicate columns found in SELECT; consider aliasing",
                        ReturnType<SelectDelegateT>
                    > :
                    ReturnType<SelectDelegateT>
            )
    );
    export function appendSelect<
        SelectsT extends SelectCollection|undefined,
        SelectBuilderT extends AnySelectBuilder,
        JoinsT extends JoinCollection,
        SelectDelegateT extends SelectDelegate<SelectBuilderT, JoinsT>
    >(
        selects : SelectsT,
        selectBuilder : SelectBuilderT,
        joins : JoinsT,
        selectDelegate : SelectDelegateT
    ) : (
        AppendSelect<
            SelectsT,
            SelectBuilderT,
            JoinsT,
            SelectDelegateT
        >
    ) {
        if (selects == undefined) {
            const result = SelectDelegateUtil.execute(
                selectBuilder,
                joins,
                selectDelegate
            );
            assertNonDuplicateColumn(result);
            return result as any;
        } else {
            const result = concat(
                //This shouldn't be undefined anymore...
                //Yet another TS bug?
                selects as any,
                SelectDelegateUtil.execute(
                    selectBuilder,
                    joins,
                    selectDelegate
                )
            );
            assertNonDuplicateColumn(result);
            return result as any;
        }
    }

    export type FromJoinCollection<JoinsT extends JoinCollection> = (
        {
            [index in TupleKeys<JoinsT>] : (
                JoinsT[index] extends AnyJoin ?
                    SelectUtil.FromJoin<JoinsT[index]> :
                    never
            )
        } &
        {
            "0" : SelectUtil.FromJoin<JoinsT[0]>,
            length : TupleLength<JoinsT>
        } &
        AnySelect[]
    );
    export function fromJoinCollection<JoinsT extends JoinCollection> (joins : JoinsT) : (
        FromJoinCollection<JoinsT>
    ) {
        return joins.map(SelectUtil.fromJoin) as any;
    }
    /*const m : MapToColumns<TupleWiden<
        [
            {
                appId : Column<"app", "appId", number>,
                name : Column<"app", "name", string>
            },
            Column<"appKey", "appId", number>,
            Column<"app", "appId", number>
        ],
        AnySelect
    >>;
    const x : HasDuplicate<typeof m>*/
}

