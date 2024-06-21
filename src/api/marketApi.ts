// src/api/binanceApi.ts
import axios from 'axios';

const BASE_URL = 'https://api.binance.com';

export const fetchTickerPrice = async (symbol: string) => {
  const response = await axios.get(`${BASE_URL}/api/v3/ticker/price`, {
    params: { symbol },
  });
  return response.data;
};

export const fetch24hTicker = async (symbol: string) => {
  const response = await axios.get(`${BASE_URL}/api/v3/ticker/24hr`, {
    params: { symbol },
  });
  return response.data;
};

export const fetchRecentTrades = async (symbol: string) => {
  const response = await axios.get(`${BASE_URL}/api/v3/trades`, {
    params: { symbol },
  });
  return response.data;
};

export const fetchAllSymbols = async () => {
  const response = await axios.get(`${BASE_URL}/api/v3/exchangeInfo`);
  return response.data.symbols.map((symbol: any) => symbol.symbol);
};
