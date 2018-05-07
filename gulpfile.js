var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	concatCss = require('gulp-concat-css'),
	cssmin = require('gulp-cssmin'),
	rename = require('gulp-rename'),
	wrap = require('gulp-wrap'),
	sass = require('gulp-sass');

//Navigation
var mysrc = "/Users/sunnarsi/VPCS/site";

gulp.task('watch', function() {
    gulp.watch([mysrc+'/scss/style.scss'], [ 'sass' ]);
});

gulp.task('cssconcate',function(){
    return gulp.src([mysrc+'/css/style.css'])
    //list of files to be concatinated
    .pipe(wrap('/** <%= file.path %>**/ \n<%= contents %>'))
    .pipe(concatCss('style.css').on('error', function(e){
        console.log(e);
    }))
	.pipe(gulp.dest(mysrc+'/css/'))
 });

gulp.task('sass', function() {
	return gulp.src(mysrc+'/scss/style.scss')
	.pipe(plumber())
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest(mysrc+'/css/'));
});

gulp.task('cssminify',function(){
	return gulp.src(mysrc+'/css/style.css')
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(mysrc+'/css/'))
});

gulp.task('default', ['watch','sass','cssconcate','cssminify']);