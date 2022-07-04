const { connectionString } = require('pg/lib/defaults');
const AnswerDAO = require('./AnswerDAO');
const Question = require('./Question');

class QuestionDAO {
    constructor() {
        const { Pool } = require('pg')
        require('dotenv').config({ path: '../.env' });
        this.pool = new Pool();

        this.ansDAO = new AnswerDAO();
    }

    //gives you a Question object from database information
    getQuestion(id, callback) {
        const query = async() => {
            const sql = 'SELECT quest_text, correct_ans from question where quest_id = $1'
            const { rows:quest } = await this.pool.query(sql, [id])
            this.ansDAO.getAllAnswers(id, (answers) => {
                callback(new Question(id, quest[0].quest_text, answers, quest[0].correct_ans))
            })
        }
        query()
    }

    //gives you a list of Question objects that belong to the test
    getAllTestQuestions(test_id, callback) {
        const query = async() => {
            const questions = []
            const sql = 'SELECT quest_id, quest_text, correct_ans from question natural join test_question where test_id = $1'
            const { rows: quest } = await this.pool.query(sql, [test_id])
            //console.log(quest)
            if (quest.length != 0) {
                quest.forEach((elm) => {
                    this.getQuestion(elm.quest_id, (question) => {
                        questions.push(question)
                        if(questions.length == quest.length) {
                            callback(questions)
                        }
                    }) 
                })
            } else {
                callback(questions)
            }
        }
        query()
    }

    //returns a list of Question objects which represents all questions in the database.
    getAllQuestions(callback) {
        const query = async() => {
            const questions = []
            const sql = 'SELECT quest_id, quest_text, correct_ans from question'
            const { rows: quest } = await this.pool.query(sql)
            //console.log(quest)
            if (quest.length != 0) {
                quest.forEach((elm) => {
                    this.getQuestion(elm.quest_id, (question) => {
                        questions.push(question)
                        if(questions.length == quest.length) {
                            callback(questions)
                        }
                    }) 
                })
            } else {
                callback(questions)
            }
        }
        query()
    }

    //adds the given information to the database and returns a Question object.
    addQuestion(text, callback) {
        const query = async() => {
            const sql = 'INSERT into question(quest_text, correct_ans) values ($1, null) returning quest_id'
            const { rows:quest } = await this.pool.query(sql, [text])
            callback(new Question(quest[0].quest_id, text, [], null))
        }
        query()
    }

    //updates the information in the database to match the question given.
    updateQuestion(question) {
        const query = async() => {
            const sql = 'UPDATE question set quest_text = $1, correct_ans = $2 where quest_id = $3'
            const { rows:quest } = await this.pool.query(sql, [question.quest_text, question.correct_ans, question.id])
        }
        query()
    }

    //deletes the question from the database.
    deleteQuestion(quest_id) {
        const query = async() => {
            const sql = 'DELETE from question where quest_id = $1'
            const { rows:quest } = await this.pool.query(sql, [quest_id])
        }
        query()
    }
}

module.exports = QuestionDAO;


//const qdao = new QuestionDAO()
//const adao = new AnswerDAO()

// qdao.getQuestion(1, (question) => {
//     console.log(question)
//     console.log(question.getCorrectAnswer())
// })

// qdao.getAllQuestions(1, (questions) => {
//     console.log(questions)
// })

// qdao.addQuestion("This is a new question. Did it work?", (question) => {
//     console.log(question)
//     adao.addAnswer(question.id, "This is an answer to the new question.", (answer) => {
//         console.log(question)
//         adao.addAnswer(question.id, "This is the second answer to the new question.", (answer) => {
//             console.log(question)
//             qdao.updateQuestion(question)
//         })
//     })
// })

// qdao.getQuestion(9, (question) => {
//     console.log(question)
// })