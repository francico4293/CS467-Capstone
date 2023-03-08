// BEGIN CODE CITATION
// The following code is not my own
// Author: TomDuffyTech
// Source: https://www.youtube.com/watch?v=MqJzsDC1N0U
// Decription: The below function removes a non-digit character from the provided phone number.
// it then conditionally formats the phone number based on the length. For a phone number length
// less than 4, the phone number is returned as is. For a phone number length less than 7, parens
// are wrapped around the first three digits. For any other phone number length, parens are wrapped
// around the first three digits and a hyphen is added after the next grouping of three digits.
const formatPhoneNumber = (phoneNumber) => {
    phoneNumber = phoneNumber.replace(/[^\d]/g, '');

    const phoneNumberLength = phoneNumber.length;

    if (phoneNumberLength < 4) {
        return phoneNumber;
    }

    if (phoneNumberLength < 7) {
        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }

    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
}
// END CODE CITATION

const isPhoneNumberValid = (phoneNumber) => {
    const validPhoneNumber = new RegExp('^[(][0-9]{3}[)][ ][0-9]{3}[-][0-9]{4}$');
    return validPhoneNumber.test(phoneNumber);
}

export { formatPhoneNumber, isPhoneNumberValid };
