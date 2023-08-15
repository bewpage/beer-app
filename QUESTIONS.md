## Questions / Answers

### 1. How to allow the front-end to obtain specific data without exposing all internal database fields in a SaaS application?

**Answer:**

here are the most common approaches to this problem:

1. API: Implement a well-defined API (RESTful) to serve as a bridge between the front-end and the backend.

2. Data Mapping: Use serializers or data mappers to transform database data into a structure suitable for front-end
   consumption. This ensures only the desired fields are sent to the client.

3. Avoid Exposing Direct Database Queries: Ensure the front-end never sends direct SQL or database queries. Only
   predefined
   API requests should be allowed.

of course, there are other approaches to this problem, but these are the most common ones.

### 2. What are the advantages and possible drawbacks of using GUIDs as IDs (primary keys) in a database table, instead of using integers?

**Answer:**

**Advantages of using GUIDs/UUIDs:**

- Uniqueness across Systems: The primary advantage of UUIDs is their global uniqueness.

- Safer Data Merging: UUIDs simplify the process of merging records from different databases without worrying about
  conflicting primary key values.

- Security: Sequential integers can expose information about your data, like the total number of records, and can make
  the
  system more predictable to attackers. UUIDs don't have this issue.

- Distributed Systems: For systems where you need to generate primary keys outside of the database (like in application
  code, or in offline apps), UUIDs can be very helpful, especially when there isn't easy access to the central database
  to
  get the next integer value.

**Drawbacks of using GUIDs/UUIDs:**

- Size: UUIDs are typically 16 bytes (128 bits) in size, compared to 4 bytes (32 bits) for a standard integer. This can
  be
  a problem if you have a large number of records, or if you need to store the UUID in multiple tables as a foreign key.

- Performance: Some databases are optimized for auto-incrementing integer IDs, meaning they can retrieve integer-based
  keys more quickly. The non-sequential nature of UUIDs can also lead to fragmentation in clustered indexes.

- Readability: Integer IDs are easier to read, write, and remember compared to UUIDs, which can be helpful in debugging
  or
  manual database operations.

- Complexity: Implementing UUIDs can be a bit more complex, particularly if your database or ORM doesn't natively
  support
  them.

- Legacy Systems: Not all systems support UUIDs, and integrating a UUID-based system with a legacy system that doesn't
  support them can be challenging.

### 3. What is the possible bug in the return of this method in this C# code, knowing that the method should return the current date if no close date is found?

```csharp
public static DateTime GetClosest(this DateTime dateTime, DateTime[] dates)
{
    long min = long.MaxValue;
    DateTime closestDate = new DateTime();
    foreach (DateTime date in dates)
    {
        var calc = Math.Abs(date.Ticks - dateTime.Ticks);
        if (calc < min)
        {
            min = calc;
            closestDate = date;
        }
    }
    return closestDate;
}
```

**Answer:**

Based on the description you've provided, the method should return the current date if no close date is found. However,
in the provided C# method, if the `dates` array is empty, the method will return the default value for `DateTime` which
is `DateTime.MinValue` (January 1, 0001 at 00:00:00.000), as well the method does not check if the dates array is null
or
not, so it would throw a `NullReferenceException` if the dates array is null.
To fix this bug, we can add a check to see if the dates array is empty or not, and if it is empty, we can return the
current date.

```csharp {.line-numbers}
public static DateTime GetClosest(this DateTime dateTime, DateTime[] dates)
{
    // Check if the dates array is null or empty.
    // If it is, return the current date/time as per the requirement.
    if (dates == null || dates.Length == 0)
    {
        return DateTime.Now; // Return the current date if no dates are provided.
    }

    long min = long.MaxValue;
    DateTime closestDate = new DateTime();
    foreach (DateTime date in dates)
    {
        var calc = Math.Abs(date.Ticks - dateTime.Ticks);
        if (calc < min)
        {
            min = calc;
            closestDate = date;
        }
    }
    return closestDate;
}
```

