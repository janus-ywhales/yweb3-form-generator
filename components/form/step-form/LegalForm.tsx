import { Box, Checkbox, FormControlLabel, FormGroup, FormLabel, Link, Modal, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { LegalContext } from "../../../context/LegalContext";
import CodeOfConduct from "../../CodeOfConduct";

export default function LegalForm() {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setClauses({
            ...clauses,
            [event.target.name]: event.target.checked
        })
    }


    const { clauses, setClauses } = useContext(LegalContext)
    const { independentClause, notFinancialAdviceClause, confidentialityClause, responsibilityClause, seedPhraseClause, codeOfConductClause } = clauses 
    return (
        <div className="flex justify-evenly align-center w-full items-center h-full flex-col">
            <FormGroup className="w-3/4 flex justify-around">
                <FormLabel> Terms and Conditions</FormLabel>
                <FormControlLabel
                    control={<Checkbox checked={independentClause} onChange={handleChange} name="independentClause"/>}
                    label="I understand that yWhales is an independent site not affiliated with YPO Global"
                    name="independentClause"
                />
                <FormControlLabel
                    control={<Checkbox checked={notFinancialAdviceClause} onChange={handleChange} name="notFinancialAdviceClause"/>}
                    label="yWhales, the website, the forum and the discussion board are not financial advisors and are not in the business of providing financial advice. I agree and understand that I am responsible for my own trading choices and tax liabilities"
                    name="notFinancialAdviceClause"
                />
                <FormControlLabel
                    control={<Checkbox checked={confidentialityClause} onChange={handleChange} name="confidentialityClause"/>}
                    label="I agree and understand that all conversations and documents posted in yWhales systems are to be treated as confidential unless given permission by the author otherwise."
                    name="confidentialityClause"
                />
                <FormControlLabel
                    control={<Checkbox checked={responsibilityClause} onChange={handleChange} name="responsibilityClause"/>}
                    label="I will report any questionable content to yWhales moderators or staff immediately"
                    name="responsibilityClause"
                />
                <FormControlLabel
                    control={<Checkbox checked={seedPhraseClause} onChange={handleChange} name="seedPhraseClause"/>}
                    label="I understand that no one on yWhales will EVER ask for your password or Seed key. That I will never give this information to anyone online for any reason."
                    name="seedPhraseClause"
                />
            </FormGroup>
            <CodeOfConduct />
        </div>
    )
}