var grunt = require('grunt');

module.exports = {
    task: {
        options: {
            pretty: grunt.option('target') !== 'prod',
            data: {
                debug: grunt.option('target') !== 'prod',
                pkg: grunt.file.readJSON('package.json'),
                base: grunt.file.readJSON('src/model/base.json'),
                content: grunt.file.readJSON('src/model/content.json'),
                projects: grunt.file.readJSON('src/model/projects.json')
            }
        },
        files: {
            'dist/index.html': 'src/markup/<%= pkg.name %>.jade',
            'dist/gallery-overview.html': 'src/markup/gallery/overview.jade',
            'dist/gallery-slider.html': 'src/markup/gallery/slider.jade'
        }
    }
};