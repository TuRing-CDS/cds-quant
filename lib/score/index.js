/**
 * Created by Z on 2017-04-28.
 */
module.exports = function (context) {
    /**
     * 评分
     * @type {score}
     */
    context.SCORE = context.score = function (score) {
        if (typeof(score) === 'function') {
            context._score = score();
        } else {
            context._score = score;
        }
    }
};