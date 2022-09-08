import { createContext, useState } from "react"
import { uniqBy } from "lodash"

export const useWalletContext = () => {
    const [wallets, setWallets] = useState<Wallet[]>([])

    const isWalletInWallets = (wallet: Wallet) => wallets.find(w => w.address === wallet.address) !== undefined
    const addWallet = (wallet: Wallet) => setWallets(wallets.concat(wallet))
    const areWalletsValid = () => wallets.length > 0

    return {
        wallets,
        addWallet,
        isWalletInWallets,
        areWalletsValid,
        setWallets
    }
}

export const WalletContext = createContext(undefined)