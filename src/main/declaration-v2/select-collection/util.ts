import * as sd from "schema-decorator";
import {SelectCollection} from "./select-collection";
import {ColumnReferencesUtil} from "../column-references";
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
    export type Columns<SelectsT extends SelectCollection> = (
        {
            [index in TupleKeys<SelectsT>] : (
                SelectsT[index] extends AnySelect ?
                    SelectUtil.Columns<SelectsT[index]> :
                    never
            )
        }[TupleKeys<SelectsT>]
    );
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
    export type MapToTypes<
        SelectsT extends SelectCollection
    > = (
        {
            [index in TupleKeys<SelectsT>] : (
                SelectsT[index] extends AnySelect ?
                    SelectUtil.Types<SelectsT[index]> :
                    never
            )
        } &
        {
            "0" : SelectUtil.Types<SelectsT[0]>,
            length : TupleLength<SelectsT>
        } &
        any[]
    );
    export type HasCompatibleTypes<
        SelectsA extends SelectCollection,
        SelectsB extends SelectCollection
    > = (
        number extends SelectsA["length"] ?
        //We want a number-literal,
        //If SelectsA.length = number, then we can't be sure
        //of the length of the collection
        false :
        number extends SelectsB["length"] ?
        //We want a number-literal,
        //If SelectsB.length = number, then we can't be sure
        //of the length of the collection
        false :
        SelectsA["length"] extends SelectsB["length"] ?
            (
                {
                    [index in TupleKeys<SelectsA>] : (
                        SelectsA[index] extends AnySelect ?
                            (
                                index extends keyof SelectsB ?
                                    (
                                        SelectsB[index] extends AnySelect ?
                                            (
                                                SelectUtil.HasCompatibleTypes<
                                                    SelectsA[index],
                                                    SelectsB[index]
                                                >
                                            ) :
                                            false
                                    ) :
                                    //This shouldn't happen,
                                    //we already checked they have
                                    //the same length
                                    false
                            ) :
                            false
                    )
                }[TupleKeys<SelectsA>]
            ) :
            //Different lengths
            false
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
    /*
    str = [];
    for (let i=0; i<20; ++i) {
        str.push(`ToColumnReferencesImpl<SelectsT, "${i}">`);
    }
    str.join(` &\n                `);
    */
    export type ToColumnReferencesImpl<
        SelectsT extends SelectCollection,
        K extends string
    > = (
        K extends TupleKeys<SelectsT> ?
            SelectUtil.ToColumnReferences<SelectsT[K]> :
            {}
    )
    export type ToColumnReferences<
        SelectsT extends SelectCollection|undefined
    > = (
        SelectsT extends SelectCollection ?
            (
                ToColumnReferencesImpl<SelectsT, "0"> &
                ToColumnReferencesImpl<SelectsT, "1"> &
                ToColumnReferencesImpl<SelectsT, "2"> &
                ToColumnReferencesImpl<SelectsT, "3"> &
                ToColumnReferencesImpl<SelectsT, "4"> &
                ToColumnReferencesImpl<SelectsT, "5"> &
                ToColumnReferencesImpl<SelectsT, "6"> &
                ToColumnReferencesImpl<SelectsT, "7"> &
                ToColumnReferencesImpl<SelectsT, "8"> &
                ToColumnReferencesImpl<SelectsT, "9"> &
                ToColumnReferencesImpl<SelectsT, "10"> &
                ToColumnReferencesImpl<SelectsT, "11"> &
                ToColumnReferencesImpl<SelectsT, "12"> &
                ToColumnReferencesImpl<SelectsT, "13"> &
                ToColumnReferencesImpl<SelectsT, "14"> &
                ToColumnReferencesImpl<SelectsT, "15"> &
                ToColumnReferencesImpl<SelectsT, "16"> &
                ToColumnReferencesImpl<SelectsT, "17"> &
                ToColumnReferencesImpl<SelectsT, "18"> &
                ToColumnReferencesImpl<SelectsT, "19">
            ) :
            {}
    );
    export function toColumnReferences<
        SelectsT extends SelectCollection|undefined
    > (selects : SelectsT) : ToColumnReferences<SelectsT> {
        if (selects == undefined) {
            return {} as any;
        }
        let result = {} as any;
        for (let s of (selects as any)) {
            result = ColumnReferencesUtil.merge(
                result,
                SelectUtil.toColumnReferences(s)
            );
        }
        return result;
    }

    export type ReplaceSelectType<
        SelectsT extends SelectCollection|undefined,
        TableAliasT extends string,
        ColumnNameT extends string,
        NewTypeT
    > = (
        SelectsT extends SelectCollection ?
            (
                {
                    [index in TupleKeys<SelectsT>] : (
                        //SelectsT[index] extends AnySelect ?
                            SelectUtil.ReplaceType<
                                SelectsT[index],
                                TableAliasT,
                                ColumnNameT,
                                NewTypeT
                            > //:
                            //never
                    )
                } &
                {
                    "0" : SelectUtil.ReplaceType<
                        SelectsT[0],
                        TableAliasT,
                        ColumnNameT,
                        NewTypeT
                    >,
                    length : TupleLength<SelectsT>
                } &
                AnySelect[]
            ) :
            undefined
    );
    export function replaceSelectType<
        SelectsT extends SelectCollection|undefined,
        TableAliasT extends string,
        ColumnNameT extends string,
        NewTypeT
    > (
        selects : SelectsT,
        tableAlias : TableAliasT,
        columnName : ColumnNameT,
        newAssertDelegate : sd.AssertDelegate<NewTypeT>
    ) : (
        ReplaceSelectType<
            SelectsT,
            TableAliasT,
            ColumnNameT,
            NewTypeT
        >
    ) {
        if (selects == undefined) {
            return undefined as any;
        } else {
            return selects.map((select) => {
                return SelectUtil.replaceType(
                    select,
                    tableAlias,
                    columnName,
                    newAssertDelegate
                );
            }) as any;
        }
    };
}

