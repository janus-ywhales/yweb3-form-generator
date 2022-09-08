import { ironOptions } from '../../lib/config'
import { withIronSessionApiRoute } from 'iron-session/next'

export default withIronSessionApiRoute(async (req, res) => {
    res.status(200).json(req.session.discordInfo)
}, ironOptions)