import dotenv from 'dotenv'
dotenv.config()
const CONSTANTS = {
    port : process.env.PORT,
    database_url : process.env.DBURL,
    jwtSecret: process.env.JWT_SECRET_KEY,
    jwtAlgorithm: 'HS256',
}

export default CONSTANTS