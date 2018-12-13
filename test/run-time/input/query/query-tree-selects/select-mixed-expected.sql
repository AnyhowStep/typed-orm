SELECT
  `table`.`y`,
  `joined1`.`a`,
  `joined1`.`b`,
  `joined1`.`x`,
  `table`.`x`,
  (`table`.`z` = `joined1`.`a`) AS `__aliased--eq`