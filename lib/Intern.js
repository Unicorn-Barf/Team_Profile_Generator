const Employee = require('./Employee');

class Intern extends Employee {
    constructor(school) {
        this.school = school;
    }

    getGithub() {

    }

    getRole() {
        // returns 'Intern'
    }
}