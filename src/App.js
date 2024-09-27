import { useState } from 'react';
import CryptocurrencySelector from './components/CryptocurrencySelector';
import IntervalSelector from './components/IntervalSelector';
import CandlestickChart from './components/CandlestickChart';
import './App.css';

const coins = ['ethusdt', 'bnbusdt', 'dotusdt'];
const intervals = ['1m', '3m', '5m'];

function App() {
  const [selectedCoin, setSelectedCoin] = useState('ethusdt');
  const [selectedInterval, setSelectedInterval] = useState('1m');

  return (
    <div className='App'>
      <h1 >Binance Market Data</h1>
      <CryptocurrencySelector
        coins={coins}
        onSelectCoin={setSelectedCoin}
      />
      <IntervalSelector
        intervals={intervals}
        onSelectInterval={setSelectedInterval}
      />
      <CandlestickChart symbol={selectedCoin} interval={selectedInterval} />
    </div>
  );
}

export default App;
