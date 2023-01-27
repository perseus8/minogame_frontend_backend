import { FC } from "react";
import { tNftItem } from "src/types/tNftItem";
import "./NftItem.scss";

interface INftItemProps {
  item: tNftItem;
}

const defaultImage = "/assets/images/default-nft.png";
export const NftItem: FC<INftItemProps> = (props) => {
  const { item } = props;

  const onImageError = (e: any) => {
    if (e.target.src !== defaultImage) {
      e.target.src = defaultImage;
      console.log("updated with default image");
    }
  }

  return (
    <div className="nft-item">
      <div className="image-wrapper">
        <img src={item.metadata?.image || defaultImage} alt={item.name} onError={onImageError} />
      </div>
      <div className="information">
        <label><b>{item.name}</b></label>
        <label>{item.symbol}</label>
        <label>Chain: {item.chain || "Undefined"}</label>
      </div>
    </div>
  );
};
