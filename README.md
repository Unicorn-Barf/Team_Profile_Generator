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
This project challenged me to find creative ways to use `inquirer`, as well as create classes with corresponding test files.  I will share some things I learned below and a little bit of code that I am proud of.


First, I needed to come up with a way to flexible work with varied user needs when prompting the user for information about team manager and team members.  I always wanted information on the team manager, but the team members could vary or possible not exist depending on the user case.  I decided to make two separate prompts, one for the manager information and one for the team member information; but the team member prompt had to conditionally decide what to ask depending on the member type.  I utilized inquirer's `when:` value in the question object to selectively ask questions depending on which case it was.  Here is an example of how I implemented this on an engineer specific question:

```js
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
```

As shown, `when` takes a function that will return true or false to decide whether or not to ask this particular question.  Here, it only asks engineers for their github username.  As you can also see, I used the `validate:` key to make sure user input was appropriate for that question.  I implemented `validate:` on every question with an appropriate regex test.  The validation functions are found in the `/utils/validation.js` file.  Because my validation functions were strict, there was no need to filter the user input after it is accepted.

The next challenge was finding a way to effectively call my team member prompt recursively in case that the user wanted to add multiple members and then appropriately storing that data.  I decided to make a function that could be called for the team member prompt.  Here is my solution:

```js
// function to gather Team Member data from inquirer
async function teamPrompt(teamArr = []) {
    // Destructure the inquirer object
    const { addTeamMember, ...answers } = await inquirer.prompt(addMoreQ);
    // Build new team array by adding on new answers
    const newTeamArr = [...teamArr, answers];
    // Recursively call the teamPrompt() function when user wants to add more team members
    return (addTeamMember === 'Add Member') ? teamPrompt(newTeamArr) : newTeamArr;
}
```

This function solved my problem by recursively calling itself when the `addTeamMember` value was selected to add a member.  This value was stored by destructuring the object returned by the inquirer prompt.  Then, a new team array was built by spreading the `teamArr` and adding the new object as seen in the code.  A simple conditional statement decides whether to call the function again with the updated array, or to return the `newTeamArray`.

Finally, I learned about test driven development by writing my own test files.  In this challenge, test files were only written for class constructor files that were used to build an Employee class and subclasses that extended the Employee class.  By reading the instructional README.md directions for the project, I was able to write test files for each class using NPM jest.  One of the most important things that I learned was to be wary of the difference between `.toEqual()` and `.toBe()` when using `expect()`.  I decided that when comparing cases it was more prudent to use the `toBe()` comparitor so that the actual string characters could be accurately compared.  I am still developing knowledge on their difference, but `.toEqual()` is better used when comparing number values and booleans where as `toBe()` would be more appropriate for strings and object comparision.
​
### Continued development
​
This project showed me an introduction to the power of JavaScript classes and testing.  In the future, I want to take this knowledge and apply it to more complex and useful projects.  I also want to delve deeper into using mocks with jest as I didn't have ample opportunity to really explore their power with this project.
​
### Useful resources
​
- [Recusively call inquirer prompt](http://www.penandpaperprogrammer.com/blog/2018/12/16/repeating-questions-with-inquirerjs) - This is an concise example of how one can recursively call an inquirer prompt and appropriately store the data.
- [NPM inquirer example code](https://pakstech.com/blog/inquirer-js/) - This is an alternative documentation on NPM inquirer for when the official docs are too difficult to sort through that I found useful for quick example code reference.
- [Flaticon](https://www.flaticon.com/search?word=student&order_by=4) - A fun resource for getting quality icons quickly for free, I used this site for my card icons.
- [Email Regex](https://www.formget.com/regular-expression-for-email/#:~:text=Regualr%20expression%20is%20a%20sequence,.Cd%E2%80%9D%20%2C%E2%80%9Dabc123.) - A great breakdown of a possible email testing Regex expression.
​
## Author
​
Nolan Spence
- Website - [Nolan Spence](https://unicorn-barf.github.io/Portfolio_Website_HTML_CSS/)
- LinkedIn - [https://www.linkedin.com/in/aerospence/](https://www.linkedin.com/in/aerospence/)
​
## Acknowledgments
​
Thank you to my tutor Jacob Nordan for diving into testing with me!
