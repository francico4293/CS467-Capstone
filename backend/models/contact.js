const { db } = require('../fire-admin');
const { FieldValue } = require('firebase-admin/firestore');

createContact = async (uid, { firstName, lastName, email, phoneNumber, linkedInProfile, company, companyLogo, color, jobTitle }) => {
    const contactRef = await db.collection('contacts').add({
        firstName,
        lastName,
        email,
        phoneNumber,
        linkedInProfile,
        company,
        companyLogo,
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

getContacts = async (uid) => {
    const userRef = db.collection('users').doc(uid);
    const user = await userRef.get()
    const contact_ids = user.data().contacts

    const contacts = await Promise.all(contact_ids.map(async contact_id => {
        const contactRef = db.collection('contacts').doc(contact_id)
        const contact = await contactRef.get()
        return {...contact.data(), id: contact_id}
    }))
    return contacts

}

module.exports = { createContact, getContacts }