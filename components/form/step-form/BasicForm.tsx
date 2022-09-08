import { TextField, Box } from "@mui/material";
import { AccountCircle, Mail } from "@mui/icons-material";
import { Form, Input } from "antd";
import { useContext, useEffect } from "react";
import { UserContext } from "../../../context/UserContext";
import { Business } from "@mui/icons-material";
import { USER_INFO } from "../../../consts";
import Image from "next/image";
export default function BasicForm() {
    const {
            firstName,
            lastName,
            email,
            company,
            setFirstName,
            setLastName,
            setEmail,
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
            setUserInfo
        } = useContext(UserContext)

    useEffect(() => {
        const savedUserInfo = sessionStorage.getItem(USER_INFO)

        if(savedUserInfo) {
            setUserInfo(JSON.parse(savedUserInfo))
        }
    }, [])

    return (
        <div className="h-full flex flex-row justify-evenly">
            <div className="flex justify-around align-center items-center h-full flex-col">
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField
                        id="first-name"
                        label="First Name"
                        variant="standard" 
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        sx={{ mr: 5 }}
                        error={firstNameValidationErrors.length > 0}
                        value={firstName}
                        helperText={firstNameValidationErrors.join(", ")}
                    />
                    <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField
                        id="last-name"
                        label="Last Name"
                        variant="standard" 
                        onChange={(e) => setLastName(e.target.value)}
                        error={lastNameValidationErrors.length > 0}
                        helperText={lastNameValidationErrors.join(", ")}
                        required
                        value={lastName}
                    />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <Mail sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField
                        id="email"
                        label="Email"
                        variant="standard"
                        error={emailValidationErrors.length > 0}
                        helperText={emailValidationErrors.join(", ")}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                        value={email}
                    />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end'}}>
                    <Business sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField
                        id="company"
                        label="Company"
                        variant="standard"
                        onChange={(e) => setCompany(e.target.value)}
                        error={companyValidationErrors.length > 0}
                        helperText={companyValidationErrors.join(", ")}
                        required
                        value={company}
                    />
                </Box>
            </div>
            <div className="flex flex-col justify-evenly">
                <Image
                    src="/favicon.ico"
                    height={170}
                    width={80}
                />
                <h1 className="text-white text-5xl">yWhales</h1>
            </div>
        </div>

    )
}