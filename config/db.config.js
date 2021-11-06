module.exports = {
    HOST: "db",
    USER: "postgres",
    PASSWORD: "postgres",
    PORT: 5432,
    DB: "postgres",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};