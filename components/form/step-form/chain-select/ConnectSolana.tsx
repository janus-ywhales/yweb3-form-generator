import { PlusOutlined } from "@ant-design/icons";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Button } from "antd";
import { useContext, useEffect } from "react";
import { ChainContext } from "../../../../context/ChainContext";
import { WalletContext } from "../../../../context/WalletContext";

export default function ConnectSolana() {
    const { publicKey, disconnect, connected } = useWallet()
    const { setChain } = useContext(ChainContext)
    const { isWalletInWallets, addWallet, wallets } = useContext(WalletContext)

    useEffect(() => {
        if(connected && !isWalletInWallets({address: publicKey, chain: 'solana'})) {
            addWallet({
                address: publicKey?.toString(),
                chain: 'solana'
            })
        }
    }, [connected])

    return (
        <div className="flex justify-center align-center items-center h-full flex-col">
            <WalletMultiButton />
            <Button 
                className="my-10 text"
                shape="round" 
                type="text"
                style={{ color: 'white'}}
                icon={<PlusOutlined />}
                onClick={() => {
                    disconnect()
                    setChain('')
                }}
            >
                Connect another wallet
            </Button>
        </div>
    )
}