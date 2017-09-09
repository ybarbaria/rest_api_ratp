// // Constructor
// function EerorSoap(code) {
//     this.code = code;
//   }
//   // class methods
//   ErrorSoap.prototype.toString = function() {
//     return this.code;
//   };
//   // export the class
//   module.exports = ErrorSoap;

class Error {
    constructor(code) {
        this.code = code;
    }
}

class advertHandler {
    constructor(projects) {
        this.projects = projects;
    }

    getProject(name) {
        return this.projects[name];
    }
}

module.exports = Error;