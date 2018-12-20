SELECT
  (
    `table`.`x` IN(`table`.`z`, COALESCE(`table`.`y`, 0))
  ) AS `__aliased--value`