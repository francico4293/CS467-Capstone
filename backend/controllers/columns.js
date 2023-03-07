const columnsRouter = require('express').Router()
const {createColumn, deleteColumn, editColumn} = require('../models/column')


columnsRouter.post('/', async (req, res) => {
    if (!req.currentUser) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }
    const { uid } = req.currentUser
    const column = await createColumn(uid, req.body)
    res.status(201).json(column)
})


columnsRouter.delete('/:_id', async (req, res) => {
    if (!req.currentUser) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }
    const { uid } = req.currentUser
    const columnId = req.params._id
    await deleteColumn(uid, columnId)
    res.status(204).send();
})

columnsRouter.put('/:_id', async (req, res) => {
    if (!req.currentUser) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }
    const { uid } = req.currentUser
    const columnId = req.params._id
    const column = await editColumn(uid, columnId, req.body)
    res.status(200).json(column)
})
module.exports = columnsRouter