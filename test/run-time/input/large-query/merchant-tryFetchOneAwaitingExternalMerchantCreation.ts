import * as sd from "schema-decorator";
import * as tape from "tape";
import * as o from "../../../../dist/src/main";
import * as fs from "fs";

const appPlatform = o.table(
    "appPlatform",
    {
        appId : o.bigint,
        platformId : o.bigint,
        createdAt : o.dateTime
    }
)
    .setImmutable()
    .setHasExplicitDefaultValue(c => [c.createdAt])
    .addCandidateKey(c => [c.appId, c.platformId]);

const user = o.table(
    "user",
    {
        appId : o.bigint,
        externalUserId : sd.varChar(1, 255),
        displayName : sd.varChar(1, 255),
        banned : sd.numberToBoolean(),
        createdAt : o.dateTime,
    }
)
    .setHasExplicitDefaultValue(c => [
        c.displayName,
        c.banned,
        c.createdAt
    ])
    .overwriteMutable(c => [
        c.displayName,
        c.banned
    ])
    .addCandidateKey(c => [c.appId, c.externalUserId])
const personalInformation = o.table(
    "personalInformation",
    {
        appId : o.bigint,
        externalUserId : sd.varChar(1, 255)
    }
);
const business = o.table(
    "business",
    {
        appId : o.bigint,
        businessId : o.bigint,
        businessTypeId : o.bigint,
        externalUserId : sd.varChar(1, 255),
        countryId : o.bigint,
        createdAt : o.dateTime,
        createdByExternalUserId : sd.varChar(1, 255),
    }
)
    .setAutoIncrement(c => c.businessId)
    .setHasExplicitDefaultValue(c => [c.createdAt])
    .setImmutable();

const payOutMethod = o.table(
    "payOutMethod",
    {
        appId : o.bigint,
        payOutMethodId : o.bigint,
        externalUserId : sd.varChar(1, 255),
        payOutMethodTypeId : o.bigint,
        createdAt : o.dateTime,
        createdByExternalUserId : sd.varChar(1, 255)
    }
)
    .setAutoIncrement(c => c.payOutMethodId)
    .setHasExplicitDefaultValue(c => [c.createdAt])
    .setImmutable()

const businessPayOutMethod = o.table(
    "businessPayOutMethod",
    {
        appId : o.bigint,
        businessId : o.bigint,
        payOutMethodId : o.bigint,
        externalUserId : sd.varChar(1, 255),
        createdAt : o.dateTime,
        createdByExternalUserId : sd.varChar(1, 255),
    }
)
    .addCandidateKey(c => [
        c.businessId,
        c.payOutMethodId,
    ])
    .setHasExplicitDefaultValue(c => [c.createdAt])
    .setImmutable()

const merchant = o.table(
    "merchant",
    {
        appId : o.bigint,
        merchantId : o.bigint,
        businessId : o.bigint,
        payOutMethodId : o.bigint,
        platformId : o.bigint,
        createdAt : o.dateTime,
    }
)
    .setAutoIncrement(c => c.merchantId)
    .setHasExplicitDefaultValue(c => [
        c.createdAt
    ])
    .setImmutable();
const merchantLock = o.table(
    "merchantLock",
    {
        merchantId : o.bigint,
        timeoutAt : o.dateTime
    }
);

const externalMerchant = o.table(
    "externalMerchant",
    {
        merchantId : o.bigint,
    }
);

const merchantEnabled = o.table(
    "merchantEnabled",
    {
        merchantId : o.bigint,
        enabled : sd.numberToBoolean(),
        updatedAt : o.dateTime
    }
);

const businessEnabled = o.table(
    "businessEnabled",
    {
        businessId : o.bigint,
        enabled : sd.numberToBoolean(),
        updatedAt : o.dateTime,
    }
);
const externalMerchantCreationAttempt = o.table(
    "externalMerchantCreationAttempt",
    {
        merchantId : o.bigint,
        attemptedAt : o.dateTime,
    }
)
function secondsTillTimeout () {
    return o.timestampDiff(
        o.TemporalUnit.SECOND,
        o.now(),
        merchantLock.columns.timeoutAt
    );
}

function lockIsLocked () {
    return o.gt(
        secondsTillTimeout(),
        0n
    );
}

function isLocked () {
    return o.exists(
        o.requireParentJoins(merchant)
            .from(merchantLock)
            .andWhere(c => o.eq(
                c.merchantLock.merchantId,
                c.merchant.merchantId
            ))
            .andWhere(() => lockIsLocked())
    );
}

function hasExternalMerchant () {
    return o.exists(
        o.requireParentJoins(merchant)
            .from(externalMerchant)
            .andWhere(c => o.eq(
                c.externalMerchant.merchantId,
                c.merchant.merchantId
            ))
    );
}

function isEnabled () {
    return o.and(
        o.coalesce(
            //TODO Add a coalesce() method to Query!
            //It'll be the same as coalesce(from().select(), defaultValue)
            o.requireParentJoins(merchant)
                .from(merchantEnabled)
                .andWhere(c => o.eq(
                    c.merchantEnabled.merchantId,
                    c.merchant.merchantId
                ))
                .orderBy(c => [
                    [c.merchantEnabled.updatedAt, o.DESC]
                ])
                .limit(1)
                .select(c => [c.merchantEnabled.enabled]),
            true
        ),
        o.coalesce(
            //TODO Add a coalesce() method to Query!
            //It'll be the same as coalesce(from().select(), defaultValue)
            o.requireParentJoins(business)
                .from(businessEnabled)
                .andWhere(c => o.eq(
                    c.businessEnabled.businessId,
                    c.business.businessId
                ))
                .orderBy(c => [
                    [c.businessEnabled.updatedAt, o.DESC]
                ])
                .limit(1)
                .select(c => [c.businessEnabled.enabled]),
            true
        ),
        //payOutMethodIsEnabledExpression(),
        //appPlatformIsEnabledExpression()
    );
}

function userHasPersonalInformation () {
    return o.exists(o.requireParentJoins(user)
        .from(personalInformation)
        .andWhere(c => o.and(
            o.eq(
                c.personalInformation.appId,
                c.user.appId
            ),
            o.eq(
                c.personalInformation.externalUserId,
                c.user.externalUserId
            )
        ))
    );
}

function canCreateExternalMerchant () {
    return o.and(
        //Must not have an existing external merchant
        o.not(hasExternalMerchant()),
        //The user of the merchant must have personal information entered
        userHasPersonalInformation(),
        //Must be enabled
        isEnabled()
    );
}

function canStartExternalMerchantCreationAttempt () {
    return o.and(
        canCreateExternalMerchant(),
        //Not locked; if locked, probably something else
        //trying to create the merchant
        o.not(isLocked())
    )
}
function lastExternalMerchantCreationAttemptAt () {
    return o.requireParentJoins(merchant)
        //Get creation attempts of the merchant
        .from(externalMerchantCreationAttempt)
        .andWhere(c => o.eq(
            c.externalMerchantCreationAttempt.merchantId,
            c.merchant.merchantId
        ))
        .orderBy(c => [
            //Sort by latest
            [c.externalMerchantCreationAttempt.attemptedAt, o.DESC]
        ])
        .limit(1)
        .select(c => [c.externalMerchantCreationAttempt.attemptedAt]);
}
const query = o.from(merchant)
    //TODO innerJoinUsingCandidateKey()
    .innerJoinUsing(
        appPlatform,
        c => [
            c.appId,
            c.platformId
        ]
    )
    .innerJoinUsing(
        business,
        c => [
            c.merchant.businessId
        ]
    )
    .innerJoinUsing(
        user,
        c => [
            c.business.appId,
            c.business.externalUserId
        ]
    )
    .innerJoinUsing(
        businessPayOutMethod,
        c => [
            c.merchant.businessId,
            c.merchant.payOutMethodId
        ]
    )
    .innerJoinUsing(
        payOutMethod,
        c => [
            c.businessPayOutMethod.payOutMethodId
        ]
    )
    .andWhere(
        canStartExternalMerchantCreationAttempt
    )
    .select(c => [c])
    .select(() => [
        lastExternalMerchantCreationAttemptAt()
            .as("lastExternalMerchantCreationAttemptAt")
    ])
    .orderBy(c => [
        //We prioritize those that have not been attempted
        [o.isNull(c.__aliased.lastExternalMerchantCreationAttemptAt), o.DESC],
        //For those that have been attempted,
        //we get the earliest attempted
        [c.__aliased.lastExternalMerchantCreationAttemptAt, o.ASC],
        //For those that have not been attempted,
        //we get the earliest created
        [c.merchant.createdAt, o.ASC]
    ])
    .limit(1);
const formatter = new o.SqlFormatter();
const actual = formatter.format(
    o.QueryTreeUtil.toSql(
        o.QueryUtil.queryTree(query)
    )
);

tape(__filename, (t) => {
    t.deepEqual(
        actual,
        fs.readFileSync(
            __filename.replace(/\.ts$/, ".sql")
        ).toString()
    );

    t.end();
});