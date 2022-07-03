const inquirer = require('inquirer');
const fs = require('fs');
const generateHTML = require('./utils/generateHTML');

// Question Objects for inquire

// Gets Manager information
const managerQ = [
    {
        message: 'What is the name of the team manager?',
        name: 'name',
        type: 'input',
        default: 'Mr. Brooks',
    },
    {
        message: "What is the manager's employee ID?",
        name: 'id',
        type: 'number',
        default: '0',
    },
    {
        message: "What is the manager's email address?",
        name: 'email',
        type: 'input',
        default: 'yasskween@hotmail.com',
        // define validation functions separately
        validate: (answer) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if(!emailRegex.test(answer)) {
                return "You have to provide a valid email address!"
            }
            return true
        }
    },
    {
        message: "What is the manager's office number?",
        name: 'officeNum',
        type: 'number',
        default: '666',
    },
    {
        message: "Add another team member or finish building team?",
        name: 'addTeamMember',
        type: 'list',
        choices: ['Add Member', 'Finish Building'],
    },
];

// Asks to add an additional engineer or intern
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
        default: 'Mr. Brooks',
    },
    {
        message: "What is their ID?",
        name: 'id',
        type: 'number',
        default: '0',
    },
    {
        message: "What is their email address?",
        name: 'email',
        type: 'input',
        default: 'yasskween@hotmail.com',
        // define validation functions separately
        validate: (answer) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if(!emailRegex.test(answer)) {
                return "You have to provide a valid email address!"
            }
            return true
        },
    },
    {
        message: "What is the engineer's Github username?",
        name: 'github',
        type: 'input',
        default: 'Unicorn-Barf',
        when(answers) {
            return answers.memberType === "Engineer";
        },
    },
    {
        message: "What is the intern's school?",
        name: 'school',
        type: 'input',
        default: 'UCSD',
        when(answers) {
            return answers.memberType === "Intern";
        },
    },
    {
    message: "Add another team member or finish building team?",
    name: 'addTeamMember',
    type: 'list',
    choices: ['Add Member', 'Finish Building'],
    },
]

// TODO: Create a function to write README file
function writeToFile(managerData, teamArr) {
    console.log('hit');
    fs.writeFile('dist/index.html', generateHTML(managerData, teamArr), err => {
        if (err) {
            console.log(err);
            return;
        }
        else {
            console.log('Sucess!');
        }
    })
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
    // Prompt user in command line for manager questions
    let managerData = await new Promise((resolve, reject) => {
        inquirer
        .prompt(managerQ)
        .then(answers => {
            resolve(answers);
        })
        .catch(err => {
            reject(err);
        });
    });
    return managerData;
}

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