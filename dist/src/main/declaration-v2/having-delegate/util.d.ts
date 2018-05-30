import { AnySelectBuilder } from "../select-builder";
import { HavingDelegate } from "./having-delegate";
import { JoinCollectionUtil } from "../join-collection";
import { SelectCollectionUtil } from "../select-collection";
import { ColumnReferencesUtil } from "../column-references";
import { Expr } from "../expr";
export declare namespace HavingDelegateUtil {
    function execute<SelectBuilderT extends AnySelectBuilder, HavingDelegateT extends HavingDelegate<SelectBuilderT>>(selectBuilder: SelectBuilderT, delegate: HavingDelegateT): (Expr<ColumnReferencesUtil.Partial<ColumnReferencesUtil.Merge<JoinCollectionUtil.ToColumnReferences<SelectBuilderT["data"]["joins"]>, SelectCollectionUtil.ToColumnReferences<SelectBuilderT["data"]["selects"]>>>, boolean>);
}
