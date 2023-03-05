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

deleteJob = async (uid, jobId) => {
    let jobFound = false

    const userRef = db.collection('users').doc(uid);
    const user = await userRef.get()
    const userData = user.data()

    userData.columns.forEach(column => {
        if (column.jobs.includes(jobId)) {
            column.jobs = column.jobs.filter(job => job !== jobId)
            jobFound = true
        }
    });
    await userRef.update(userData)

    if (!jobFound) {
        throw new Error("Job does not belong to user")
    }
    await db.collection('jobs').doc(jobId).delete();

}

editJob = async (uid, jobId, jobData) => {
    const userRef = db.collection('users').doc(uid);
    const user = await userRef.get()
    const userData = user.data()

    let jobFound = userData.columns.some(column => column.jobs.includes(jobId))

    if (!jobFound) {
        throw new Error("Job does not belong to user")
    }

    const jobRef = db.collection('jobs').doc(jobId)
    await jobRef.update(jobData)
    const job = await jobRef.get()
    return { ...job.data(), id: job.id }
}


module.exports = {createJob, getJobs, deleteJob, editJob}