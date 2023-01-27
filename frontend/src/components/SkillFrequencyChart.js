import React from 'react';
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

const SkillFrequencyChart = () => {
    const labels = ["Java", "Docker", "Python", "Express.js", "SQL"];
    const data = {
        labels: labels,
        datasets: [
            {
                backgroundColor: 'rgba(34, 139, 34, 0.2)',
                borderColor: 'rgb(34, 139, 34)',
                data: [2, 1, 4, 2, 6],
                borderWidth: 1
            },
        ],
    };

    const options = {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            title: {
                text: 'Skills Frequency',
                display: true,
                padding: 30,
                font: {
                    size: 30
                }
            }
        },
        scales: {
            y: {
                ticks: {
                    stepSize: 1
                }
            }
        }
    };

    return (
        <>
            <div className='canvas-container'>
                <Bar data={data} options={options}/>
            </div>
        </>
    );
}

export default SkillFrequencyChart;
