import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import { getJobs } from '../services/jobs';

const SkillFrequencyChart = () => {
    const { user } = useSelector(state => state);
    const [skillsFrequency, setSkillsFrequency] = useState({});

    const labels = Object.keys(skillsFrequency);
    const data = {
        labels: labels,
        datasets: [
            {
                backgroundColor: 'rgba(34, 139, 34, 0.2)',
                borderColor: 'rgb(34, 139, 34)',
                data: Object.values(skillsFrequency),
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
                font: {
                    size: 30
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    stepSize: 1
                }
            }
        }
    };

    const setError = (e) => {
        alert(e);
    }

    useEffect(() => {
        async function getSkillsFrequency() {
            const skillsFrequency = {};
            const jobData = await getJobs(user.auth, setError);
            jobData.forEach(data => data.jobs.forEach(job => job.skills.forEach(skill => {
                if (skill in skillsFrequency) {
                    skillsFrequency[skill] = skillsFrequency[skill] + 1;
                } else {
                    skillsFrequency[skill] = 1;
                }
            })));

            setSkillsFrequency(skillsFrequency);
        }

        getSkillsFrequency();
    }, []);

    return (
        <>
            <div className='canvas-container'>
                <Bar data={data} options={options}/>
            </div>
        </>
    );
}

export default SkillFrequencyChart;
