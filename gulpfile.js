// инициализация gulp
const gulp = require('gulp');
// плагин для сборки в один файл
const concat = require('gulp-concat');
// плагин sass
const sass = require('gulp-sass');
// плагин для отображения позиции кода в оригинальном файле (для dev.tools)
const sourcemaps = require('gulp-sourcemaps');
// плагин для сжатия css
const cleanCSS = require('gulp-clean-css');
// плагин для сжатия js
const uglify = require('gulp-uglify');
// плагин для преобразования новых стандартов в старый js
const babel = require('gulp-babel');

// создал массив для точной последовательной загрузки файлов
const jsFiles = [
    './src/js/lib.js',
    './src/js/scripts.js'
];

function styles () {
    // return gulp.src('./src/scss/**/*.scss') - поиск всех файлов с раширением .scss
    return gulp.src('./src/scss/main.scss')
        .pipe(sourcemaps.init()))
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('./'))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(gulp.dest('./build/css'));
}

function scripts () {
    return gulp.src(jsFiles)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('scripts.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(uglify({
            toplevel: true
        }))
        .pipe(gulp.dest('./build/js'));
}

function watch () {
    gulp.watch('./src/scss/main.scss', styles)
    gulp.watch('./src/js/**/*.js', scripts)
}

gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('watch', watch);