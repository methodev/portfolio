module.exports = {
    options: {
        jshintrc: 'configs/conventions/.jshintrc',
        debug: false
    },

    target: {
        src: ['src/scripts/**/*.js', '!src/scripts/bootstrap.min.js']
    }
};