const Score = require('./Score');

class ScoreDAO {
    constructor() {
        const { Pool } = require('pg')
        require('dotenv').config({ path: '../.env' });
        this.pool = new Pool();
    }

    //returns a Score object which matches information in the database.
    getScore(id, callback) {
        const query = async() => {
            const sql = 'SELECT test_id, student_name, score from score where score_id = $1'
            const { rows:score } = await this.pool.query(sql, [id])
            callback(new Score(id, score[0].student_name, score[0].score, score[0].test_id))
        }
        query()
    }

    //returns a list of all Score objects representing all of the scores in the database.
    getAllScores(callback) {
        const query = async() => {
            const scores = []
            const sql = 'SELECT score_id, test_id, student_name, score from score'
            const { rows: score } = await this.pool.query(sql)
            //may have to rework this for each by adding an if statment to it like question and test dao
            //Do this if it isn't wanting to return anything.
            score.forEach((elm) => {
                scores.push(new Score(elm.score_id, elm.student_name, elm.score, elm,test_id))
            })
            callback(scores)
        }
        query()
    }

    //Adds a new score to the database and returns a Score object matching that information
    addScore(name, score, test_id, callback) {
        const query = async() => {
            const sql = 'INSERT into score(student_name, score, test_id) values ($1, $2, $3) returning score_id'
            const { rows:score1 } = await this.pool.query(sql, [name, score, test_id])
            callback(new Score(score1[0].score_id, name, score, test_id))
        }
        query() 
    }

    //deletes a score object from the database.
    deleteScore(score_id) {
        const query = async() => {
            const sql = 'DELETE from score where score_id = $1'
            const { rows:score } = await this.pool.query(sql, [score_id])
        }
        query() 
    }
}

module.exports =  ScoreDAO;