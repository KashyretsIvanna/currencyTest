import { useEffect, useState } from "react";
import styles from "../CurrencyBlock/index.module.css";
import useGetList from "../hooks/useGetList";
import {
  setList,
  setRate,
  handleChangeFrom,
  handleChangeTo,
} from "../redux/slice";
import { useSelector, useDispatch } from "react-redux";

const CurrencyBlock = () => {
  const dispatch = useDispatch();

  const currencyFrom = useSelector((value) => value.currency.currencyFrom);
  const currencyTo = useSelector((value) => value.currency.currencyTo);
  const currencyList = useSelector((value) => value.currency.currencyList);
  const rate = useSelector((value) => value.currency.rate);

  const [firstOption, setFirstOption] = useState("USD");
  const [secondOption, setSecondOption] = useState("UAH");

  const responseList = useGetList("ALL");
  const responseExch = useGetList(firstOption, secondOption);

  useEffect(() => {
    if (responseList.rates) {
      dispatch(setList(Object.keys(responseList.rates)));
    }
  }, [responseList,dispatch]);

  useEffect(() => {
    if (responseExch.result) {
      dispatch(handleChangeFrom({ number: 1, rate: rate }));
      dispatch(handleChangeTo({ number: responseExch.result, rate: rate }));

      dispatch(setRate(responseExch.result));
    }
  }, [responseList, responseExch,rate,dispatch]);
  return (
    <div>
      <div className={styles.inputBlock}>
        <span htmlFor="first">From</span>
        <div>
          <input
            name="first"
            id="first"
            type="number"
            value={currencyFrom}
            onChange={(e) => {
              dispatch(
                handleChangeFrom({ number: e.target.value, rate: rate })
              );
            }}
          />
          <select
            className={styles.select}
            value={firstOption}
            onChange={(e) => setFirstOption(e.target.value)}
          >
            {currencyList.map((el, id) => (
              <option key={id} value={el}>
                {el}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.inputBlock}>
        <span htmlFor="second">To</span>
        <div>
          <input
            name="second"
            id="second"
            type="number"
            value={currencyTo}
            onChange={(e) => {
              dispatch(handleChangeTo({ number: e.target.value, rate: rate }));
            }}
          />
          <select
            className={styles.select}
            value={secondOption}
            onChange={(e) => {
              setSecondOption(e.target.value);
            }}
          >
            {currencyList.map((el, id) => (
              <option key={id} value={el}>
                {el}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default CurrencyBlock;
