const contactsRouter = require('express').Router()
const {createContact, deleteContact, editContact, getContacts} = require('../models/contact')


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

contactsRouter.delete('/:_id', async (req, res) => {
    if (!req.currentUser) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }
    const { uid } = req.currentUser
    const contactId = req.params._id
    await deleteContact(uid, contactId)
    res.status(204).send();
})

contactsRouter.put('/:_id', async (req, res) => {
    if (!req.currentUser) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }
    const { uid } = req.currentUser
    const contactId = req.params._id
    const contact = await editContact(uid, contactId, req.body)
    res.status(200).json(contact)
})
module.exports = contactsRouter