import { FC } from "react";
import { IconLoader, IconRight } from "src/components/icons";
import { tWalletType } from "src/types/tWalletType";

interface IProps {
  item: tWalletType;
  loading: boolean;
  onChooseItem: () => any | void;
}

export const WalletItem: FC<IProps> = ({ onChooseItem, loading, item }) => {
  const { imageUrl, name } = item;

  return (
    <button
      className="wallet-item"
      onClick={() => onChooseItem()}
      disabled={loading}
    >
      {loading ? (
        <div>
          <span className="loader-icon">
            <IconLoader />
          </span>
          <h5>Connecting...</h5>
        </div>
      ) : (
        <>
					<img src={imageUrl} alt={name} />
					<h5>{name}</h5>
        </>
      )}
    </button>
  );
};
