// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require('./Employee');

class Manager extends Employee {
    constructor (name, id, email, officeNumber) {
    // inheriting employee constructor while also assigning an officeNumber key to each new manager
    super(name, id, email);
        this.officeNumber = officeNumber;
    }
    getRole() {
        return 'Manager';
    }
}

module.exports = Manager;