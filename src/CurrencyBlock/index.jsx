import { useEffect, useState } from "react";
import styles from "../CurrencyBlock/index.module.css"

const CurrencyBlock = () => {
    const [list, setList] = useState([])
    const [firstOption, setFirstOption] = useState("USD")
    const [secondOption, setSecondOption] = useState("UAH")
    const [rate, setRate] = useState("")
    const [numberFrom, setNumberFrom] = useState("")
    const [numberTo, setNumberTo] = useState("")

    const handleChangeFrom = (e) => {
        let number = e.target.value
        setNumberFrom(number)
        setNumberTo(rate * number)
    }

    const handleChangeTo = (e) => {
        let number = e.target.value
        setNumberTo(number)
        setNumberFrom(number / rate)
    }
    useEffect(() => {
        var requestURL = 'https://api.exchangerate.host/latest?base=AED';
        const request = new XMLHttpRequest();
        request.open('GET', requestURL);
        request.responseType = 'json';
        request.send();

        request.onload = function () {
            const response = request.response;
            setList(Object.keys(response.rates))
        }

    }, [])

    useEffect(() => {
        const requestURL = `https://api.exchangerate.host/convert?from=${firstOption}&to=${secondOption}`;
        const request = new XMLHttpRequest();
        request.open('GET', requestURL);
        request.responseType = 'json';
        request.send();

        request.onload = function () {
            const response = request.response;
            setNumberFrom(1)
            setNumberTo(response.result)
            setRate(response.result)
            console.log(response);
        }
    }, [firstOption, secondOption])
    return (<div>
        <div className={styles.inputBlock}>
            <span htmlFor="first" >From</span>
            <div>
                <input name="first" id="first" type="number" value={numberFrom} onChange={(e) => { handleChangeFrom(e) }} />
                <select className={styles.select} value={firstOption} onChange={e => setFirstOption(e.target.value)}>
                    {list.map((el, id) => <option key={id} value={el}>{el}</option>)}
                </select></div>

        </div>

        <div className={styles.inputBlock} >

            <span htmlFor="second" >To</span><div>
                <input name="second" id="second" type="number" value={numberTo} onChange={(e) => { handleChangeTo(e) }} />
                <select className={styles.select} value={secondOption} onChange={(e) => { setSecondOption(e.target.value) }}>
                    {list.map((el, id) => <option key={id} value={el}>{el}</option>)}
                </select></div>
        </div>

    </div>)

}

export default CurrencyBlock;
