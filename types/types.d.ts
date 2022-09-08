type Chain = 'ethereum' | 'solana' | ''

interface Wallet {
    address: string
    chain: Chain
}

interface UserPayload {
    first_name: string
    last_name: string
    email: string
    company: string
    country: string
    language: string
}

interface WalletPayload {
    user_id: number
    address: string
    chain: Chain   
}

interface SubmitUserPayload {
    user: UserPayload
    wallets: Wallets[]
    discordInfo: Discord.Info
    linkedinInfo: LinkedIn.Info
}

namespace Discord {
    interface Payload {
        username: string
        avatar: string
        discriminator: string
        id: string
    }
    
    interface Info {
        username: string
        avatar: string
        discord_id: string
    }
}

namespace LinkedIn {
    interface Payload {
        localizedLastName: string
        profilePicture: ProfilePicture
        firstName: Name
        lastName: Name
        id: string
        localizedFirstName: string 
        profilePictureIdentifier: string
    }

    interface ProfilePicture {
        displayImage: string
    }
    interface Name {
        localized: Localized
        preferredLocale: Locale
    }
    
    interface Localized {
        en_US: string
    }

    interface Locale {
        country: string
        language: string
    }

    interface Info {
        profile_picture: string
        linkedin_id: string
    }
}