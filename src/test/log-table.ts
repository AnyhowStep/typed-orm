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
            if (o.ColumnReferencesUtil.hasColumn(c, autoIncrement)) {
                return [
                    [c[autoIncrement.name], false] as any
                ];
            } else {
                return undefined;
            }
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
    const x = fetchLatestQuery<TableT>(
        db, logTable
    ).where(() => o.RawExprUtil.toEqualityCondition(
        logTable,
        condition
    ));
    return o.SelectBuilderUtil.selectAll(x);
}

tape("json-log-fetch-latest-query", async (t) => {
    const db = await getDb();
    const now = (new Date()).toString();
    await db.insertValue(jsonLog, {
        data : JSON.stringify({
            time : now,
        })
    }).execute();
    await fetchLatestQuery(db, jsonLog)
        .selectAll()
        .fetchOne()
        .then((row) => {
            const data = JSON.parse(row.data);
            t.equal(data.time, now);
        });
    t.end();
});
tape("user-log-fetch-latest", async (t) => {
    const db = await getDb();
    const now = (new Date()).toString();
    const insertResult = await db.insertValueAndFetch(userLog, {
        userId : 1
    });
    const wat2 = fetchLatestQuery(db, userLog);
    let wat = await fetchLatest(db, userLog, {
        userId : 1
    }).fetchOne()
    wat = 2;
    /*.fetchOne().then((row) => {
        t.equal(row)
    });*/
    await fetchLatestQuery(db, jsonLog)
        .selectAll()
        .fetchOne()
        .then((row) => {
            const data = JSON.parse(row.data);
            t.equal(data.time, now);
        });
    t.end();
});