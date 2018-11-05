exports = {
    DB_URL: "mongodb://localhost/",
    DB_NAME: "audio-converter",
    SERVER_PORT: process.env.PORT || 3000,
    SALT_ROUNDS: 10,
    JWT_SECRET : "z7m7NQgMAi7F",
    //default media save path
    MEDIA_PATH : './public/audio',
    // Maximum Page Size
    MAX_PAGE_SIZE: 2,
    // DEFAULT SORT FIELD,
    DEFAULT_SORT: "date_updated"
};