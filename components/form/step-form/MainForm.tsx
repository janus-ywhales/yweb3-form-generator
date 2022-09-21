import { useContext, useEffect } from "react"
import { StepContext } from "../../../context/StepContext"
import { useRouter } from "next/router"
import SocialForm from "../SocialForm"
import BasicForm from "./BasicForm"
import ConnectForm from "./ConnectForm"
import LegalForm from "./LegalForm"

export default function MainForm() {
    const { isCurrentStepBasic, isCurrentStepConnect, isCurrentStepSocial, isCurrentStepLegal, setCurrentStep, currentStep } = useContext(StepContext)
    const { query } = useRouter()
    

    useEffect(() => {
        if(query.currentStep) {
            setCurrentStep(parseInt(query.currentStep as string))
        }
    }, [query.currentStep])


    return (
        <div className="form-container w-full my-6 h-96 flex-initial justify-center content-center">
            { isCurrentStepBasic() && (
                <BasicForm />
            )}
            { isCurrentStepConnect() && (
                <ConnectForm />
            )}
            { isCurrentStepSocial() && (
                <SocialForm />
            )}
            { isCurrentStepLegal() && (
                <LegalForm />
            )}
        </div>
    )
}