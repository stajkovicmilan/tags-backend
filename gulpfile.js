var gulp = require('gulp');
var exec = require('child_process').exec;
var clean = require('gulp-clean');
var gulpSequence = require('gulp-sequence');
var tslint = require("gulp-tslint");

gulp.task('default', gulpSequence('tslint', 'clean', 'compile', 'copy', 'copy-core-config', 'start'));

gulp.task('build', gulpSequence('tslint', 'clean', 'compile', 'copy', 'copy-packages', 'copy-core-config'));

// gulp.task('start-app', gulpSequence('default', 'start'));

gulp.task('tslint', function () {
    return gulp.src(['./**/*.ts', '!./node_modules/**', '!./typings/**'])
        .pipe(tslint({
            configuration: "./tslint.json"
        }))
        .pipe(tslint.report({
            summarizeFailureOutput: true
        }));
});

gulp.task('copy', function (done) {
    return gulp.src(['./**/*.json', './Procfile', './**/*.wsdl', '!./dist/**/*.wsdl', './**/*.docx', '!./dist/**/*.docx'])
        .pipe(gulp.dest('./dist'));
});


gulp.task('copy-core-config', function (done) {
    return gulp.src(['./src/core/**/*.json'])
        .pipe(gulp.dest('./dist/core'));
});

gulp.task('copy-packages', function (done) {
    return gulp.src(['./src/packages/**'])
        .pipe(gulp.dest('./dist/packages'));
});

gulp.task('clean', function () {
    return gulp.src(['./dist/*'])
        .pipe(clean());
});

gulp.task('start', function (done) {
    exec('nodemon --delay 1000ms dist/index', function (err, stdOut, stdErr) {
        console.log(stdOut);
        if (err) {
            done(err);
        } else {
            done();
        }
    });
    console.log('Server started!');
    // gulp.watch([
    //     './**/*.ts',
    //     '!./node_modules/**/*.ts',
    //     '!./typings/**/*.ts'
    // ], ['compile', 'copy']);
    // console.log('Watcher activated!');    
});

gulp.task('compile', function (done) {
    exec('tsc', function (err, stdOut, stdErr) {
        console.log(stdOut);
        if (err) {
            done(err);
        } else {
            done();
        }
    });
});
