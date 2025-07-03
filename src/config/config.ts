export default () => ({
    jwt: {
        accessTokensSecret: process.env.JWT_ACCESS || 'defaultAccessTokenSecret',
        accessTokenExpiry: process.env.JWT_ACCESS_EXP || '10m',
        refreshTokensSecret: process.env.JWT_REFRESH || 'defaultRefreshTokenSecret',
        refreshTokenExpiry: process.env.JWT_REFRESH_EXP || '10d'
    },
    mongo: {
        uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/user-management',
    },
    otp: {
        expiry: process.env.OTP_EXPIRY || '5m',
    },
    email: {
        emailId: process.env.EMAIL_ID || "email@email.com",
        password: process.env.EMAIL_ID_PASSWORD || 'password'
    },
    fileUpload: {
        destination: process.env.FILE_UPLOAD_DEST || './uploads',
    },
});