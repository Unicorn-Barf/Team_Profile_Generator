// validation functions for inquire

// Email Validation
const emailVal = (answer) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(answer)) {
        return "You have to provide a valid email address!"
    }
    return true
};

const nameVal = (answer) => {
    const nameRegex = /^[A-Z][a-z]*(([,.] |[ '-])[A-Za-z][a-z]*)*(\.?)( [IVXLCDM]+)?$/;
    if (!nameRegex.test(answer)) {
        return "You have to provide a valid name!"
    }
    return true
}

module.exports = {
    emailVal,
    nameVal,
}