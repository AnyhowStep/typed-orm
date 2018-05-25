import { AnySelectBuilder } from "../select-builder";
import { OrderByDelegate } from "./order-by-delegate";
import { TupleWiden } from "../tuple";
import { AnyOrderBy } from "../order-by";
export declare namespace OrderByDelegateUtil {
    function execute<SelectBuilderT extends AnySelectBuilder, OrderByDelegateT extends OrderByDelegate<SelectBuilderT>>(selectBuilder: SelectBuilderT, orderByDelegate: OrderByDelegateT): (TupleWiden<ReturnType<OrderByDelegateT>, AnyOrderBy> | undefined);
}
