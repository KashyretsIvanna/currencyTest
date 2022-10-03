import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currencyList: [],
  EUR: 0,
  USD: 0,
  firstCurrency: 0,
  secondCurrency: 0,
  currencyFrom: 1,
  currencyTo: 1,
  rate: 0,
};

export const currencySlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setEUR: (state, action) => {
      state.EUR = 1 / action.payload.rates.EUR;
    },
    setUSD: (state, action) => {
      state.USD = 1 / action.payload.rates.USD;
    },
    setList: (state, action) => {
      state.currencyList = action.payload;
    },

    setRate: (state, action) => {
      state.rate = action.payload;
    },
    handleChangeFrom: (state, action) => {
      let payload = action.payload;
      let number = payload.number;
      let rate = payload.rate;
      state.currencyFrom = number;
      state.currencyTo = number * rate;
    },
    handleChangeTo: (state, action) => {
      let payload = action.payload;
      let number = payload.number;
      let rate = payload.rate;
      state.currencyTo = number;
      state.currencyFrom = number / rate;
    },
  },
});

export const {
  setEUR,
  setUSD,
  setList,
  setRate,
  handleChangeFrom,
  handleChangeTo,
} = currencySlice.actions;

export default currencySlice.reducer;
