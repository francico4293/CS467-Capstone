const usersRouter = require('express').Router()
const { createUser } = require('../models/user')

usersRouter.post('/', async (req, res) => {
    if (!req.currentUser) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }
    const { uid, email } = req.currentUser
    const { firstName, lastName } = req.body
    const user = await createUser(uid, firstName, lastName, email)
    res.status(201).json(user);
})


module.exports = usersRouter