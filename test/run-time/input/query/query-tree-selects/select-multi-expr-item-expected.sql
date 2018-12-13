SELECT
  (`table`.`y` = `table`.`x`) AS `__aliased--equal?`,
  (
    (`table`.`y` = `table`.`x`) AND
    `table`.`z` AND
    `table`.`z`
  ) AS `__aliased--anded`