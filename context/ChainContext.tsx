import { createContext, useState } from "react"

export const useChainContext = () => {
    const [chain, setChain] = useState<Chain>('')

    const isChainSelected = () => chain !== ''
    const isSolanaSelected = () => chain === 'solana'
    const isEthereumSelected = () => chain === 'ethereum'

    return {
        chain,
        setChain,
        isChainSelected,
        isSolanaSelected,
        isEthereumSelected
    }
}

export const ChainContext = createContext(undefined)