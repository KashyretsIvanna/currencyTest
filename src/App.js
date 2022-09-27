import styles from "./App.module.css"
import CurrencyBlock from './CurrencyBlock';
import { useEffect, useState } from 'react';

function App() {
  const [EURRate, setEUR] = useState("")
  const [USDRate, setUSD] = useState("")

  useEffect(() => {
    var requestURL = 'https://api.exchangerate.host/latest?base=UAH';

    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function () {
      var response = request.response;
      console.log(response)
      setEUR(1 / response.rates.EUR, 1)
      setUSD(1 / response.rates.USD)
    }

  }, [])


  return (
    <div className="App">
      <header>
        <div>Euro rate: {EURRate}</div>
        <div>Dollar rate: {USDRate}</div>
      </header>
      <main>
        <CurrencyBlock />
      </main>
    </div>
  );
}

export default App;
