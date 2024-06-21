import { useState } from 'react';
import { fetchRates } from '../utils/api';

const useExchangeRates = () => {
  const [exchangeRates, setExchangeRates] = useState({});

  const fetchExchangeRates = async () => {
    try {
      const rates = await fetchRates();
      setExchangeRates(rates);
    } catch (error) {
      console.error('Error fetching exchange rates', error);
    }
  };

  return { exchangeRates, fetchExchangeRates };
};

export default useExchangeRates;
