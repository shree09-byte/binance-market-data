import React from 'react';

const CryptocurrencySelector = ({ coins, onSelectCoin }) => {
  return (
    <div>
      <label>Select Cryptocurrency: </label>
      <select onChange={(e) => onSelectCoin(e.target.value)}>
        {coins.map((coin) => (
          <option key={coin} value={coin}>
            {coin.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CryptocurrencySelector;
