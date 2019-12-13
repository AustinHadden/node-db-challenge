// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    useNullAssDefault: true,
    connection: {
      filename: "./data/sprint.db3"
    },
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  }
};
