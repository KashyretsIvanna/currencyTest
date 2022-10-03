import CurrencyBlock from "./CurrencyBlock";
import { useEffect } from "react";
import useGetList from "./hooks/useGetList";
import { useSelector, useDispatch } from "react-redux";
import { setEUR, setUSD } from "./redux/slice";

function App() {
  const dispatch = useDispatch();
  const euroRate = useSelector((value) => value.currency.EUR);
  const usdRate = useSelector((value) => value.currency.USD);

  const response = useGetList("UAH");

  useEffect(() => {
    if (response.rates) {
      dispatch(setEUR(response));
      dispatch(setUSD(response));
    }
  }, [response,dispatch]);

  return (
    <div className="App">
      <header>
        <div>Euro rate: {euroRate}</div>
        <div>Dollar rate: {usdRate}</div>
      </header>
      <main>
        <CurrencyBlock />
      </main>
    </div>
  );
}

export default App;
