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

const addEmployees = () => {
    console.log(`
    ---------------------------------------------
                Adding Employees
    ---------------------------------------------            
    `);
    return inquirer.prompt([
        {
            type: 'list',
            name: 'role',
            message: "Please choose the employee's role.",
            choices: ['Engineer', 'Intern']
        },
        {
            type: 'input',
            name: 'name',
            message: "What is the employee's name?",
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
            message: "What is the employee's ID number?",
            validate: nameInput => {
                if (isNaN(nameInput)) {
                    console.log("Please type the employee's ID number!")
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: "What is the employee's email address?",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please type an email address!")
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: "What is the employee's github username?",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please type a github username!")
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'school',
            message: "What school did the intern go to?",
            when: (input) => input.role === "Intern",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please type the intern's school!")
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmEmployee',
            message: 'Do you want to add more employees?'
        }
    ])
    .then(employeeData => {
        let {name, id, email, role, github, school, confirmEmployee} = employeeData;
        let employee;

        if(role === 'Engineer') {
            employee = new Engineer (name, id, email, github);
            console.log(employee);
        } else if (role === 'Intern') {
            employee = new Intern (name, id, email, school);
            console.log(employee);
        }   
        teamArr.push(employee);
        if(confirmEmployee) {
            return addEmployees(teamArr);
        } else {
            return teamArr;
        }
    })
}
addEmployees();