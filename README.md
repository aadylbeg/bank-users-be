## Getting Start

run command `npm install`

run command `npm install sequelize sequelize-cli pg pg-hstore --save`

create `.env` file in root with following contents:

```shell
    JWT_SECRET = < your_secret >
```

create `config` folder in root and `config.json` file in it with following contents:

```shell
    {
        "development": {
            "username": < database_user >,
            "password": < database_password >,
            "database": < database_name >,
            "host": < database_host >,
            "dialect": "postgres",
            "logging": false
        },
    }
```

Note: Replace `<your_secret>`, `<database_user>`, `<database_host>`, `<database_name>`, and `<database_password>` with your actual values.

run command `node .\utils\sync.js` to sync database

Seed the admin into the database by running the following command:

```shell
   sequelize db:seed --seed Admins
```

run command `npm start` to start the project
