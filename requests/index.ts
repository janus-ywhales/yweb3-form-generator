import axios from "axios"

export const submitUser = (body: SubmitUserPayload) => {
    return axios.post(
        `/api/submitUser`,
        body
    )
}

export const getDiscordInfo = () => {
    return axios.get(
        `/api/discord`
    )
}

export const getLinkedinInfo = () => {
    return axios.get(
        `/api/linkedin`
    )
}

export const isValidCookie = (cookie) => {
    return axios.get(
        `/api/cookie/${cookie}`
    )
}