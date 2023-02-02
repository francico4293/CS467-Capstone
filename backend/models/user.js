const { db } = require('../fire-admin');

createUser = async (uid, firstName, lastName, email) => {
    const docRef = db.collection('users').doc(uid);
    await docRef.set({
        firstName,
        lastName,
        email,
        description: '',
        jobs: [],
        contacts: [],
        skills: []
    });

    const doc = await docRef.get()
    return {...doc.data(), id: doc.id}
}

getUser = async (uid, email) => {
    const docRef = db.collection('users').doc(uid);
    const doc = await docRef.get()
    if (!doc.exists) {
        return createUser(uid, '', '', email)
    } else{
        return {...doc.data(), id: doc.id}
    }
}

editUser = async (uid, props) => {
    const docRef = db.collection('users').doc(uid);
    await docRef.update(props)

    const doc = await docRef.get()
    return {...doc.data(), id: doc.id}
}

deleteUser = async (uid) => {
    await db.collection('users').doc(uid).delete()
}

module.exports = { createUser, getUser, editUser, deleteUser }