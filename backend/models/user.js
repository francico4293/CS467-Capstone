const { db } = require('../fire-admin');

createUser = async (uid, firstName, lastName, email) => {
    const docRef = db.collection('users').doc(uid);
    await docRef.set({
        firstName,
        lastName,
        email
    });

    const doc = await docRef.get()
    return {...doc.data(), id: doc.id}
}

module.exports = { createUser }