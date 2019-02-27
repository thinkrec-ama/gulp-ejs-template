const gulp = require('gulp');
const sass = require('gulp-sass');
const ejs = require('gulp-ejs');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', done => {
    gulp.src('src/sass/**/*.scss')
        .pipe(sass())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer({
            browsers: ['last 2 version', 'ie >= 9', 'iOS >= 7', 'Android >= 4.2'],
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('public/css/'));
    done()
});

gulp.task('ejs', done => {
    gulp.src(['src/ejs/**/*.ejs', '!' + 'src/ejs/layout/_*.ejs'])
        .pipe(ejs())
        .pipe(rename({extname: '.html'}))
        .pipe(gulp.dest('public/'));
    done()
});

gulp.task('log', done => {
    console.log("DONE");
    done()
});

gulp.task('watch', () => {
    gulp.watch('src/sass/**/*.scss', gulp.series('sass','log'));
    gulp.watch('src/ejs/**/*.ejs', gulp.series('ejs','log'));
});

gulp.task("default",
    gulp.series(
        'watch'
    )
);