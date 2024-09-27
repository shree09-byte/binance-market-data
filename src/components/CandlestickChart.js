import { useEffect, useState, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';
import 'chartjs-adapter-date-fns';

// Register core components of Chart.js and financial chart components
Chart.register(...registerables, CandlestickController, CandlestickElement);

const CandlestickChart = ({ symbol, interval }) => {
  const [chartData, setChartData] = useState([]);
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const storedData = localStorage.getItem(symbol);
    if (storedData) {
      setChartData(JSON.parse(storedData));
    }

    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}@kline_${interval}`);
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const candle = message.k;

      console.log(candle);

      const newCandle = {
        t: candle.t, // Ensure this is in milliseconds
        o: parseFloat(candle.o),
        h: parseFloat(candle.h),
        l: parseFloat(candle.l),
        c: parseFloat(candle.c),
      };

      console.log(newCandle);

      setChartData((prevData) => {
        const updatedData = [...prevData, newCandle];
        localStorage.setItem(symbol, JSON.stringify(updatedData));
        return updatedData;
      });
    };

    return () => {
      ws.close();
    };
  }, [symbol, interval]);

  useEffect(() => {
    if (chartData.length === 0) return;

    const ctx = canvasRef.current.getContext('2d');

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type:   
 'bar',
      data: {
        datasets: [{
          label: `${symbol.toUpperCase()} Candlestick Chart`,
          data: chartData,
          borderColor: 'rgb(75, 192, 192)',
          borderWidth: 1,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        parsing: {
          xAxisKey: 't',
          yAxisKey: 'c',
        },
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'minute',
            },
          },
          y: {
            beginAtZero: false,
          },
        },
        plugins: {
          zoom: {
            enabled: true,
            zoomMode: 'x',
          },
        },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [chartData, symbol]);

  return (
    <div style={{ position: 'relative', height: '80vh'}}>
      <canvas ref={canvasRef} id="candlestickChart"></canvas>
    </div>
  );
};

export default CandlestickChart;
