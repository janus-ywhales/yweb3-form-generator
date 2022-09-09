import { createContext, useState } from "react"
import isEmail from 'validator/lib/isEmail'
import { uniq } from 'lodash'

export const useUserContext = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [company, setCompany] = useState('')
    const [country, setCountry] = useState('')
    const [language, setLanguage] = useState('')
    const [discordInfo, setDiscordInfo] = useState<Discord.Info>()
    const [linkedinInfo, setLinkedinInfo] = useState<LinkedIn.Info>()

    const [firstNameValidationErrors, setFirstNameValidationErrors] = useState([])
    const [lastNameValidationErrors, setLastNameValidationErrors] = useState([])
    const [emailValidationErrors, setEmailValidationErrors] = useState([])
    const [companyValidationErrors, setCompanyValidationErrors] = useState([])

    const setUserInfo = (userInfo: UserPayload) => {
        setFirstName(userInfo.first_name)
        setLastName(userInfo.last_name)
        setEmail(userInfo.email)
        setCompany(userInfo.company)
    }

    const getIsUserInfoValid = () => {
        let areAllFieldsValid = true

        if(firstName === '') {
            areAllFieldsValid = false
            setFirstNameValidationErrors(uniq(firstNameValidationErrors.concat(["First name is required"])))
        }

    if(lastName === '') {
            areAllFieldsValid = false
            setLastNameValidationErrors(uniq(lastNameValidationErrors.concat(['Last name is required'])))   
        }

        let newEmailValidationErrors = []
        if(email === '')  {
            areAllFieldsValid = false
            newEmailValidationErrors = uniq(newEmailValidationErrors.concat(['Email is required']))
        }

        if(!isEmail(email)) {
            areAllFieldsValid = false
            newEmailValidationErrors = uniq(newEmailValidationErrors.concat('Email is not a valid email'))
        }

        setEmailValidationErrors(newEmailValidationErrors)

        if(company === '') {
            areAllFieldsValid = false
            setCompanyValidationErrors(uniq(companyValidationErrors.concat(["Company is required"])))
        }

        return areAllFieldsValid
    }

    const getIsSocialMediaInfoValid = () => discordInfo !== undefined && linkedinInfo !== undefined


    return {
        firstName,
        setFirstName,
        lastName,
        setLastName,
        email,
        setEmail,
        company,
        setCompany,
        firstNameValidationErrors,
        setFirstNameValidationErrors,
        lastNameValidationErrors,
        setLastNameValidationErrors,
        emailValidationErrors,
        setEmailValidationErrors,
        companyValidationErrors,
        setCompanyValidationErrors,
        getIsUserInfoValid,
        setUserInfo,
        discordInfo,
        setDiscordInfo,
        country,
        setCountry,
        language,
        setLanguage,
        linkedinInfo,
        setLinkedinInfo,
        getIsSocialMediaInfoValid
    }
}

export const UserContext = createContext(undefined)