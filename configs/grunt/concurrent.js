module.exports = {

    build: [
        // favicons
        ['realFavicon'],

        // markup
        ['pug'],

        // styles
        ['compass'],

        // scripts
        ['concat', 'uglify'],

        // images
        ['copy:images']
    ],

    prod: [
        'htmlmin'
    ],

    review: [
        'open:build',
        'open:repo',
        'open:prod'
    ]

};