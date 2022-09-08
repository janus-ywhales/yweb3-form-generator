import { CheckCircle } from "@mui/icons-material";
import { AxiosResponse } from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { DISCORD_CDN_BASE_URL, DISCORD_INFO } from "../../consts";
import { UserContext } from "../../context/UserContext";
import { getDiscordInfo, getLinkedinInfo } from "../../requests";
import { StyledButton } from "./step-form/ui";

export default function SocialForm() {
    const { discordInfo, setDiscordInfo, linkedinInfo, setLinkedinInfo, setCountry, setLanguage } = useContext(UserContext)
    const { query } = useRouter()

    useEffect(() => {
        getDiscordInfo().then((res: AxiosResponse<Discord.Payload>) => {
            if(res.data) {
                setDiscordInfo({
                    username: `${res.data.username}#${res.data.discriminator}`,
                    avatar: `${DISCORD_CDN_BASE_URL}/${res.data.id}/${res.data.avatar}`,
                    discord_id: res.data.id                 
                })
            }
        })
        getLinkedinInfo().then((res: AxiosResponse<LinkedIn.Payload>) => {
            if(res.data) {
                setCountry(res.data.firstName.preferredLocale.country)
                setLanguage(res.data.firstName.preferredLocale.language)
                setLinkedinInfo({
                    profile_picture: res.data.profilePictureIdentifier,
                    linkedin_id: res.data.id
                })
            }    
        })
    }, [])

    return (
        <div className="flex justify-evenly align-center items-center h-full flex-col">
            { false ? 
                <StyledButton disabled={true} startIcon={<CheckCircle/>}>Discord Connected</StyledButton> :
                <Link href={`/api/auth/discord/login?session=${query.session}`} passHref>
                    <StyledButton>Connect Discord</StyledButton>
                </Link>
            }
            { linkedinInfo ?
                <StyledButton disabled={true} startIcon={<CheckCircle/>}>LinkedIn Connected</StyledButton> :
                <Link href={`/api/auth/linkedin/login?session=${query.session}`} passHref>
                    <StyledButton>Connect LinkedIn</StyledButton>
                </Link>
            }
        </div>
    )
} 