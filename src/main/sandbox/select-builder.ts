import {CreateSelectBuilderDelegate, CreateTableDelegate} from "../declaration";
import * as d from "../declaration";
import * as sd from "schema-decorator";

declare const table : CreateTableDelegate;
declare const from : CreateSelectBuilderDelegate;


const ssoClient = table(
    "ssoClient",
    {
        ssoClientId : sd.stringToNumber(),
        name : sd.string(),
        authenticationEndpoint : sd.string(),
        initializeAfterAuthenticationEndpoint : sd.nullable(sd.string()),
    }
).autoIncrement(c => c.ssoClientId);
const app = table(
    "app",
    {
        appId : sd.stringToNumber(),
        name : sd.string(),
        ssoClientId : ssoClient.columns.ssoClientId,
        ssoApiKey : sd.nullable(sd.string()),
        webhookKey : sd.nullable(sd.string())
    }
).autoIncrement(c => c.appId);

const appKey = table(
    "appKey",
    {
        appId : sd.stringToNumber(),
        appKeyId : sd.string(),
        appKeyTypeId : sd.number(),
        key : sd.string(),
    },
).autoIncrement(c => c.appKeyId);

const appKeyType = table(
    "appKeyType",
    {
        appKeyTypeId : sd.string(),
        internalName : sd.string(),
    }
).autoIncrement(c => c.appKeyTypeId);

const user = table(
    "user",
    {
        appId : sd.naturalNumber(),
        externalUserId : sd.string(),
        createdAt : sd.date(),
    }
);

const b = from(app)
    .join(appKey, c => [c.app.appId], t => [t.appId])
    .whereIsEqual(3, c => c.app.ssoApiKey);
    b.data.columnReferences.app.ssoApiKey

declare const allowed : d.IsAllowedSelectBuilderOperation<typeof b["data"], d.SelectBuilderOperation.JOIN>;


declare class Expressions {
    true () : d.IExpr<{}, true>;
    eq<
        LeftT extends d.RawExpr<any>,
        RightT extends d.RawExpr<d.ExprType<LeftT>|null>
    > (left : LeftT, right : RightT) : d.IExpr<
        d.ExprUsedColumns<LeftT> & d.ExprUsedColumns<RightT>,
        boolean
    >;
    identity<
        ExprT extends d.RawExpr<any>
    > (expr : ExprT) : d.IExpr<
        d.ExprUsedColumns<ExprT>,
        d.ExprType<ExprT>
    >;
}
declare const e : Expressions;

function foo () {
    const subE = e.identity(from(app).select(c => [app.columns.name]));
    const test = from(app)
        .select((s) => {
            return [
                s.app,
                s.app.appId.as("w"),
                e.true().as("test")
            ]
        });

    const f = from(app)
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
            from(app)
                .select(c => [
                    c.app.webhookKey,
                    e.true().as("subexpr")
                ])
                .as("subqueryTable"),
            c => [c.app.webhookKey],
            t => [t.webhookKey]
        )
        .whereIsNotNull(c => c.app.ssoApiKey)
        .where(c => {
            c.subqueryTable.subexpr
            return e.eq(c.app.appId, 5);
        })
        .select((c) => {
            return [
                //c.app.columns.ssoApiKey.as("aliased"),
                c.app,
                c.ssoClient.name,
                e.true().as("something"),
                //e.eq(c.app.columns.ssoApiKey,"2").as("eq"),
                //c.ssoClient.columns.initializeAfterAuthenticationEndpoint
            ]
        })
        .distinct()
        .groupBy((s) => {
            return [
                s.ssoClient.initializeAfterAuthenticationEndpoint
            ];
        })
        .having((s) => {
            return e.eq(s.__expr.something, true);
        })
        .orderBy((s) => {
            return [
                //s.__expr.columns.aliased,
                [s.app.name, true],
                [s.ssoClient.authenticationEndpoint, false],
                e.eq(s.app.appId, 1),
                [e.eq(s.app.appId, 1), true]
            ]
        })
        .limit(5)
        .offset(4)
        .widen(s => s.app.ssoApiKey, sd.nil())
        .widen(s => s.ssoClient.name, sd.number())
        .union(
            from(app)
                .select((s) => {
                    return [
                        s.app,
                        s.app.appId.as("w"),
                        e.true().as("test")
                    ]
                })
        )
        .union(
            from(app)
                .select((s) => {
                    return [
                        s.app,
                        s.app.appId.as("b"),
                        e.true().as("test3")
                    ]
                })
        )
        .orderBy(() => {
            return [e.true()]
        })
        .limit(30)
        .offset(56);//*/
        //.execute() : Promise<SelectReferences>
    f.paginate()
        .then((result) => {
            result
        });
    from(app)
        .select(c => [c.app.name])
        .paginate()
        .then((result) => {
            result
        })
    f.data
}
foo();
