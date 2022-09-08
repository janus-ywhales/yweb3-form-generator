import { ironOptions } from "../../../../lib/config"
import { withIronSessionApiRoute } from "iron-session/next"
import axios from "axios"

export default withIronSessionApiRoute(async (req, res) => {
    if(req.query.error === 'user_cancelled_login') {
        res.redirect(`/?currentStep=2&session=${req.query.state}`)
    }

    if (!req.query.code) {
        res.status(404).redirect("/404")
        return
    }

    const OAuthData = new URLSearchParams({
        grant_type: "authorization_code",
        code: req.query.code,
        redirect_uri: `${process.env.DOMAIN}/api/auth/linkedin/callback`,
        client_id: process.env.LINKEDIN_CLIENT_ID,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET
    })

    try {
        const { data } = await axios.post(
            "https://www.linkedin.com/oauth/v2/accessToken",
            OAuthData,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Accept": "application/json",
                }
            }
        )

        const { access_token, expires_in } = data

        const { data: user } = await axios.get(
            "https://api.linkedin.com/v2/me?projection=(id,firstName,lastName,profilePicture(displayImage~:playableStreams))",
            {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            }    
        )


        req.session.linkedinInfo = {
          profilePictureIdentifier: user.profilePicture['displayImage~']?.elements[3]['identifiers'][0].identifier,
            ...user
        }
        delete req.session.linkedinInfo.profilePicture['displayImage~']
        await req.session.save()
        res.redirect(`/?currentStep=2&session=${req.query.state}`)
    } catch (e) {
        console.error(e)
        res.redirect('/')
        return
    }
}, ironOptions)