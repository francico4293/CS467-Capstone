const contactsRouter = require('express').Router()
const {createContact, getContacts} = require('../models/contact')


contactsRouter.post('/', async (req, res) => {
    if (!req.currentUser) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }
    const { uid } = req.currentUser
    const contact = await createContact(uid, req.body)
    res.status(201).json(contact)
})

contactsRouter.get('/', async (req, res) => {
    if (!req.currentUser) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }
    const { uid } = req.currentUser
    const contacts = await getContacts(uid)
    res.status(200).json(contacts)
})
module.exports = contactsRouter