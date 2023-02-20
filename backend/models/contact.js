const { db } = require('../fire-admin');
const { FieldValue } = require('firebase-admin/firestore');

createContact = async (uid, { firstName, lastName, email, phoneNumber, linkedInProfile, company, contactPhoto, color, jobTitle }) => {
    const contactRef = await db.collection('contacts').add({
        firstName,
        lastName,
        email,
        phoneNumber,
        linkedInProfile,
        company,
        contactPhoto,
        color,
        jobTitle
    });

    const userRef = db.collection('users').doc(uid);
    await userRef.update({
        contacts: FieldValue.arrayUnion(contactRef.id)
    });

    const contact = await contactRef.get()
    return { ...contact.data(), id: contact.id }
}

editContact = async (uid, contactId, { firstName, lastName, email, phoneNumber, linkedInProfile, company, contactPhoto, color, jobTitle }) => {
    const userRef = db.collection('users').doc(uid);
    const user = await userRef.get()
    const contactIds = user.data().contacts

    if (!contactIds.includes(contactId)) {
        throw new Error("Contact does not belong to user")
    } 

    const contactRef = db.collection('contacts').doc(contactId)
    await contactRef.update({ firstName, lastName, email, phoneNumber, linkedInProfile, company, contactPhoto, color, jobTitle })
    const contact = await contactRef.get()
    return { ...contact.data(), id: contact.id }
}

getContacts = async (uid) => {
    const userRef = db.collection('users').doc(uid);
    const user = await userRef.get()
    const contactIds = user.data().contacts

    const contacts = await Promise.all(contactIds.map(async contact_id => {
        const contactRef = db.collection('contacts').doc(contact_id)
        const contact = await contactRef.get()
        return {...contact.data(), id: contact_id}
    }))
    return contacts
}

deleteContact = async (uid, contactId) => {
    const userRef = db.collection('users').doc(uid);
    const user = await userRef.get()
    const contactIds = user.data().contacts

    if (!contactIds.includes(contactId)) {
        throw new Error("Contact does not belong to user")
    } 

    await userRef.update({
        contacts: FieldValue.arrayRemove(contactId)
    });
    await db.collection('contacts').doc(contactId).delete();
}

module.exports = { createContact, getContacts, deleteContact, editContact }