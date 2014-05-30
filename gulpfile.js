'use strict';
var gulp            = require('gulp'),
    browserSync     = require('browser-sync'),
    sass            = require('gulp-ruby-sass');

gulp.task('browser-sync', function () {
    browserSync.init(["*.html", "css/*.css", "js/app.js"], {
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('sass', function () {
    gulp.src('sass/main.scss')
        .pipe(sass({
            style: 'expended',
            sourcemap: true
        }))
        .pipe(gulp.dest('css'));
});


gulp.task('default', [/*'sass',*/ 'browser-sync'], function () {
    //gulp.watch("sass/**/*.scss", ['sass']);
});