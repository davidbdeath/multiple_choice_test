class Test {
    /**
    * @param {string} name The name of the test
    */
    constructor(id, name, questions) {
        this.id = id;
        this.test_name = name;
        this.questions = questions;
    }
}

module.exports = Test;