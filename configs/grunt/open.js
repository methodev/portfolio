var browser = process.platform === 'win32' ? 'Chrome' : '/Applications/Google Chrome.app';

module.exports = {
  dev : {
    app: browser,
    path: 'http://localhost:8002'
  },

  prod : {
    app: browser,
    path: 'https://<%= pkg.name %>.metodiev.dev'
  },

  build: {
    app: browser,
    path: 'https://travis-ci.org/martinmethod/<%= pkg.name %>/builds'
  },

  repo: {
    app: browser,
    path: 'https://github.com/martinmethod/<%= pkg.name %>'
  }
};
