const {watch, src, dest, task, series, parallel} = require('gulp');//include gulp
const less = require('gulp-less'); //compiler code sass to css
const sourcepams = require('gulp-sourcemaps');//record source code js or sass to map
const concat = require('gulp-concat');//file concatenation into one
const del = require('del');//plugin for cleaning build folder
const pipeline = require('readable-stream').pipeline;//merging all .pipe into pipeline
const cleanCSS = require('gulp-clean-css');//write css in one line
const browserSync = require('browser-sync').create();//local server
const autoprefixer = require('gulp-autoprefixer');//Add prefix for new properties
const imagemin = require('gulp-imagemin');
const scss = require('gulp-sass');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

function images() {
    return pipeline(
        src('./app/images/*'),
        (imagemin()),
        (dest('./build/images'))
    )
}

function scripts() {
    return pipeline(
        src(['./app/scripts/main.js','./app/scripts/textSlider.js']),
        sourcepams.init(),
        babel({
            presets: [
                ['@babel/env', {
                    modules: false
                }]
            ]
        }),
        uglify(),
        concat('main.js'),
        sourcepams.write("./"),
        dest('./build/js'),
        browserSync.stream()
    )
}

function addStyles(paths, outputFilename) {

    return pipeline(
        src(paths),
        sourcepams.init(),
        less(),
        concat(outputFilename),
        autoprefixer('last 10 versions', 'ie 9'),
        cleanCSS(),
        sourcepams.write('./'),
        dest('./build/css'),
        browserSync.stream()
    )
}

function styles() {
    return addStyles([
        './node_modules/normalize.css/normalize.css',
        './node_modules/hamburgers/dist/hamburgers.css',
        './app/styles/index.less',
    ], 'main.css')
}

function clean() {
    return del(['build/*'])
}

function watcher() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        port: 8080,
        open: true,
        notify: false
    });

    watch('./app/styles/index.less', styles);
    // watch('./app/**/*.js', scripts);
    watch(['./app/scripts/main.js','./app/scripts/textSlider.js'], scripts);
    watch("/index.html").on('change', browserSync.reload);
}//tracking all files that can be changed for hot reload with Browser Sync

task('images', images);
task('scripts', scripts);
task('styles', styles);
task('del', clean);
task('watch', watcher);
task('build', series(clean, parallel(images, styles, scripts)));
task('dev', series('build', watcher));