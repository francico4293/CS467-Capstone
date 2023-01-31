const usersRouter = require('express').Router()
const { createUser, getUser, editUser, deleteUser } = require('../models/user')

usersRouter.post('/', async (req, res) => {
    if (!req.currentUser) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }
    const { uid, email } = req.currentUser
    const { firstName, lastName } = req.body
    const user = await createUser(uid, firstName, lastName, email)
    res.status(201).json(user);
})

usersRouter.get('/', async (req, res) => {
    if (!req.currentUser) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }
    const { uid, email } = req.currentUser
    const user = await getUser(uid, email)
    res.status(200).json(user)
})

usersRouter.put('/', async (req, res) => {
    if (!req.currentUser) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }
    const { uid } = req.currentUser
    const user = await editUser(uid, req.body)
    res.status(200).json(user)
})

usersRouter.delete('/', async (req, res) => {
    if (!req.currentUser) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }
    await deleteUser(uid)
    res.status(204).send()
})

module.exports = usersRouter