import '../styles/globals.css'
import 'antd/dist/antd.css'
import '@rainbow-me/rainbowkit/styles.css'
import '@solana/wallet-adapter-react-ui/styles.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { useStepContext, StepContext } from '../context/StepContext'
import { useUserContext, UserContext } from '../context/UserContext'
import { useLegalContext, LegalContext } from '../context/LegalContext'
import { useWalletContext, WalletContext } from '../context/WalletContext'
import { ConnectKitProvider, getDefaultClient } from "connectkit"
import { useChainContext, ChainContext} from '../context/ChainContext'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { clusterApiUrl } from '@solana/web3.js'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import {
  CoinbaseWalletAdapter,
  PhantomWalletAdapter
} from '@solana/wallet-adapter-wallets'
import {
  WalletModalProvider
} from '@solana/wallet-adapter-react-ui'
import { createDefaultAuthorizationResultCache, SolanaMobileWalletAdapter } from '@solana-mobile/wallet-adapter-mobile'
import {
  createClient,
  WagmiConfig,
} from 'wagmi'
import { useMemo } from 'react'

const wagmiClient = createClient(
  getDefaultClient({
    appName: 'yWeb3 Form Generator',
    alchemyId: process.env.ALCHEMY_API_KEY
  })
)

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
})

function MyApp({ Component, pageProps }) {
  const network = 'mainnet-beta'
  const endpoint = useMemo(() => clusterApiUrl(network), [])
  const wallets = useMemo(
    () => [
      new SolanaMobileWalletAdapter({
        appIdentity: { name: 'yWeb3 Form Generator' },
        authorizationResultCache: createDefaultAuthorizationResultCache()
      }),
      new PhantomWalletAdapter(),
      new CoinbaseWalletAdapter()
    ],
    [network]
  )
  
  return (
    <ChainContext.Provider value = {useChainContext()}>
      <UserContext.Provider value={useUserContext()}>
        <StepContext.Provider value={useStepContext()}>
          <WalletContext.Provider value={useWalletContext()}>
            <LegalContext.Provider value={useLegalContext()}>
              <ConnectionProvider endpoint={endpoint}>
                <WalletProvider wallets={wallets}>
                  <WalletModalProvider>
                    <WagmiConfig client={wagmiClient}>
                      <ConnectKitProvider>
                        <ThemeProvider theme={darkTheme}>
                          <CssBaseline />
                          <Component {...pageProps} />
                        </ThemeProvider>
                      </ConnectKitProvider>
                    </WagmiConfig>
                  </WalletModalProvider>
                </WalletProvider>
              </ConnectionProvider>
            </LegalContext.Provider>
          </WalletContext.Provider>
        </StepContext.Provider>
      </UserContext.Provider>
    </ChainContext.Provider>
  )
}

export default MyApp
