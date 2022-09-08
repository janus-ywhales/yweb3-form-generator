export default async function handler(req, res) {
    const OAuthScope = "r_liteprofile r_emailaddress"
    const OAuthData = new URLSearchParams({
        response_type: "code",
        client_id: process.env.LINKEDIN_CLIENT_ID,
        redirect_uri: `${process.env.DOMAIN}/api/auth/linkedin/callback`,
        scope: OAuthScope,
        state: req.query.session
    })


    res.redirect(`https://linkedin.com/oauth/v2/authorization?${OAuthData}`)
}