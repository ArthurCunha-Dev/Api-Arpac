export default {
    secret_token: process.env.SECRET_TOKEN,
    expires_in_token: process.env.EXPIRES_TOKEN || '1h',
    secret_refresh_token: process.env.SECRET_REFRESH_TOKEN,
    expires_in_refresh_token: process.env.EXPIRES_REFRESH_TOKEN || '10d'   
}