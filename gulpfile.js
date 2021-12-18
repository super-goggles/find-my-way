const {src, dest, parallel, watch} = require('gulp');

const processPages = () => {
  return src('src/*.html').pipe(dest('dist'));
}

const processStyles = () => {
  return src('src/styles/*.css').pipe(dest('dist/styles'));
}

const processScripts = () => {
  return src('src/scripts/**/*.js').pipe(dest('dist/script'));
}

exports.default = parallel(processPages, processStyles, processScripts)