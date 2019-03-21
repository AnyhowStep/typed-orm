### `typed-orm`

An experiment in structurally-safe MySQL query building using TypeScript.

### Examples

Examples may be found in `test/compile-time`, `test/run-time`, `test/execution`.

Current code coverage is about 74%

### Tables

```ts
import * as o from "typed-orm";
import * as sd from "schema-decorator";

const app = o.table(
    "app",
    {
        //Use the assert delegates from typed-orm
        appId : o.bigintUnsigned(),
        name : o.varChar(1, 255),
        description : o.varChar.nullable(1, 255)
    }
)
    .setAutoIncrement(c => c.appId);

const user = o.table(
    "user",
    {
        //Or use the ones from other packages.
        //An assert delegate looks like,
        //(name : string, raw : unknown) => ResultT
        userId : sd.naturalNumber(),
        firstName : sd.string(),
        lastName : sd.string(),
    }
)
    .setAutoIncrement(c => c.userId);

const baseTable = o.table(
    "base",
    {
        baseId : sd.naturalNumber()
    }
)
    .setAutoIncrement(c => c.baseId);

//Table-per-concrete-class inheritance
const derivedTable = o.table(baseTable)
    .withAlias("derived")
    .addColumns({
        value0 : sd.boolean(),
        value1 : sd.date(),
    });

//Table-per-type inheritance
const derivedTable2 = o.table(
    "derived2",
    {
        baseId : sd.naturalNumber(),
        value0 : sd.boolean(),
        value1 : sd.date(),
    }
)
    .setId(c => c.baseId)
    .addParent(baseTable);

```

### Database

```ts
import * as o from "typed-orm";
const pool = new o.Pool({
    host     : "host",
    database : "database",
    user     : "username",
    password : "password",
    charset  : "charset",
});
```

### Select

```ts
pool.acquire(async (connection) => {
    await o.from(app)
        .select(c => [c])
        .fetchAll(connection)
        .then(console.log);

    await db.from(app)
        .rightJoinPk(
            t => t.app,
            user
        )
        .select(c => [c.app.name, c.user.firstName])
        .fetchAll(connection)
        .then(console.log);

    await db.from(app)
        .selectAll(c => [c])
        .aggregate(async (row) => {
            return {
                ...row,
                users : await db.from(user)
                    .whereEq(c => c.appId, row.appId)
                    .select(c => [c])
                    .fetchAll(connection),
            };
        })
        .fetchAll(connection)
        .then(console.log);
});
```

### Insert

```ts
db.insertInto(app)
    .values(
        { name : "new-app" },
        { name : "other-app" }
    )
    .execute(connection)
    .then(console.log);

app.insert(connection, { name : "new-app" })
    .then(console.log);
```

### Update

```ts
import * as o from "typed-orm";
app.updateOneByPk(
    connection,
    { appId : 4 },
    () => ({
        name : "new-name"
    })
).then(console.log);
```

### Delete

```ts
app.deleteOneByPk(connection, { appId : 4 })
    .then(console.log);
```

### Sub-query Expression

```ts
o.select(() => [
    o.selectExpr(
        () => o.utcTimestamp
    ).as("nowish")
])
    .fetchOne(connection)
    .then(console.log);

o.from(app)
    .select((_c, s) => {
        return [
            s.subQuery()
                .select((c) => {
                    return [c.appId]
                })
                .asExpr("appId")
        ];
    })
    .limit(1)
    .fetchOne(connection)
    .then(console.log);
```

### Example of a complicated query

```ts
/*snip*/
    tryFetchOneAwaitingCreation (connection : o.IConnection) {
        return o.from(t.merchant)
            .useJoins(
                j.merchant.belongsToOne.appPlatform,
                j.merchant.belongsToOne.business,
                j.business.belongsToOne.user
            )
            .where(() => this.canStartCreationAttempt())
            .select(c => [c])
            .select(() => [
                this.lastCreationAttemptAt()
            ])
            .orderBy(c => [
                //We prioritize those that have not been attempted
                [o.isNull(c.__aliased.lastCreationAttemptAt), o.DESCENDING],
                //For those that have been attempted,
                //we get the earliest attempted
                [c.__aliased.lastCreationAttemptAt, o.ASCENDING],
                //For those that have not been attempted,
                //we get the earliest created
                [c.merchant.createdAt, o.ASCENDING]
            ])
            .limit(1)
            .fetchZeroOrOne(connection);
    }
/*snip*/
```

### Gotcha's

+ Using `.whereEq("test")` may return a row with `"TEST"` if the collation is case-insensitive.