import React, { useState, useEffect } from 'react';
import CurrencyInput from './CurrencyInput';
import useExchangeRates from '../hooks/useExchangeRates';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [targetCurrency, setTargetCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(0);

  const { exchangeRates, fetchExchangeRates } = useExchangeRates();

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  useEffect(() => {
    if (exchangeRates && exchangeRates[baseCurrency]) {
      convertCurrency();
    }
  }, [amount, baseCurrency, targetCurrency, exchangeRates]);

  const convertCurrency = () => {
    if (baseCurrency === targetCurrency) {
      setConvertedAmount(amount);
      return;
    }

    const baseRate = exchangeRates[baseCurrency];
    const targetRate = exchangeRates[targetCurrency];
    const conversionRate = targetRate / baseRate;

    setConvertedAmount((amount * conversionRate).toFixed(2));
  };

  return (
    <div style={styles.outerContainer}>
    <div style={styles.container}>
      <h1 style={styles.header}>Currency Converter</h1>
      <CurrencyInput
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <select
        value={baseCurrency}
        onChange={(e) => setBaseCurrency(e.target.value)}
        style={styles.select}
      >
        {Object.keys(exchangeRates).map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
      <select
        value={targetCurrency}
        onChange={(e) => setTargetCurrency(e.target.value)}
        style={styles.select}
      >
        {Object.keys(exchangeRates).map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
      <h2 style={styles.convertedAmount}>
        Converted Amount: {convertedAmount} {targetCurrency}
      </h2>
    </div>
    </div>
  );
};

const styles = {
    outerContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#e0e0e0',
      },
  container: {
    maxWidth: '400px',
    margin: 'auto',
    textAlign: 'center',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#f0f0f0',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif',
    
  },
  header: {
    color: '#333',
  },
  select: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  convertedAmount: {
    color: '#333',
    marginTop: '20px',
  },
};

export default CurrencyConverter;
