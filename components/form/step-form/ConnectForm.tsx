import Image from "next/image"
import { useContext, useEffect } from "react"
import ChainSelect from "./chain-select/ChainSelect"
import { ChainContext } from "../../../context/ChainContext"
import ConnectSolana from "./chain-select/ConnectSolana"
import ConnectEthereum from "./chain-select/ConnectEthereum"
import { WALLET_INFO } from "../../../consts"
import { WalletContext } from "../../../context/WalletContext"

export default function ConnectForm() {
    const { isChainSelected, isSolanaSelected, isEthereumSelected } = useContext(ChainContext)
    const { setWallets } = useContext(WalletContext)
    useEffect(() => {
        const savedWalletInfo = sessionStorage.getItem(WALLET_INFO)

        if(savedWalletInfo) {
            setWallets(JSON.parse(savedWalletInfo))
        }
    }, [])
    return (
        <>
            {!isChainSelected() && <ChainSelect />}
            {isSolanaSelected() && <ConnectSolana />}
            {isEthereumSelected() && <ConnectEthereum />}
        </>
    )
}