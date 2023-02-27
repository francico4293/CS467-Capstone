const { db } = require('../fire-admin');

createJob = async (uid, columnName, jobData) => {
    const jobRef = await db.collection('jobs').add(jobData);

    const userRef = db.collection('users').doc(uid);
    const user = await userRef.get()
    const userData = user.data()
    userData.columns.forEach(column => {
        if (column.name === columnName) {
            column.jobs.push(jobRef.id)
        }
    });
    await userRef.update(userData)

    const job = await jobRef.get()
    return {...job.data(), id: job.id}
}


getJobs = async (uid) => {
    const userRef = db.collection('users').doc(uid);
    const user = await userRef.get()
    const columns = user.data().columns

    const populatedColumns = await Promise.all(columns.map(async column => {
        const jobs = await Promise.all(column.jobs.map(async jobId => {
            const jobRef = db.collection('jobs').doc(jobId)
            const job = await jobRef.get()
            return {...job.data(), id: jobId}
        }))
        return {name: column.name, jobs }
    }))
    return populatedColumns
}

module.exports = {createJob, getJobs}