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
