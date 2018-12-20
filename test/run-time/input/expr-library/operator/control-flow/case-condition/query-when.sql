SELECT
  (
    CASE
      WHEN COALESCE(
        (
          SELECT
            `table`.`b`
          FROM
            `table`
          LIMIT
            1
        ), false
      ) THEN '45'
    END
  ) AS `__aliased--value`