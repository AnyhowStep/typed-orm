import { AnySelectBuilder } from "../select-builder";
import { SelectDelegate, SelectDelegateColumnReferences } from "./select-delegate";
import { TupleWiden } from "../tuple";
import { AnySelect } from "../select";
export declare namespace SelectDelegateUtil {
    function toColumnReferences<SelectBuilderT extends AnySelectBuilder>(selectBuilder: SelectBuilderT): (SelectDelegateColumnReferences<SelectBuilderT>);
    function execute<SelectBuilderT extends AnySelectBuilder, SelectDelegateT extends SelectDelegate<SelectBuilderT>>(selectBuilder: SelectBuilderT, selectDelegate: SelectDelegateT): (TupleWiden<ReturnType<SelectDelegateT>, AnySelect>);
}
