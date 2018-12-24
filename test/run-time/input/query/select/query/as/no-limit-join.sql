SELECT
  `test`.`now` AS `test--now`
FROM
  (
    SELECT
      UTC_TIMESTAMP() AS `now`
  ) AS `test`