import axios from 'axios';

export const fetchRates = async () => {
  const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
  return response.data.rates;
};
