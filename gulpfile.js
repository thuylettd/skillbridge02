const gulp = require('gulp');
const htmlMin = require('gulp-htmlmin');
const prettify = require('gulp-prettify');

const replace = require('gulp-replace');

const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const ejs = require("gulp-ejs");
const sass = require('gulp-sass')(require('sass'));
// const sass = require("gulp-sass");
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');

const cssNano = require('gulp-cssnano');

const imageMin = require("gulp-imagemin");
const pngQuant = require('imagemin-pngquant');
const mozJpeg = require('imagemin-mozjpeg');
const svgo = require('gulp-svgo');
const webp = require('gulp-webp'); //webpに変換

const babel = require('gulp-babel');
const terser = require('gulp-terser');

const fs = require('fs');

//パス設定
const paths = {
    ejs: {
        dist: './',
    },
    styles: {
        dist: './css/',
    },
    scripts: {
        src: ['./src/js/**/*.js', '!./src/js/**/vendors/*.js'], //外部のライブラリファイルはコンパイルしない
        copy:'./src/js/**/vendors/**/*',
        dist: './js/',
    },
    images: {
        src: './src/img/**/*.{jpg,jpeg,png,gif,svg}',
        srcWebp: './src/img/**/*.{jpg,jpeg,png}',
        dist: './img/',
        distWebp: './img/webp/',
    },
    fonts: {
        src: './fonts/**/*.{off,ttf,woff,woff2}',
        dist: './fonts/',
    },
};



gulp.task("ejs", function (done) {
    
    var tmp_file = './ejs/template.ejs',
        json_file = './ejs/data/pages.json',
        json = JSON.parse(fs.readFileSync(json_file)),
        page_data = json.pages;
    for (var i = 0; i < page_data.length; i++) {
        var bread1 = page_data[i].bread1;
        var bread2 = page_data[i].bread2;
        var bread3 = page_data[i].bread3;
        var bread4 = page_data[i].bread4;
        var bread1_url = page_data[i].bread1_url;
        var bread2_url = page_data[i].bread2_url;
        var bread3_url = page_data[i].bread3_url;
        var BREADCRUMBS = "";
        var id = page_data[i].id,
            parentId1 = page_data[i].parentId1,
            parentId2 = page_data[i].parentId2,
            parentId3 = page_data[i].parentId3,
            parentId4 = page_data[i].parentId4,
            depth = page_data[i].depth,
            template = page_data[i].template,
            RELATIVE_PATH = "";
        if (depth == 0) {
            RELATIVE_PATH = "./"
        } else if (depth == 1) {
            RELATIVE_PATH = "../"
        } else if (depth == 2) {
            RELATIVE_PATH = "../../"
        } else if (depth == 3) {
            RELATIVE_PATH = "../../../"
        } else if (depth == 4) {
            RELATIVE_PATH = "../../../../"
        }
        if (bread1 != "") {
            BREADCRUMBS = '<a href="/">企業一覧</a> <span>' + bread1 + '</span>'
        }
        if (bread2 != "") {
            BREADCRUMBS = '<a href="/">企業一覧</a> <span><a href="' + bread1_url + '">' + bread1 + '</a></span> <span>' + bread2 + '</span>'
        }
        if (bread3 != "") {
            BREADCRUMBS = '<a href="/">企業一覧</a> <span><a href="' + bread1_url + '">' + bread1 + '</a></span> <span><a href="' + bread2_url + '">' + bread2 + '</a></span> <span>' + bread3 + '</span>'
        }
        if (bread4 != "") {
            BREADCRUMBS = '<a href="/">企業一覧</a> <span><a href="' + bread1_url + '">' + bread1 + '</a></span> <span><a href="' + bread2_url + '">' + bread2 + '</a></span> <span><a href="' + bread3_url + '">' + bread3 + '</a></span> <span>' + bread4 + '</span>'
        }
        if (parentId4 != "") {
            parentId1 = parentId1 + "/" + parentId2 + "/" + parentId3 + "/" + parentId4
        } else if (parentId3 != "") {
            parentId1 = parentId1 + "/" + parentId2 + "/" + parentId3
        } else if (parentId2 != "") {
            parentId1 = parentId1 + "/" + parentId2
        }
        gulp.src(tmp_file)
            .pipe(plumber())
            .pipe(ejs({
                pageData: page_data[i],
                RELATIVE_PATH: RELATIVE_PATH,
                template: template,
                BREADCRUMBS: BREADCRUMBS
            }))
            .pipe(rename(id + '.html'))
            .pipe(
                htmlMin({
                    //圧縮時のオプション
                    removeComments: true, //コメントを削除
                    collapseWhitespace: true, //余白を詰める
                    collapseInlineTagWhitespace: true, //inline要素のスペース削除（spanタグ同士の改行などを詰める
                    preserveLineBreaks: true, //タグ間の余白を詰める
                    /*
					 *オプション参照：https://github.com/kangax/html-minifier
					 */
                })
            )
            .pipe(
                prettify({
                    //整形
                    indent_with_tabs: true, //スペースではなくタブを使用
                    indent_size: 2,
                })
            )
            .pipe(gulp.dest(paths.ejs.dist + parentId1))
        
    }
    
    
    done();
});


gulp.task("sass", function(done) {

    gulp.src("scss/**/*scss")
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(autoprefixer({browsers: ['last 3 versions', 'ie >= 10']}))
        
        .pipe(gulp.dest(paths.styles.dist, {
            // ソースマップを出力する場合のパス
            sourcemaps: './map',
        }));
    done();

});


gulp.task('watch', function (done) {
    gulp.watch('ejs/**/*.ejs', gulp.series('ejs'));
    gulp.watch('scss/**/*.scss', gulp.series('sass'));
    done();
});