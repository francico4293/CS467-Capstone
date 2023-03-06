const jobsRouter = require('express').Router()
const {createJob, getJobs, deleteJob, editJob} = require('../models/job')

jobsRouter.post('/', async (req, res) => {
    if (!req.currentUser) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }
    const { uid } = req.currentUser
    const job = await createJob(uid, req.body.columnName, req.body.jobData)
    res.status(201).json(job)
})

jobsRouter.get('/', async (req, res) => {
    if (!req.currentUser) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }
    const { uid } = req.currentUser
    const jobs = await getJobs(uid)
    res.status(200).json(jobs)
})

jobsRouter.delete('/:_id', async (req, res) => {
    if (!req.currentUser) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }
    const { uid } = req.currentUser
    const jobId = req.params._id
    await deleteJob(uid, jobId)
    res.status(204).send();
})

jobsRouter.put('/:_id', async (req, res) => {
    if (!req.currentUser) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }
    const { uid } = req.currentUser
    const jobId = req.params._id
    const job = await editJob(uid, jobId, req.body)
    res.status(200).json(job)
})

module.exports = jobsRouter