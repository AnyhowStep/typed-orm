SELECT
  `test`.`now` AS `test--now`
FROM
  (
    SELECT
      NOW() AS `now`
  ) AS `test`