# Online Order Bot Telegram

### Noted: \*Database server was disconnect, therefore database still working on local server and this is not already use a botkit

#### Bot can running with online server database with mysql

#### This project doesn't completely

## Connect to database and migrate all of the tables

### Create a database

```sh
CREATE DATABASE db_name
```

### Migrate all of the data with sequelize

```sh
sequelize db:migrate
```

## How To Start

```sh
$ npm run start
```

### Username of bot

```sh
@fadli2_ecommerce_bot
```

### Bot Commands

| Command      | Function         |
| ------------ | ---------------- |
| /start       | Start Chat Bot   |
| /product     | Get Product List |
| /description | Get Store info   |
| /keranjang   | Check Cart Order |
