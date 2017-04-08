module.exports = {
  options: {
    jshintrc: 'configs/linters/.jshintrc',
    debug: false
  },

  target: {
    src: ['src/scripts/**/*.js', '!src/scripts/bootstrap.min.js']
  }
};