import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Table } from 'react-bootstrap';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function GraphAndTable({ activityArr = [], predictionArr = [], probabilityArr = [] }) {
    // Ensure that data arrays are not empty and have consistent lengths
    const isDataValid =
        Array.isArray(activityArr) &&
        Array.isArray(predictionArr) &&
        Array.isArray(probabilityArr) &&
        activityArr.length === predictionArr.length &&
        predictionArr.every(arr => Array.isArray(arr)) &&
        probabilityArr.every(arr => Array.isArray(arr)) &&
        predictionArr.every((arr, index) => arr.length === probabilityArr[index].length);

    const chartData = {
        labels: Array.from({ length: 10 }, (_, i) => `Time ${i + 1}`), // Example labels for x-axis
        datasets: isDataValid ? activityArr.map((activity, index) => ({
            label: activity,
            data: predictionArr[index] || [],
            borderColor: `rgba(${index * 100}, ${index * 50}, ${index * 150}, 0.8)`,
            backgroundColor: `rgba(${index * 100}, ${index * 50}, ${index * 150}, 0.2)`,
            fill: true,
        })) : [],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                type: 'category',
                labels: Array.from({ length: 10 }, (_, i) => `Time ${i + 1}`),
                beginAtZero: true,
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Chart */}
            <div style={{ height: '60%', width: '100%' }}>
                <Line data={chartData} options={chartOptions} />
            </div>

            {/* Tables */}
            <div style={{ height: '40%', display: 'flex', overflow: 'auto' }}>
                {isDataValid && activityArr.map((activity, index) => (
                    <div
                        key={index}
                        style={{
                            flex: '1 1 0',
                            margin: '0 0.5rem',
                            padding: '0.5rem',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            maxHeight: '100%',
                            overflow: 'hidden',
                        }}
                    >
                        <h5>{activity}</h5>
                        <div style={{ maxHeight: 'calc(100% - 2rem)', overflowY: 'auto' }}>
                            <Table striped bordered hover size="sm">
                                <thead>
                                <tr>
                                    <th>Entry</th>
                                    <th>Prediction</th>
                                    <th>Probability</th>
                                </tr>
                                </thead>
                                <tbody>
                                {(predictionArr[index] || []).map((prediction, idx) => (
                                    <tr key={idx}>
                                        <td>{`Entry ${idx + 1}`}</td>
                                        <td>{prediction}</td>
                                        <td>{probabilityArr[index][idx]}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GraphAndTable;
