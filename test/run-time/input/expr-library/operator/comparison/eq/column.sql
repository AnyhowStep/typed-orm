SELECT
  (`table`.`z` = `table`.`y`) AS `__aliased--value`,
  (`table`.`a` = true) AS `__aliased--booleanEq`,
  ((`table`.`y` = `table`.`x`) = false) AS `__aliased--nestedEq`