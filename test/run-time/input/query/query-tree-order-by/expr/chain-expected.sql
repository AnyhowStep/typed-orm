ORDER BY
  (`table`.`x` = `joined1`.`b`) ASC,
  (`table`.`x` = `joined1`.`a`) DESC,
  (`joined1`.`c` = `table`.`y`) ASC,
  (`table`.`x` = `joined1`.`a`) DESC,
  (`joined1`.`c` = `table`.`y`) ASC