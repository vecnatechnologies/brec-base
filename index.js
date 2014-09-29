var path = require('path');

module.exports = {
  sass: [path.join(__dirname, 'sass')],
  js: [path.join(__dirname, 'js/**/*.js')],
  fonts: [path.join(__dirname, 'fonts/**/*.{eot,svg,ttf,woff}')]
}
