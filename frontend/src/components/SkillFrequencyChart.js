import React from 'react';
import Chart from 'chart.js/auto';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const SkillFrequencyChart = () => {
    const labels = ["Java", "Docker", "Python", "Express.js", "SQL", "React.js"];
    const data = {
        labels: labels,
        datasets: [
            {
                backgroundColor: [
                    'rgb(128, 206, 225)',
                    'rgb(180, 211, 178)',
                    'rgb(165, 137, 193)',
                    'rgb(225, 237, 81)',
                    'rgb(240, 232, 205)',
                    'rgb(20, 195, 50)'
                ],
                borderColor: 'rgba(0, 0, 0, 0.2)',
                data: [2, 1, 4, 2, 6, 3],
                borderWidth: 1
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                text: 'Skills Frequency',
                display: true,
                padding: 30,
                font: {
                    size: 30
                }
            },
            datalabels: {
                color: '#000',
                font: {
                    size: 20
                }
            }
        }
    };

    return (
        <>
            <div className='canvas-container'>
                <Pie data={data} plugins={[ChartDataLabels]} options={options}/>
            </div>
        </>
    );
}

export default SkillFrequencyChart;
