export default async function handler (req, res) {
    const { session } = req.query
    const OAuthScope = ['identify'].join()
    const OAuthData = new URLSearchParams({
        response_type: "code",
        client_id: process.env.DISCORD_CLIENT_ID,
        state: process.env.SESSION_COOKIE_PASSWORD,
        redirect_uri: `${process.env.DOMAIN}/api/auth/discord/callback`,
        scope: OAuthScope,
        state: session
    })

    res.redirect(`https://discordapp.com/oauth2/authorize?${OAuthData}`)
}