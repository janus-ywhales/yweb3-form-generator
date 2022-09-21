import { createContext, useState } from "react"

export const useLegalContext = () => {
    const [clauses, setClauses] = useState({
        independentClause: false,
        notFinancialAdviceClause: false,
        confidentialityClause: false,
        responsibilityClause: false,
        seedPhraseClause: false,
        codeOfConductClause: false
    })

    const areAllClausesChecked = () => Object.keys(clauses).every(clause => clauses[clause] === true)

    return {
        clauses,
        setClauses,
        areAllClausesChecked
    }
}

export const LegalContext = createContext(undefined)