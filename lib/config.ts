export const ironOptions = {
    cookieName: "yWeb3 Form Generator",
    password: process.env.SESSION_COOKIE_PASSWORD,
    ttl: 1,
    cookieOptions: {
        secure: process.env.NODE_ENV === "production"    
    }
}