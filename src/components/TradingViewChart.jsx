// src/components/TradingViewChart.js
import React, { useEffect, useState, useRef } from 'react';
import { createChart } from 'lightweight-charts';
import axios from 'axios';

const TradingViewChart = () => {
    const chartContainerRef = useRef(null);
    const [chart, setChart] = useState(null);
    const [candlestickSeries, setCandlestickSeries] = useState(null);

    useEffect(() => {
        const chartInstance = createChart(chartContainerRef.current, {
            width: chartContainerRef.current.clientWidth,
            height: 400,
            layout: {
                backgroundColor: '#ffffff',
                textColor: '#000000',
            },
            grid: {
                vertLines: {
                    color: '#e1e1e1',
                },
                horzLines: {
                    color: '#e1e1e1',
                },
            },
            priceScale: {
                borderColor: '#e1e1e1',
            },
            timeScale: {
                borderColor: '#e1e1e1',
            },
        });

        const series = chartInstance.addCandlestickSeries({
            upColor: '#4CAF50',
            downColor: '#F44336',
            borderDownColor: '#F44336',
            borderUpColor: '#4CAF50',
            wickDownColor: '#F44336',
            wickUpColor: '#4CAF50',
        });

        setChart(chartInstance);
        setCandlestickSeries(series);

        return () => chartInstance.remove();
    }, []);

    useEffect(() => {
        if (candlestickSeries) {
            axios.get('http://localhost:3000/?ticker=IBM')
                .then(response => {
                    console.log('Data has been successfully retrieved: ', response.data);
                    const data = response.data;
                    // API returns data in a format that needs to be mapped to:
                    // { time: UNIX, open: X, high: Y, low: Z, close: W }
                    const chartData = data.map(item => ({
                        time: item['time'],
                        open: item['open'],
                        high: item['high'],
                        low: item['low'],
                        close: item['close'],
                    }));
                    // Sort data in ascending order
                    const sortedData = data.sort((a, b) => a['time'] - b['time']);
                    candlestickSeries.setData(sortedData);
                })
                .catch(error => console.error('Error fetching data:', error));
        }
    }, [candlestickSeries]);

    return <div ref={chartContainerRef} />;
};

export default TradingViewChart;

