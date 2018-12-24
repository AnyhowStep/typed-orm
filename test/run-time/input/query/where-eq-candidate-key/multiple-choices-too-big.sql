SELECT
  UTC_TIMESTAMP() AS `__aliased--value`
FROM
  `table`
WHERE
  (
    (`table`.`x` <=> 56) AND
    (`table`.`y` <=> 'hey')
  )