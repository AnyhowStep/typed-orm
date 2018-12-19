SELECT
  (
    (
      SELECT
        (32 = 45)
      FROM
        `table`
      LIMIT
        1
    ) <=> true
  ) AS `__aliased--value`