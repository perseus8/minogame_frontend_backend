import React, { useState, useEffect } from "react";
import { useAccount, useSignMessage } from "wagmi";
import TextField from "@mui/material/TextField";
import { tUser } from "src/types/tUser";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import { SiweMessage } from "siwe";
import { useAppSelector } from "src/hooks/useAppSelector";
import { updateUser } from "src/services/api/user/updateUser";
import { useAppDispatch } from "src/hooks/useAppDispatch";
import { setAccount } from "src/store/account";
import { setLoading } from "src/store/viewState";
import "./Profile.scss";

export default function Profile() {
  const { address } = useAccount();
  const account = useAppSelector((state) => state.account.account);
  const [profile, setProfile] = useState<tUser>(account);

  const { signMessageAsync } = useSignMessage();
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log({ account });
    setProfile({ ...account });
  }, [account]);

  const onChangeInput = (field: string, val: string) => {
    setProfile({ ...profile, [field]: val });
  };

  const onUpdate = async () => {
    // validation
    if (!profile.name) {
      toast.error("Please input name");
      return;
    }

    dispatch(setLoading(true));
    try {
      const message = new SiweMessage({
        domain: window.location.host,
        address: address,
        statement: "Sign in with Ethereum to Mino", // hardcoded for now
        uri: window.location.origin,
        version: "1", // hardcoded for now
        chainId: 1, // hardcoded for now
        nonce: profile.id,
      });

      const preparedMessage = message.prepareMessage();
      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      });

      console.log({
        preparedMessage,
        signature,
      });
      const newUser = await updateUser(profile, signature, message);
      toast.success("Updated successfully");
      dispatch(setAccount(newUser));
    } catch (ex) {
      console.log(ex);
    }

    dispatch(setLoading(false));
  };

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <div className="description">
        <TextField
          label="Name"
          variant="outlined"
          value={profile.name}
          onChange={(e) => onChangeInput("name", e.target.value)}
          required
        />
        <TextField
          label="Bio"
          variant="outlined"
          multiline
          value={profile.bio}
          onChange={(e) => onChangeInput("bio", e.target.value)}
        />
        <div className="button-group">
          <Button variant="contained" onClick={onUpdate} disabled={!address || !profile.name}>
            Update
          </Button>
        </div>
      </div>
    </div>
  );
}
