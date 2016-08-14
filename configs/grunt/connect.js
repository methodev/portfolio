var rewriteModule = require('http-rewrite-middleware');

module.exports = {
    server: {
        options: {
            port: 8002,
            base: './dist',
            livereload: false
        }
    }
};