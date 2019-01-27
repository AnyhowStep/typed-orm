import {escapeId} from "sqlstring";
import {Table} from "../../table";

export type FromName<
    NameT extends string
> = (
    Table<{
        readonly usedColumns : never[];
        readonly alias : NameT;
        readonly columns : {};

        readonly autoIncrement : undefined;
        readonly id : undefined;
        readonly primaryKey : undefined;
        readonly candidateKeys : [];

        readonly generated : [];
        readonly isNullable : [];
        readonly hasExplicitDefaultValue : [];
        readonly mutable : [];

        readonly parents : [];
        readonly insertAllowed : true;
        readonly deleteAllowed : true;
    }>
);
export function fromName<
    NameT extends string
> (
    name : NameT
) : (
    FromName<NameT>
) {
    return new Table(
        {
            usedColumns : [],
            alias : name,
            columns : {},

            autoIncrement : undefined,
            id : undefined,
            primaryKey : undefined,
            candidateKeys : [] as [],

            generated : [] as [],
            isNullable : [] as [],
            hasExplicitDefaultValue : [] as [],
            mutable : [] as [],

            parents : [] as [],
            insertAllowed : true,
            deleteAllowed : true,
        },
        {
            unaliasedQuery : escapeId(name),
        }
    );
}