const gulp = require('gulp');
const fs = require('fs');
const clean = require('gulp-clean');
const runSequence = require('run-sequence');
const globalVars = require('./src/config/gulp-tasks/_global-vars');

// build all files
gulp.task('build', function() {
	globalVars.createDistFolder();
	globalVars.productionBuild = true;
	fs.copyFileSync('favicon.ico', 'dist/favicon.ico');
	runSequence('html-clean', 'html', 'css','css-push', 'js', 'assets');
});

gulp.task('build-dev', function() {
	globalVars.createDistFolder();
	globalVars.productionBuild = false;
	fs.copyFileSync('favicon.ico', 'dist/favicon.ico');
	runSequence('html', 'css', 'css-push', 'js', 'assets');
});

// delete dist folder
gulp.task('reset-dev', function() {
	return gulp.src('dist', {read: false})
		.pipe(clean());
});

// start dev tasks
gulp.task('default', function() {
	globalVars.createDistFolder();
	globalVars.productionBuild = false;
	runSequence('html', 'css', 'js', 'watch');
});

// import gulp tasks
require('require-dir')('./src/config/gulp-tasks');
