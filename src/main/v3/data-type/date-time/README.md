### LOCAL vs UTC

When it is morning around you, it is night on the other side of the planet. Similarly, when it is 10AM around you, it is not necessarily 10AM everywhere else on the planet.

The date-time around you is called **LOCAL** time.

It's a small-conversation topic when calling people from overseas.
> What time is it over there?

-----

**UTC** stands for "Coordinated Universal Time".

It is *THE* time on Earth. No matter where you are on Earth, if it is 10AM UTC around you, then it is 10AM UTC *everywhere else in the universe*.

All **LOCAL** time is defined in terms of `UTC + SomeOffset`.

-----

### TimeOffset vs TimeZone

A time offset is one of the following,

+ `+hh:mm` (or `hh:mm`)
+ `-hh:mm`
+ An integer (in minutes)

`LOCAL = UTC + TimeOffset`

If **UTC** date-time is `10AM`, and our **LOCAL** time offset is `-05:00`, then our **LOCAL** date-time is `5AM`

If **UTC** date-time is `10AM`, and our **LOCAL** time offset is `-05:30`, then our **LOCAL** date-time is `4:30AM`

-----

A timezone is one of the following,

+ A time offset
+ `SYSTEM` (MySQL uses the computer's timezone)
  > If set to SYSTEM, every MySQL function call that requires a timezone calculation makes a system library call to determine the current system timezone. This call may be protected by a global mutex, resulting in contention.
+ TZ Database Name (values like `Africa/Abidjan`, `America/Toronto`, etc.)
  > https://en.wikipedia.org/wiki/List_of_tz_database_time_zones

If the timezone is not a time offset, we can still calculate our local time.

`LOCAL = UTC + TimeZone.getTimeOffset()`

`TimeZone.getTimeOffset()` will not always give the same time offset!

For example, in Montreal, from March to November, the time offset is `-04:00` (EDT). The rest of the year, the time offset is `-05:00` (EST)

-----

Working with timezones is very complicated.

+ A time offset is always one value.
+ A timezone may many time offset values.

You should prefer working with time offsets, rather than timezones.

You should prefer working with UTC (`+00:00`), rather than other time offsets.

-----

# MySQL

We explore how MySQL handles LOCAL and UTC date-time.

### LOCAL vs UTC

The difference between **LOCAL** date-time and **UTC** date-time.

```sql
SELECT @@SESSION.TIME_ZONE, NOW(), UTC_TIMESTAMP()
    > SYSTEM, 2018-12-24 08:31:41, 2018-12-24 13:31:41
```

-----

### Precision

MySQL supports up to microsecond precision for times.

1 second is 1,000,000 microseconds.

### TimeOffset

To get the **CURRENT** time offset,

```sql
SELECT TIMESTAMPDIFF(MINUTE, UTC_TIMESTAMP(), NOW())
    > -300
```

It is **CURRENT** because of countries like Canada.
For example, in Montreal,

During daylight savings (EDT), roughly March to November,

```sql
SELECT TIMESTAMPDIFF(MINUTE, UTC_TIMESTAMP(), NOW())
    > -240
```

Durint non-daylight savings (EST), every other time of year,

```sql
SELECT TIMESTAMPDIFF(MINUTE, UTC_TIMESTAMP(), NOW())
    > -300
```

-----

### Setting the MySQL TimeZone

If at all possible, set your timezone to `+00:00`.

1. Open `my.cnf`
2. Under the `[mysqld]` section, set `default-time-zone='+00:00'`

-----

To check MySQL's timezone,

```sql
SELECT @@global.time_zone;
```

-----

If it is not possible to update `my.cnf`, then you have to set it for every connection (session) you make to MySQL.

To set the timezone *for the current session*,

```sql
SET @@session.time_zone = '+00:00';
```

-----

Most importantly, **DO NOT** mix timezones! Ever! You'll only give yourself headaches.

-----

### `NOW()` vs `UTC_TIMESTAMP()`

**AVOID** `NOW()`!

Use `UTC_TIMESTAMP()` always.

+ `NOW()` gives you **LOCAL** date-time
+ `UTC_TIMESTAMP()` gives you **UTC** date-time

-----

# JS

Your MySQL server may be hosted in France, and your business logic server may be hosted in USA.

These two servers will have different **LOCAL** times.

Two years down the road, your MySQL server may move to Japan.

This is why using **UTC** only to facilitate communication is important.

-----

### LOCAL vs UTC

JS' `Date` class actually represents a `DateTime`!

Internally, `Date` just stores the number of milliseconds passed since `1970-01-01 00:00:00 UTC`.

+ `Date.toString()` returns a string representing **LOCAL** date-time.
  ```ts
  new Date.toString()
      > "Mon Dec 24 2018 09:18:08 GMT-0500 (EST)"
  ```

+ `Date.toJSON()` returns a string representing **UTC** date-time.
  ```ts
  new Date.toJSON()
      > "2018-12-24T14:18:08.385Z"
  ```

Since `Date.toJSON()` returns **UTC** date-time, this suggests that we *really* should use **UTC** whenever communicating date-time values.

### Precision

JS supports up to millisecond precision.

1 second is 1,000 milliseconds.

Converting from a MySQL `DATETIME` to a JS `DATE` may involve a loss in precision.

### TimeOffset

Getting the time offset in JS is **counter-intuitive**.

If your current time offset is `-05:00`, in JS, you will see.

```ts
new Date().getTimezoneOffset()
    > 300
```

We should expect `-300` but we actually get `300`.

-----

To get the **CURRENT** time offset,

```ts
-new Date().getTimezoneOffset()
    > -300
```

-----

### Setting the JS TimeZone

There is no native way to do this. Don't even try.

-----

# MySQL-JS Communication

### MySQL -> JS

Selecting a MySql `DATETIME` value will give you a string in JS,

```sql
SELECT
    UTC_TIMESTAMP(),
    UTC_TIMESTAMP(1),
    UTC_TIMESTAMP(2),
    UTC_TIMESTAMP(3),
    UTC_TIMESTAMP(4),
    UTC_TIMESTAMP(5),
    UTC_TIMESTAMP(6);

    > '2018-12-24 14:36:22'
    > '2018-12-24 14:36:22.5'
    > '2018-12-24 14:36:22.52'
    > '2018-12-24 14:36:22.524'
    > '2018-12-24 14:36:22.5242'
    > '2018-12-24 14:36:22.52421'
    > '2018-12-24 14:36:22.524214'
```

This library assumes that all such strings are in **UTC**.

When converting `'2018-12-24 14:36:22.524214'` to JS' `Date`,
The final `3` digits are lost as JS' `Date` only supports millisecond precision.

-----

### JS -> MySQL

Converting a JS `Date` to a MySQL `DATETIME` assumes a conversion to a **UTC** string is desirable.

```ts
const d = new Date();
d.toJSON();
    > '2018-12-24T14:40:43.998Z'
toSqlString(d);
    > '2018-12-24 14:40:43.998'
```

Notice that the conversion only gives us `.998`, or `3` fractional seconds. This is because JS' `Date` only has up to millisecond precision.

-----

# TODO

### Microsecond Support

For now, this library will only work with millisecond precision.

`DATETIME(4), DATETIME(5), DATETIME(6)` are all not supported and attempting to use them will result in truncated values.

-----

### `TIME` Support

JS has no native way to represent just a time alone.

Therefore `TIME, TIME(1), TIME(2), TIME(3), TIME(4), TIME(5), TIME(6)` are all not supported.

Attempting to use it will result in undefined behaviour.

-----

### `DATE` Support

MySQL `DATE` support is implemented by setting `hh:mm:ss[.fraction]` to zero.

-----

### TimeZone/TimeOffset Support

This library only assumes UTC on both MySQL and JS for now. Using other timezones will result in incorrect values being stored/communicated.