`table`
INNER JOIN
  `joined1`
ON
  `joined1`.`c` = `table`.`y`
LEFT JOIN
  `joined2`
ON
  `joined2`.`l` = `table`.`y` AND
  `joined2`.`j` = `joined1`.`a`
RIGHT JOIN
  `joined3`
ON
  `joined3`.`f` = `table`.`y` AND
  `joined3`.`d` = `joined1`.`a` AND
  `joined3`.`e` = `joined2`.`k`