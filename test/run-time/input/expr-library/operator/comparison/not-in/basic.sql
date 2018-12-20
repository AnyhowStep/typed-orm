SELECT
  (
    `table`.`x` NOT IN(`table`.`z`, COALESCE(`table`.`y`, 0))
  ) AS `__aliased--value`