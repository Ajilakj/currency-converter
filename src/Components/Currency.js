import React, { useEffect, useState } from 'react';
const BASE_URL="http://api.exchangerateapi.io/v1/latest?access_key=Vy8RKtFtSuvsBsxmndexEQ84GFbjalTJ";
const CONVERT_URL="http://api.exchangerateapi.io/v1/convert?access_key=Vy8RKtFtSuvsBsxmndexEQ84GFbjalTJ";

const Currency = () => {

    const [currencyOptions, setCurrencyOptions] = useState([]);
    const [from, setFrom] = useState();
    const [to, setTo] = useState();
    const [exchangeRate, setExchangeRate] = useState();
    const [amount, setAmount] = useState(1);
    const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

    let toAmount, fromAmount;

    if (amountInFromCurrency){
        fromAmount = amount;
        toAmount = amount *exchangeRate;
    } else {
        toAmount = amount;
        fromAmount = amount/exchangeRate;
    }

    useEffect(() => {
        fetch(BASE_URL)
            .then(res =>res.json())
            .then(data =>{
                const firstCurrency = Object.keys(data.rates)[0];
                setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
                setFrom(data.base);
                setTo(firstCurrency);
                setExchangeRate(data.rates[firstCurrency]);
            })
    }, []);

    useEffect(() => {
        if (from !==null && to !==null){
            fetch(`${CONVERT_URL}&from=${from}&to=${to}&amount=${amount}`)
                .then(res => res.json())
                .then(data => setExchangeRate(data.rates[to]))
        }
    }, [from], [to]);

  return (
    <div className='counter-container'>
        <div className='text-box'>
            <div className='input-area'>
                <div className='navbar-container'>
                     <h2>Currency converter</h2>
                </div>

                <div className='from'>
                    <input type={'number'} placeholder = "enter amount" value={fromAmount} onChnage={(e) =>{
                        setAmount(e.target.value)
                        setAmountInFromCurrency(true)
                    }}/>
                    <select value={from} onChange = {(e) => {
                        setFrom(e.target.value)
                    }}>
                        {currencyOptions.map(item => (
                            <option value = {item} key = {item.Math.random()}></option>
                        ))}
                    </select>
                </div> 

                <h2> = </h2>

                <div className='to'>
                    <input type = {'number'} placeholder = 'enter amount' value={toAmount} onChnage={(e) =>{
                        setAmount(e.target.value)
                        setAmountInFromCurrency(false)
                    }} />
                     <select value={to} onChange = {(e) => {
                        setTo(e.target.value)
                    }}>
                        {currencyOptions.map(item => (
                            <option value = {item} key = {item.Math.random()}></option>
                        ))}
                    </select>
                </div> 
        </div>
    </div>
    </div>
  )
}

export default Currency
