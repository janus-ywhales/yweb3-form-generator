import { Button, message, Steps } from "antd"
import { useContext, useState } from "react"
import { StepContext } from "../../context/StepContext"
import ButtonGroup from "./ButtonGroup"
import MainForm from "./step-form/MainForm"
const { Step } = Steps


  export default function Form() {
    const { currentStep, steps } = useContext(StepContext)

    return (
        <>
            <Steps current={currentStep}>
                {steps.map((item) => (
                    <Step key={item.title} title={item.title} className="step"/>
                ))}
            </Steps>
            <MainForm />
            <ButtonGroup />
        </>

    )
}