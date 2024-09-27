import React from 'react';

const IntervalSelector = ({ intervals, onSelectInterval }) => {
  return (
    <div>
      <label>Select Time Interval: </label>
      <select onChange={(e) => onSelectInterval(e.target.value)}>
        {intervals.map((interval) => (
          <option key={interval} value={interval}>
            {interval}
          </option>
        ))}
      </select>
    </div>
  );
};

export default IntervalSelector;
