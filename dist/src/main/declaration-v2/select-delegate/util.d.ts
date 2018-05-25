import { AnySelectBuilder } from "../select-builder";
import { SelectDelegate } from "./select-delegate";
import { TupleWiden } from "../tuple";
import { AnySelect } from "../select";
export declare namespace SelectDelegateUtil {
    function execute<SelectBuilderT extends AnySelectBuilder, SelectDelegateT extends SelectDelegate<SelectBuilderT>>(selectBuilder: SelectBuilderT, selectDelegate: SelectDelegateT): (TupleWiden<ReturnType<SelectDelegateT>, AnySelect>);
}
