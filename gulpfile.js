'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var minify = require('gulp-minifier');
var pug = require('gulp-pug');
var livereload = require('gulp-livereload');
var imagemin = require('gulp-imagemin');
var autoprefixer = require('gulp-autoprefixer');




gulp.task('all:watch', function () {
    livereload.listen();
    gulp.watch('stylesheets/scss/desktop/*.scss', ['compile:sass']);
    //gulp.watch('stylesheets/scss/mob/*.scss', ['compile:sass:mob']);
    gulp.watch('stylesheets/css/concat.css', ['autoprefix']);
   // gulp.watch('stylesheets/css/concat_mob.css', ['autoprefix:mob']);
    gulp.watch('stylesheets/css/prefixed/concat.css', ['concat:css']);
    //gulp.watch('stylesheets/css/prefixed/concat_mob.css', ['concat:css:mob']);
    //gulp.watch('stylesheets/css/prefixed/concat.css', ['replace:px']);
    gulp.watch('js/files/**/*.js', ['concat:js']);
    gulp.watch('js/script.js', ['compress:js']);
    gulp.watch('views/**/*.pug', ['compile:pug']);
    gulp.watch('images_big/**/*', ['img:min']);
});

gulp.task('compile:sass', function () {
    return gulp.src('stylesheets/scss/concat/concat.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('stylesheets/css'));
});
gulp.task('compile:sass:mob', function () {
    return gulp.src('stylesheets/scss/concat/concat_mob.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('stylesheets/css'));
});

gulp.task('concat:js', function () {
    return gulp.src('js/files/**/*.js')
        .pipe(concat('script.js'))
        .pipe(gulp.dest('js'))
        .pipe(livereload());
});

gulp.task('concat:css', function () {
    return gulp.src('stylesheets/css/prefixed/concat.css')
        .pipe(concat('style.css'))
        .pipe(gulp.dest('stylesheets'))
        .pipe(livereload());
});
gulp.task('concat:css:mob', function () {
    return gulp.src('stylesheets/css/prefixed/concat_mob.css')
        .pipe(concat('style_mob.css'))
        .pipe(gulp.dest('stylesheets'))
        .pipe(livereload());
});

gulp.task('compress:js', function () {
    return gulp.src('js/script.js')
        .pipe(minify({
            minify: true,
            collapseWhitespace: true,
            conservativeCollapse: true,
            minifyJS: true,
            /*minifyCSS: true,
            getKeptComment: function (content, filePath) {
                var m = content.match(/\/\*![\s\S]*?\*\//img);
                return m && m.join('\n') + '\n' || '';
            }*/
        }))
        .pipe(gulp.dest('js/min'))
        .pipe(livereload());
});

gulp.task('compile:pug', function buildHTML() {
    return gulp.src('views/templates/*.pug')
        .pipe(pug({

            pretty: true,


            // Your options in here. 
        })).pipe(gulp.dest(''))

});


gulp.task('img:min', function () {
    return gulp.src('images_big/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('images'))
});

gulp.task('autoprefix', function () {
    gulp.src('stylesheets/css/concat.css')
        .pipe(autoprefixer({}))
        .pipe(gulp.dest('stylesheets/css/prefixed/'))
});
gulp.task('autoprefix:mob', function () {
    gulp.src('stylesheets/css/concat_mob.css')
        .pipe(autoprefixer({}))
        .pipe(gulp.dest('stylesheets/css/prefixed/'))
});

gulp.task('replace:px', function () {
    gulp.src(['stylesheets/css/prefixed/concat.css'])
        .pipe(replace('px', 'rem'))
        .pipe(gulp.dest('stylesheets'));
});


gulp.task('default', []);
