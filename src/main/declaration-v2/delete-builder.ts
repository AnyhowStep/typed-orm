import * as mysql from "typed-mysql";
import {Querify} from "./querify";
import {SelectBuilder, AnySelectBuilder} from "./select-builder";
import {JoinCollection, JoinCollectionUtil} from "./join-collection";
import {StringBuilder} from "./StringBuilder";
import {PooledDatabase} from "./PooledDatabase";
import {AnyJoin} from "./join";
import {Tuple} from "./tuple";

export type DeleteResult = (
    mysql.MysqlDeleteResult &
    {
        deletedRowCount : number,
    }
)

export type DeleteTables<SelectBuilderT extends AnySelectBuilder> = (
    Tuple<JoinCollectionUtil.Tables<SelectBuilderT["data"]["joins"]>>
);

export type DeleteTablesDelegate<SelectBuilderT extends AnySelectBuilder> = (
    (tables : JoinCollectionUtil.ToTableCollection<SelectBuilderT["data"]["joins"]>) => (
        DeleteTables<SelectBuilderT>
    )
)


export class DeleteBuilder<
    SelectBuilderT extends SelectBuilder<{
        hasSelect : false,
        hasFrom : true,
        hasUnion : false,

        joins : any,

        selects : undefined,

        aggregateDelegate : any,

        //It makes no sense to delete a subquery
        hasParentJoins : false,
        parentJoins : any,
    }>,
    DeleteTablesT extends undefined|DeleteTables<SelectBuilderT>
> implements Querify {
    public constructor (
        readonly selectBuilder : SelectBuilderT,
        readonly deleteTables : DeleteTablesT,
        readonly willIgnoreErrors : boolean,
        readonly db : PooledDatabase
    ) {

    }

    //Ignores errors, you really should not call this
    ignoreErrors (ignoreErrors : boolean = true) : DeleteBuilder<SelectBuilderT, DeleteTablesT> {
        return new DeleteBuilder(
            this.selectBuilder,
            this.deleteTables,
            ignoreErrors,
            this.db
        );
    };

    tables (delegate? : DeleteTablesDelegate<SelectBuilderT>) : (
        DeleteBuilder<SelectBuilderT, DeleteTables<SelectBuilderT>>
    ) {
        const joins : JoinCollection = this.selectBuilder.data.joins;
        if (delegate == undefined) {
            return new DeleteBuilder(
                this.selectBuilder,
                joins.map((join : AnyJoin) => join.table) as any,
                this.willIgnoreErrors,
                this.db
            );
        } else {
            const tables = delegate(
                JoinCollectionUtil.toTableCollection(
                    joins
                ) as any
            );
            if (tables.length == 0) {
                throw new Error(`Cannot delete from zero tables`);
            }
            for (let table of tables) {
                if (joins.find(join => join.table == table) == undefined) {
                    throw new Error(`Unknown table ${table.alias}`);
                }
            }
            return new DeleteBuilder(
                this.selectBuilder,
                tables,
                this.willIgnoreErrors,
                this.db
            );
        }
    }

    execute (
        this : DeleteBuilder<
            SelectBuilderT,
            DeleteTables<SelectBuilderT>
        >
    ) : Promise<DeleteResult> {
        return this.db.rawDelete(
            this.getQuery(),
            {}
        ).then((result) => {
            return {
                ...result,
                deletedRowCount : result.affectedRows,
            };
        });
    }

    private getTableAliases () : string[] {
        if (this.deleteTables == undefined) {
            throw new Error(`Call tables() first`);
        }
        const deleteTables = this.deleteTables as DeleteTables<SelectBuilderT>;
        const tableNameDict = {} as any;
        for (let t of deleteTables) {
            tableNameDict[t.alias] = true;
        }
        const tableNames = Object.keys(tableNameDict);
        if (tableNames.length == 0) {
            throw new Error(`Cannot delete from zero tables`);
        }
        return tableNames;
    }
    querify (sb : StringBuilder) {
        sb.append("DELETE");
        if (this.willIgnoreErrors) {
            sb.append(" IGNORE");
        }
        sb.appendLine();
        sb.scope((sb) => {
            sb.map(this.getTableAliases(), (sb, tableAlias) => {
                sb.append(mysql.escapeId(tableAlias));
            }, ",\n")
        });
        sb.appendLine("FROM");
        this.selectBuilder.querifyJoins(sb);
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