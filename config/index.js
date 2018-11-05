exports = {
    // mongodb database uri
    DB_URL: "mongodb://localhost/payment-integration",

    // node js server listening port
    SERVER_PORT: process.env.PORT || 3000,

    //salt rounds factor for password hashing
    SALT_ROUNDS: 10,

    // random string secret used for jwt token generating
    JWT_SECRET : process.env.JWT_SECRET || "z7m7NQgMAi7F",

    // Maximum pagination Page Size
    MAX_PAGE_SIZE: 2,

    // pagination default selected sorting field,
    DEFAULT_SORT: "date_updated"
};