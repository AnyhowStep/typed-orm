SELECT
  UTC_TIMESTAMP() AS `__aliased--value`
FROM
  `table`
WHERE
  (
    (`table`.`y` <=> 'hey') AND
    (`table`.`z` <=> true)
  )