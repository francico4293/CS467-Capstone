const getJobs = async (userAuth, setError) => {
    const token = await userAuth.getIdToken();
    const response = await fetch(`/api/jobs/`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    if (response.status === 200) {
        const jobs = await response.json()
        return jobs
    } else {
        const error = await response.json()
        setError(error.error)
    }
}

const createJob = async(userAuth, jobData, columnName, setError) => {
    const token = await userAuth.getIdToken();
    const response = await fetch('/api/jobs', {
        method: 'POST',
        body: JSON.stringify({jobData, columnName}),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    if (response.status === 201) {
        const data = await response.json()
        return data
    } else {
        const error = await response.json()
        setError(error.error);
    }
}

export {getJobs, createJob}