module.exports = {
    HOST: "172.18.0.2",
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