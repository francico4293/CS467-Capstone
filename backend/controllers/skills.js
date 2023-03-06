const skillsRouter = require('express').Router()
const {createSkill, deleteSkill, editSkill, getSkills} = require('../models/skill')


skillsRouter.post('/', async (req, res) => {
    if (!req.currentUser) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }
    const { uid } = req.currentUser
    const skill = await createSkill(uid, req.body)
    res.status(201).json(skill)
})

skillsRouter.get('/', async (req, res) => {
    if (!req.currentUser) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }
    const { uid } = req.currentUser
    const skills = await getSkills(uid)
    res.status(200).json(skills)
})

skillsRouter.delete('/:_id', async (req, res) => {
    if (!req.currentUser) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }
    const { uid } = req.currentUser
    const skillId = req.params._id
    await deleteSkill(uid, skillId)
    res.status(204).send();
})

skillsRouter.put('/:_id', async (req, res) => {
    if (!req.currentUser) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }
    const { uid } = req.currentUser
    const skillId = req.params._id
    const skill = await editSkill(uid, skillId, req.body)
    res.status(200).json(skill)
})
module.exports = skillsRouter