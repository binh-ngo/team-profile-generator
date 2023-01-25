const fs = require('fs');
const inquirer = require('inquirer');
const Manager = require('./develop/lib/Manager');
const Engineer = require('./develop/lib/Engineer');
const Intern = require('./develop/lib/Intern');
const generateHTML = require('./develop/util/generateHtml');

const teamArr = [];

const addManager = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "Please type the name of the team's manager.",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please type a name!")
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: "Please enter the manager's ID number.",
            validate: nameInput => {
                if (isNaN(nameInput)) {
                    console.log("Please enter the manager's ID number!")
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: "Please type the manager's email address.",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please type an email!")
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: "Please enter the manager's office number.",
            validate: nameInput => {
                if (isNaN(nameInput)) {
                    console.log('Please enter an office number!')
                    return false;
                } else {
                    return true;
                }
            }
        }
    ])
    .then(managerInput => {
        const {name, id, email, officeNumber} = managerInput;
        const manager = new Manager (name, id, email, officeNumber);
        teamArr.push(manager);
        console.log(manager);
    })
}; // end Manager questions array
addManager();