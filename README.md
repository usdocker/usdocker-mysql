# USDocker for MySQL

This script creates a MySQL applicantion from a docker image.
You can persist your mysql and customize your mysql without expertise in Docker.

## Installing

```bash
npm install -g usdocker-mysql
```

## Start the mysql service

```
usdocker mysql up
```

## Stop the mysql service

```
usdocker mysql down
```

## Run the mysql-client command line interface

```
usdocker mysql client
```

## Connect to the mysql bash interface

```
usdocker mysql connect
```

## Dump the database and save it to the /tmp/dump folder.

```
usdocker mysql dump [database]
```

## Analyse the database service and get insights for tuning it

```
usdocker mysql analyse
```

## Customize your Service

You can setup the variables by using:

```bash
usdocker mysql --set variable=value
```

Default values

  - image: "mysql:5.7",
  - folder: "$HOME/.usdocker/data/mysql",
  - port: 3306,
  - rootPassword: "password" (note: only will work at the first time)


## Customize the "$HOME/.usdocker/setup/mysql/conf.d/custom.cnf"

Use your own setup for mysql changing this file. 

```
[mysqld]
bind-address = 0.0.0.0

[mysqldump]
quick
quote-names
max_allowed_packet      = 16M
```

## Customize the "$HOME/.usdocker/setup/mysql/home/"

This folder exists for setup the database dump. You have only edit the file .my.cnf with the following setup:

```
[mysqldump]
user=backup
password=PasSWord
```
