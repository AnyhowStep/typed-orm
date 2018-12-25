`table`
INNER JOIN
  `joined1`
ON
  `joined1`.`b` = `table`.`x`
INNER JOIN
  `joined2`
ON
  `joined2`.`n` = `joined1`.`a` AND
  `joined2`.`o` = `joined1`.`y`