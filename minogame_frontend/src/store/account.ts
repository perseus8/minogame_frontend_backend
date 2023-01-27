import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { tUser } from "src/types/tUser";

type tState = {
  account: tUser;
};

const initialState: tState = {
  account: { id: "", name: "", bio: "", address: "" },
};

export const account = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAccount: (state, action: PayloadAction<tUser>) => {
      state.account = { ...action.payload };
    },
    clearAccount: (state, action: PayloadAction) => {
      state.account = { ...initialState.account};
    },
  },
  extraReducers: (builder) => {},
});

export const { clearAccount, setAccount } = account.actions;

export default account.reducer;
