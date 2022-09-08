import { createContext, useState } from "react"

export const useStepContext = () => {
    const [currentStep, setCurrentStep] = useState(0)

    const steps = [
        {
          title: 'Basic',
          content: 'First-content',
        },
        {
          title: 'Connect Wallet',
          content: 'Second-content',
        },
        {
          title: 'Connect Social Media',
          content: 'Last-content',
        },
      ]
    

    const incrementStep = () => setCurrentStep(currentStep + 1)
    const decrementStep = () => setCurrentStep(currentStep - 1)
    const isCurrentStepInBounds = () => currentStep < steps.length - 1
    const isCurrentStepLast = () => currentStep === steps.length - 1
    const isPastFirstStep = () => currentStep > 0
    const isCurrentStepBasic = () => currentStep === 0
    const isCurrentStepConnect = () => currentStep === 1
    const isCurrentStepSocial = () => currentStep === 2
    return {
        currentStep,
        steps,
        setCurrentStep,
        incrementStep,
        decrementStep,
        isCurrentStepInBounds,
        isCurrentStepLast,
        isCurrentStepBasic,
        isCurrentStepConnect,
        isCurrentStepSocial,
        isPastFirstStep
    }
}

export const StepContext = createContext(undefined)
