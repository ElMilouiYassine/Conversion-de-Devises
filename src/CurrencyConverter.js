import React, { useState, useEffect } from "react";
import axios from "axios";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [currencies, setCurrencies] = useState([]);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = "061a5f651b55024bacae9b0f"; // Remplace par ta clé API
  const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrency}`;

  // Récupérer la liste des devises disponibles et les taux de change
  useEffect(() => {
    const fetchCurrencies = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(API_URL);
        setCurrencies(Object.keys(response.data.conversion_rates));
      } catch (err) {
        setError("Erreur lors de la récupération des devises. Veuillez réessayer.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrencies();
  }, [fromCurrency]); // Déclenché lorsque `fromCurrency` change

  // Convertir la devise
  const convertCurrency = async () => {
    if (amount <= 0) {
      setError("Veuillez entrer un montant valide.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(API_URL);
      const rate = response.data.conversion_rates[toCurrency];
      setConvertedAmount((amount * rate).toFixed(2));
    } catch (err) {
      setError("Erreur lors de la conversion. Veuillez réessayer.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="converter">
      <h2>Convertisseur de Devises</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        min="0"
        placeholder="Entrez un montant"
        disabled={loading}
      />
      <select
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
        disabled={loading}
      >
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
      <span className="arrow">➡️</span>
      <select
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
        disabled={loading}
      >
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
      <button onClick={convertCurrency} disabled={loading}>
        {loading ? "Conversion en cours..." : "Convertir"}
      </button>
      {error && <p className="error">{error}</p>}
      {convertedAmount && !error && (
        <h3>
          {amount} {fromCurrency} = {convertedAmount} {toCurrency}
        </h3>
      )}
    </div>
  );
};

export default CurrencyConverter;