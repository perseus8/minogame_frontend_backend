import React from "react";
import { useEffect } from "react";
import { NftItem } from "src/components/NftItem";
import { useAppDispatch } from "src/hooks/useAppDispatch";
import { useAppSelector } from "src/hooks/useAppSelector";
import { getOwnedNftList } from "src/store/nft";
import { setLoading } from "src/store/viewState";
import { useAccount } from "wagmi";
import "./NftList.scss";

export default function NftList() {
  const { address } = useAccount();
  const dispatch = useAppDispatch();
  const ownedNftList = useAppSelector((state) => state.nft.ownedNfts);

  useEffect(() => {
    dispatch(setLoading(true));
    if (address) {
      dispatch(getOwnedNftList(address))
        .then(() => {
          dispatch(setLoading(false));
        })
        .catch(() => dispatch(setLoading(false)));
    } else {
      dispatch(setLoading(false));
    }
  }, [address]);

  return (
    <div className="nft-list-page">
      <h1>NFT Wallet</h1>
      {address ? (
        <div className="nft-list">
          {ownedNftList.map((nft, index) => (
            <NftItem key={nft.token_hash + index} item={nft} />
          ))}
        </div>
      ) : (
        <div className="description">Please connect wallet</div>
      )}
    </div>
  );
}
