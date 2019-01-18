import * as o from "../../../../dist/src/main";

export const appPlatform = o.table("appPlatform")
    .addColumns({
        appId : o.bigintUnsigned(),
        platformId : o.bigintUnsigned(),
        createdAt : o.dateTime(),
    })
    .setImmutable()
    .addHasExplicitDefaultValue(c => [c.createdAt])
    .setPrimaryKey(c => [c.appId, c.platformId]);

export const q = o.from(appPlatform)
    .select(c => [c])
    .orderBy(c => [c.createdAt.desc()]);