SELECT
  `tmpTable`.`curTime` AS `tmpTable--curTime`
FROM
  (
    SELECT
      UTC_TIMESTAMP() AS `curTime`
  ) AS `tmpTable`