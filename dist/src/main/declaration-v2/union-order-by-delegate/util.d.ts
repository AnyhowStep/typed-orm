import { AnySelectBuilder } from "../select-builder";
import { UnionOrderByDelegate } from "./union-order-by-delegate";
import { TupleWiden } from "../tuple";
import { AnyOrderBy } from "../order-by";
export declare namespace UnionOrderByDelegateUtil {
    function execute<SelectBuilderT extends AnySelectBuilder, UnionOrderByDelegateT extends UnionOrderByDelegate<SelectBuilderT>>(selectBuilder: SelectBuilderT, unionOrderByDelegate: UnionOrderByDelegateT): (TupleWiden<ReturnType<UnionOrderByDelegateT>, AnyOrderBy> | undefined);
}
