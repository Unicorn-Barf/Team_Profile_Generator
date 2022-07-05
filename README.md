# Team Profile Generator
​
## Table of contents
​
- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [User Story](#user-story)
  - [Acceptance Criteria](#acceptance-criteria)
  - [Instructions](#instructions)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)
​
​
## Overview
​
### The challenge
​
The Team Profile Generator is a NodeJS command line application that will generate a simple HTML file for a team profile website.  The application utilizes the Node Package Modules `inquirer` and `fs` to take user input in the command line and generate the HTML file using that input.  This application provides a simple way to generate a website containing your team members' profile including their name, roles, ID, and contact information.
​
### User Story
​
```md
AS A manager
I WANT to generate a webpage that displays my team's basic info
SO THAT I have quick access to their emails and GitHub profiles
```
​
### Acceptance Criteria
​
```md
GIVEN a command-line application that accepts user input
WHEN I am prompted for my team members and their information
THEN an HTML file is generated that displays a nicely formatted team roster based on user input
WHEN I click on an email address in the HTML
THEN my default email program opens and populates the TO field of the email with the address
WHEN I click on the GitHub username
THEN that GitHub profile opens in a new tab
WHEN I start the application
THEN I am prompted to enter the team manager’s name, employee ID, email address, and office number
WHEN I enter the team manager’s name, employee ID, email address, and office number
THEN I am presented with a menu with the option to add an engineer or an intern or to finish building my team
WHEN I select the engineer option
THEN I am prompted to enter the engineer’s name, ID, email, and GitHub username, and I am taken back to the menu
WHEN I select the intern option
THEN I am prompted to enter the intern’s name, ID, email, and school, and I am taken back to the menu
WHEN I decide to finish building my team
THEN I exit the application, and the HTML is generated
```

​
### Instructions
​
This application will run from the command line.  Make sure that you are in the directory of the index.js file in your CLI for it to work; in the command line enter `npm start` and follow the prompts.  When done, there will be an HTML file in the `/dist` directory with your basic team website and an accompanying css file to make it look nice.  The video linked below shows how to use the application.

[Demo Video](https://drive.google.com/file/d/1euhbhZE2HLqBu25oMr1eztTC-IgNK-v_/view)
​
​
### Links
​
- Solution URL: [https://github.com/Unicorn-Barf/Team_Profile_Generator](https://github.com/Unicorn-Barf/Team_Profile_Generator)
​
## My process
​
### Built with
​
- JavaScript
- NodeJS
- CSS
- Boostrap
- NPM fs
- NPM Inquirer
- NPM Jest
​
​
### What I learned
​
This project challenged me to find creative ways to use `inquirer`, as well as create classes with corresponding test files.


First, the neccessary modules and utilities had to be imported using the `require` command.  From here, I learned how to use the inquire module.  The code below shows how I used a questions object passed to the inquire module: `.prompt(questions)`.  Inquirer returns a promise object so the necessary `.then` and `.catch` syntax was utilized to access the data that was needed.

```js
function init() {
        inquirer
        .prompt(questions)
        .then(answers => {
            writeToFile(answers.fileName, answers);
        })
        .catch(err => {
            console.log(err);
        });
};
```
The application uses modularization in order to keep the code clean and DRY.  The init function starts the inquire prompts in the command line.  From here, I needed to know how to use that data.  As seen in the code sample above, `writeToFile()` is called with the promise data returned from the `inquirer.prompt()` so that the user input can be used to generate a markdown file.  Below is a the `writeToFile()` function:

```js
function writeToFile(fileName, data) {
    console.log('hit');
    fs.writeFile(`draftReadme/${fileName}`, generateMarkdown(data), err => {
        if (err) {
            console.log(err);
            return;
        }
        else {
            console.log('Sucess!');
        }
    })
}
```

As seen above, the `writeToFile()` function can easily create a .md file with the file name entered by the user.  It uses the `generateMarkdown()` utility that was exported from utilities and imported into the index.js file.  It seamlessly provides the generated markdown file to be written to a new file named by the user in a separate folder called `draftReadme` to keep it from overwriting the project `REAME.md`.
​
### Continued development
​
I am inspired by this project to come up with a more intesive command line app that can create custom readme outlines quickly.  It interests me to develop a version of this application that can create any README.md skeleton to fit any project type.  I would find it very useful to save time when writing a new README for any of my projects.
​
### Useful resources
​
- [Markdown License Badges](https://gist.github.com/lukas-h/2a5d00690736b4c3a7ba) - This is a Github repo by user lukas-h; it contains copy/paste ready license badge images that are clickable links already formatted for mardown.
- [NPM inquirer docs](https://www.npmjs.com/package/inquirer) - This is NPM's docs for the inquirer module which was a very helpful reference to make sure I was using the correct syntax in my code.
​
## Author
​
- Website - [Nolan Spence](https://unicorn-barf.github.io/Portfolio_Website_HTML_CSS/)
- LinkedIn - [https://www.linkedin.com/in/aerospence/](https://www.linkedin.com/in/aerospence/)
​
## Acknowledgments
​
Manny was great at introducing me to creating a NodeJS application.  Thanks Manny!!
