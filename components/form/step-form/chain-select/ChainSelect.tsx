import Image from "next/image"
import { useContext } from "react"
import { ChainContext } from "../../../../context/ChainContext"
export default function ChainSelect() {
    const { setChain } = useContext(ChainContext)
    return (
        
        <div className="flex justify-center content-center my-5 flex-col h-full">
            <h1 className="text text-center">Choose Chain</h1>
            <div className="flex justify-around content-center items-center my-10 w-full h-1/2">
                <div
                    className="chain-container justify-around items-center text-center rounded-lg align-middle bg-white w-1/4 h-full"
                    onClick={() => setChain('ethereum')}
                >
                    <Image
                        src="/eth-logo.png"
                        width={50}
                        height={72}
                    />
                    <h2 className="my-3">Ethereum</h2>
                </div>
                <div
                    className="chain-container justify-around text-center rounded-lg align-middle bg-white w-1/4 h-full"
                    onClick={() => setChain('solana')}
                >
                    <Image
                        src="/sol-logo.png"
                        width={50}
                        height={72}
                    />
                    <h2 className="my-3">Solana</h2>                    
                </div>
            </div>
        </div>

    )
}