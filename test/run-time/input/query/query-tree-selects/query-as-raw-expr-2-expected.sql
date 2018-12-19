SELECT
  (
    (
      SELECT
        `table`.`x`
      FROM
        `table`
      LIMIT
        1
    ) <=> 32
  ) AS `__aliased--value`