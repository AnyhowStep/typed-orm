import {SelectCollection} from "./select-collection";
import {ColumnReferences} from "../column-references";
import {AnySelectBuilder} from "../select-builder";
import {SelectDelegate, SelectDelegateUtil} from "../select-delegate";
import {JoinCollection} from "../join-collection";
import {AnySelect, SelectUtil} from "../select";
import {Column, AnyColumn, ColumnTupleUtil} from "../column";
import {TupleKeys, TupleLength, TupleWConcat} from "../tuple";
import {AnyAliasedExpr} from "../aliased-expr";
import {ColumnCollection} from "../column-collection";
import * as invalid from "../invalid";

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

    export function select<
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
        SelectsT extends SelectCollection ?
            (
                HasDuplicate<TupleWConcat<
                    AnySelect,
                    SelectsT,
                    ReturnType<SelectDelegateT>
                >> extends true ?
                    invalid.E4<> :
                    TupleWConcat<
                        AnySelect,
                        SelectsT,
                        ReturnType<SelectDelegateT>
                    >
            ) :
            (
                HasDuplicate<ReturnType<SelectDelegateT>> extends true ?
                    invalid.E4<> :
                    ReturnType<SelectDelegateT>
            )
    ) {
        const newSelects = SelectDelegateUtil.execute(
            selectBuilder,
            joins,
            selectDelegate
        );
        return null as any
    }
}
