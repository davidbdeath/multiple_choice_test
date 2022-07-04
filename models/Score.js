class Score {
    constructor(score_id, name, score = 0, testId) {
        this.score_id = score_id;
        this.name = name;
        this.score = score;
        this.testId = testId;
    }
}

module.exports = Score;