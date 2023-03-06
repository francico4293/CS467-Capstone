const { db } = require('../fire-admin');
const { FieldValue } = require('firebase-admin/firestore');

createJob = async (uid, columnId, jobData) => {
    const userRef = db.collection('users').doc(uid);
    const user = await userRef.get()
    const userData = user.data()

    if (!userData.columns.includes(columnId)){
        throw new Error("Column does not belong to user!")
    }

    const jobRef = await db.collection('jobs').add({...jobData, columnId});

    const columnRef = db.collection('columns').doc(columnId);
    await columnRef.update({
        jobs: FieldValue.arrayUnion(jobRef.id)
    });

    const job = await jobRef.get()
    return {...job.data(), id: job.id}
}


getJobs = async (uid) => {
    const userRef = db.collection('users').doc(uid);
    const user = await userRef.get()
    const columns = user.data().columns

    const populatedColumns = await Promise.all(columns.map(async columnId => {
        const columnRef = db.collection('columns').doc(columnId)
        const column = await columnRef.get()

        const jobs = await Promise.all(column.data().jobs.map(async jobId => {
            const jobRef = db.collection('jobs').doc(jobId)
            const job = await jobRef.get()
            return {...job.data(), id: jobId}
        }))
        return {id: columnId, name: column.data().name, jobs }
    }))
    return populatedColumns
}

deleteJob = async (uid, jobId) => {
    const jobRef = db.collection('jobs').doc(jobId)
    const job = await jobRef.get()
    const columnId = job.data().columnId


    const userRef = db.collection('users').doc(uid);
    const user = await userRef.get()
    const userData = user.data()

    if (!userData.columns.includes(columnId)){
        throw new Error("Job does not belong to user!")
    }

    const columnRef = db.collection('columns').doc(columnId)
    await columnRef.update({
        jobs: FieldValue.arrayRemove(jobId)
    });

    await jobRef.delete();

}

editJob = async (uid, jobId, newJobData) => {
    const jobRef = db.collection('jobs').doc(jobId)
    const job = await jobRef.get()
    const originalColumnId = job.data().columnId

    const userRef = db.collection('users').doc(uid);
    const user = await userRef.get()
    const userData = user.data()

    if (!userData.columns.includes(originalColumnId)){
        throw new Error("Job does not belong to user!")
    }

    if (originalColumnId !== newJobData.columnId){
        await swapColumns(userData, jobId, originalColumnId, newJobData.columnId)
    }

    await jobRef.update(newJobData)
    const newJob = await jobRef.get()
    return { ...newJob.data(), id: newJob.id }
}

const swapColumns = async (userData, jobId, originalColumnId, newColumnId) => {
    if (!userData.columns.includes(newColumnId)){
        throw new Error("New column does not belong to user!")
    }

    let columnRef = db.collection('columns').doc(originalColumnId)
    await columnRef.update({
        jobs: FieldValue.arrayRemove(jobId)
    });

    columnRef = db.collection('columns').doc(newColumnId)
    await columnRef.update({
        jobs: FieldValue.arrayUnion(jobId)
    });
}


module.exports = {createJob, getJobs, deleteJob, editJob}