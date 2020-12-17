let project_folder = require('path').basename(__dirname);
let source_folder = "#src";

let fs = require('fs');


// PATH
let path = {
    build: {
        html: project_folder + "/",
        css: project_folder + "/css/",
        js: project_folder + "/js/",
        img: project_folder + "/img/",
        fonts: project_folder + "/fonts/"
    },
    src: {
        html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
        scss: source_folder + "/scss/style.scss",
        js: source_folder + "/js/script.js",
        img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
        fonts: source_folder + "/fonts/*.ttf"
    },
    watch: {
        html: source_folder + "/**/*.html",
        scss: source_folder + "/scss/**/*.scss",
        js: source_folder + "/js/**/*.js",
        img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",

    },

    clean: "./" + project_folder + "/"
}

// VARIABLES for gulp packages
let { src, dest } = require('gulp'),
    gulp = require('gulp'),
    browsersync = require("browser-sync").create(),
    fileinclude = require("gulp-file-include"),
    del = require("del"),
    scss = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    group_media = require("gulp-group-css-media-queries"),
    clean_css = require("gulp-clean-css"),
    rename = require("gulp-rename"),
    uglify = require("gulp-uglify-es").default,
    imagemin = require("gulp-imagemin"),
    webp = require("gulp-webp"),
    webphtml = require("gulp-webp-html"),
    webpcss = require("gulp-webpcss"),
    svgSprite = require('gulp-svg-sprite'),
    ttf2woff = require("gulp-ttf2woff"),
    ttf2woff2 = require("gulp-ttf2woff2"),
    fonter = require("gulp-fonter"),
    concat = require('gulp-concat');



// BROWSERSYNC
function browserSync(params) {
    browsersync.init({
        server: {
            baseDir: "./" + project_folder + "/"
        },
        port: 3000,
        notify: false
    })
}

// HTML
function html() {
    return src(path.src.html)
        .pipe(fileinclude())
        .pipe(webphtml())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}

// SCSS
function css() {
    src(source_folder + "/css/*.css")
        .pipe(dest(path.build.css));

    return src(path.src.scss)
        .pipe(scss({
            outputStyle: "expanded"
        }))
        .pipe(
            group_media()
        )
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 5 versions"],
                cascade: true//стиль написания автопрефиксов
            })
        )
        .pipe(
            webpcss({})
        )
        .pipe(dest(path.build.css))
        .pipe(
            clean_css()//сжатие css
        )
        .pipe(
            rename({
                extname: ".min.css"
            })
        )
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
}


// JS
function js() {
    src([source_folder + "/js/libs.min.js",
    source_folder + "/js/libs.js"
    ])
        .pipe(dest(path.build.js));

    return src(path.src.js)
        .pipe(fileinclude())
        .pipe(dest(path.build.js))
        .pipe(
            uglify()
        )
        .pipe(
            rename({
                extname: ".min.js"
            })
        )
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
}

// IMG
function images() {
    return src(path.src.img)
        .pipe(
            webp({
                quality: 80
            })
        )
        .pipe(dest(path.build.img))
        .pipe(src(path.src.img))
        .pipe(
            imagemin({
                progressive: true,
                svgoPlugins: [{ revomeViewBox: false }],
                interlaced: true,
                optimizationLevel: 0 //0 to 7
            })
        )
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream())
}


// <-- func для формирования файла стилей для подключение шрифтов
function fontsStyle(params) {
    let file_content = fs.readFileSync(source_folder + '/scss/fonts.scss');
    if (file_content == '') {
        fs.writeFile(source_folder + '/scss/fonts.scss', '', cb);
        return fs.readdir(path.build.fonts, function (err, items) {
            if (items) {
                let c_fontname;
                for (var i = 0; i < items.length; i++) {
                    let fontname = items[i].split('.');
                    fontname = fontname[0];
                    if (c_fontname != fontname) {
                        fs.appendFile(source_folder + '/scss/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
                    }
                    c_fontname = fontname;
                }
            }
        })
    }
}
function cb() { }
// -->

// WATCH FILES
function watchFiles(params) {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.scss], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], images);
    gulp.watch([path.watch.json], json);
}

// FONTS convert ttf to (woff,woff2)
function fonts(params) {
    src(path.src.fonts)
        .pipe(ttf2woff())
        .pipe(gulp.dest(path.build.fonts));

    return src(path.src.fonts)
        .pipe(ttf2woff2())
        .pipe(gulp.dest(path.build.fonts));

}

// SVG TASK
gulp.task('svgSprite', function () {
    return gulp.src([source_folder + '/iconsprite/*.svg'])
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: "../icons/icons.svg",
                    example: true
                }
            }
        }))
        .pipe(dest(path.build.img))
})

//TASK convert otf to (woff,woff2) 
gulp.task('otf2ttf', function () {
    return src([source_folder + '/fonts/*.otf'])
        .pipe(fonter({
            formats: ['ttf']
        }))
        .pipe(dest(source_folder + '/fonts/'))
})

//JSON //Можно удалить
function json() {
    return src(source_folder + "/*.json")
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}

// DEL
function clean(param) {
    return del(path.clean);
}

//json можно удалить
let build = gulp.series(clean, gulp.parallel(html, css, js, images, fonts), fontsStyle);
let watch = gulp.parallel(build, watchFiles, browserSync);


exports.fontsStyle = fontsStyle;

exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;


//outer libs js plagins and css, таск для компоновки стилей и скриптов разных библиотек
gulp.task("libs", function () {
    //libs css, формирует отдельный файл css,собирая их из указанных ниже стилей плагинов и библиотек
    src(["./node_modules/swiper/swiper-bundle.css",


    ])
        .pipe(concat("libs.css"))
        .pipe(clean_css())
        .pipe(rename({
            extname: ".min.css"
        }))
        .pipe(dest(source_folder + "/css/"));
    //libs js
    return src([
        "./node_modules/swiper/swiper-bundle.js",


    ])
        .pipe(concat("libs.js"))
        .pipe(dest(source_folder + '/js/'))
        .pipe(uglify())
        .pipe(rename({
            extname: ".min.js"
        }))
        .pipe(dest(source_folder + '/js/'))

});