import * as mysql from "typed-mysql";
import {Querify} from "./querify";
import {AnyTable, TableUtil} from "./table";
import {AllowedExprConstant, SelectValueBuilder, RawExprUtil} from "./raw-expr";
import {Expr} from "./expr";
import {ColumnReferencesUtil} from "./column-references";
import {SelectBuilder, AnySelectBuilder} from "./select-builder";
import {Column} from "./column";
import {JoinCollectionUtil} from "./join-collection";
import {StringBuilder} from "./StringBuilder";
import {PooledDatabase} from "./PooledDatabase";
import {AnyJoin} from "./join";
import {Table} from "./table";

export type UpdateResult = (
    mysql.MysqlUpdateResult &
    {
        //-1 if we don't know how many found
        foundRowCount : number,
        updatedRowCount : number,
    }
);

export type RawUpdateAssignmentType<
    TableT extends AnyTable,
    ColumnNameT extends keyof TableT["columns"]
> = (
    Extract<
        ReturnType<TableT["columns"][ColumnNameT]["assertDelegate"]>,
        AllowedExprConstant
    >
);

export type RawUpdateAssignment<
    TableT extends AnyTable,
    SelectBuilderT extends AnySelectBuilder,
    ColumnNameT extends keyof TableT["columns"]
> = (
    RawUpdateAssignmentType<TableT, ColumnNameT> |
    Extract<
        ColumnReferencesUtil.Columns<
            JoinCollectionUtil.ToColumnReferences<SelectBuilderT["data"]["joins"]>
        >,
        Column<any, any, RawUpdateAssignmentType<TableT, ColumnNameT>>
    > |
    Expr<
        ColumnReferencesUtil.Partial<
            JoinCollectionUtil.ToColumnReferences<SelectBuilderT["data"]["joins"]>
        >,
        RawUpdateAssignmentType<TableT, ColumnNameT>
    > |
    SelectValueBuilder<RawUpdateAssignmentType<TableT, ColumnNameT>>
);

export type RawUpdateAssignmentCollection<
    TableT extends AnyTable,
    SelectBuilderT extends AnySelectBuilder
> = (
    {
        [columnName in TableUtil.MutableColumnNames<TableT>]? : (
            RawUpdateAssignment<TableT, SelectBuilderT, columnName>
        )
    }
);

export type RawUpdateAssignmentReferences<
    SelectBuilderT extends AnySelectBuilder
> = (
    {
        [tableAlias in JoinCollectionUtil.TableAliases<SelectBuilderT["data"]["joins"]>]? : (
            RawUpdateAssignmentCollection<
                JoinCollectionUtil.FindWithTableAlias<
                    SelectBuilderT["data"]["joins"],
                    tableAlias
                >["table"],
                SelectBuilderT
            >
        )
    }
);

export type SingleTableUpdateAssignmentReferencesDelegate<SelectBuilderT extends AnySelectBuilder> = (
    (
        c : ColumnReferencesUtil.ToConvenient<
            JoinCollectionUtil.ToColumnReferences<SelectBuilderT["data"]["joins"]>
        >,
        s : SelectBuilderT
    ) => (
        RawUpdateAssignmentReferences<SelectBuilderT>[
            keyof RawUpdateAssignmentReferences<SelectBuilderT>
        ]
    )
);
export type MultiTableUpdateAssignmentReferencesDelegate<SelectBuilderT extends AnySelectBuilder> = (
    (
        c : JoinCollectionUtil.ToColumnReferences<SelectBuilderT["data"]["joins"]>,
        s : SelectBuilderT
    ) => (
        RawUpdateAssignmentReferences<SelectBuilderT>
    )
);
export type UpdateAssignmentReferencesDelegate<SelectBuilderT extends AnySelectBuilder> = (
    SelectBuilderT["data"]["joins"]["length"] extends 1 ?
        SingleTableUpdateAssignmentReferencesDelegate<SelectBuilderT> :
        MultiTableUpdateAssignmentReferencesDelegate<SelectBuilderT>
)

export class UpdateBuilder<
    SelectBuilderT extends SelectBuilder<{
        hasSelect : false,
        hasFrom : true,
        hasUnion : false,

        joins : any,

        selects : undefined,

        aggregateDelegate : any,

        //It makes no sense to update a subquery
        hasParentJoins : false,
        parentJoins : any,
    }>,
    AssignmentRefT extends undefined|RawUpdateAssignmentReferences<SelectBuilderT>
> implements Querify {
    public constructor (
        readonly selectBuilder : SelectBuilderT,
        readonly assignmentReferences : AssignmentRefT,
        readonly willIgnoreErrors : boolean,
        readonly db : PooledDatabase
    ) {

    }

    //Ignores errors, you really should not call this
    ignoreErrors (ignoreErrors : boolean = true) : UpdateBuilder<SelectBuilderT, AssignmentRefT> {
        return new UpdateBuilder(
            this.selectBuilder,
            this.assignmentReferences,
            ignoreErrors,
            this.db
        );
    };

    set (delegate : UpdateAssignmentReferencesDelegate<SelectBuilderT>) : (
        UpdateBuilder<SelectBuilderT, RawUpdateAssignmentReferences<SelectBuilderT>>
    ) {
        if (this.selectBuilder.data.joins.length == 1) {
            const columnReferences = JoinCollectionUtil.toColumnReferences(
                this.selectBuilder.data.joins
            );
            const assignmentDelegate = delegate as SingleTableUpdateAssignmentReferencesDelegate<SelectBuilderT>;
            const assignmentCollection = assignmentDelegate(
                ColumnReferencesUtil.toConvenient(columnReferences) as any,
                this.selectBuilder
            );
            const assignmentReferences = {
                [this.selectBuilder.data.joins[0].table.alias] : assignmentCollection
            };
            TableUtil.validateUpdateAssignmentReferences(
                this.selectBuilder.data.joins,
                assignmentReferences
            );
            return new UpdateBuilder(
                this.selectBuilder,
                assignmentReferences as any,
                this.willIgnoreErrors,
                this.db
            ) as any;
        } else {
            const columnReferences = JoinCollectionUtil.toColumnReferences(
                this.selectBuilder.data.joins
            );
            const assignmentDelegate = delegate as MultiTableUpdateAssignmentReferencesDelegate<SelectBuilderT>;
            const assignmentReferences = assignmentDelegate(
                columnReferences as any,
                this.selectBuilder
            );
            TableUtil.validateUpdateAssignmentReferences(
                this.selectBuilder.data.joins,
                assignmentReferences
            );
            return new UpdateBuilder(
                this.selectBuilder,
                assignmentReferences as any,
                this.willIgnoreErrors,
                this.db
            ) as any;
        }
    }

    execute (
        this : UpdateBuilder<
            SelectBuilderT,
            RawUpdateAssignmentReferences<SelectBuilderT>
        >
    ) : Promise<UpdateResult> {
        if (this.getAssignmentArr().length == 0) {
            return Promise.resolve({
                fieldCount   : 0,
                affectedRows : -1, //-1 because we don't know
                insertId     : 0,
                serverStatus : 0,
                warningCount : 1,
                message      : "SET clause is empty; no updates occurred",
                protocol41   : false,
                changedRows  : 0,

                foundRowCount : -1, //-1 because we don't know
                updatedRowCount : 0,
            });
        }

        return this.db.rawUpdate(
            this.getQuery(),
            {}
        ).then((result) => {
            return {
                ...result,
                foundRowCount : result.affectedRows,
                updatedRowCount : result.changedRows,
            };
        });
    }

    private assignmentArr : {
        column : string,
        rawValue : RawUpdateAssignment<any, any, any>,
    }[]|undefined = undefined;
    private getAssignmentArr () {
        if (this.assignmentArr != undefined) {
            return this.assignmentArr;
        }

        const assignmentReferences : any = this.assignmentReferences;
        if (assignmentReferences == undefined) {
            return [];
        }
        const result : {
            column : string,
            rawValue : RawUpdateAssignment<any, any, any>,
        }[] = [];
        for (let tableAlias in assignmentReferences) {
            const assignmentCollection = assignmentReferences[tableAlias];
            if (assignmentCollection == undefined) {
                continue;
            }
            const join : AnyJoin = this.selectBuilder.data.joins
                .find((join : AnyJoin) => join.table.alias == tableAlias)
            if (join == undefined) {
                //Silently ignore table aliases that don't exist
                continue;
            }
            const table = join.table;
            if (!(table instanceof Table)) {
                throw new Error(`Cannot update ${table.alias}, it must be a Table instance`);
            }

            for (let columnName in assignmentReferences[tableAlias]) {
                const assignmentValue = assignmentCollection[columnName];
                if (!(table.columns[columnName] instanceof Column)) {
                    //Silently ignore extra columns
                    continue;
                }
                if (!table.data.isMutable.hasOwnProperty(columnName)) {
                    //Silently ignore extra columns
                    continue;
                }
                if (assignmentValue === undefined) {
                    //Ignore `undefined` columns, it just means don't update the column
                    continue;
                }

                result.push({
                    column : mysql.escapeId(tableAlias) + "." + mysql.escapeId(columnName),
                    rawValue : assignmentValue,
                });
            }
        }

        this.assignmentArr = result;
        return result;
    }
    querify (sb : StringBuilder) {
        sb.append("UPDATE");
        if (this.willIgnoreErrors) {
            sb.append(" IGNORE");
        }
        sb.appendLine();
        this.selectBuilder.querifyJoins(sb);
        sb.appendLine("SET");
        sb.scope((sb) => {
            sb.map(this.getAssignmentArr(), (sb, assignment) => {
                sb.append(assignment.column);
                sb.append(" = ");
                sb.append(RawExprUtil.querify(assignment.rawValue));
            }, ",\n");
        });
        this.selectBuilder.querifyWhere(sb);
    }
    getQuery () {
        const sb = new StringBuilder();
        this.querify(sb);
        return sb.toString();
    }
    printQuery () {
        console.log(this.getQuery());
        return this;
    }
}