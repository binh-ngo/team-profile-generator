const fs = require("fs");
const inquirer = require("inquirer");
const Manager = require("./develop/lib/Manager");
const Engineer = require("./develop/lib/Engineer");
const Intern = require("./develop/lib/Intern");
const generateHTML = require("./develop/util/generateHtml");

const teamArr = []; // empty array to store all team members

const addManager = () => {
  //start of manager questions array
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Please type the name of the team's manager.",
        validate: (nameInput) => {
          // ensures the user types something
          if (nameInput) {
            return true;
          } else {
            console.log("Please type a name!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "id",
        message: "Please enter the manager's ID number.",
        validate: (nameInput) => {
          // ensures the user types a number
          if (isNaN(nameInput)) {
            console.log("Please enter the manager's ID number!");
            return false;
          } else {
            return true;
          }
        },
      },
      {
        type: "input",
        name: "email",
        message: "Please type the manager's email address.",
        validate: (nameInput) => {
          // ensures the user types something
          if (nameInput) {
            return true;
          } else {
            console.log("Please type an email!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "officeNumber",
        message: "Please enter the manager's office number.",
        validate: (nameInput) => {
          // ensures the user types a number
          if (isNaN(nameInput)) {
            console.log("Please enter an office number!");
            return false;
          } else {
            return true;
          }
        },
      },
    ])
    .then((managerInput) => {
      // once the user answers all the questions, then the program stores the information and gives it to the new instance of manager.
      const { name, id, email, officeNumber } = managerInput; // then the manager gets pushed into the team array
      const manager = new Manager(name, id, email, officeNumber);
      teamArr.push(manager);
      console.log(manager);
    });
}; // end Manager questions array

const addEmployees = () => {
  console.log(`
    ---------------------------------------------
                Adding Employees
    ---------------------------------------------            
    `);
  return inquirer
    .prompt([
      {
        type: "list", // user is given two choices for the employee they want to add
        name: "role",
        message: "Please choose the employee's role.",
        choices: ["Engineer", "Intern"],
      },
      {
        type: "input",
        name: "name",
        message: "What is the employee's name?",
        validate: (nameInput) => {
          // ensures the user types something
          if (nameInput) {
            return true;
          } else {
            console.log("Please type a name!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "id",
        message: "What is the employee's ID number?",
        validate: (nameInput) => {
          // ensures the user types a number
          if (isNaN(nameInput)) {
            console.log("Please type the employee's ID number!");
            return false;
          } else {
            return true;
          }
        },
      },
      {
        type: "input",
        name: "email",
        message: "What is the employee's email address?",
        validate: (nameInput) => {
          // ensures the user types something
          if (nameInput) {
            return true;
          } else {
            console.log("Please type an email address!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "github",
        message: "What is the employee's github username?",
        validate: (nameInput) => {
          // ensures the user types anything
          if (nameInput) {
            return true;
          } else {
            console.log("Please type a github username!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "school",
        message: "What school did the intern go to?",
        when: (input) => input.role === "Intern",
        validate: (nameInput) => {
          // ensures the user types anything
          if (nameInput) {
            return true;
          } else {
            console.log("Please type the intern's school!");
            return false;
          }
        },
      },
      {
        type: "confirm", // prompts user if they want to add more employees
        name: "confirmEmployee",
        message: "Do you want to add more employees?",
      },
    ])
    .then((employeeData) => { // takes all available info and stores into employee variable
      let { name, id, email, role, github, school, confirmEmployee } =
        employeeData;
      let employee;

      if (role === "Engineer") { // if employee's role is engineer, create a new instance of an engineer and give it said values from the employee variable
        employee = new Engineer(name, id, email, github);
        console.log(employee);
      } else if (role === "Intern") {// if employee's role is intern, create a new instance of an intern and give it said values from the employee variable
        employee = new Intern(name, id, email, school);
        console.log(employee);
      }
      teamArr.push(employee); // adds the employee to the team array
      if (confirmEmployee) { // if user selected yes, rerun addEmployees function , else return the team array.
        return addEmployees(teamArr);
      } else {
        return teamArr;
      }
    });
};

const writeHTML = (data) => {
  fs.writeFile("index.html", data, (err) => {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log(
        "Your team profile has been created! Go to index.html to check it out!"
      );
    }
  });
};

addManager().then(addEmployees).then((teamArr) => {
    return generateHTML(teamArr);
  }).then((profileHtml) => {
    return writeHTML(profileHtml);
  })
  .catch((err) => {
    console.log(err);
  });
