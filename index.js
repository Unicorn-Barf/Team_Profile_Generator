const inquirer = require('inquirer');
const fs = require('fs');
const generateHTML = require('./utils/generateHTML');
const validation = require('./utils/validation');


// Question Objects for inquire

// Manager information
const managerQ = [
    {
        message: 'What is the name of the team manager?',
        name: 'name',
        type: 'input',
        default: 'Mr. Big',
        validate: validation.nameVal,
    },
    {
        message: "What is the manager's employee ID?",
        name: 'id',
        type: 'input',
        default: '777',
        validate: validation.numberVal,
    },
    {
        message: "What is the manager's email address?",
        name: 'email',
        type: 'input',
        default: 'yasskween@hotmail.com',
        validate: validation.emailVal,
    },
    {
        message: "What is the manager's office number?",
        name: 'officeNum',
        type: 'input',
        default: '666',
        validate: validation.numberVal,
    },
    {
        message: "Add another team member or finish building team?",
        name: 'addTeamMember',
        type: 'list',
        choices: ['Add Member', 'Finish Building'],
    },
];

// additional engineer or intern
const addMoreQ = [
    {
        message: "Are they an Engineer or and Intern?",
        name: 'memberType',
        type: 'list',
        choices: ['Engineer', 'Intern'],
    },
    {
        message: 'What is their name?',
        name: 'name',
        type: 'input',
        default: 'Miss Thang',
        validate: validation.nameVal,
    },
    {
        message: "What is their ID?",
        name: 'id',
        type: 'input',
        default: '13',
        validate: validation.numberVal,
    },
    {
        message: "What is their email address?",
        name: 'email',
        type: 'input',
        default: 'youbettawerk@rupaul.com',
        validate: validation.emailVal,
    },
    {
        message: "What is the engineer's Github username?",
        name: 'github',
        type: 'input',
        default: 'Hair-Whips',
        when(answers) {
            return answers.memberType === "Engineer";
        },
        validate: validation.githubVal,
    },
    {
        message: "What is the intern's school?",
        name: 'school',
        type: 'input',
        default: 'Shangela School of Cosmotology',
        when(answers) {
            return answers.memberType === "Intern";
        },
        validate: validation.schoolVal,
    },
    {
    message: "Add another team member or finish building team?",
    name: 'addTeamMember',
    type: 'list',
    choices: ['Add Member', 'Finish Building'],
    },
]

// Function that uses npm filesystem to write a new index.HTML in dist directory
function writeToFile(managerData, teamArr) {
    fs.writeFile('dist/index.html', generateHTML(managerData, teamArr), err => {
        if (err) {
            console.log(err);
            return;
        }
        else {
            console.log('Sucess!');
        }
    });
}

// TODO: Create a function to initialize app
// This will start the user prompts in the command line to get information
// for the REAME.md
async function init() {
    // declare a teamArr variable, null in case no team members are added
    let teamArr = null;
    // Prompt user in command line for manager questions
    let managerData = await managerPrompt();
    // Start team member prompts if user wants to add team members
    if (managerData.addTeamMember === 'Add Member') {
        teamArr = await teamPrompt();
    }
    // Call the write to file function with the data
    writeToFile(managerData, teamArr);
};

// function to gather manager data from inquirer
async function managerPrompt() {
    let managerData = await inquirer
        .prompt(managerQ)
        .catch(err => console.log(err));
    return managerData;
    // Inquirer return is not typical promise return, keeping code for reference
    // Prompt user in command line for manager questions
    // let managerData = await new Promise((resolve, reject) => {
    //     inquirer
    //     .prompt(managerQ)
    //     .then(answers => {
    //         resolve(answers);
    //     })
    //     .catch(err => {
    //         reject(err);
    //     });
    // });
    // return managerData;
}

// function to gather Team Member data from inquirer
async function teamPrompt(teamArr = []) {
    // Destructure the inquirer object
    const { addTeamMember, ...answers } = await inquirer.prompt(addMoreQ);
    // Build new team array by adding on new answers
    const newTeamArr = [...teamArr, answers];
    // Recursively call the teamPrompt() function when user wants to add more team members
    return (addTeamMember === 'Add Member') ? teamPrompt(newTeamArr) : newTeamArr;
}

// Function call to initialize app
init();