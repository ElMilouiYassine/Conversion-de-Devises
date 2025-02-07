import React, { useState, useEffect } from "react";
import axios from "axios";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [currencies, setCurrencies] = useState([]);
  const [convertedAmount, setConvertedAmount] = useState(null);

  const API_KEY = "061a5f651b55024bacae9b0f"; // Remplace par ta clé API
  const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrency}`;

  useEffect(() => {
    axios.get(API_URL).then((response) => {
      setCurrencies(Object.keys(response.data.conversion_rates));
    });
  }, [API_URL]); // Ajout de API_URL dans le tableau de dépendances
  

  const convertCurrency = () => {
    axios.get(API_URL).then((response) => {
      const rate = response.data.conversion_rates[toCurrency];
      setConvertedAmount((amount * rate).toFixed(2));
    });
  };

  return (
    <div className="converter">
      <h2>Convertisseur de Devises</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
        {currencies.map((currency) => (
          <option key={currency} value={currency}>{currency}</option>
        ))}
      </select>
      <span>➡️</span>
      <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
        {currencies.map((currency) => (
          <option key={currency} value={currency}>{currency}</option>
        ))}
      </select>
      <button onClick={convertCurrency}>Convertir</button>
      {convertedAmount && (
        <h3>{amount} {fromCurrency} = {convertedAmount} {toCurrency}</h3>
      )}
    </div>
  );
};

export default CurrencyConverter;
