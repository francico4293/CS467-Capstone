const { db } = require('../fire-admin');
const { FieldValue } = require('firebase-admin/firestore');

createSkill = async (uid, { name, proficiency }) => {
    const skillRef = await db.collection('skills').add({
        name,
        proficiency
    });

    const userRef = db.collection('users').doc(uid);
    await userRef.update({
        skills: FieldValue.arrayUnion(skillRef.id)
    });

    const skill = await skillRef.get()
    return { ...skill.data(), id: skill.id }
}

editSkill = async (uid, skillId, { name, proficiency}) => {
    const userRef = db.collection('users').doc(uid);
    const user = await userRef.get()
    const skillIds = user.data().skills

    if (!skillIds.includes(skillId)) {
        throw new Error("Skill does not belong to user")
    } 

    const skillRef = db.collection('skills').doc(skillId)
    await skillRef.update({ name, proficiency })
    const skill = await skillRef.get()
    return { ...skill.data(), id: skill.id }
}

getSkills = async (uid) => {
    const userRef = db.collection('users').doc(uid);
    const user = await userRef.get()
    const skillIds = user.data().skills

    const skills = await Promise.all(skillIds.map(async skillId => {
        const skillRef = db.collection('skills').doc(skillId)
        const skill = await skillRef.get()
        return {...skill.data(), id: skillId}
    }))
    return skills
}

deleteSkill = async (uid, skillId) => {
    const userRef = db.collection('users').doc(uid);
    const user = await userRef.get()
    const skillIds = user.data().skills

    if (!skillIds.includes(skillId)) {
        throw new Error("Skill does not belong to user")
    } 

    await userRef.update({
        skills: FieldValue.arrayRemove(skillId)
    });
    await db.collection('skills').doc(skillId).delete();
}

module.exports = { createSkill, getSkills, deleteSkill, editSkill }