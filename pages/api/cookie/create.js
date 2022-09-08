
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

export default async function handler(req, res) {
    const cookie = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')

    await prisma.cookies.create({
        data: {
            cookie
        }
    })

    res.status(200).json({ url: `${process.env.DOMAIN}/?session=${cookie}` })
}