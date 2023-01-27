import React from "react";
import { Button } from "@mui/material";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { connect } from "@wagmi/core";
import { useAccount, useSignMessage, useDisconnect } from "wagmi";
import { useAppDispatch } from "src/hooks/useAppDispatch";
import { SiweMessage } from "siwe";
import { toast } from "react-toastify";
import { tWalletType } from "src/types/tWalletType";
import TransitionsModal from "../TransitionsModal";
import { useState, useEffect } from "react";
import { wallets } from "./data";
import { WalletItem } from "./WaletItem";
import { splitAddress } from "src/helpers/splitAddress";
import { getUser } from "src/services/api/user/getUser";
import { clearAccount, setAccount } from "src/store/account";
import config from "src/services/config";
import { createUser } from "src/services/api/user/createUser";
import "./WalletConnectButton.scss"

interface IWalletConnectButtonProps {}

export default function WalletConnectButton(props: IWalletConnectButtonProps) {
  const dispatch = useAppDispatch();
  const { address: selectedAddress } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [wallet, setWallet] = useState<tWalletType>({
    type: "",
    imageUrl: "",
    name: "",
  });
  const { disconnect } = useDisconnect();

  useEffect(() => {
    if (selectedAddress) {
      signWithSiew();
    }
  }, [selectedAddress]);

  const closeModal = () => {
    setLoading(false);
    setModalOpen(false);
  };

  const chooseWallet = async (el: tWalletType) => {
    setWallet(el);
    
    let connector;
    if (el.type === "metamask") {
      connector = new MetaMaskConnector({
        options: {
          shimDisconnect: true,
        },
      });
    } else if (el.type === "coinbase_wallet") {
      connector = new CoinbaseWalletConnector({
        options: {
          appName: "wagmi.sh",
          jsonRpcUrl:
            "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
        },
      });
    } else if (el.type === "wallet_connect") {
      connector = new WalletConnectConnector({
        options: {
          qrcode: true,
          infuraId: "9aa3d95b3bc440fa88ea12eaa4456161",
          bridge: "https://bridge.walletconnect.org/",
        },
      });
    }

    if (connector) {
      try {
        await connect({ connector });
        closeModal();
      } catch (ex: any) {
        console.log({ ex });
        closeModal();
      }
    }
  };

  const signWithSiew = async () => {
    if (selectedAddress) {
      try {
        let user = await getUser(selectedAddress);
        if (user.id) {
          dispatch(setAccount(user));
          toast.success(`Logged in as ${user.name}`);
        } else {
          toast.info(`User not found: ${selectedAddress}. We will create a new user`);
          // Create SIWE message with pre-fetched nonce and sign with wallet
          const message = new SiweMessage({
            domain: window.location.host,
            address: selectedAddress,
            statement: "Sign in with Ethereum to Mino", // hardcoded for now
            uri: window.location.origin,
            version: "1", // hardcoded for now
            chainId: 1, // hardcoded for now
            nonce: config.SiweNonce,
          });

          const signature = await signMessageAsync({
            message: message.prepareMessage(),
          });

          // Verify signature
          user = await createUser({
            name: "Unnamed",
            bio: "",
            address: selectedAddress,
          }, signature, message);

          dispatch(setAccount(user));
          toast.success(`User created as ${user.name}`);
        }
      } catch (ex) {
        console.error(ex);
      }
    }
  };

  const connectWallet = () => {
    if (selectedAddress) {
      disconnect();
      dispatch(clearAccount());
    } else {
      setModalOpen(true);
    }
  };

  return (
    <div className="wallet-connect-button">
      <Button
        variant="outlined"
        className="wallet-connect-button"
        onClick={connectWallet}
      >
        {selectedAddress ? splitAddress(selectedAddress) : "Connect"}
      </Button>
      <TransitionsModal
        open={modalOpen}
        title="Choose Wallet"
        handleClose={() => setModalOpen(false)}
      >
        <ul className="wallets-list">
          {wallets.map((el) => {
            return (
              <li key={el.name}>
                <WalletItem
                  item={el}
                  loading={loading && wallet.type === el.type}
                  onChooseItem={() => {
                    chooseWallet(el);
                  }}
                />
              </li>
            );
          })}
        </ul>
      </TransitionsModal>
    </div>
  );
}
