import * as d from "../definition";
import * as sd from "schema-decorator";
//import * as mysql from "typed-mysql";

const ssoClient = d.table(
    "ssoClient",
    {
        ssoClientId : sd.stringToNumber(),
        name : sd.string(),
        authenticationEndpoint : sd.string(),
        initializeAfterAuthenticationEndpoint : sd.nullable(sd.string()),
    }
).autoIncrement(c => c.ssoClientId);
const app = d.table(
    "app",
    {
        appId : sd.stringToNumber(),
        name : sd.string(),
        ssoClientId : ssoClient.columns.ssoClientId,
        ssoApiKey : sd.nullable(sd.string()),
        webhookKey : sd.nullable(sd.string())
    }
).autoIncrement(c => c.appId);

const appKey = d.table(
    "appKey",
    {
        appId : sd.stringToNumber(),
        appKeyId : sd.string(),
        appKeyTypeId : sd.number(),
        key : sd.string(),
    },
).autoIncrement(c => c.appKeyId);
/*
const appKeyType = d.table(
    "appKeyType",
    {
        appKeyTypeId : sd.string(),
        internalName : sd.string(),
    }
).autoIncrement(c => c.appKeyTypeId);

const user = d.table(
    "user",
    {
        appId : sd.naturalNumber(),
        externalUserId : sd.string(),
        createdAt : sd.date(),
    }
);

console.log(appKeyType.querify())
console.log(user.querify())

const b = d.from(app)
    .join(appKey, c => [c.app.appId], t => [t.appId])
    .whereIsEqual(3, c => c.app.ssoApiKey)
    .select(c => [c.app.appId])
    .select(c => [c.app.appId.as("e")]);
console.log(b.querify());
*/
async function foo () {
    /*const test = d.from(app)
        .select((s) => {
            return [
                s.app,
                s.app.appId.as("w"),
                d.TRUE.as("test")
            ]
        });
    console.log(test.querify());*/

    const mysqlUsername = "payment-admin";
    const mysqlPassword = "Y9dIMNcoXwaMRyxk";

    const db = new d.Database({
        host     : "localhost",
        database : "payment-prototype-00",
        user     : mysqlUsername,
        password : mysqlPassword,
    });
    await db.connect();
    await db.utcOnly();

    db.from(app)
        .select(c => [
            c.app.appId,
            d.TRUE.as("something")
        ])
    db.from(app)
        .select(c => [
            c.app.appId,
            d.TRUE.as("something")
        ])
        .as("subsubqueryTable")
    db.from(app)
        .join(
            db.from(app)
                .select(c => [
                    c.app.appId,
                    d.TRUE.as("something")
                ])
                .as("subsubqueryTable"),
            c => [c.app.appId],
            t => [t.appId]
        )
        .select(c => [
            //c.app.appId,
            //c.app.webhookKey,
            //d.toExpr("Hello, world, SELECT * FROM app; TEST 'new string' \\\'").as("hello"),
            c.subsubqueryTable.something.as("test")
        ])
    const f = db.from(app)
        .join(
            appKey,
            c => [c.app.appId],
            t => [t.appId]
        )
        .leftJoin(
            ssoClient,
            c => [c.app.ssoClientId],
            t => [t.ssoClientId])
        .join(
            db.from(app)
                .join(
                    db.from(app)
                        .join(
                            db.from(app)
                                .select(c => [
                                    c.app.appId,
                                    d.TRUE.as("something")
                                ])
                                .as("subsubsubq"),
                            c => [c.app.appId],
                            t => [t.appId]
                        )
                        .select(c => [
                            c.app.appId,
                            c.subsubsubq.something
                        ])
                        .as("subsubqueryTable"),
                    c => [c.app.appId],
                    t => [t.appId]
                )
                .select(c => [
                    c.app.appId,
                    c.app.webhookKey,
                    d.toExpr("Hello, world, SELECT * FROM app; TEST 'new string' \\\'").as("hello"),
                    c.subsubqueryTable.something
                ])
                .as("subqueryTable"),
            c => [c.app.webhookKey],
            t => [t.webhookKey]
        )
        .whereIsNotNull(c => c.app.ssoApiKey)
        .where(c => {

            return d.or(
                d.and(
                    d.eq(c.app.appId, 5),
                    c.subqueryTable.something
                ),
                d.eq(c.subqueryTable.appId, 999)
            );
        })
        .select((c) => {
            return [
                //c.app.columns.ssoApiKey.as("aliased"),
                c.app,
                c.ssoClient.ssoClientId,
                c.subqueryTable.something
                //e.eq(c.app.columns.ssoApiKey,"2").as("eq"),
                //c.ssoClient.columns.initializeAfterAuthenticationEndpoint
            ]
        })
        //.distinct()
        .groupBy((s) => {
            return [
                s.app.appId
            ];
        })
        .having((s) => {
            return d.eq(s.subqueryTable.something, true);
        })
        .orderBy((s) => {
            return [
                //s.__expr.columns.aliased,
                [s.app.name, true],
                [s.ssoClient.authenticationEndpoint, false],
                d.eq(s.app.appId, 1),
                [d.eq(s.app.appId, 1), true]
            ]
        })
        .limit(5)
        .offset(4)
        .widen(s => s.app.ssoApiKey, sd.nil())
        .widen(s => s.ssoClient.ssoClientId, sd.string())
        .union(
            db.from(app)
                .select((s) => {
                    return [
                        s.app,
                        s.app.appId.as("w"),
                        d.TRUE.as("appId")
                    ]
                })
        )
        .union(
            db.from(app)
                .select((s) => {
                    return [
                        s.app,
                        s.app.name.as("b"),
                        d.TRUE.as("appId")
                    ]
                })
        )
        .orderBy(() => {
            return [d.TRUE]
        })
        .limit(30)
        .offset(56);//*/
        //.execute() : Promise<SelectReferences>
    /*f.paginate()
        .then((result) => {
            result
        });*/
    /*from(app)
        .select(c => [c.app.name])
        .paginate()
        .then((result) => {
            result
        })
    f.data*/
    db.from(app)
        .join(
            db.from(appKey)
                .select(c => [c.appKey.key, c.appKey.appId, d.TRUE.as("a")])
                .as("other"),
            c => [c.app.appId],
            t => [t.appId]
        )
        .having((_s) => {
            return d.lt(1, 100);
        })
    console.log("---");
    console.log(await f.count());
    console.log(JSON.stringify(await f.paginate({
        itemsPerPage : 4,
        page : 0,
    })));
    console.log(await db.from(app).limit(1).count());
    /*const sb = new d.StringBuilder();
    f.querify(sb);
    const query = sb.toString();
    console.log(query);
    //f.data.selectReferences;
    const schema = d.columnReferencesToSchema(f.data.selectReferences);

    db.selectAny(query).then((result) => {
        console.log(result);
        const processed : any[] = [];
        for (let row of result.rows) {
            const obj = {} as any;
            for (let mangledName in row) {
                const names = mangledName.split("--");
                const table = names[0];
                const column = names[1];
                if (obj[table] == undefined) {
                    obj[table] = {};
                }
                obj[table][column] = row[mangledName];
            }
            processed.push(schema("obj", obj));
        }
        console.log(processed);
    });

    /*db.getRawConnection().query(
        {
            sql : f.querify(),
            nestTables : "---",
        },
        (error, results, fields) => {
            console.log(error, results, fields);
        }
    );*/
}
foo().catch((err) => {
    console.error(err);
    process.exit(1);
});
