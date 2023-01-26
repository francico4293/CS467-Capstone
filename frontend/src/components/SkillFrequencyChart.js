import React from 'react';
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

const SkillFrequencyChart = () => {
    const labels = ["Java", "Docker", "Python", "Express.js"];
    const data = {
        labels: labels,
        datasets: [
            {
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgb(54, 162, 235)',
                data: [2, 1, 4, 2],
                borderWidth: 1
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            title: {
                text: 'Skill Frequency from Tracked Jobs',
                display: true,
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
