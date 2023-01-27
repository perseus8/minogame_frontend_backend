// Wagmi wallet connect modules
import { WagmiConfig, createClient, configureChains, mainnet, goerli } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

// Wagmi wallet connect options
const { provider, webSocketProvider } = configureChains(
  [mainnet, goerli],
  [publicProvider()],
);
 
export const wagmiClient = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});
