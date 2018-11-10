// mongodb database uri
let DB_URL = "mongodb://localhost/payment-integration";

// node js server listening port
let SERVER_PORT = process.env.PORT || 3000;

//salt rounds factor for password hashing
const SALT_ROUNDS = 10;

// random string secret used for jwt token generating
const JWT_SECRET = process.env.JWT_SECRET || "z7m7NQgMAi7F";

// Maximum pagination Page Size
const MAX_PAGE_SIZE = 2;

// pagination default selected sorting field,
const DEFAULT_SORT = "date_updated";

// user roles in the application
const ROLES = ["ADMIN", "USER"];

// a default role when none is provided
const DEFAULT_ROLE = "USER";

//select test database if it is on test environment
console.log("test RUN out")
if (process.env.NODE_ENV === 'test') {
    DB_URL += '-test';
    SERVER_PORT = 3001;
    console.log("test RUN in")
}

module.exports = {
    DB_URL, DEFAULT_ROLE, DEFAULT_SORT, MAX_PAGE_SIZE, JWT_SECRET, ROLES, SALT_ROUNDS, SERVER_PORT
};