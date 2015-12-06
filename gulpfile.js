var gulp = require('gulp'),
    ts = require('gulp-typescript'),
    sass = require('gulp-sass'),
    connect = require('gulp-connect'),
    gutil = require('gutil');

var tsProject = ts.createProject('tsconfig.json', {
    outFile: 'script.js'
});

gulp.task('compile-typescript', function() {
    return tsProject.src()
        .pipe(ts(tsProject))
        .js.pipe(gulp.dest('build/'))
        .pipe(connect.reload());
});

gulp.task('compile-sass', function() {
    return gulp.src('scss/style.scss')
        .pipe(sass())
        .pipe(gulp.dest('build/'))
        .pipe(connect.reload());
});

gulp.task('build', ['compile-sass', 'compile-typescript']);

gulp.task('watch', ['build'],function() {
    connect.server({
        root: [__dirname],
        port: 8000,
        livereload: true
    });
    gulp.watch(['scss/**/*.scss'], ['compile-sass']);
    gulp.watch(['ts/**/*.ts'], ['compile-typescript']);
});
