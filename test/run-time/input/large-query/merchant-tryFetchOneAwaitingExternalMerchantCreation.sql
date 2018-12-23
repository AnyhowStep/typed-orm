SELECT
  `appPlatform`.`appId` AS `appPlatform--appId`,
  `appPlatform`.`createdAt` AS `appPlatform--createdAt`,
  `appPlatform`.`platformId` AS `appPlatform--platformId`,
  `business`.`appId` AS `business--appId`,
  `business`.`businessId` AS `business--businessId`,
  `business`.`businessTypeId` AS `business--businessTypeId`,
  `business`.`countryId` AS `business--countryId`,
  `business`.`createdAt` AS `business--createdAt`,
  `business`.`createdByExternalUserId` AS `business--createdByExternalUserId`,
  `business`.`externalUserId` AS `business--externalUserId`,
  `businessPayOutMethod`.`appId` AS `businessPayOutMethod--appId`,
  `businessPayOutMethod`.`businessId` AS `businessPayOutMethod--businessId`,
  `businessPayOutMethod`.`createdAt` AS `businessPayOutMethod--createdAt`,
  `businessPayOutMethod`.`createdByExternalUserId` AS `businessPayOutMethod--createdByExternalUserId`,
  `businessPayOutMethod`.`externalUserId` AS `businessPayOutMethod--externalUserId`,
  `businessPayOutMethod`.`payOutMethodId` AS `businessPayOutMethod--payOutMethodId`,
  `merchant`.`appId` AS `merchant--appId`,
  `merchant`.`businessId` AS `merchant--businessId`,
  `merchant`.`createdAt` AS `merchant--createdAt`,
  `merchant`.`merchantId` AS `merchant--merchantId`,
  `merchant`.`payOutMethodId` AS `merchant--payOutMethodId`,
  `merchant`.`platformId` AS `merchant--platformId`,
  `payOutMethod`.`appId` AS `payOutMethod--appId`,
  `payOutMethod`.`createdAt` AS `payOutMethod--createdAt`,
  `payOutMethod`.`createdByExternalUserId` AS `payOutMethod--createdByExternalUserId`,
  `payOutMethod`.`externalUserId` AS `payOutMethod--externalUserId`,
  `payOutMethod`.`payOutMethodId` AS `payOutMethod--payOutMethodId`,
  `payOutMethod`.`payOutMethodTypeId` AS `payOutMethod--payOutMethodTypeId`,
  `user`.`appId` AS `user--appId`,
  `user`.`banned` AS `user--banned`,
  `user`.`createdAt` AS `user--createdAt`,
  `user`.`displayName` AS `user--displayName`,
  `user`.`externalUserId` AS `user--externalUserId`,
  (
    SELECT
      `externalMerchantCreationAttempt`.`attemptedAt`
    FROM
      `externalMerchantCreationAttempt`
    WHERE
      (
        `externalMerchantCreationAttempt`.`merchantId` = `merchant`.`merchantId`
      )
    ORDER BY
      `externalMerchantCreationAttempt`.`attemptedAt` DESC
    LIMIT
      1
  ) AS `__aliased--lastExternalMerchantCreationAttemptAt`
FROM
  `merchant`
INNER JOIN
  `appPlatform`
ON
  `appPlatform`.`appId` = `merchant`.`appId` AND
  `appPlatform`.`platformId` = `merchant`.`platformId`
INNER JOIN
  `business`
ON
  `business`.`businessId` = `merchant`.`businessId`
INNER JOIN
  `user`
ON
  `user`.`appId` = `business`.`appId` AND
  `user`.`externalUserId` = `business`.`externalUserId`
INNER JOIN
  `businessPayOutMethod`
ON
  `businessPayOutMethod`.`businessId` = `merchant`.`businessId` AND
  `businessPayOutMethod`.`payOutMethodId` = `merchant`.`payOutMethodId`
INNER JOIN
  `payOutMethod`
ON
  `payOutMethod`.`payOutMethodId` = `businessPayOutMethod`.`payOutMethodId`
WHERE
  (
    (
      NOT EXISTS(
        SELECT
          *
        FROM
          `externalMerchant`
        WHERE
          (
            `externalMerchant`.`merchantId` = `merchant`.`merchantId`
          )
      )
    ) AND
    EXISTS(
      SELECT
        *
      FROM
        `personalInformation`
      WHERE
        (
          (`personalInformation`.`appId` = `user`.`appId`) AND
          (
            `personalInformation`.`externalUserId` = `user`.`externalUserId`
          )
        )
    ) AND
    COALESCE(
      (
        SELECT
          `merchantEnabled`.`enabled`
        FROM
          `merchantEnabled`
        WHERE
          (
            `merchantEnabled`.`merchantId` = `merchant`.`merchantId`
          )
        ORDER BY
          `merchantEnabled`.`updatedAt` DESC
        LIMIT
          1
      ), true
    ) AND
    COALESCE(
      (
        SELECT
          `businessEnabled`.`enabled`
        FROM
          `businessEnabled`
        WHERE
          (
            `businessEnabled`.`businessId` = `business`.`businessId`
          )
        ORDER BY
          `businessEnabled`.`updatedAt` DESC
        LIMIT
          1
      ), true
    ) AND
    (
      NOT EXISTS(
        SELECT
          *
        FROM
          `merchantLock`
        WHERE
          (
            (
              `merchantLock`.`merchantId` = `merchant`.`merchantId`
            ) AND
            (
              TIMESTAMPDIFF(SECOND, NOW(), `merchantLock`.`timeoutAt`) > 0
            )
          )
      )
    )
  )
ORDER BY
  (
    `__aliased--lastExternalMerchantCreationAttemptAt` IS NULL
  ) DESC,
  `__aliased--lastExternalMerchantCreationAttemptAt` ASC,
  `merchant`.`createdAt` ASC
LIMIT
  1