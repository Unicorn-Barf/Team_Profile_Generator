const inquirer = require('inquirer');
const fs = require('fs');
const generateHTML = require('../../tests/utils/generateHTML');

// Question Objects for inquire

// Gets Manager information
const managerQ = [
    {
        message: 'What is the name of the team manager?',
        name: 'managerName',
        type: 'input',
        default: 'Mr. Brooks',
    },
    {
        message: "What is the manager's employee ID?",
        name: 'managerID',
        type: 'number',
        default: '0',
    },
    {
        message: "What is the manager's email address?",
        name: 'managerEmail',
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
        name: 'managerOffice',
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
        when(answers) {
            return answers.addTeamMember === "Add Member";
        }
    },
    {
        message: 'What is the name of the engineer?',
        name: 'engineerName',
        type: 'input',
        default: 'Mr. Brooks',
        when(answers) {
            return answers.memberType === "Engineer";
        },
    },
    {
        message: "What is the engineer's employee ID?",
        name: 'engineerID',
        type: 'number',
        default: '0',
        when(answers) {
            return answers.memberType === "Engineer";
        },
    },
    {
        message: "What is the engineer's email address?",
        name: 'engineerEmail',
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
        when(answers) {
            return answers.memberType === "Engineer";
        },
    },
    {
        message: "What is the engineer's Github username?",
        name: 'engineerGithub',
        type: 'input',
        default: 'Unicorn-Barf',
        when(answers) {
            return answers.memberType === "Engineer";
        },
    },
    {
        message: 'What is the name of the intern?',
        name: 'internName',
        type: 'input',
        default: 'Mr. Brooks',
        when(answers) {
            return answers.memberType === "Intern";
        },
    },
    {
        message: "What is the intern's employee ID?",
        name: 'internID',
        type: 'number',
        default: '0',
        when(answers) {
            return answers.memberType === "Intern";
        },
    },
    {
        message: "What is the intern's email address?",
        name: 'internEmail',
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
        when(answers) {
            return answers.memberType === "Intern";
        },
    },
    {
        message: "What is the intern's school?",
        name: 'internSchool',
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
    fs.writeFile(`./dist/index.html`, generateHTML(managerData, teamArr), err => {
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
function init() {
    // Prompt user in command line for manager questions
    inquirer
        .prompt(managerQ)
        .then(answers => {
            let managerAns = answers;
            let teamArr = [];
            // Create boolean to only prompt team member inquire if user wants to add team member
            let addBoolean = answers.addTeamMember === 'Add Member';
            while (addBoolean) {
                // Prompt user in the command line for team member questions
                inquirer
                    .prompt(addMoreQ)
                    .then(answers => {
                        teamArr.push(answers);
                        if (answers.addTeamMember !== 'Add Member') addBoolean = false;
                    });
            };
            // Call the write to file function with the data
            writeToFile(managerAns, teamArr);
        })
        .catch(err => {
            console.log(err);
        });
};

// Function call to initialize app
init();