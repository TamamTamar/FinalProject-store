// src/components/SalesChart.tsx
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './SalesByDate.scss'
import analyticsService from '../services/analytics-service';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SalesChart = () => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [salesData, setSalesData] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchSalesData = async () => {
        if (!startDate || !endDate) return;

        setLoading(true);
        setError(null);
        try {
            const response = await analyticsService.getSalesByDate(startDate.toISOString(), endDate.toISOString());
            const salesByDate = response.data.salesByDate;
            
            const dates = salesByDate.map((sale: any) => sale._id.split('T')[0]); // פורמט YYYY-MM-DD
            const totalAmounts = salesByDate.map((sale: any) => sale.totalAmount);
            const totalSales = salesByDate.map((sale: any) => sale.totalSales);

            setSalesData({
                labels: dates,
                datasets: [
                    {
                        label: 'Total Amount',
                        data: totalAmounts,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        tension: 0.1, // ליצירת קווים חלקים
                    },
                    {
                        label: 'Total Sales',
                        data: totalSales,
                        borderColor: 'rgba(153, 102, 255, 1)',
                        backgroundColor: 'rgba(153, 102, 255, 0.2)',
                        tension: 0.1, // ליצירת קווים חלקים
                    },
                ],
            });
        } catch (error) {
            setError('Failed to fetch sales data');
            console.error('Failed to fetch sales data', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSalesData();
    }, [startDate, endDate]);

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem: any) {
                        return `${tooltipItem.dataset.label}: ${tooltipItem.formattedValue}`;
                    }
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Amount'
                }
            }
        }
    };

    return (
        <div className="sales-chart-container">
            <h2>Sales by Date</h2>
            <div className="date-picker-container">
                <DatePicker
                    selected={startDate}
                    onChange={(date: Date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="Select start date"
                    dateFormat="yyyy-MM-dd"
                />
                <DatePicker
                    selected={endDate}
                    onChange={(date: Date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    placeholderText="Select end date"
                    dateFormat="yyyy-MM-dd"
                />
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : salesData.labels && salesData.labels.length > 0 ? (
                <Line data={salesData} options={chartOptions} />
            ) : (
                <p>No data available for the selected dates.</p>
            )}
        </div>
    );
};

export default SalesChart;
