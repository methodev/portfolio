module.exports = {
    options: {
        livereload: false,
        event: ['changed', 'added', 'deleted']
    },

    markup: {
        files: ['src/markup/**/*.pug', 'src/model/**/*.json'],
        tasks: ['clean:markup', 'pug']
    },

    styles: {
        files: ['src/styles/**/*.scss'],
        tasks: ['scsslint', 'clean:styles', 'compass']
    },

    scripts: {
        files: ['src/scripts/**/*.js'],
        tasks: ['jshint', 'clean:scripts', 'concat', 'uglify']
    },

    images: {
        files: ['src/images/**/*', '!src/images/favicon.png'],
        tasks: ['clean:images', 'copy:images']
    },

    favicons: {
        files: ['src/images/favicon.png'],
        tasks: ['realFavicon']
    }
};