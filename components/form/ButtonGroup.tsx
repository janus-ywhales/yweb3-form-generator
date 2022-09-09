import { Button, message } from "antd"
import { useContext } from "react"
import { USER_INFO, WALLET_INFO } from "../../consts"
import { StepContext } from "../../context/StepContext"
import { UserContext } from "../../context/UserContext"
import { WalletContext } from "../../context/WalletContext"
import { submitUser } from '../../requests'

export default function ButtonGroup() {
    const { currentStep, steps, isCurrentStepLast, isCurrentStepInBounds, incrementStep, decrementStep, isPastFirstStep } = useContext(StepContext)
    const { firstName, lastName, email, company, country, language, getIsUserInfoValid, discordInfo, linkedinInfo, getIsSocialMediaInfoValid } = useContext(UserContext)
    const { wallets, areWalletsValid } = useContext(WalletContext)

    const getShouldIncrementStep = () => {
        let shouldIncrementStep = true
        if(currentStep === 0 && !getIsUserInfoValid()) {
           shouldIncrementStep = false
        }
        if(currentStep >= 1 && !areWalletsValid()) {
            shouldIncrementStep = false
            message.error('At least one wallet must be connected')
        }
        return shouldIncrementStep
    }

    const saveStepStateToStorage = () => {
        if(currentStep === 0) {
            sessionStorage.setItem(USER_INFO, JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                email,
                company
            }))
        }
        if(currentStep === 1) {
            sessionStorage.setItem(WALLET_INFO, JSON.stringify(wallets))
        }
    }

    return (
        <div className="flex flex-row my-6 mx-3 justify-between flex-initial w-40">
            { isCurrentStepInBounds() && (
                <Button
                    type="primary"
                    onClick={() => {
                        if(getShouldIncrementStep()) {
                            saveStepStateToStorage()
                            incrementStep()
                        }
                    }}
                >
                    Next
                </Button>
            )}
            { isCurrentStepLast() && (
                <Button
                    type="primary"
                    onClick={() => {
                        submitUser({
                            user: {
                                first_name: firstName,
                                last_name: lastName,
                                email,
                                company,
                                language,
                                country
                            },
                            wallets,
                            discordInfo,
                            linkedinInfo
                        })
                        message.success("Information submitted successfully.")
                    }}
                    disabled={ !areWalletsValid() || !getIsSocialMediaInfoValid()}
                >

                    Done
                </Button>
            )}
            { isPastFirstStep() && (
                <Button
                    onClick={() => decrementStep()}
                >
                    Previous
                </Button>
            )}
        </div>
    )
}