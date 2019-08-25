const gulp = require('gulp');
const validator = require('gulp-html');
const clean = require('gulp-clean');


// delete all html files from dist
gulp.task('html-clean', function () {
	return gulp.src('dist/**/*.html', {read: false})
		.pipe(clean());
});

gulp.task('html', function(){
    return gulp.src('src/*.html')
      // .pipe(validator())
      .pipe(gulp.dest('dist/'));
});