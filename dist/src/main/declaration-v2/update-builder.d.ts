import * as mysql from "typed-mysql";
import { Querify } from "./querify";
import { AnyTable, TableUtil } from "./table";
import { AllowedExprConstant, SelectValueBuilder } from "./raw-expr";
import { Expr } from "./expr";
import { ColumnReferencesUtil } from "./column-references";
import { SelectBuilder, AnySelectBuilder } from "./select-builder";
import { Column } from "./column";
import { JoinCollectionUtil } from "./join-collection";
import { StringBuilder } from "./StringBuilder";
import { PooledDatabase } from "./PooledDatabase";
export declare type RawUpdateAssignmentType<TableT extends AnyTable, ColumnNameT extends keyof TableT["columns"]> = (Extract<ReturnType<TableT["columns"][ColumnNameT]["assertDelegate"]>, AllowedExprConstant>);
export declare type RawUpdateAssignment<TableT extends AnyTable, SelectBuilderT extends AnySelectBuilder, ColumnNameT extends keyof TableT["columns"]> = (RawUpdateAssignmentType<TableT, ColumnNameT> | Extract<ColumnReferencesUtil.Columns<JoinCollectionUtil.ToColumnReferences<SelectBuilderT["data"]["joins"]>>, Column<any, any, RawUpdateAssignmentType<TableT, ColumnNameT>>> | Expr<ColumnReferencesUtil.Partial<JoinCollectionUtil.ToColumnReferences<SelectBuilderT["data"]["joins"]>>, RawUpdateAssignmentType<TableT, ColumnNameT>> | SelectValueBuilder<RawUpdateAssignmentType<TableT, ColumnNameT>>);
export declare type RawUpdateAssignmentCollection<TableT extends AnyTable, SelectBuilderT extends AnySelectBuilder> = ({
    [columnName in TableUtil.MutableColumnNames<TableT>]?: (RawUpdateAssignment<TableT, SelectBuilderT, columnName>);
});
export declare type RawUpdateAssignmentReferences<SelectBuilderT extends AnySelectBuilder> = ({
    [tableAlias in JoinCollectionUtil.TableAliases<SelectBuilderT["data"]["joins"]>]?: (RawUpdateAssignmentCollection<JoinCollectionUtil.FindWithTableAlias<SelectBuilderT["data"]["joins"], tableAlias>["table"], SelectBuilderT>);
});
export declare type SingleTableUpdateAssignmentReferencesDelegate<SelectBuilderT extends AnySelectBuilder> = ((c: ColumnReferencesUtil.ToConvenient<JoinCollectionUtil.ToColumnReferences<SelectBuilderT["data"]["joins"]>>, s: SelectBuilderT) => (RawUpdateAssignmentReferences<SelectBuilderT>[keyof RawUpdateAssignmentReferences<SelectBuilderT>]));
export declare type MultiTableUpdateAssignmentReferencesDelegate<SelectBuilderT extends AnySelectBuilder> = ((c: JoinCollectionUtil.ToColumnReferences<SelectBuilderT["data"]["joins"]>, s: SelectBuilderT) => (RawUpdateAssignmentReferences<SelectBuilderT>));
export declare type UpdateAssignmentReferencesDelegate<SelectBuilderT extends AnySelectBuilder> = (SelectBuilderT["data"]["joins"]["length"] extends 1 ? SingleTableUpdateAssignmentReferencesDelegate<SelectBuilderT> : MultiTableUpdateAssignmentReferencesDelegate<SelectBuilderT>);
export declare class UpdateBuilder<SelectBuilderT extends SelectBuilder<{
    hasSelect: false;
    hasFrom: true;
    hasUnion: false;
    joins: any;
    selects: undefined;
    aggregateDelegate: any;
}>, AssignmentRefT extends undefined | RawUpdateAssignmentReferences<SelectBuilderT>> implements Querify {
    readonly selectBuilder: SelectBuilderT;
    readonly assignmentReferences: AssignmentRefT;
    readonly willIgnoreErrors: boolean;
    readonly db: PooledDatabase;
    constructor(selectBuilder: SelectBuilderT, assignmentReferences: AssignmentRefT, willIgnoreErrors: boolean, db: PooledDatabase);
    ignoreErrors(ignoreErrors?: boolean): UpdateBuilder<SelectBuilderT, AssignmentRefT>;
    set(delegate: UpdateAssignmentReferencesDelegate<SelectBuilderT>): (UpdateBuilder<SelectBuilderT, RawUpdateAssignmentReferences<SelectBuilderT>>);
    execute(this: UpdateBuilder<SelectBuilderT, RawUpdateAssignmentReferences<SelectBuilderT>>): Promise<mysql.MysqlUpdateResult>;
    private assignmentArr;
    private getAssignmentArr;
    querify(sb: StringBuilder): void;
    getQuery(): string;
    printQuery(): this;
}
