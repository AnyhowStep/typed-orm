import * as o from "../main";
import * as sd from "schema-decorator";

export const customBase = o.table(
    "customBase",
    {
        logId : sd.stringToNaturalNumber(),
        custom : sd.jsonObjectStr(),
        updatedAt : sd.nullable(sd.date())
    }
)
    .setAutoIncrement(c => c.logId)
    .setHasDefaultValue(c => [
        c.updatedAt
    ])
    .setImmutable()
    .build();

export function insertIfDifferent<
    TableT extends o.TableUtil.ToGeneric<typeof customBase>,
    InsertT extends o.InsertLiteralRow<TableT> & o.InsertLiteralRow<typeof customBase>
> (
    db : o.PooledDatabase,
    table : TableT,
    insertArgs : InsertT
) {
    table.data.isGenerated
    const x : o.InsertLiteralRow<typeof customBase> = null as any;
    x.custom = "test"
    x.updatedAt
    db.transactionIfNotInOne(async (db) => {
        const latest = "tetst";
        insertArgs.custom = "test";
        if (latest == insertArgs.custom) {

        }
    })
}