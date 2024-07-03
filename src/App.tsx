import React, { useState } from 'react';
import styled from 'styled-components';
import CurrencySelector from './components/CurrencySelector';
import MarketData from './components/MarketData';
import RecentTrades from './components/RecentTrades';
import { GlobalStyle } from './styles/globalStyles';

const AppContainer = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 2em;
  text-align: center;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Header = styled.header`
  padding: 1em;
  background-color: #282c34;
  color: white;
  font-size: 1.5em;
`;

const Title = styled.h1`
  font-size: 1.8em;
  margin-bottom: 0.5em;
`;

const App: React.FC = () => {
  const [selectedSymbol, setSelectedSymbol] = useState('BTCUSDT');

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Header>
          <Title>Binance Market Data</Title>
        </Header>
        <CurrencySelector onSelect={setSelectedSymbol} />
        <MarketData symbol={selectedSymbol} />
        <RecentTrades symbol={selectedSymbol} />
      </AppContainer>
    </>
  );
};

export default App;
