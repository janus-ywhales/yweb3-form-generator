import { PrismaClient } from '@prisma/client'
import moment from 'moment'
const prisma = new PrismaClient()

export default async function handler(req, res) {
    const { cookie } = req.query

    if(cookie === undefined) {
        res.status(200).json({ isValid: false })
    } else {
        const cookieMaybe = await prisma.cookies.findFirst({
            where: {
                cookie,
                timestamp: {
                    lte: moment().toDate()
                    // gte: moment().subtract(10, 'minutes').toDate()
                }
            }
        })
    
        res.status(200).json({ isValid: cookieMaybe !== null })
    }

}