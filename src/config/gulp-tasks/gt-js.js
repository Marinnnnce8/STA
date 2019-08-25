// const gulp = require('gulp');
// const plumber = require('gulp-plumber');
// const sourcemaps = require('gulp-sourcemaps');
// const clean = require('gulp-clean');
// const concat = require('gulp-concat');
// const uglify = require('gulp-uglify-es').default;
// const rename = require('gulp-rename');
// const runSequence = require('run-sequence');
// const eslint = require('gulp-eslint');
// const webpack = require('gulp-webpack');
// const webpackConfig = require('../../../webpack.config');
// const gulpif = require('gulp-if');
// const globalVars = require('./_global-vars');
// const minify = require('gulp-minify');

// const destinationFolder = 'dist/js';

// /*----------------------------------------------------------------------------------------------
// 	JS
//  ----------------------------------------------------------------------------------------------*/
// // task: build javascript
// // gulp.task('js-task', function() {
// // 	return gulp.src('src/js/**.js')
// // 		.pipe(plumber())
// // 		.pipe(webpack(webpackConfig))
// // 		.pipe(gulpif(globalVars.productionBuild, uglify()))
// // 		.pipe(rename({basename: 'default'}))
// // 		.pipe(gulp.dest(destinationFolder));
// // });

// // task: validate javascript source files
// // gulp.task('js-lint', function() {
// // 	return gulp.src('src/js/*.js')
// // 		.pipe(eslint())
// // 		.pipe(eslint.format())
// // 		.pipe(eslint.failAfterError());
// // });

// gulp.task('compress', function() {
// 	gulp.src('src/js/*.js')
// 	  .pipe(minify({
// 		  ext:{
// 			min:'.js'
// 		  },
// 		  ignoreFiles: ['.combo.js', '-min.js']
// 	  }))
// 	  .pipe(gulp.dest(destinationFolder))
//   });

// gulp.task('js-clean', function() {
// 	return gulp.src([destinationFolder + '/libs.js', destinationFolder + '/default.js'], {read: false})
// 		.pipe(clean());
// });

// gulp.task('js', function() {
// 	runSequence('compress', () => false);
// });

const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemaps = require("gulp-sourcemaps");
const clean = require("gulp-clean");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const rename = require("gulp-rename");
const runSequence = require("run-sequence");
const eslint = require("gulp-eslint");
const webpack = require("gulp-webpack");
const webpackConfig = require("../../../webpack.config");
const gulpif = require("gulp-if");
const globalVars = require("./_global-vars");
const minify = require('gulp-minify');

const destinationFolder = "dist/js";

/*----------------------------------------------------------------------------------------------
	JS
 ----------------------------------------------------------------------------------------------*/
// task: build javascript
gulp.task("js-task", function() {
	return gulp
		.src("src/js/**.js")
		.pipe(plumber())
		.pipe(webpack(webpackConfig))
		.pipe(gulpif(globalVars.productionBuild, uglify()))
		.pipe(rename({ basename: "theme" , suffix: ".min"}))
		// .pipe(minify())
		.pipe(gulp.dest(destinationFolder));
});

// task: validate javascript source files
gulp.task("js-lint", function() {
	return gulp
		.src("src/js/_project/**/*.js")
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

// // task: concats all the libraries (jQuery, slick etc)
// gulp.task('js-libs', function() {
// 	return gulp.src(['src/js/_libs/jquery-3.3.1.min.js', 'src/js/_libs/**/*.js'])
// 		.pipe(concat('libs.js'))
// 		.pipe(gulp.dest(destinationFolder));
// });

// gulp.task('js-clean', function() {
// 	return gulp.src([destinationFolder + '/libs.js', destinationFolder + '/default.js'], {read: false})
// 		.pipe(clean());
// });

gulp.task("js", function() {
	runSequence("js-lint", "js-task", () => false);
});
