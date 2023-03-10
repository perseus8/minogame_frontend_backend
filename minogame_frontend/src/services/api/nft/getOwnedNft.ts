import apiClient from "src/services/apiClient";
import { tApiNftItem } from "src/types/api/tApiNftItem";

export async function getOwnedNft(address: string) {
  try {
    const res = await apiClient.get<tApiNftItem[]>(`/nft/owned/${address}`);
    return res.data;
  } catch (ex) {}
}
