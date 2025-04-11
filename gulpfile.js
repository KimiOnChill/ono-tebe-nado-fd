// better to write all expotrs after all functions 
const gulp = require('gulp');
const concat = require('gulp-concat-css');
const plumber = require('gulp-plumber');
const del = require('del');
const browserSync = require('browser-sync').create();

/* This function will display changes in folder dist on the live server */
function serve() {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });
}

// task creation, inside task will be pipes
// this will copy and send html file to dist folder
function html() {
  return gulp.src('src/**/*.html') // look for html files
        .pipe(plumber()) // for catching mistakes
            .pipe(gulp.dest('dist/')) // copy and send them into dist
        .pipe(browserSync.reload({stream: true}));// will reload web page when build is done
}
exports.html = html; // will call task from terminal by "gulp html"

// task for bundling all css file into one and send it to dist with cocnat plugin
// return gulp.src('src/blocks/**/*.css')
function css() {
  return gulp.src('src/styles/**/*.css')
        .pipe(plumber())
        .pipe(concat('bundle.css')) // all css files will be united into file 'bundle.css'
                .pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({stream: true}));// will reload web page when build is done
}
exports.css = css;

function images() {
  return gulp.src('src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}')
            .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.reload({stream: true}));// will reload web page when build is done
}
exports.images = images;

function fonts() {
  return gulp.src('src/fonts/**/*.css')
            .pipe(gulp.dest('dist/fonts'))
        .pipe(browserSync.reload({stream: true}));// will reload web page when build is done
}
exports.fonts = fonts;

// better to clean folder dist before adding to it
function clean() {
  return del('dist');
}
exports.clean = clean;

/* There are two in-build methods to chain tasks in gulp
 gulp.series - executes tasks one by one
 gulp.parallel - executes tasks together  */
const build = gulp.series(clean, gulp.parallel(html, css, images));
exports.build = build;

/* There is an in-build method to track changes in src files
 gulp.watch - will track
 watchapp - will rebuild bundle afrer each src change
 to turn of the watching press "crtl+c8(f8?)" in terminal */
function watchFiles() {
  gulp.watch(['src/**/*.html'], html);
  gulp.watch(['src/blocks/**/*.css'], css);
  gulp.watch(['src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}'], images);
}
const watchapp = gulp.parallel(build, watchFiles, serve);
exports.watchapp = watchapp;

/*function watchapp will be called when just 'gulp' will be typed in terminal */
exports.default = watchapp; 