import { PlusOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'
import { useDisconnect } from 'wagmi'
import { ConnectKitButton } from 'connectkit'

import { useContext } from 'react'
import { WalletContext } from '../../../../context/WalletContext'
import { ChainContext } from '../../../../context/ChainContext'
import { StyledButton } from '../ui'


export default function ConnectEthereum() {
    const { disconnect } = useDisconnect()

    const { isWalletInWallets, addWallet, wallets } = useContext(WalletContext)
    const { setChain } = useContext(ChainContext)

    return (
        <div className="flex justify-center align-center items-center h-full flex-col">
            <ConnectKitButton.Custom>
            {({ isConnected, show, truncatedAddress, ensName, address }) => {
                if(isConnected && !isWalletInWallets({address: ensName ?? address, chain: 'ethereum'})) {
                    message.success('Wallet connected successfully')
                    addWallet({
                        address: ensName ?? address,
                        chain: 'ethereum'
                    })
                }
                return (
                    <StyledButton onClick={show}>
                        {isConnected ? ensName ?? truncatedAddress : "Connect Wallet"}
                    </StyledButton>
                );
            }}
            </ConnectKitButton.Custom>
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