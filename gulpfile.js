const { src, dest, parallel, watch } = require("gulp");
const gulpWebpack = require("webpack-stream");
const cleanCSS = require('gulp-clean-css');

function processPages() {
  return src("src/*.html").pipe(dest("dist"));
}

const processStyles = () => {
  return src("src/styles/*.css")
  .pipe(cleanCSS())
  .pipe(dest("dist/styles"));
};

const processScripts = () => {
  return src("src/scripts/**/*.js")
    .pipe(gulpWebpack({ mode: "production" }))
    .pipe(dest("dist/scripts"));
};

const watchTask = () => {
  return watch(
    ["src/**/**/**"],
    parallel(processPages, processStyles, processScripts)
  );
};

exports.default = parallel(processPages, processStyles, processScripts);
exports.watch = watchTask;
