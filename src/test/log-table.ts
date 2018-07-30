import * as o from "../main";
import * as sd from "schema-decorator";
import {getDb} from "./db";
import * as tape from "tape";

const logBase = o.table(
    "logBase",
    {
        updatedAt : sd.date()
    }
).setHasDefaultValue(c => [
    c.updatedAt
])
.setImmutable()
.build();

export const jsonLog = o.table(logBase)
    .withName("jsonLog")
    .addColumns({
        data : sd.string(),
    })
    .setImmutable()
    .build();

export const userLog = o.table(logBase)
    .withName("userLog")
    .addColumns({
        logId : sd.naturalNumber(),
        userId : sd.naturalNumber(),
    })
    .setAutoIncrement(c => c.logId)
    .setImmutable()
    .build();

function fetchLatestQuery<
    TableT extends o.TableUtil.ToGeneric<
        typeof logBase
    >
> (db : o.PooledDatabase, logTable : TableT) {
    let result = db.from(logBase)
        .orderBy(c => [
            [c.updatedAt, false]
        ])
        .limit(1)
        .replaceTable(logBase, logTable);

    if (logTable.data.autoIncrement instanceof o.Column) {
        const autoIncrement = logTable.data.autoIncrement;
        return result.appendOrderBy(c => {
            return [
                [(c as any)[autoIncrement.name], false] as any
            ];
        });
    } else {
        return result;
    }
}
function fetchLatest<
    TableT extends o.TableUtil.ToGeneric<
        typeof logBase
    >
> (
    db : o.PooledDatabase,
    logTable : TableT,
    condition : o.ColumnCollectionUtil.Type<
        o.ColumnCollectionUtil.ExcludeColumnNames<
            TableT["columns"],
            o.ColumnCollectionUtil.ColumnNames<typeof logBase["columns"]>|
            (
                TableT["data"]["autoIncrement"] extends o.AnyColumn ?
                    TableT["data"]["autoIncrement"]["name"] :
                    never
            )
        >
    >
) {
    condition = o.ColumnCollectionUtil.assertDelegate(
        o.ColumnCollectionUtil.excludeColumnNames(
            logTable.columns,
            o.ColumnCollectionUtil.columnNames(logBase.columns).concat(
                (logTable.data.autoIncrement instanceof o.Column) ?
                    logTable.data.autoIncrement.name :
                    []
            )
        )
    )("condition", condition) as any;
    return fetchLatestQuery(db, logTable)
        .where((_c, s) => o.RawExprUtil.toEqualityCondition(
            s.data.joins[0].table,
            condition
        ))
        .selectAll()
        .fetchOne();
}

tape("json-log-fetch-latest-query", async (t) => {
    const db = await getDb();
    const now = (new Date()).toString();
    await db.insertValue(jsonLog, {
        data : JSON.stringify({
            time : now,
        })
    }).execute()
    .catch((err) => {
        t.error(err);
        throw new Error(err);
    });
    await fetchLatestQuery(db, jsonLog)
        .selectAll()
        .fetchOne()
        .then((row) => {
            const data = JSON.parse(row.data);
            t.equal(data.time, now);
        })
        .catch((err) => {
            t.error(err);
            throw new Error(err);
        });
    t.end();
});
tape("user-log-fetch-latest", async (t) => {
    const db = await getDb();
    for (let i=0; i<10; ++i) {
        const insertResult = await db.insertValueAndFetch(userLog, {
            userId : 1
        }).catch((err) => {
            console.error(err);
            throw new Error(err);
        });
        await fetchLatest(db, userLog, { userId : 1 })
            .then((row) => {
                t.equal(row.logId, insertResult.logId);
            });
    }
    t.end();
});