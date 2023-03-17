const { db } = require('../fire-admin');

createUser = async (uid, firstName, lastName, email) => {
    const column1 = await db.collection('columns').add({name: "Interested", jobs: []})
    const column2 = await db.collection('columns').add({name: "Applied", jobs: []})
    
    const docRef = db.collection('users').doc(uid);
    await docRef.set({
        firstName,
        lastName,
        email,
        description: '',
        columns: [column1.id, column2.id],
        contacts: [],
        skills: []
    });

    const doc = await docRef.get()
    return { ...doc.data(), id: doc.id }
}

getUser = async (uid, email) => {
    const userRef = db.collection('users').doc(uid);
    const user = await userRef.get()
    if (!user.exists) {
        return createUser(uid, '', '', email)
    } else {
        const userData = user.data()
        const populatedColumns = await Promise.all(userData.columns.map(async columnId => {
            const columnRef = db.collection('columns').doc(columnId)
            const column = await columnRef.get()
            return {...column.data(), id: columnId}
        }))

        return { ...userData, columns: populatedColumns, id: user.id }
    }
}

editUser = async (uid, props) => {
    const userRef = db.collection('users').doc(uid);
    await userRef.update(props)

    const user = await userRef.get()
    const userData = user.data()
    const populatedColumns = await Promise.all(userData.columns.map(async columnId => {
        const columnRef = db.collection('columns').doc(columnId)
        const column = await columnRef.get()
        return {...column.data(), id: columnId}
    }))

    return { ...userData, columns: populatedColumns, id: user.id }
}

deleteUser = async (uid) => {
    await db.collection('users').doc(uid).delete()
}

module.exports = { createUser, getUser, editUser, deleteUser }