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
    constructor(message) {
        this.message = message;
    }
}

module.exports = Error;