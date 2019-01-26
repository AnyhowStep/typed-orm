import {AnyTable, AnyTableAllowInsert, TableUtil} from "./table";
import {Querify} from "./querify";
import * as mysql from "typed-mysql";
import {Column, AnyColumn} from "./column";
import {StringBuilder} from "./StringBuilder";
import {RawExprUtil, AllowedExprConstant} from "./raw-expr";
import {PooledDatabase} from "./PooledDatabase";
import {AnySelectBuilder} from "./select-builder";
import {ColumnReferencesUtil} from "./column-references";
import {SelectCollectionUtil} from "./select-collection";

export type RawInsertSelectAssignmentType<
    TableT extends AnyTable,
    ColumnNameT extends keyof TableT["columns"]
> = (
    Extract<
        ReturnType<TableT["columns"][ColumnNameT]["assertDelegate"]>,
        AllowedExprConstant
    >
);
export type RawInsertSelectAssignment<
    TableT extends AnyTable,
    SelectBuilderT extends AnySelectBuilder,
    ColumnNameT extends keyof TableT["columns"]
> = (
    RawInsertSelectAssignmentType<TableT, ColumnNameT> |
    Extract<
        ColumnReferencesUtil.Columns<
            SelectCollectionUtil.ToColumnReferences<SelectBuilderT["data"]["selects"]>
        >,
        Column<any, any, RawInsertSelectAssignmentType<TableT, ColumnNameT>>
    >
);

export type RawInsertSelectAssignmentCollection<
    TableT extends AnyTable,
    SelectBuilderT extends AnySelectBuilder
> = (
    {
        [columnName in TableUtil.RequiredColumnNames<TableT>] : (
            RawInsertSelectAssignment<TableT, SelectBuilderT, columnName>
        )
    } &
    {
        [columnName in TableUtil.OptionalColumnNames<TableT>]? : (
            RawInsertSelectAssignment<TableT, SelectBuilderT, columnName>
        )
    }
);
export type InsertAssignmentCollectionDelegate<
    TableT extends AnyTable,
    SelectBuilderT extends AnySelectBuilder
> = (
    (s : ColumnReferencesUtil.ToConvenient<
        SelectCollectionUtil.ToColumnReferences<SelectBuilderT["data"]["selects"]>
    >) => (
        RawInsertSelectAssignmentCollection<TableT, SelectBuilderT>
    )
)

export class InsertSelectBuilder<
    TableT extends AnyTableAllowInsert,
    SelectBuilderT extends AnySelectBuilder,
    AssignmentsT extends undefined|(RawInsertSelectAssignmentCollection<TableT, SelectBuilderT>),
    InsertModeT extends "IGNORE"|"REPLACE"|"NORMAL"
> implements Querify {
    public constructor (
        readonly table : TableT,
        readonly selectBuilder : SelectBuilderT,
        readonly assignments : AssignmentsT,
        readonly insertMode : InsertModeT,
        readonly db : PooledDatabase
    ) {

    }

    public ignore () : InsertSelectBuilder<
        TableT,
        SelectBuilderT,
        AssignmentsT,
        "IGNORE"
    > {
        return new InsertSelectBuilder(
            this.table,
            this.selectBuilder,
            this.assignments,
            "IGNORE",
            this.db
        );
    }
    public replace () : InsertSelectBuilder<
        TableT,
        SelectBuilderT,
        AssignmentsT,
        "REPLACE"
    > {
        return new InsertSelectBuilder(
            this.table,
            this.selectBuilder,
            this.assignments,
            "REPLACE",
            this.db
        );
    }
    public set (delegate : InsertAssignmentCollectionDelegate<TableT, SelectBuilderT>) : (
        InsertSelectBuilder<
            TableT,
            SelectBuilderT,
            RawInsertSelectAssignmentCollection<TableT, SelectBuilderT>,
            InsertModeT
        >
    ) {
        const selectReferences = SelectCollectionUtil.toColumnReferences(
            this.selectBuilder.data.selects
        );
        const assignments = delegate(
            ColumnReferencesUtil.toConvenient(selectReferences) as any
        );
        TableUtil.validateInsertRow(this.table, assignments);
        for (let columnName in assignments) {
            const value = (assignments as any)[columnName];
            if (value instanceof Object && !(value instanceof Date)) {
                ColumnReferencesUtil.assertHasColumn(selectReferences, value);
            }
        }

        return new InsertSelectBuilder(
            this.table,
            this.selectBuilder,
            assignments,
            this.insertMode,
            this.db
        );
    }

    public execute (
        this : InsertSelectBuilder<
            TableT,
            SelectBuilderT,
            RawInsertSelectAssignmentCollection<TableT, SelectBuilderT>,
            InsertModeT
        >
    ) : (
        Promise<
            mysql.MysqlInsertResult &
            (
                TableT["data"]["autoIncrement"] extends AnyColumn ?
                    //The auto-incremented id
                    {
                        [name in TableT["data"]["autoIncrement"]["name"]] : (
                            //TODO Test and see if REPLACE returns `insertId`
                            "IGNORE" extends InsertModeT ?
                                number|undefined :
                                number
                        )
                    } :
                    //No auto increment
                    {}
            )
        >
    ) {
        if (this.table.data.noInsert) {
            throw new Error(`INSERT not allowed on ${this.table.name}`);
        }
        if (this.assignments == undefined) {
            throw new Error(`No VALUES to insert`);
        }
        return this.db.rawInsert(this.getQuery(), {})
            .then((result) => {
                if (this.table.data.autoIncrement == undefined) {
                    return result;
                } else {
                    if (result.insertId == 0) {
                        if (this.insertMode != "IGNORE") {
                            throw new Error(`Expected to INSERT a new row, received zero for insertId`);
                        }
                    }
                    return {
                        ...result,
                        [this.table.data.autoIncrement.name] : (result.insertId == 0) ?
                            undefined :
                            result.insertId,
                    };
                }
            }) as any;
    }

    querify (sb : StringBuilder) {
        if (this.assignments == undefined) {
            throw new Error(`Call set() first`);
        }
        const assignments = this.assignments;
        const columnNames = Object.keys(this.table.columns)
            .filter(name => this.table.columns.hasOwnProperty(name))
            .filter(name => !this.table.data.isGenerated.hasOwnProperty(name))
            .filter(name => (assignments as any)[name] !== undefined);

        if (this.insertMode == "REPLACE") {
            sb.appendLine("REPLACE INTO");
        } else if (this.insertMode == "IGNORE") {
            sb.appendLine("INSERT IGNORE INTO");
        } else {
            sb.appendLine("INSERT INTO");
        }

        sb.scope((sb) => {
            sb.append(mysql.escapeId(this.table.name))
            .appendLine(" (")
            .scope((sb) => {
                //column names
                sb.map(columnNames, (sb, name) => {
                    sb.append(mysql.escapeId(name));
                }, ",\n")
            })
            .append(")");
        });
        sb.appendLine("SELECT");
        sb.scope((sb) => {
            sb.map(columnNames, (sb, name) => {
                const raw = (assignments as any)[name];
                if (raw instanceof Column) {
                    raw.querify(sb);
                } else {
                    sb.append(RawExprUtil.querify(raw));
                }
            }, ",\n");
        });
        sb.appendLine("FROM (");
        sb.scope((sb) => {
            this.selectBuilder.querify(sb);
        })
        sb.append(") AS `tmp`");
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

export type InsertSelectBuilderConvenient<
    TableT extends AnyTable,
    SelectBuilderT extends AnySelectBuilder
> = (
    InsertSelectBuilder<
        TableT,
        SelectBuilderT,
        RawInsertSelectAssignmentCollection<TableT, SelectBuilderT>,
        "NORMAL"
    >
);
export type InsertSelectBuilderConvenientDelegate = (
    <
        TableT extends AnyTableAllowInsert,
        SelectBuilderT extends AnySelectBuilder
    > (
        table : TableT,
        selectBuilder : SelectBuilderT,
        delegate : InsertAssignmentCollectionDelegate<TableT, SelectBuilderT>
    ) => (
        InsertSelectBuilderConvenient<
            TableT,
            SelectBuilderT
        >
    )
);