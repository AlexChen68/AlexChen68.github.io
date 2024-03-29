---
title: Mysql SQL 语法
date: 2022-12-26
order: 2
---

# Mysql SQL 语法

## 1. 数据库操作

- 创建数据库

```sql
CREATE DATABASE [DATABASE_NAME] 
  DEFAULT CHARACTER set [CHARACTER_TYPE] 
  COLLATE [CHARACTER_COLLATE_TYPE];
```

:::tip 解释
DATABASE_NAME: 数据库名称

CHARACTER_TYPE: 数据库中表的默认编码规则（可以省略 `DEFAULT CHARACTER set [CHARACTER_TYPE]` 部分）

CHARACTER_COLLATE_TYPE: 数据库中表的默认排序规则（可以省略 `COLLATE [CHARACTER_COLLATE_TYPE]` 部分）
:::

示例：

```sql
CREATE DATABASE `daydayup`;
CREATE DATABASE `daydayup` default character set utf8mb4 collate utf8mb4_general_ci;
```

- 查看数据库列表

```sql
SHOW DATABASES;
```

- 使用数据库

```sql
USE [DATABASE_NAME];
```

- 查看当前使用的数据库

```sql
SELECT DATABASE();
```

- 删除数据库

```sql
DROP DATABASE [DATABASE_NAME];
```

## 2. 表操作

### 2.1 创建和查看表

- 查看表列表

```sql
SHOW TABLES;
```

- 创建数据表

```sql
CREATE TABLE [TABLE_NAME] ([COLUMN_NAME] [DATA_TYPE] [LIMITERS]...);
```

:::tip 解释
TABLE_NAME: 表名称

COLUMN_NAME: 字段名称

DATA_TYPE: 字段数据类型

LIMITERS: 其他限定条件，比如非空、默认值等等
:::

- 查看表结构

```sql
DESCRIBE [TABLE_NAME]
```

### 2.2 修改表结构

- 添加列

```sql
ALTER TABLE [TABLE_NAME] ADD [COLUMN_NAME] [DATA_TYPE] [LIMITERS];
```

- 修改列和属性

```sql
ALTER TABLE [TABLE_NAME] CHANGE [OLD_COLUMN_NAME] [NEW_COLUMN_NAME] [DATA_TYPE] [LIMITERS];
```

- 删除列

```sql
ALTER TABLE [TABLE_NAME] DROP COLUMN [COLUMN_NAME];
```

### 2.3 删除表

```sql
DROP TABLE [TABLE_NAME];
```

## 3. 数据操作

### 3.1 插入数据

- 普通插入

```sql
INSERT INTO [TABLE_NAME]([COLUMN_NAME1], [COLUMN_NAME2]...) VALUES([VALUE1], [VALUE2]...);
```

- 插入查询出来的数据

```sql
INSERT INTO [TABLE_NAME]([COLUMN_NAME1], [COLUMN_NAME2]...)
SELECT [COLUMN_NAME1], [COLUMN_NAME2]...
FROM [OTHER_TABLE_NAME];
```

- 复制一个表的数据到一个新表

```sql
CREATE TABLE [NEW_TABLE_NAME] AS
SELECT * FROM [TABLE_NAME];
```

### 3.2 更新数据

- 条件更新

```sql
UPDATE [TABLE_NAME]
SET [COLUMN_NAME] = [VALUE]
WHERE [COLUMN_NAME] = [VALUE];
```

### 3.3 删除数据

- 条件删除

```sql
DELETE FROM [TABLE_NAME]
WHERE [COLUMN_NAME] = [VALUE];
```

- 清空表

```sql
TRUNCATE TABLE [TABLE_NAME];
```

:::warning 注意事项
使用**更新**和**删除**操作时一定要用 `WHERE` 子句，不然会把整张表的数据都破坏!!!

可以先用 `SELECT` 语句进行测试，防止错误删除。
:::

### 3.4 查询数据

- 普通查询

```sql
SELECT [COLUMN_NAME1], [COLUMN_NAME2]...
FROM [TABLE_NAME];
```

- DISTINCT

使用 `DISTINCT` 可以去除结果的重复项，相同的结果只出现一次；它作用于所有列，也就是说所有列的值都相同才算相同。

```sql
SELECT DISTINCT  [COLUMN_NAME1], [COLUMN_NAME2]...
FROM [TABLE_NAME];
```

- LIMIT

限制返回的行数。可以有两个参数，第一个参数为起始行，从 0 开始；第二个参数为返回的总行数。

```sql
SELECT [COLUMN_NAME1], [COLUMN_NAME2]...
FROM [TABLE_NAME] LIMIT 0,1;
```

### 3.5 排序

- ASC : 升序 (默认)
- DESC : 降序

可以按多个列进行排序，并且为每个列指定不同的排序方式：

```sql
SELECT [COLUMN_NAME1], [COLUMN_NAME2]...
FROM [TABLE_NAME] ORDER BY [COLUMN_NAME1] DESC;
```

### 3.6 条件过滤

使用 `WHERE` 关键字可以过滤掉不符合指定条件的数据行，可用的操作符列表如下：

|   操作符   |     说明     |
| :--------: | :----------: |
|     =      |     等于     |
|     <      |     小于     |
|     >      |     大于     |
| <> 或者 != |    不等于    |
| <= 或者 !> |   小于等于   |
| >= 或者 !< |   大于等于   |
|  BETWEEN   | 在两个值之间 |
|  IS NULL   |  为 NULL 值  |

**AND 和 OR** 用于连接多个过滤条件。优先处理 AND，当一个过滤表达式涉及到多个 AND 和 OR 时，可以使用 () 来决定优先级，使得优先级关系更清晰。

**IN** 操作符用于匹配一组值，其后也可以接一个 SELECT 子句，从而匹配子查询得到的一组值。

**NOT** 操作符用于否定一个条件。

### 3.7 通配符

通配符也是用在过滤语句中，但它只能用于文本字段。

- **%** 匹配 >=0 个任意字符；
- **_** 匹配 ==1 个任意字符；
- **[ ]** 可以匹配集合内的字符，例如 [ab] 将匹配字符 a 或者 b。用脱字符 ^ 可以对其进行否定，也就是不匹配集合内的字符。

使用 Like 来进行通配符匹配。

### 3.8 别名和拼接	

计算字段通常需要使用 **AS** 来取别名，否则输出的时候字段名为计算表达式。

```sql
SELECT col1 * col2 AS alias
FROM mytable;
```

**CONCAT()** 用于连接两个字段。许多数据库会使用空格把一个值填充为列宽，因此连接的结果会出现一些不必要的空格，使用 **TRIM()** 可以去除首尾空格。

```sql
SELECT CONCAT(TRIM(col1), '(', TRIM(col2), ')') AS concat_col
FROM mytable;
```



## 参考资料

- [Mysql 8.0 官方手册 - SQL 语句](https://dev.mysql.com/doc/refman/8.0/en/sql-statements.html)
- [SQL 语言 - SQL 语法基础](https://pdai.tech/md/db/sql-lan/sql-lan.html)