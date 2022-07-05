// validation functions for inquire

// Email Validation
const emailVal = (answer) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(answer)) {
        return "You have to provide a valid email address!"
    }
    return true
};

// Name validation
const nameVal = (answer) => {
    const nameRegex = /^[A-Z][a-z]*(([,.] |[ '-])[A-Za-z][a-z]*)*(\.?)( [IVXLCDM]+)?$/;
    if (!nameRegex.test(answer)) {
        return "You have to provide a valid name!"
    }
    return true;
};

// Number validation
const numberVal = (answer) => {
    const numberRegex = /^\d+$/;
    if (!numberRegex.test(answer)) {
        return "Enter a valide ID number."
    }
    return true;
};

// Github Username validation: Regex https://github.com/shinnn/github-username-regex
const githubVal = (answer) => {
    const githubRegex = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
    if (!githubRegex.test(answer)) {
        return "Enter a valide ID github username."
    }
    return true;
};

// School Validation
const schoolVal = (answer) => {
    const schoolRegex = /^[\w](?:[\w]|\s(?=[\w]))+$/i;
    if (!schoolRegex.test(answer)) {
        return "Enter a valide ID School name."
    }
    return true;
};

module.exports = {
    emailVal,
    nameVal,
    numberVal,
    githubVal,
    schoolVal,
}