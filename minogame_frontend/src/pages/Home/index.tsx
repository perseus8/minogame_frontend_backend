import React from "react";
import { Link } from "react-router-dom";
import { useAccount } from "wagmi";
import "./Home.scss";

export default function Home() {
  const { address } = useAccount();

  return (
    <div className="home-page">
      <h1>NFT Wallet Test App</h1>
      <div className="description">
        {address ? (
          <>
            You are connected to <code><b><i>{address}</i></b></code>.
            <br/>
            Click <Link to={"/nft-list"}>here</Link> to see your NFTs.
          </>
        ) : (
          "Please connect wallet"
        )}
      </div>
      <div className="author">Made by <b><i>Simon</i></b></div>
    </div>
  );
}
