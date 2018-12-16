SELECT
  `table`.`y` AS `table--y`,
  `joined1`.`a` AS `joined1--a`,
  `joined1`.`b` AS `joined1--b`,
  `joined1`.`x` AS `joined1--x`,
  `table`.`x` AS `table--x`,
  (`table`.`z` = `joined1`.`a`) AS `__aliased--eq`