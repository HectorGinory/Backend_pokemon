const config = {
    SECRET: process.env.SECRET,
    SALT_ROUND: Number(process.env.SALT_ROUND),
    DDBB: process.env.DDBB,
    PORT: process.env.PORT
}

export default config