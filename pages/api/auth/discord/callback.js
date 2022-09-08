import axios from "axios";
import { DISCORD_INFO } from '../../../../consts'
import { ironOptions } from '../../../../lib/config'
import { withIronSessionApiRoute } from 'iron-session/next'
const OAuthScope = ['identify'].join(" ")


export default withIronSessionApiRoute(async (req, res) => {

    console.log('req.query.redirect_uri', req.query.redirect_uri)
    if(req.query.error === 'access_denied') {
      res.redirect(`/?currentStep=2&session=${req.query.state}`)
    }
    if (!req.query.code) {
      res.status(404).redirect("/404")
      return
    }

    try {
      const { data } = await axios.post(
        "https://discord.com/api/oauth2/token",
        new URLSearchParams({
          client_id: process.env.DISCORD_CLIENT_ID,
          client_secret: process.env.DISCORD_CLIENT_SECRET,
          grant_type: "authorization_code",
          code: req.query.code,
          redirect_uri: `${process.env.DOMAIN}/api/auth/discord/callback`,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json",
          },
        }
      )
  
      if (data.scope !== OAuthScope) {
        return res
          .status(403)
          .send(
            `Expected scope "${OAuthScope}" but received scope "${data.scope}"`
          );
      }
  
      const { data: user } = await axios.get(
        "https://discordapp.com/api/v9/users/@me",
        {
          headers: {
            Authorization: `Bearer ${data.access_token}`,
          },
        }
      )
  
  
      if (user.email === null) {
        return res
          .status(400)
          .send("Please verify your Discord's account E-mail before logging in.");
      }

    req.session.discordInfo = user 

    await req.session.save()

    res.redirect(`/?currentStep=2&session=${req.query.state}`)
    } catch (e) {
      console.error(e)
      res.redirect('/')
      return
    }
  }, ironOptions)