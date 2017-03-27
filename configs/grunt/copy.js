module.exports = {

  // Images
  images: {
    files: [{
      expand: true,
      cwd: 'src/images',
      src: ['**', '!favicon.png'],
      dest: 'dist/assets/images/'
    }]
  }

};