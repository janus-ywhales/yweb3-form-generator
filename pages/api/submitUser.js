
import { PrismaClient } from '@prisma/client'
import { wallet } from '@rainbow-me/rainbowkit'
import { WebhookClient } from "discord.js";


const prisma = new PrismaClient()

export default async function handler(req, res) {
  const { user } = req.body

  const newUser = await prisma.users.create({
    data: {
        ...user
    }
  })

  const walletsWithId = req.body.wallets.map(wallet => ({...wallet, user_id: newUser.id}))

  await prisma.wallets.createMany({
    data: walletsWithId,
    skipDuplicates: true
  })

  const discordInfoWithId = { user_id: newUser.id, ...req.body.discordInfo }

  await prisma.discord_users.create({
    data: discordInfoWithId
  })

  const linkedinInfoWithId = { user_id: newUser.id, profile_picture: req.body.linkedinInfo.profilePicture, ...req.body.linkedinInfo } 

  await prisma.linkedin_users.create({
    data: linkedinInfoWithId
  })

  const webhookClient = new WebhookClient({ id: process.env.DISCORD_WEBHOOK_ID, token: process.env.DISCORD_WEBHOOK_TOKEN });

  webhookClient.send({
    content: `Discord Id:${discordInfoWithId.discord_id}\nMention:<@${discordInfoWithId.discord_id}>\nDiscord Username:${discordInfoWithId.username}\nName:${user.first_name} ${user.last_name}\nEmail:${user.email}\nCompany:${user.company}\nCountry:${user.country}`,
    username: 'yWeb3 Form Bot',
    avatarURL: 'https://i.imgur.com/AfFp7pu.png',

  });


  res.status(200).json({ name: 'Success' })
}
