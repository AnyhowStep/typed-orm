import { AnySelectBuilder } from "../select-builder";
import { GroupByDelegate } from "./group-by-delegate";
import { TupleWiden } from "../tuple";
import { AnyGroupBy } from "../group-by";
export declare namespace GroupByDelegateUtil {
    function execute<SelectBuilderT extends AnySelectBuilder, GroupByDelegateT extends GroupByDelegate<SelectBuilderT>>(selectBuilder: SelectBuilderT, groupByDelegate: GroupByDelegateT): (TupleWiden<ReturnType<GroupByDelegateT>, AnyGroupBy>);
}
//# sourceMappingURL=util.d.ts.map