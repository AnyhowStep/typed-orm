import * as mysql from "typed-mysql";
import { Querify } from "./querify";
import { SelectBuilder, AnySelectBuilder } from "./select-builder";
import { JoinCollectionUtil } from "./join-collection";
import { StringBuilder } from "./StringBuilder";
import { PooledDatabase } from "./PooledDatabase";
import { Tuple } from "./tuple";
export declare type DeleteResult = (mysql.MysqlDeleteResult & {
    deletedRowCount: number;
});
export declare type DeleteTables<SelectBuilderT extends AnySelectBuilder> = (Tuple<JoinCollectionUtil.Tables<SelectBuilderT["data"]["joins"]>>);
export declare type DeleteTablesDelegate<SelectBuilderT extends AnySelectBuilder> = ((tables: JoinCollectionUtil.ToTableCollection<SelectBuilderT["data"]["joins"]>) => (DeleteTables<SelectBuilderT>));
export declare class DeleteBuilder<SelectBuilderT extends SelectBuilder<{
    hasSelect: false;
    hasFrom: true;
    hasUnion: false;
    joins: any;
    selects: undefined;
    aggregateDelegate: any;
    hasParentJoins: false;
    parentJoins: any;
}>, DeleteTablesT extends undefined | DeleteTables<SelectBuilderT>> implements Querify {
    readonly selectBuilder: SelectBuilderT;
    readonly deleteTables: DeleteTablesT;
    readonly willIgnoreErrors: boolean;
    readonly db: PooledDatabase;
    constructor(selectBuilder: SelectBuilderT, deleteTables: DeleteTablesT, willIgnoreErrors: boolean, db: PooledDatabase);
    ignoreErrors(ignoreErrors?: boolean): DeleteBuilder<SelectBuilderT, DeleteTablesT>;
    tables(delegate?: DeleteTablesDelegate<SelectBuilderT>): (DeleteBuilder<SelectBuilderT, DeleteTables<SelectBuilderT>>);
    execute(this: DeleteBuilder<SelectBuilderT, DeleteTables<SelectBuilderT>>): Promise<DeleteResult>;
    private getTableAliases;
    querify(sb: StringBuilder): void;
    getQuery(): string;
    printQuery(): this;
}
//# sourceMappingURL=delete-builder.d.ts.map