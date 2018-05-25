import * as sd from "schema-decorator";
import {SelectCollection} from "./select-collection";
import {ColumnReferencesUtil} from "../column-references";
import {AnySelectBuilder} from "../select-builder";
import {SelectDelegate, SelectDelegateUtil} from "../select-delegate";
import {JoinCollection} from "../join-collection";
import {AnySelect, SelectUtil} from "../select";
import {Column, AnyColumn, ColumnTupleUtil} from "../column";
import {TupleKeys, TupleLength, TupleWConcat, tupleWConcat} from "../tuple";
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
    export function assertHasCompatibleTypes (
        actual : SelectCollection,
        expected : SelectCollection
    ) {
        if (actual.length != expected.length) {
            throw new Error(`Expected ${expected.length} selects; received ${actual.length}`);
        }
        for (let i=0; i<actual.length; ++i) {
            SelectUtil.assertHasCompatibleTypes(
                actual[i],
                expected[i]
            );
        }
    }
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

    export const concat = tupleWConcat<AnySelect>();

    export type AppendSelectUnsafe<
        SelectsT extends SelectCollection|undefined,
        SelectBuilderT extends AnySelectBuilder,
        SelectDelegateT extends SelectDelegate<SelectBuilderT>
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
        SelectDelegateT extends SelectDelegate<SelectBuilderT>
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
        SelectDelegateT extends SelectDelegate<SelectBuilderT>
    >(
        selects : SelectsT,
        selectBuilder : SelectBuilderT,
        selectDelegate : SelectDelegateT
    ) : (
        AppendSelect<
            SelectsT,
            SelectBuilderT,
            SelectDelegateT
        >
    ) {
        if (selects == undefined) {
            const result = SelectDelegateUtil.execute(
                selectBuilder,
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

    export type MapToColumnsWithNameOnly<SelectsT extends SelectCollection> = (
        {
            [index in TupleKeys<SelectsT>] : (
                SelectsT[index] extends AnySelect ?
                    SelectUtil.ToColumnWithNameOnly<SelectsT[index]> :
                    never
            )
        } &
        {
            "0" : SelectUtil.ToColumnWithNameOnly<SelectsT[0]>,
            length : TupleLength<SelectsT>
        } &
        AnyColumn[]
    );
    export function toColumnNames (selects : SelectCollection) : string[] {
        const result : string[] = [];
        for (let select of selects) {
            result.push(...SelectUtil.toColumnNames(select));
        }
        return result;
    }
    export type HasDuplicateColumnNames<SelectsT extends SelectCollection> = (
        ColumnTupleUtil.HasDuplicate<MapToColumnsWithNameOnly<SelectsT>>
    )
    export function assertNoDuplicateColumnNames (selects : SelectCollection) {
        const names = toColumnNames(selects);
        for (let i=0; i<names.length; ++i) {
            for (let n=i+1; n<names.length; ++n) {
                if (names[i] == names[n]) {
                    throw new Error(`Found duplicate column name ${names[i]} in SELECT`);
                }
            }
        }
    }

    export type ToColumnCollectionImpl<TableAliasT extends string, SelectsT extends SelectCollection, K extends string> = (
        K extends keyof SelectsT ?
            (
                SelectsT[K] extends AnySelect ?
                    SelectUtil.ToColumnCollection<TableAliasT, SelectsT[K]> :
                    {}
            ) :
            {}
    )
    /*
    function gen (max) {
	const base = [];
	for (let i=0; i<=max; ++i) {
            base.push(`ToColumnCollectionImpl<TableAliasT, SelectsT, "${i}">`);
        }
        return base.join(" &\n    ");
    }

    gen(50)
    */
    export type ToColumnCollection<TableAliasT extends string, SelectsT extends SelectCollection> = (
        ToColumnCollectionImpl<TableAliasT, SelectsT, "0"> &
        ToColumnCollectionImpl<TableAliasT, SelectsT, "1"> &
        ToColumnCollectionImpl<TableAliasT, SelectsT, "2"> &
        ToColumnCollectionImpl<TableAliasT, SelectsT, "3"> &
        ToColumnCollectionImpl<TableAliasT, SelectsT, "4"> &
        ToColumnCollectionImpl<TableAliasT, SelectsT, "5"> &
        ToColumnCollectionImpl<TableAliasT, SelectsT, "6"> &
        ToColumnCollectionImpl<TableAliasT, SelectsT, "7"> &
        ToColumnCollectionImpl<TableAliasT, SelectsT, "8"> &
        ToColumnCollectionImpl<TableAliasT, SelectsT, "9"> &
        ToColumnCollectionImpl<TableAliasT, SelectsT, "10"> &
        ToColumnCollectionImpl<TableAliasT, SelectsT, "11"> &
        ToColumnCollectionImpl<TableAliasT, SelectsT, "12"> &
        ToColumnCollectionImpl<TableAliasT, SelectsT, "13"> &
        ToColumnCollectionImpl<TableAliasT, SelectsT, "14"> &
        ToColumnCollectionImpl<TableAliasT, SelectsT, "15"> &
        ToColumnCollectionImpl<TableAliasT, SelectsT, "16"> &
        ToColumnCollectionImpl<TableAliasT, SelectsT, "17"> &
        ToColumnCollectionImpl<TableAliasT, SelectsT, "18"> &
        ToColumnCollectionImpl<TableAliasT, SelectsT, "19"> &
        ToColumnCollectionImpl<TableAliasT, SelectsT, "20"> /*&
        ToColumnCollectionImpl<TableAliasT, SelectsT, "21"> &
        ToColumnCollectionImpl<TableAliasT, SelectsT, "22"> &
        ToColumnCollectionImpl<TableAliasT, SelectsT, "23"> &
        ToColumnCollectionImpl<TableAliasT, SelectsT, "24"> &
        ToColumnCollectionImpl<TableAliasT, SelectsT, "25"> &
        ToColumnCollectionImpl<TableAliasT, SelectsT, "26"> &
        ToColumnCollectionImpl<TableAliasT, SelectsT, "27"> &
        ToColumnCollectionImpl<TableAliasT, SelectsT, "28"> &
        ToColumnCollectionImpl<TableAliasT, SelectsT, "29"> &
        ToColumnCollectionImpl<TableAliasT, SelectsT, "30"> &
        ToColumnCollectionImpl<TableAliasT, SelectsT, "31"> &
        ToColumnCollectionImpl<TableAliasT, SelectsT, "32"> &
        ToColumnCollectionImpl<TableAliasT, SelectsT, "33"> &
        ToColumnCollectionImpl<TableAliasT, SelectsT, "34"> &
        ToColumnCollectionImpl<TableAliasT, SelectsT, "35"> &
        ToColumnCollectionImpl<TableAliasT, SelectsT, "36"> &
        ToColumnCollectionImpl<TableAliasT, SelectsT, "37"> &
        ToColumnCollectionImpl<TableAliasT, SelectsT, "38"> &
        ToColumnCollectionImpl<TableAliasT, SelectsT, "39"> &
        ToColumnCollectionImpl<TableAliasT, SelectsT, "40"> &
        ToColumnCollectionImpl<TableAliasT, SelectsT, "41"> &
        ToColumnCollectionImpl<TableAliasT, SelectsT, "42"> &
        ToColumnCollectionImpl<TableAliasT, SelectsT, "43"> &
        ToColumnCollectionImpl<TableAliasT, SelectsT, "44"> &
        ToColumnCollectionImpl<TableAliasT, SelectsT, "45"> &
        ToColumnCollectionImpl<TableAliasT, SelectsT, "46"> &
        ToColumnCollectionImpl<TableAliasT, SelectsT, "47"> &
        ToColumnCollectionImpl<TableAliasT, SelectsT, "48"> &
        ToColumnCollectionImpl<TableAliasT, SelectsT, "49"> &
        ToColumnCollectionImpl<TableAliasT, SelectsT, "50">*/
    );
    export function toColumnCollection<
        TableAliasT extends string,
        SelectsT extends SelectCollection
    > (
        tableAlias : TableAliasT,
        selects : SelectsT
    ) : ToColumnCollection<TableAliasT, SelectsT> {
        return selects.reduce<any>((memo, element) => {
            if (element instanceof AliasedExpr) {
                memo[element.alias] = new Column(
                    tableAlias,
                    element.alias,
                    element.assertDelegate,
                    element.tableAlias
                );
            } else if (element instanceof Column) {
                memo[element.name] = new Column(
                    tableAlias,
                    element.name,
                    element.assertDelegate,
                    element.tableAlias,
                    element.isSelectReference
                );
            } else if (element instanceof Object) {
                Object.keys(element).reduce<any>((memo, columnName) => {
                    const column = element[columnName];
                    memo[column.name] = new Column(
                        tableAlias,
                        column.name,
                        column.assertDelegate,
                        column.tableAlias,
                        column.isSelectReference
                    );
                    return memo;
                }, memo);
            } else {
                throw new Error(`Unknown SELECT, (${typeof element})${element}`);
            }

            return memo;
        }, {} as any);
    }

}

