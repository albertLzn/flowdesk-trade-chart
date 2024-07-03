
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  fetchTickerPrice,
  fetch24hTicker,
  fetchRecentTrades,
  fetchAllSymbols,
} from '../marketApi';

const mock = new MockAdapter(axios);

describe('binanceApi functions', () => {
  afterEach(() => {
    mock.reset();
  });

  test('fetchTickerPrice returns data for a symbol', async () => {
    const symbol = 'BTCUSDT';
    const mockData = { symbol: 'BTCUSDT', price: '40000' };

    mock.onGet(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`).reply(200, mockData);

    const response = await fetchTickerPrice(symbol);
    expect(response).toEqual(mockData);
  });

  test('fetch24hTicker returns data for a symbol', async () => {
    const symbol = 'BTCUSDT';
    const mockData = { symbol: 'BTCUSDT', priceChangePercent: '1.2', volume: '100' };

    mock.onGet(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`).reply(200, mockData);

    const response = await fetch24hTicker(symbol);
    expect(response).toEqual(mockData);
  });

  test('fetchRecentTrades returns data for a symbol', async () => {
    const symbol = 'BTCUSDT';
    const mockData = [{ id: 1, price: '40000', qty: '0.001' }, { id: 2, price: '39900', qty: '0.002' }];

    mock.onGet(`https://api.binance.com/api/v3/trades?symbol=${symbol}`).reply(200, mockData);

    const response = await fetchRecentTrades(symbol);
    expect(response).toEqual(mockData);
  });

  test('fetchAllSymbols returns an array of symbols', async () => {
    const mockData = [{ symbol: 'BTCUSDT' }, { symbol: 'ETHUSDT' }, { symbol: 'BNBUSDT' }];

    mock.onGet('https://api.binance.com/api/v3/exchangeInfo').reply(200, { symbols: mockData });

    const response = await fetchAllSymbols();
    expect(response).toEqual(['BTCUSDT', 'ETHUSDT', 'BNBUSDT']);
  });

  test('handles errors gracefully', async () => {
    const symbol = 'BTCUSDT';

    mock.onGet(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`).reply(404);

    await expect(fetchTickerPrice(symbol)).rejects.toThrow();
  });
});
