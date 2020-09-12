var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var less = require('gulp-less');
var cssClean = require('gulp-clean-css');
var htmlMin = require('gulp-htmlmin');
var livereload = require('gulp-livereload');
var connect = require('gulp-connect');
var open = require('open');

// var pulgins  = require('gulp-load-plugins')();

gulp.task('js',function(){
    return gulp.src('src/js/*.js')
    //.pipe(plugins.concat('build.js'))
    .pipe(concat('build.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(uglify())
    .pipe(
        rename({
            suffix:'.min'
        })
    )
    .pipe(gulp.dest('dist/js'))
    .pipe(livereload())
    .pipe(connect.reload())
});

gulp.task('less',function(){
    return gulp.src('src/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('dist/css'))
    .pipe(livereload())
    .pipe(connect.reload())
});

gulp.task('css',function(){
    return gulp.src('src/css/*.css')
    .pipe(concat('build.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(cssClean())
    .pipe(rename({
        suffix:'.min'
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(livereload())
    .pipe(connect.reload())
});

gulp.task('html',function(){
    return gulp.src('src/*.html')
    .pipe(htmlMin(
        {collapseWhitespace:true}
    ))
    .pipe(gulp.dest('dist/'))
    .pipe(livereload())
    .pipe(connect.reload())
});

gulp.task('watch',function(){
    livereload.listen();
    gulp.watch('src/js/*.js',gulp.series('js'))
    gulp.watch('src/css/*.css',gulp.series('css'))
    gulp.watch('src/less/*.less',gulp.series('less'))
    gulp.watch('src/*.html',gulp.series('html'))
});

gulp.task('connect',function(){
    connect.server({
        root:'dist',
        port:4000,
        livereload:true,
    });
    open('http://localhost:4000')
})

gulp.task('default',gulp.parallel('js','html','watch', 'connect', gulp.series('less','css')))