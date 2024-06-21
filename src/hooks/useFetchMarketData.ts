// src/hooks/useFetchMarketData.ts
import { useEffect, useState } from 'react';
import { fetchTickerPrice, fetch24hTicker, fetchRecentTrades } from '../api/marketApi';

export const useFetchMarketData = (symbol: string) => {
  const [marketData, setMarketData] = useState<any>({
    tickerPrice: null,
    ticker24h: null,
    recentTrades: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [tickerPrice, ticker24h, recentTrades] = await Promise.all([
          fetchTickerPrice(symbol),
          fetch24hTicker(symbol),
          fetchRecentTrades(symbol),
        ]);
        setMarketData({
          tickerPrice,
          ticker24h,
          recentTrades,
        });
      } catch (err) {
        setError('Failed to fetch market data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [symbol]);

  return { marketData, loading, error };
};
