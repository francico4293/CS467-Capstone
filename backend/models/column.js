const { db } = require('../fire-admin');
const { FieldValue } = require('firebase-admin/firestore');

createColumn = async (uid, { name }) => {
    const columnRef = await db.collection('columns').add({
        name,
        jobs: []
    });

    const userRef = db.collection('users').doc(uid);
    await userRef.update({
        columns: FieldValue.arrayUnion(columnRef.id)
    });

    const column = await columnRef.get()
    return { ...column.data(), id: column.id }
}

editColumn = async (uid, columnId, { name }) => {
    const userRef = db.collection('users').doc(uid);
    const user = await userRef.get()
    const columnIds = user.data().columns

    if (!columnIds.includes(columnId)) {
        throw new Error("Column does not belong to user")
    } 

    const columnRef = db.collection('columns').doc(columnId)
    await columnRef.update({ name })
    const column = await columnRef.get()
    return { ...column.data(), id: column.id }
}

deleteColumn = async (uid, columnId) => {
    const userRef = db.collection('users').doc(uid);
    const user = await userRef.get()
    const columnIds = user.data().columns

    if (!columnIds.includes(columnId)) {
        throw new Error("Column does not belong to user")
    } 

    const columnRef = db.collection('columns').doc(columnId)
    const column = await columnRef.get()

    if (column.data().jobs.length > 0) {
        throw new Error ("Column contains jobs. Cannot delete")
    }

    await userRef.update({
        columns: FieldValue.arrayRemove(columnId)
    });
    await columnRef.delete();
}

module.exports = { createColumn, deleteColumn, editColumn }